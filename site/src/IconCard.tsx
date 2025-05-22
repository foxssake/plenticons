import { capitalize, getIconPath, type Category, type Variant } from "./plenticons";

export function IconCard(props: { category: Category, name: string, variant: Variant, onClick?: () => void }) {
  return <div className="icon-card" onClick={props.onClick}>
    <img
      src={getIconPath(props.category, props.name, props.variant)}
      alt={capitalize(`${props.variant} ${props.name}`)}
      title={capitalize(`${props.variant} ${props.name}`)}
    />
	</div>;
}
