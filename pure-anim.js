// Pure Animation Errors
class PureAnimError extends Error {}
class PureAnimSyntaxError extends PureAnimError {
  constructor(message) {
    super(message);
    this.name = '[PureAnim](SyntaxError)';
  }
}
class PureAnimPropertyError extends PureAnimError {
  constructor(message) {
    super(message);
    this.name = '[PureAnim](PropertyError)';
  }
}
// Pure Animation
class PureAnim {
  constructor() {
    this.elems;
    this.registeredClasses;
    this.defaultAnimationClasses = ['fade-in', 'from-left', 'from-top', 'from-right', 'from-bottom'];
    this.position = { top: 'translateY(-10%)', right: 'translateX(10%)', bottom: 'translateY(10%)', left: 'translateX(-10%)', default: 'translate(0%)' };
    
    this.initialize();
  }

  initialize() {
    try {
      const outerBody = document.body.outerHTML;
      const regexp = new RegExp(`(${this.defaultAnimationClasses.join('|')})(_\\d+(ms|s))?`, 'g');
      // Set custom styles
      this.registeredClasses = outerBody.match(regexp).map(item => `.${item}`);
      this.setStyles(this.registeredClasses);
      // Set observer for elements with PureAnim classNames
      this.elems = document.querySelectorAll(this.registeredClasses.join(','))

      this.elems.forEach(item => {
        // Filtered element for only 1 lib className in element
        let itemPureClass = item.className.split(' ').filter(className => this.registeredClasses.includes(`.${className}`));

        if(itemPureClass.length > 1)
          throw new PureAnimSyntaxError(`You\'r HTML-element must have 1 attribute only! You\'r wrote: "${itemPureClass.join(', ')}" in ${item.tagName}`);

        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            let target = entry.target;

            if(entry.isIntersecting && entry.intersectionRatio >= 0) {
              target.classList.add(`${itemPureClass[0]}_visible`);
              observer.unobserve(target);
            }
          });
        }, { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0.15 });

        observer.observe(item);
      });
    } catch(err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  setStyles() {
    let styleElement = document.createElement('style');
    this.registeredClasses.forEach(registeredClassName => styleElement.innerHTML += this.constructStyle(registeredClassName));
    styleElement.innerHTML = this.optimizeStyles(styleElement.innerHTML);

    document.body.insertAdjacentElement('beforeend', styleElement);
  }
  
  optimizeStyles(initStyles) {
    let stylesInObject = {};
    let outputData = '';

    initStyles.match(/\.\w+(\-\w+)? {.+}/g).forEach(item => {
      const className = item.match(/\.\w+(\-\w+)?/);
      const classStyles = item.match(/{.+}/);
      stylesInObject[className[0]] = classStyles[0];
    })
    
    stylesInObject = this.sortStyles(stylesInObject);
    Object.keys(stylesInObject).forEach(item => outputData += `${item} ${stylesInObject[item]}\n`);

    return outputData;
  }

  sortStyles(stylesObj) {
    let tmpObj = {};

    Object.entries(stylesObj).forEach((prevItem, i) => {
      let sameClasses = [];

      Object.entries(stylesObj).forEach(nextItem => {
        if(prevItem[1] == nextItem[1]) {
          sameClasses.push(nextItem[0]);
        }
      });
      
      let key = sameClasses.join(', ');

      if(!tmpObj[key]) tmpObj[key] = prevItem[1];
    });

    return tmpObj;
  }
  
  constructStyle(className) {
    try {
      let [name, duration] = className.split('_');
      let classPosition = name.split('-')[1];

      if(parseInt(duration) <= 0)
        throw new PureAnimPropertyError('Invalid property. Property must be more than 0!');

      if(name === '.fade-in')
        return `${className} { opacity: 0; } ${className}_visible { opacity: 1; transition: all ${duration || '250ms'} ease-in-out; }`;
      else
        return `${className} { transform: ${this.position[classPosition]}; opacity: 0; }
                ${className}_visible { opacity: 1; transition: all ${duration || '250ms'} ease-in-out; transform: ${this.position.default};}`;
    } catch(err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new PureAnim());