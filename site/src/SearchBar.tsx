export interface SearchBarProps {
  onChange?: (value: string) => void
}

export function SearchBar(props: SearchBarProps) {
  return <div className="searchbar">
    <img src="./icons/objects/magnifying-glass-gray.svg" alt="search"></img>
    <input 
      type="text" 
      placeholder="Search icons"
      onChange={e => props.onChange?.call(undefined, e.target.value)}
    />
  </div>;
}
