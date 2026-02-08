'use client';

import { useRef, useEffect, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [typingStartTime] = useState<number>(Date.now());
  const [keystrokes, setKeystrokes] = useState<number>(0);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // CRITICAL ANTI-CHEAT: Disable ALL paste methods
    // Block Ctrl+V / Cmd+V
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      console.warn('Paste is disabled for anti-cheat purposes');
      return null;
    });

    // Block Shift+Insert (another paste shortcut)
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => {
      console.warn('Paste is disabled for anti-cheat purposes');
      return null;
    });

    // Override the default paste action
    editor.addAction({
      id: 'disable-paste',
      label: 'Paste Disabled',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV,
        monaco.KeyMod.Shift | monaco.KeyCode.Insert,
      ],
      run: () => {
        console.warn('Paste is disabled for anti-cheat purposes');
      },
    });

    // Track typing for anti-cheat
    editor.onKeyDown((e) => {
      setKeystrokes((prev) => prev + 1);
      
      // Log typing speed for anti-cheat analysis
      const elapsedSeconds = (Date.now() - typingStartTime) / 1000;
      const wpm = (keystrokes / 5) / (elapsedSeconds / 60);
      
      // Detect suspiciously fast typing (potential paste workaround)
      if (wpm > 200) {
        console.warn('Suspicious typing speed detected:', wpm, 'WPM');
      }
    });

    // Focus the editor
    editor.focus();
  };

  // CRITICAL: Prevent paste via right-click context menu and browser paste
  useEffect(() => {
    const preventPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.warn('Paste is disabled for anti-cheat purposes');
      return false;
    };

    const preventContextMenu = (e: MouseEvent) => {
      // Only prevent context menu inside the editor
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        return false;
      }
    };

    const preventDragDrop = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add event listeners to document for paste prevention
    document.addEventListener('paste', preventPaste, true);
    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('drop', preventDragDrop, true);
    document.addEventListener('dragover', preventDragDrop, true);

    return () => {
      document.removeEventListener('paste', preventPaste, true);
      document.removeEventListener('contextmenu', preventContextMenu, true);
      document.removeEventListener('drop', preventDragDrop, true);
      document.removeEventListener('dragover', preventDragDrop, true);
    };
  }, []);

  return (
    <div className="h-full w-full relative">
      {/* Anti-cheat overlay message */}
      <div className="absolute top-2 right-2 z-10 bg-red-500/20 border border-red-500 rounded px-3 py-1 text-xs text-red-400">
        ⚠ Paste Disabled (Anti-Cheat)
      </div>
      
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          snippetSuggestions: 'inline',
          formatOnPaste: false, // Disable format on paste (paste is disabled anyway)
          formatOnType: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          contextmenu: false, // CRITICAL: Disable right-click context menu
          selectionClipboard: false, // CRITICAL: Disable selection clipboard
        }}
      />
    </div>
  );
}
