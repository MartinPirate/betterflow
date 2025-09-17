import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { showToast } from '@/lib/toast-helpers';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  handler: () => void;
  description: string;
}

export const shortcuts: ShortcutHandler[] = [
  {
    key: 'd',
    ctrl: true,
    handler: () => {},
    description: 'Go to Dashboard'
  },
  {
    key: 't',
    ctrl: true,
    handler: () => {},
    description: 'Go to Timesheets'
  },
  {
    key: 'l',
    ctrl: true,
    handler: () => {},
    description: 'Go to Leaves'
  },
  {
    key: 'p',
    ctrl: true,
    handler: () => {},
    description: 'Go to Projects'
  },
  {
    key: 'k',
    ctrl: true,
    handler: () => {},
    description: 'Open search'
  },
  {
    key: '/',
    ctrl: true,
    handler: () => {},
    description: 'Show keyboard shortcuts'
  },
  {
    key: 'm',
    ctrl: true,
    shift: true,
    handler: () => {},
    description: 'Toggle dark mode'
  },
  {
    key: 'n',
    ctrl: true,
    handler: () => {},
    description: 'Create new'
  },
  {
    key: 's',
    ctrl: true,
    handler: () => {},
    description: 'Save'
  },
  {
    key: 'Escape',
    handler: () => {},
    description: 'Close dialog/modal'
  }
];

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Navigation shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'd':
            e.preventDefault();
            router.push('/dashboard');
            showToast.info('Navigating to Dashboard');
            break;
          case 't':
            e.preventDefault();
            router.push('/timesheets');
            showToast.info('Navigating to Timesheets');
            break;
          case 'l':
            e.preventDefault();
            router.push('/leaves');
            showToast.info('Navigating to Leaves');
            break;
          case 'p':
            e.preventDefault();
            router.push('/projects');
            showToast.info('Navigating to Projects');
            break;
          case 'k':
            e.preventDefault();
            // Trigger search focus
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
              showToast.info('Search activated');
            }
            break;
          case '/':
            e.preventDefault();
            // Show shortcuts dialog
            const event = new CustomEvent('show-shortcuts');
            window.dispatchEvent(event);
            break;
        }

        // Dark mode toggle
        if (e.shiftKey && e.key.toLowerCase() === 'm') {
          e.preventDefault();
          setTheme(theme === 'dark' ? 'light' : 'dark');
          showToast.success(`Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
      }

      // Escape key
      if (e.key === 'Escape') {
        // Close any open dialogs
        const closeButtons = document.querySelectorAll('[aria-label="Close"]');
        closeButtons.forEach((button) => {
          if (button instanceof HTMLElement) {
            button.click();
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, theme, setTheme]);
}