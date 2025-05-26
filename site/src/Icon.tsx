import { getIconPath, type Category, type Variant } from "./plenticons"

export interface IconProps {
  category: Category;
  name: string;
  variant: Variant;
}

export function Icon(props: IconProps) {
  return <img src={getIconPath(props.category, props.name, props.variant)} className="icon-inline" />
}
