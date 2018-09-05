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

export { starRatingTemplate };
