'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var starRatingTemplate = document.createElement('template');

starRatingTemplate.innerHTML = '\n  <style>\n    :host {\n      display: block;    \n    }\n\n    star-rating {\n      display: block;    \n    }\n    \n    button {\n      font-size: 32px;\n      border: none;\n      background: none;\n      padding: 0;\n      color: #c1bfbd;\n      color: var(--button-color, #c1bfbd);\n      cursor: pointer;\n    }\n    \n    button:focus {\n      outline: none;\n    }\n    \n    .selected {\n      color: #f4a810;\n      color: var(--button-color, #f4a810);\n    }  \n  </style>\n  <div>\n    ' + '<button>★</button>'.repeat(5) + '\n  </div>\n';

var getElementIndex = function getElementIndex(domEl) {
  return Array.from(domEl.parentNode.children).indexOf(domEl);
};

var StarRating = function (_HTMLElement) {
  _inherits(StarRating, _HTMLElement);

  function StarRating() {
    _classCallCheck(this, StarRating);

    var _this = _possibleConstructorReturn(this, (StarRating.__proto__ || Object.getPrototypeOf(StarRating)).call(this));

    _this.attachShadow({ mode: 'open' });
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(StarRating, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'rate' && oldValue !== newValue) {
        this.updateStars(Number(newValue));
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var content = starRatingTemplate.content.cloneNode(true);
      this.shadowRoot.appendChild(content);
      this.shadowRoot.addEventListener('click', this.handleClick);
      this.buttons = this.shadowRoot.querySelectorAll('button');
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.shadowRoot.removeEventListener('click', this.handleClick);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(evt) {
      var clickedRate = getElementIndex(evt.target) + 1;
      this.setAttribute('rate', clickedRate);
    }
  }, {
    key: 'updateStars',
    value: function updateStars(rate) {
      var _this2 = this;

      setTimeout(function () {
        Array.from(_this2.buttons).forEach(function (button, index) {
          button.className = index < rate ? 'selected' : '';
        });
      });
    }
  }, {
    key: 'rate',
    get: function get() {
      return Number(this.getAttribute('rate'));
    },
    set: function set(value) {
      this.setAttribute('rate', value);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['rate'];
    }
  }]);

  return StarRating;
}(HTMLElement);

window.customElements.define('star-rating', StarRating);