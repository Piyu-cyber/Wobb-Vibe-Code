interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      id="search-influencers"
      name="search"
      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 shadow-sm placeholder:text-slate-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search influencers by name..."
    />
  );
}
