// Search bar component
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = 'Cari mahasiswa...', 
  defaultValue = '' 
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  
  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">🔍</span>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
