class Icon extends HTMLElement {
  static observedAttributes = ['root', 'category', 'name', 'variant'];

  root = this.getAttribute('root') || 'icons/'
  category = this.getAttribute('category')
  name = this.getAttribute('name')
  variant = this.getAttribute('variant') || 'gray'

  render() {
    this.innerHTML = `
        <img src="${this.root}/${this.category}/${this.name}-${this.variant}.svg" />
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
          <img src="" />
        </div>
      `;
    }

    this.querySelector('img').src = `${this.root}/${this.category}/${this.name}-${this.variant}.svg`
  }

  connectedCallback() {
    this.render();
    document.addEventListener('variant', e => {
      this.variant = e.detail
      this.render()
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

class VariantButton extends HTMLButtonElement {
  static observedAttributes = ['variant']
  static variants = ['gray', 'red', 'blue', 'green', 'yellow']

  variant = 'gray'

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

  attributeChangedCallback() {
    this.render();
  }
}

class VariantPicker extends HTMLElement {
  render() {
    for (const variant of VariantButton.variants) {
      const variantButton = new VariantButton()
      variantButton.variant = variant
      this.appendChild(variantButton)
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('icon-inline', Icon)
customElements.define('icon-card', IconCard)
customElements.define('variant-button', VariantButton, { extends: 'button' })
customElements.define('variant-picker', VariantPicker)

function capitalize(text) {
  return text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function main() {
  // Get icon list
  const iconListResponse = await fetch('icons.list')
  const iconList = (await iconListResponse.text()).split('\n')

  const pathPattern = /icons\/([^/]+)\/(.+)\-(.+)\.svg/
  const icons = {}
  const iconsFlat = iconList
    .map(path => pathPattern.exec(path))
    .filter(match => !!match)
    .map(match => ({ path: match[0], category: match[1], name: match[2], variant: match[3] }))

  iconsFlat.forEach(({ path, category, name, variant }) => {
      icons[category] = icons[category] ?? {}
      icons[category][name] = icons[category][name] ?? {}
      icons[category][name][variant] = path;
    })

  // Preload all images
  iconsFlat
    .forEach(({ path }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = path
      document.head.appendChild(link)
    })

  // Render icon cards
  const iconCardContainer = document.querySelector('.icon-card-container')

  const variant = VariantButton.variants[0]
  for (const [categoryName, categoryIcons] of Object.entries(icons)) {
    const categoryHeader = document.createElement('h3')
    categoryHeader.innerText = capitalize(categoryName);
    iconCardContainer.appendChild(categoryHeader);
    
    console.log(categoryName, Object.keys(categoryIcons))
    for (const iconName of Object.keys(categoryIcons)) {
      const iconCard = new IconCard()
      iconCard.category = categoryName
      iconCard.name = iconName
      iconCard.variant = variant

      iconCardContainer.appendChild(iconCard)
    }
  }
}

main();
