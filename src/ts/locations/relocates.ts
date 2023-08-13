export class ReLocates {
  elem: HTMLElement;
  clientX: any;
  clientY: any;
  boxTop: any;
  boxLeft: any;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.clientX = undefined;
    this.clientY = undefined;
    this.boxTop = undefined;
    this.boxLeft = undefined;
  }

  manageCss(e: MouseEvent) {
    if (e.type === 'mousedown') {
      this.startLocation = e;
      this.elem.classList.add('draggend')
    };
    if (e.type === 'mouseover') this.startReLocation(e);
    if (e.type === 'mouseup') {
      this.elem.classList.remove('draggend');
      this.elem.removeAttribute('style');
    }
  }

  private receiveBoxCoordinately() { return this.elem.getBoundingClientRect(); }

  private onMouseOver(e: MouseEvent) {
    console.log(e);
    this.elem.style.top = e.clientY - (this.clientY - this.boxTop) + 'px';
    this.elem.style.left = e.clientX - (this.clientX - this.boxLeft) + 'px';
  }

  set startLocation(e: MouseEvent) {
    /**
     * Coordibates basis to the Box/container which has a 'task' class on started
     */
    const box = this.receiveBoxCoordinately();
    this.boxLeft = box.left;
    this.boxTop = box.top;


    /**
     * Coordinates to the cursor to the click's point
     */
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  }

  startReLocation(e: MouseEvent) { this.onMouseOver(e); }
}
