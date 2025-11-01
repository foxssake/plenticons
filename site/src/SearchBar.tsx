export interface SearchBarProps {
  onChange?: (value: string) => void
}

export function SearchBar(props: SearchBarProps) {
  return <>
    <img src="./icons/objects/magnifying-glass-gray.svg" alt="search"></img>
    <input type="text" onChange={e => props.onChange?.call(undefined, e.target.value)}></input>
  </>;
}
