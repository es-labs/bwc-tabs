/**
 * @todo Dispatch event on selected tab changed
 * @todo Implement icon
 * @todo Implement tab panel
 */
const template = document.createElement('template');
const style = `
<style>
  :host {
    --border-bottom-color: #dbdbdb;
    --border-bottom-style: solid;
    --border-bottom-width: 1px;
    
    --boxed-tab-border: 1px solid transparent;
    --boxed-tab-radius: 4px 4px 0 0;
    --boxed-tab-hover-background-color: whitesmoke;
    --boxed-tab-hover-border-bottom-color: #dbdbdb;
    --boxed-tab-active-background-color: #fff;
    --boxed-tab-active-border-color: #dbdbdb;
    --boxed-tab-active-border-bottom-color: transparent;
    
    --toggle-tab-border-color: #dbdbdb;
    --toggle-tab-border-style: solid;
    --toggle-tab-border-width: 1px;
    --toggle-tab-hover-background-color: whitesmoke;
    --toggle-tab-hover-border-color: #b5b5b5;
    --toggle-tab-radius: 4px;
    --toggle-tab-active-background-color: #3273dc;
    --toggle-tab-active-border-color: #3273dc;
    --toggle-tab-active-color: #fff;
  }
  
  :host {
    display: block;
    position: relative;
  }

  :host(.is-small) ::slotted(bwc-tab) {
    font-size: 0.75rem;
  }

  :host(.is-medium) ::slotted(bwc-tab) {
    font-size: 1.25rem;
  }

  :host(.is-large) ::slotted(bwc-tab) {
    font-size: 1.5rem;
  }

  :host(.is-left) .tab-list {
    padding-right: 0.75em;
  }

  :host(.is-boxed) ::slotted(bwc-tab) {
    border: var(--boxed-tab-border);
    border-radius: var(--boxed-tab-radius);
  }

  :host(.is-boxed) ::slotted(bwc-tab:hover) {
    background-color: var(--boxed-tab-hover-background-color);
    border-bottom-color: var(--boxed-tab-hover-border-bottom-color);
  }

  :host(.is-boxed) ::slotted(bwc-tab.is-active) {
    background-color: var(--boxed-tab-active-background-color);
    border-color: var(--boxed-tab-active-border-color);
    border-bottom-color: var(--boxed-tab-active-border-bottom-color) !important;
  }

  :host(.is-centered) .tab-list {
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
  }

  :host(.is-right) .tab-list {
    justify-content: flex-end;
    padding-left: 0.75em;
  }

  :host(.is-fullwidth) ::slotted(bwc-tab) {
    flex-grow: 1;
    flex-shrink: 0;
  }

  :host(.is-toggle) ::slotted(bwc-tab) {
    border-color: var(--toggle-tab-border-color);
    border-style: var(--toggle-tab-border-style);
    border-width: var(--toggle-tab-border-width);
    margin-bottom: 0;
    position: relative;
  }

  :host(.is-toggle) ::slotted(bwc-tab:hover) {
    background-color: var(--toggle-tab-hover-background-color);
    border-color: var(--toggle-tab-hover-border-color);
    z-index: 2;
  }

  :host(.is-toggle) ::slotted(bwc-tab) + ::slotted(bwc-tab) {
    margin-left: -1px;
  }

  :host(.is-toggle) ::slotted(bwc-tab:first-child) {
    border-top-left-radius: var(--toggle-tab-radius);
    border-bottom-left-radius: var(--toggle-tab-radius);
  }

  :host(.is-toggle) ::slotted(bwc-tab:last-child) {
    border-top-right-radius: var(--toggle-tab-radius);
    border-bottom-right-radius: var(--toggle-tab-radius);
  }

  :host(.is-toggle) ::slotted(bwc-tab.is-active) {
    background-color: var(--toggle-tab-active-background-color);
    border-color: var(--toggle-tab-active-border-color);
    color: var(--toggle-tab-active-color);
    z-index: 1;
  }

  :host(.is-toggle.is-toggle-rounded) ::slotted(bwc-tab:first-child) {
    border-bottom-left-radius: 290486px;
    border-top-left-radius: 290486px;
    padding-left: 1.25em;
  }

  :host(.is-toggle.is-toggle-rounded) ::slotted(bwc-tab:last-child) {
    border-bottom-right-radius: 290486px;
    border-top-right-radius: 290486px;
    padding-right: 1.25em;
  }

  :host(.is-toggle) .tab-list {
    border-bottom: none;
  }

  .tabs {
    -webkit-overflow-scrolling: touch;
    align-items: stretch;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }

  .tab-list {
    align-items: center;
    border-bottom-color: var(--border-bottom-color);
    border-bottom-style: var(--border-bottom-style);
    border-bottom-width: var(--border-bottom-width);
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-start;
  }
</style>`;

template.innerHTML = `
  <div class="tabs">
    <div class="tab-list">
      <slot />
    </div>
  </div>
  ${style}
`;

class Tabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  
    this._tabsSlot = this.shadowRoot.querySelector('.tab-list slot');
  
    this._onTabSlotClick = this._onTabSlotClick.bind(this);
  }
  
  connectedCallback() {
    this._setListeners(true);
  }
  
  disconnectedCallback() {
    this._setListeners(false);
  }
  
  /**
   * Array of tabs
   * @readonly
   * @returns {Array}
   **/
  get tabs() {
    return [...this._tabsSlot.assignedElements()];
  }
  
  _setListeners(enable) {
    const fnName = enable ? 'addEventListener' : 'removeEventListener';
    this._tabsSlot[fnName]('click', this._onTabSlotClick);
  }
  
  _onTabSlotClick(e) {
    const tab = e.target.closest('bwc-tab');
    this.selectTab(this.tabs.indexOf(tab));
  }
  
  /**
   * Selects a tab
   * @param {Number} index the tab's position
   **/
  selectTab(index) {
    this.tabs.forEach((tab, i) => {
      const fnName = index === i ? 'add' : 'remove';
      tab.classList[fnName]('is-active');
    });
  }
}

customElements.define('bwc-tabs', Tabs);
  