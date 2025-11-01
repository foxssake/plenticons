import { IconCard } from "./IconCard";
import { manifest, unslug, type Category, type Variant } from "./plenticons";

export interface IconCardContainerProps {
  variant: Variant,
  search?: string,
  onIcon?: (category: Category, name: string) => void,
}

export function IconCardContainer(props: IconCardContainerProps) {
  return (
      <div className="icon-card-container">
        {Object.entries(manifest.icons).map(([category, icons]) => (
          <div key={category}>
            <h3>{unslug(category)}</h3>
            {icons
              .filter(icon => !props.search || searchString(category, icon).includes(props.search))
              .map(icon =>
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

function searchString(category: string, name: string): string {
  return `${category} ${name}`.toLowerCase();
}
