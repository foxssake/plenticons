class IconCard extends HTMLElement {
  static observedAttributes = ['root', 'category', 'name', 'variant'];

  root = 'icons/'
  category = ''
  name = ''
  variant = ''

  render() {
    this.innerHTML = `
      <div class="icon-card">
        <img src="${this.root}/${this.category}/${this.name}-${this.variant}.svg" />
      </div>
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

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('icon-card', IconCard)
customElements.define('variant-button', VariantButton, { extends: 'button' })

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

  console.log('Icons:', icons)
  console.log('Categories:', Object.keys(icons))

  // Render variant buttons
  document.querySelectorAll('.variant-container')
    .forEach(container => VariantButton.variants
      .map(variant => Object.assign(new VariantButton(), { variant }))
      .forEach(variantButton => container.appendChild(variantButton))
    )

  // Render icon cards
  const iconCardContainer = document.querySelector('.icon-card-container')

  const variant = VariantButton.variants[0]
  for (const [categoryName, categoryIcons] of Object.entries(icons)) {
    const categoryHeader = document.createElement('h2')
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
