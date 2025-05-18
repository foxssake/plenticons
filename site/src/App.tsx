import { useState } from "react"
import { IconCardContainer } from "./IconCardContainer"
import { DefaultVariant, type Category } from "./plenticons"
import { Toolbar } from "./Toolbar"
import { IconModal } from "./IconModal"

function Header() {
  return (
  <>
    <h1><img src="icons/foxs-sake/plenticons-yellow.svg" />lenticons</h1>

    <p>A pack of icons to use with custom nodes in the <a href="https://godotengine.org/">Godot</a> editor. Or wherever else!</p>
    
    <h2 id="features">Features</h2>
    <ul>
      <li><img src="./icons/2d/plus-yellow.svg" alt="plus"></img> 50+ icons of various categories</li>
      <li><img src="./icons/objects/chest-yellow.svg" alt="chest"></img> Each icon comes in multiple variants</li>
      <li><img src="./icons/creatures/heart-full-yellow.svg" alt="heart"></img> Licensed as CC0 - take it and use it</li>
      <li><img src="./icons/objects/globe-yellow.svg" alt="globe"></img> <a href="https://foxssake.github.io/plenticons/">Dedicated site</a> for browsing</li>
      <li><img src="./icons/2d/checkmark-yellow.svg" alt="check"></img> Available for HiDPI displays too</li>
      <li><img src="./icons/objects/lightning-yellow.svg" alt="lightning"></img> Optimized for size</li>
    </ul>
  </>
  )
}

type ModalState = {
  name: string;
  category: Category;
};

function App() {
  const [variant, setVariant] = useState(DefaultVariant);
  const [modal, setModal] = useState<ModalState | undefined>(undefined);

  return (
    <>
      <Header/>
      <Toolbar onVariant={setVariant}/>
      <IconCardContainer variant={variant} onIcon={(category: Category, name: string) => setModal({ category, name })} />
      { modal && <IconModal category={modal.category} name={modal.name} variant={variant} onClose={() => setModal(undefined)}/>}
    </>
  )
}

export default App
