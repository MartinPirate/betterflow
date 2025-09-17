'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';
import { shortcuts } from '@/hooks/use-keyboard-shortcuts';

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleShowShortcuts = () => setOpen(true);
    window.addEventListener('show-shortcuts', handleShowShortcuts);
    return () => window.removeEventListener('show-shortcuts', handleShowShortcuts);
  }, []);

  const getKeyDisplay = (shortcut: typeof shortcuts[0]) => {
    const keys = [];
    if (shortcut.ctrl) keys.push('Ctrl');
    if (shortcut.alt) keys.push('Alt');
    if (shortcut.shift) keys.push('Shift');
    keys.push(shortcut.key === ' ' ? 'Space' : shortcut.key);
    return keys;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Quick keyboard shortcuts to navigate and control the application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold mb-3 text-sm text-gray-600 dark:text-gray-400">Navigation</h3>
            <div className="space-y-2">
              {shortcuts
                .filter(s => ['d', 't', 'l', 'p'].includes(s.key.toLowerCase()) && s.ctrl)
                .map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {getKeyDisplay(shortcut).map((key, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="font-mono text-xs px-2 py-0.5"
                        >
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-gray-600 dark:text-gray-400">Actions</h3>
            <div className="space-y-2">
              {shortcuts
                .filter(s => ['k', 'n', 's'].includes(s.key.toLowerCase()) && s.ctrl)
                .map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {getKeyDisplay(shortcut).map((key, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="font-mono text-xs px-2 py-0.5"
                        >
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm text-gray-600 dark:text-gray-400">System</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="text-sm">Toggle dark mode</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">Ctrl</Badge>
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">Shift</Badge>
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">M</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="text-sm">Show keyboard shortcuts</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">Ctrl</Badge>
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">/</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="text-sm">Close dialog/modal</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">Esc</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 Tip: Press <span className="font-mono font-semibold">Ctrl + /</span> anytime to show this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}