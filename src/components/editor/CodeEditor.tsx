'use client';

import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
}

export function CodeEditor({ language, value, onChange, onLanguageChange }: CodeEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [theme, setTheme] = useState('vs-dark');

  useEffect(() => {
    // Block paste events at document level
    const blockPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Paste blocked by anti-cheat system');
      }
    };

    // Block context menu (right-click)
    const blockContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Block drag and drop
    const blockDrop = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('paste', blockPaste, true);
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('drop', blockDrop, true);

    return () => {
      document.removeEventListener('paste', blockPaste, true);
      document.removeEventListener('contextmenu', blockContextMenu, true);
      document.removeEventListener('drop', blockDrop, true);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Disable paste commands in Monaco
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      console.log('Paste blocked by anti-cheat system');
    });
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => {
      console.log('Paste blocked by anti-cheat system');
    });

    // Disable context menu
    editor.updateOptions({
      contextmenu: false,
    });
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            ⚠️ Paste is disabled (Anti-cheat)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
          >
            Toggle Theme
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme={theme}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            contextmenu: false, // Disable right-click menu
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'always',
          }}
        />
      </div>
    </div>
  );
}
