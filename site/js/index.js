const VARIANTS = ['gray', 'red', 'blue', 'green', 'yellow', 'white', 'black']
const MANIFEST = {}

class Icon extends HTMLElement {
  static observedAttributes = ['root', 'category', 'name', 'variant'];

  root = this.getAttribute('root') || 'icons/'
  category = this.getAttribute('category')
  name = this.getAttribute('name')
  variant = this.getAttribute('variant') || 'gray'

  render() {
    this.innerHTML = `
        <img src="${this.root}/${this.category}/${this.name}-${this.variant}.svg" class="icon-inline" />
    `;
  }

  connectedCallback() {
    this.render();
    document.addEventListener('variant', e => {
      this.variant = e.detail
      this.render()
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue
    this.render();
  }
}

class IconCard extends HTMLElement {
  static observedAttributes = ['root', 'category', 'name', 'variant'];

  root = 'icons/'
  category = ''
  name = ''
  variant = ''

  render() {
    if (this.childElementCount == 0) {
      this.innerHTML = `
        <div class="icon-card">
          <img/>
        </div>
      `;
    }

    const img = this.querySelector('img')
    img.src = `${this.root}${this.category}/${this.name}-${this.variant}.svg`
    img.alt = `${this.name} ${this.variant}`
    img.title = `${this.name} ${this.variant}`
  }

  connectedCallback() {
    this.render();

    document.addEventListener('variant', e => {
      this.variant = e.detail
      this.render()
    })

    this.addEventListener('click', () => {
      const iconModal = document.querySelector('icon-modal')
      iconModal.setAttribute('category', this.category)
      iconModal.setAttribute('name', this.name)
      iconModal.setAttribute('variant', this.variant)

      iconModal.parentElement.style.visibility = 'visible'
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue
    this.render();
  }
}

class VariantButton extends HTMLButtonElement {
  static observedAttributes = ['variant']

  variant = VARIANTS[0]

  render() {
    this.innerHTML = `
      <div class="variant-circle variant-color-${this.variant}"></div>
      ${capitalize(this.variant)}
    `
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', () =>
      document.dispatchEvent(new CustomEvent('variant', { detail: this.variant }))
    )
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue
    this.render();
  }
}

class VariantPicker extends HTMLElement {
  render() {
    for (const variant of VARIANTS) {
      const variantButton = new VariantButton()
      variantButton.variant = variant
      this.appendChild(variantButton)
    }
  }

  connectedCallback() {
    this.render();
  }
}

class IconModal extends HTMLDivElement {
  static observedAttributes = ['root', 'category', 'name', 'variant'];

  root = 'icons/'
  category = '2d'
  name = 'circle'
  variant = VARIANTS[0]

  render() {
    if (!this.childElementCount) {
      this.innerHTML = `
        <div class="icon-modal">
          <!-- <div class="modal-close">✕</div> -->

          <div class="icon-preview">
            <img/>
          </div>

          <div class="icon-form">
            <h3><icon-inline category="2d" name="circle"></icon-inline><span></span></h3>

            <variant-picker></variant-picker>

            <div class="icon-snippet">
              <input type="text" value="@icon()" readonly />
            </div>

            <div>
              Download: 
              <a class="svg-download"><button>svg</button></a>
              <a class="bundle-download"><button>bundle</button></a>
            </div>

            <div>
              Engage:
              <a href="https://discord.gg/xWGh4GskG5" target="_blank">
                <button><img src="assets/discord-mark-white.svg" />Discord</button>
              </a>
              <a href="https://ko-fi.com/foxssake" target="_blank">
                <button><img src="assets/kofi_symbol.svg" />Ko-Fi</button>
              </a>
            </div>
          </div>
        </div>
      `

      // this.querySelector('.modal-close').addEventListener('click', () => 
      //   document.querySelectorAll('.modal').forEach(e => e.style.visibility = 'hidden')
      // )

      this.querySelectorAll('.icon-snippet>input').forEach(input =>
        input.addEventListener('click', () => {
          // Copy to clipboard
          navigator.clipboard.writeText(input.value)

          // Display icon notif
          input.parentElement.classList.add('copied')
          input.value = 'Copied!'

          setTimeout(() => {
            input.parentElement.classList.remove('copied')
            input.value = `@icon("res://addons/plenticons/icons/16x/${this.category}/${this.name}-${this.variant}.png")`
          }, 750)
        })
      )
    }

    const img = this.querySelector('.icon-preview > img')
    img.src = `${this.root}${this.category}/${this.name}-${this.variant}.svg`
    img.alt = `${this.name} ${this.variant}`
    img.title = `${this.name} ${this.variant}`

    const title = this.querySelector('h3>span')
    title.textContent = unslug(this.name ?? '')

    const inlineIcon = this.querySelector('icon-inline')
    inlineIcon.setAttribute('category', this.category)
    inlineIcon.setAttribute('name', this.name)

    const svgDownload = this.querySelector('.svg-download')
    svgDownload.href = img.src
    svgDownload.download = `${this.name}-${this.variant}.svg`

    if (MANIFEST.bundle) {
      const bundleDownload = this.querySelector('.bundle-download')
      bundleDownload.href = MANIFEST.bundle
      bundleDownload.download = MANIFEST.bundle.split('/').pop()
    }

    const snippet = this.querySelector('.icon-snippet>input')
    snippet.value = `@icon("res://addons/plenticons/icons/16x/${this.category}/${this.name}-${this.variant}.png")`
  }

  connectedCallback() {
    this.render()
    document.addEventListener('variant', e => {
      this.variant = e.detail
      this.render()
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue
    this.render();
  }
}

customElements.define('icon-inline', Icon)
customElements.define('icon-card', IconCard)
customElements.define('variant-button', VariantButton, { extends: 'button' })
customElements.define('variant-picker', VariantPicker)
customElements.define('icon-modal', IconModal, { extends: 'div' })

function capitalize(text) {
  return text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function unslug(text) {
  const knownSlugs = {
    '2d': '2D',
    '3d': '3D',
    'foxs-sake': 'Fox\'s Sake'
  }
  return knownSlugs[text] || capitalize(text.replace(/\-/, ' '))
}

async function main() {
  // Get manifest
  const manifest = await fetch('manifest.json').then(r => r.json())
  Object.assign(MANIFEST, manifest)

  // Render icon cards
  const iconCardContainer = document.querySelector('.icon-card-container')

  for (const [categoryName, categoryIcons] of Object.entries(manifest.icons)) {
    const categoryHeader = document.createElement('h3')
    categoryHeader.innerText = unslug(categoryName);
    iconCardContainer.appendChild(categoryHeader);

    for (const iconName of categoryIcons) {
      const iconCard = new IconCard()

      iconCard.setAttribute('category', categoryName)
      iconCard.setAttribute('name', iconName)
      iconCard.setAttribute('variant', VARIANTS[0])

      iconCardContainer.appendChild(iconCard)
    }
  }

  // Exit modal on click
  document.querySelector('.modal').addEventListener('click', e => {
    if(e.currentTarget == e.target)
      e.currentTarget.style.visibility = 'hidden'
  })
}

main();
