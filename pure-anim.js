class AnimPlus {
  constructor(elems) {
    this.elems = elems;
    this.defaultAnimationClasses = ['fade-in', 'from-left', 'from-top', 'from-right', 'from-bottom'];
    this.observeOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.15
    };
    this.initialize();
  }

  initialize() {
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
    let classes = elem.className;
    classes = classes.split(' ').filter(item => this.defaultAnimationClasses.includes(item));
    
    classes.forEach(classItem => {
      elem.classList.add(`${classItem}_active`);
    });
  }
}