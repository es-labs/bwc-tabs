const template = document.createElement('template');
const style = `
<style>
  :host {
    --color: #4a4a4a;
    --border-bottom-color: #dbdbdb;
    --border-bottom-style: solid;
    --border-bottom-width: 1px;
    --padding: 0.5em 1em;

    --hover-border-bottom-color: #363636;
    --hover-color: #363636;

    --active-border-bottom-color: #3273dc;
    --active-color: #3273dc;
  }

  :host {
    align-items: center;
    border-bottom-color: var(--border-bottom-color);
    border-bottom-style: var(--border-bottom-style);
    border-bottom-width: var(--border-bottom-width);
    color: var(--color);
    display: flex;
    justify-content: center;
    margin-bottom: -1px;
    padding: var(--padding);
    vertical-align: top;
    cursor: pointer;
  }

  :host(:hover) {
    border-bottom-color: var(--hover-border-bottom-color);
    color: var(--hover-color);
  }

  :host(.is-active) {
    border-bottom-color: var(--active-border-bottom-color);
    color: var(--active-color);
  }
</style>`;

template.innerHTML = `
  <slot/>
  ${style}
`;

class Tab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('bwc-tab', Tab);
