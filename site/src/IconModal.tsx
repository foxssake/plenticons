import React, { useState } from "react"
import { Icon, type IconProps } from "./Icon"
import { VariantPicker } from "./VariantPicker"
import { capitalize, getIconPath, getImportPath, icons, manifest } from "./plenticons"

type IconModalProps = IconProps & { onClose?: () => void };

function CopyInput(props: { value: string }) {
  const [isFeedback, setFeedback] = useState(false);
  const extraClasses = isFeedback ? 'copied' : ''

  const clickHandler: React.MouseEventHandler<HTMLInputElement> = (e) => {
    // Copy text
    navigator.clipboard.writeText(props.value);
  
    // Notify user
    if (isFeedback) return;
    setFeedback(true)
    setTimeout(() => setFeedback(false), 1000);

    e.currentTarget.blur();
  }

  return (
    <div className={'icon-snippet ' + extraClasses}>
      <input itemType="text" value={props.value} readOnly={true} onClick={clickHandler} />
    </div>
  );
}

export function IconModal(props: IconModalProps) {
  const [variant, setVariant] = useState(props.variant)

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="icon-modal" onClick={e => e.stopPropagation()}>
        {/* <div className="modal-close" onClick={props.onClose}>✕</div> */}

        <div className="icon-preview">
          <Icon category={props.category} name={props.name} variant={variant} />
        </div>

        <div className="icon-form">
          <h3>
            <Icon category={props.category} name={props.name} variant={variant} />
            <span>{capitalize(props.name)}</span>
          </h3>

          <VariantPicker onVariant={setVariant}/>
          <CopyInput value={`@icon("${getImportPath(props.category, props.name, variant)}")`} />

          <div>
            Download: 
            <a className="svg-download" href={getIconPath(props.category, props.name, variant)}><button>📜 svg</button></a>
            <a className="bundle-download" href={manifest.bundle}><button>📦 bundle</button></a>
          </div>

          <div>
            Engage:
            <a href="https://discord.gg/xWGh4GskG5" target="_blank">
              <button><img src={icons.discord} />Discord</button>
            </a>
            <a href="https://ko-fi.com/foxssake" target="_blank">
              <button><img src={icons.kofi} />Ko-Fi</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
