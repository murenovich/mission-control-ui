import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { LifeOsProvider, MissionControlShell } from '../lib';

describe('MissionControlShell', () => {
  test('renders the default chrome when no custom slots are supplied', () => {
    render(
      <MemoryRouter initialEntries={['/messages/discord']}>
        <LifeOsProvider>
          <MissionControlShell activeSection="messages" currentPage="messages-discord">
            <div>Shell Content</div>
          </MissionControlShell>
        </LifeOsProvider>
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Search dashboard...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Discord' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Shell Content')).toBeInTheDocument();
  });

  test('supports custom slots and hiding default chrome regions', () => {
    render(
      <LifeOsProvider>
        <MissionControlShell
          activeSection="home"
          currentPage="dashboard"
          header={({ activeSection, currentPage }) => (
            <div>{`custom-${activeSection}-${currentPage}`}</div>
          )}
          leftNav={<div>custom-left-nav</div>}
          sidebar={<div>custom-sidebar</div>}
          rightSidebar={<div>custom-right-sidebar</div>}
          backgroundDecor={<div>custom-background</div>}
          showHeader={false}
          showLeftNav={false}
          showSidebar={false}
          showRightSidebar={false}
          showBackgroundDecor={false}
        >
          <div>Slot Content</div>
        </MissionControlShell>
      </LifeOsProvider>,
    );

    expect(screen.getByText('custom-home-dashboard')).toBeInTheDocument();
    expect(screen.getByText('custom-left-nav')).toBeInTheDocument();
    expect(screen.getByText('custom-sidebar')).toBeInTheDocument();
    expect(screen.getByText('custom-right-sidebar')).toBeInTheDocument();
    expect(screen.getByText('custom-background')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search dashboard...')).not.toBeInTheDocument();
  });
});
