export class ReLocates {
  elem: HTMLElement;
  clientX: any;
  clientY: any;
  basisBoxTop: any;
  basisBoxLeft: any;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.clientX = undefined;
    this.clientY = undefined;
    this.basisBoxTop = undefined;
    this.basisBoxLeft = undefined;
  } 

  manageCss(e: MouseEvent) {
    if (e.type === 'mousedown') {
      this.startLocation = e;
      this.elem.classList.add('draggend')
    };
    if (e.type === 'mousemove') this.onMouseOver(e);
    if (e.type === 'mouseup') {
      this.elem.classList.remove('draggend');
      this.elem.removeAttribute('style');
    }
  }

  private receiveBoxCoordinately() { return this.elem.getBoundingClientRect(); } // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

  private onMouseOver(e: MouseEvent) {
    this.elem.style.top = e.clientY - (this.clientY - this.basisBoxTop) + 'px';
    this.elem.style.left = e.clientX - (this.clientX - this.basisBoxLeft) + 'px';
  }

  set startLocation(e: MouseEvent) {
    /**
     * Coordibates basis to the Box/container which has a 'task' class on started
     */
    const box = this.receiveBoxCoordinately();
    this.basisBoxLeft = box.left;
    this.basisBoxTop = box.top;

    /**
     * Coordinates to the cursor to the click's point
     */
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  }

}

