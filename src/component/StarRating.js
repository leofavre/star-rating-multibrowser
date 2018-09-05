import { starRatingTemplate } from './starRatingTemplate.js';
import { getElementIndex } from './helpers.js';

export class StarRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleClick = this.handleClick.bind(this);
  }

  get rate() {
    return Number(this.getAttribute('rate'));
  }

  set rate(value) {
    this.setAttribute('rate', value);
  }

  static get observedAttributes() {
    return ['rate'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'rate' && oldValue !== newValue) {
      this.updateStars(Number(newValue));
    }
  }

  connectedCallback() {
    const content = starRatingTemplate.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    this.shadowRoot.addEventListener('click', this.handleClick);
    this.buttons = this.shadowRoot.querySelectorAll('button');
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
  }

  handleClick(evt) {
    const clickedRate = getElementIndex(evt.target) + 1;
    this.setAttribute('rate', clickedRate);
  }

  updateStars(rate) {
    setTimeout(() => {
      Array
        .from(this.buttons)
        .forEach((button, index) => {
          button.className = (index < rate) ? 'selected' : '';
        });
    });
  }
}
