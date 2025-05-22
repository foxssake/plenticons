import { capitalize, Variants, type Variant } from "./plenticons"

export function VariantButton(props: { variant: Variant, onClick: () => void }) {
  return (
    <button onClick={props.onClick}>
      <div className={`variant-circle variant-color-${props.variant}`}></div>
      {capitalize(props.variant)}
    </button>
  )
}

export function VariantPicker(props: { onVariant: (variant: Variant) => void}) {
  return Variants.map(variant => (
    <VariantButton key={variant} variant={variant} onClick={() => props.onVariant(variant)} />
  ))
}
