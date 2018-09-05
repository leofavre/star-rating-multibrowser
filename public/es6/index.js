const starRatingTemplate = document.createElement('template');

starRatingTemplate.innerHTML = `
  <style>
    :host {
      display: block;    
    }

    star-rating {
      display: block;    
    }
    
    button {
      font-size: 32px;
      border: none;
      background: none;
      padding: 0;
      color: #c1bfbd;
      cursor: pointer;
    }
    
    button:focus {
      outline: none;
    }
    
    .selected {
      color: #f4a810;
    }  
  </style>
  <div>
    ${'<button>★</button>'.repeat(5)}
  </div>
`;

const getElementIndex = domEl => Array
  .from(domEl.parentNode.children)
  .indexOf(domEl);

class StarRating extends HTMLElement {
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

window.customElements.define('star-rating', StarRating);
