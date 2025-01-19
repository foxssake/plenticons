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
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('icon-card', IconCard)

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

  // Render icon cards
  const iconCardContainer = document.querySelector('.icon-card-container')

  const variant = 'red'
  for (const [categoryName, categoryIcons] of Object.entries(icons)) {
    const categoryHeader = document.createElement('h2')
    categoryHeader.innerText = capitalize(categoryName);
    iconCardContainer.appendChild(categoryHeader);
    
    console.log(categoryName, Object.keys(categoryIcons))
    for (const iconName of Object.keys(categoryIcons)) {
      const iconCard = new IconCard()
      iconCard.category = categoryName
      iconCard.name = iconName
      iconCard.variant = 'red'

      iconCardContainer.appendChild(iconCard)
    }
  }
}

main();
