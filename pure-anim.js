// Pure Animation Errors
class PureAnimError extends Error {}
class PureAnimSyntaxError extends PureAnimError {
  constructor(message) {
    super(message);
    this.name = 'PureAnim SyntaxError';
  }
}
class PureAnimPropertyError extends PureAnimError {
  constructor(message) {
    super(message);
    this.name = 'PureAnim PropertyError';
  }
}
// Pure Animation
class PureAnim {
  constructor() {
    this.defaultAnimationClasses = ['fade-in', 'from-left', 'from-top', 'from-right', 'from-bottom'];
    this.position = { top: 'translateY(-10%)', right: 'translateX(10%)', bottom: 'translateY(10%)', left: 'translateX(-10%)', default: 'translate(0%)' };
    this.observeOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.15
    };

    this.initialize();
  }

  initialize() {
    try {
      const outerBody = document.body.outerHTML;
      const regexp = new RegExp(`(${this.defaultAnimationClasses.join('|')})(_\\d+(ms|s))?`, 'g');
      this.registeredClasses = outerBody.match(regexp).map(item => `.${item}`);
      this.elems = document.querySelectorAll(this.registeredClasses.join(','))

      this.setStyles(this.registeredClasses);

      this.elems.forEach(item => {
        let itemPureClass = [];
        item.className.split(' ').forEach(className => {
          if(this.registeredClasses.includes(`.${className}`)) {
            itemPureClass.push(className);
          }
        });

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
        }, this.observeOptions);

        observer.observe(item);
      });
    } catch(err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  setStyles() {
    let style = document.createElement('style');
    this.registeredClasses.forEach(registeredClassName => {
      let registeredClassStyles = this.constructStyle(registeredClassName);
      style.innerHTML += registeredClassStyles;
    });
    document.body.insertAdjacentElement('beforeend', style);
  }

  constructStyle(className) {
    try {
      let [name, duration] = className.split('_');

      if(parseInt(duration) <= 0)
        throw new PureAnimPropertyError('Invalid property. Property must be more than 0!');

      name = name.slice(1, name.length);

      if(name === 'fade-in')
        return `
        ${className} { opacity: 0; }
        ${className}_visible { opacity: 1; transition: all ${duration} ease-in-out; }
        `;
      
      let classPosition = name.split('-')[1];
      return `
        ${className} { transform: ${this.position[classPosition]}; opacity: 0; }
        ${className}_visible { opacity: 1; transition: all ${duration} ease-in-out; transform: ${this.position.default};}
      `;
    } catch(err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }
}
let pureAnim;
document.addEventListener('DOMContentLoaded', () => {
  pureAnim = new PureAnim();
});