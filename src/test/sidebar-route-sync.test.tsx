import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, test } from 'vitest';
import { Sidebar } from '../app/components/Sidebar';
import { SidebarProvider } from '../app/contexts/SidebarContext';
import { ThemeProvider } from '../app/contexts/ThemeContext';

function SidebarHarness() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar mode="messages" />
      </SidebarProvider>
    </ThemeProvider>
  );
}

describe('Sidebar route sync', () => {
  test('tracks direct loads, link navigation, and history navigation from router state', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: <SidebarHarness />,
        },
      ],
      {
        initialEntries: ['/messages/discord'],
      },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: 'Discord' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('link', { name: 'Slack' }));

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Slack' })).toHaveAttribute('aria-current', 'page');
    });

    await router.navigate(-1);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Discord' })).toHaveAttribute('aria-current', 'page');
    });
  });
});
