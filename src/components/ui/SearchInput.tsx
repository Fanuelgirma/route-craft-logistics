
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  className?: string;
}

export default function SearchInput({ placeholder = 'Search...', onSearch, className = '' }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
