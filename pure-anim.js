// Pure Animation Errors
class PureAnimError extends Error {}
class PureAnimSyntaxError extends PureAnimError {
  constructor(message, errorTag, errorClasses) {
    super(message);
    this.name = 'PureAnim SyntaxError';
    this.errorTag = errorTag;
    this.errorClasses = errorClasses;
  }
}
// Pure Animation
class PureAnim {
  constructor() {
    this.defaultAnimationClasses = ['fade-in', 'from-left', 'from-top', 'from-right', 'from-bottom'];
    this.observeOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.15
    };
    this.initialize();
  }

  initialize() {
    let targetClasses = [...this.defaultAnimationClasses];
    targetClasses = targetClasses.map(item => `.${item}`);
    this.elems = document.querySelectorAll(targetClasses.join(','));

    this.elems.forEach((item, i) => {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          let target = entry.target;

          if(entry.isIntersecting && entry.intersectionRatio >= 0) {
            this.animHandler(target);
            observer.unobserve(target);
          }
        });
      }, this.observeOptions);

      observer.observe(item);
    });
  }

  animHandler(elem) {
    try {
      let classes = elem.className;
      classes = classes.split(' ').filter(item => this.defaultAnimationClasses.includes(item));

      if(classes.length > 1) {
        throw new PureAnimSyntaxError('You\'r HTML-element must have 1 attribute only! You\'r wrote: ', elem.tagName,classes.join(', '));
      } else {
        classes.forEach(classItem => {
          elem.classList.add(`${classItem}_active`);
        });
      }
    } catch(err) {
      console.error(`${err.name}: ${err.message}${err.errorClasses} in "${err.errorTag}" element!`);
    }
  }
}

new PureAnim();
