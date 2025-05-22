import { IconCard } from "./IconCard";
import { manifest, unslug, type Category, type Variant } from "./plenticons";

export function IconCardContainer(props: {variant: Variant, onIcon?: (category: Category, name: string) => void}) {
  return (
      <div className="icon-card-container">
        {Object.entries(manifest.icons).map(([category, icons]) => (
          <div key={category}>
            <h3>{unslug(category)}</h3>
            {icons.map(icon =>
              <IconCard
                key={`${category}/${icon}`}
                category={category} name={icon} variant={props.variant}
                onClick={ () => props.onIcon && props.onIcon(category, icon)}
              />
            )}
          </div>
        )) }
      </div>
  )
}
