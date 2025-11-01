import type { ReactNode } from "react";
import { icons, type Variant } from "./plenticons";
import { VariantPicker } from "./VariantPicker";

export interface ToolbarProps {
  onVariant: (variant: Variant) => void,
  children: ReactNode[] | ReactNode
}

export function Toolbar(props: ToolbarProps) {
  return (
    <div className="toolbar">
      {props.children}

      <VariantPicker onVariant={props.onVariant}/>
      <a href="https://discord.gg/xWGh4GskG5" target="_blank">
        <button><img src={icons.discord} />Discord</button>
      </a>
      <a href="https://ko-fi.com/foxssake" target="_blank">
        <button><img src={icons.kofi} />Ko-Fi</button>
      </a>
      <a href="https://github.com/foxssake/plenticons" target="_blank">
        <button><img src={icons.github} />GitHub</button>
      </a>
      <a href="https://github.com/foxssake/plenticons/blob/main/LICENSE" target="_blank">
        <button><img/>📜 License</button>
      </a>
    </div>
  )
}
