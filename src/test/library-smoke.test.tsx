import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import {
  LifeOsProvider,
  MissionControlShell,
  NewsfeedScreen,
} from '../lib';

describe('library smoke render', () => {
  test('renders the shell and a screen from the root entrypoint', () => {
    render(
      <MemoryRouter>
        <LifeOsProvider>
          <MissionControlShell
            showHeader={false}
            showLeftNav={false}
            showSidebar={false}
            showRightSidebar={false}
          >
            <NewsfeedScreen
              title="Library Smoke Test"
              articles={[
                {
                  id: '1',
                  title: 'Smoke Test Article',
                  excerpt: 'A lightweight render test for the public package entrypoint.',
                  thumbnail: 'https://example.com/thumb.png',
                  source: { name: 'Example', favicon: 'https://example.com/favicon.ico' },
                  category: 'Testing',
                  tags: ['smoke'],
                  publishedAt: 'just now',
                  url: 'https://example.com/article',
                  isBookmarked: false,
                },
              ]}
              categories={['All', 'Testing']}
              defaultViewMode="list"
            />
          </MissionControlShell>
        </LifeOsProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Library Smoke Test' })).toBeInTheDocument();
    expect(screen.getByText('Smoke Test Article')).toBeInTheDocument();
  });
});
