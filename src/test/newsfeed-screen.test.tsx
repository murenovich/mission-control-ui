import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { LifeOsProvider, NewsfeedScreen, type NewsfeedArticle } from '../lib';

const TEST_ARTICLE: NewsfeedArticle = {
  id: 'article-1',
  title: 'Testing the Newsfeed',
  excerpt: 'An article used to validate controlled and uncontrolled screen behavior.',
  thumbnail: 'https://example.com/thumb.png',
  source: { name: 'Example', favicon: 'https://example.com/favicon.ico' },
  category: 'Testing',
  tags: ['vitest'],
  publishedAt: 'today',
  url: 'https://example.com/testing-the-newsfeed',
  isBookmarked: false,
};

describe('NewsfeedScreen', () => {
  test('toggles bookmarks internally when used uncontrolled', async () => {
    const user = userEvent.setup();

    render(
      <LifeOsProvider>
        <NewsfeedScreen
          articles={undefined}
          defaultArticles={[TEST_ARTICLE]}
          categories={['All', 'Testing']}
          defaultViewMode="list"
        />
      </LifeOsProvider>,
    );

    const bookmarkButton = screen.getByRole('button', {
      name: `Bookmark ${TEST_ARTICLE.title}`,
    });

    await user.click(bookmarkButton);

    expect(
      screen.getByRole('button', {
        name: `Remove bookmark for ${TEST_ARTICLE.title}`,
      }),
    ).toBeInTheDocument();
  });

  test('delegates bookmark changes when used as a controlled screen', async () => {
    const user = userEvent.setup();
    const onBookmarkToggle = vi.fn();

    render(
      <LifeOsProvider>
        <NewsfeedScreen
          articles={[TEST_ARTICLE]}
          categories={['All', 'Testing']}
          defaultViewMode="list"
          onBookmarkToggle={onBookmarkToggle}
        />
      </LifeOsProvider>,
    );

    await user.click(
      screen.getByRole('button', {
        name: `Bookmark ${TEST_ARTICLE.title}`,
      }),
    );

    expect(onBookmarkToggle).toHaveBeenCalledWith(TEST_ARTICLE);
    expect(
      screen.getByRole('button', {
        name: `Bookmark ${TEST_ARTICLE.title}`,
      }),
    ).toBeInTheDocument();
  });
});
