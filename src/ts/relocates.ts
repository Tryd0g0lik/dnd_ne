class ReLocates {
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
    if (e.type === 'mouseover') this.startReLocation(e);
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

  startReLocation(e: MouseEvent) { this.onMouseOver(e); }
}

export class ParentHtmlBox extends ReLocates {
  private parentBox: HTMLElement | undefined = undefined;
  // cursorOverBox: HTMLElement;
  // parentBox: HTMLElement;
  constructor(
    elemClick: HTMLElement
  ) {
    super(elemClick)
    // this.parentBox = undefined;

  };

  /**
   * 
   * @param e Событие, когда курсор над родительским блоком елемента < article > или < main >
   */
  set searchParentBoxs(elem: HTMLElement) { this.parentBox = elem };
  get foundParentBoxs(): HTMLElement { return this.parentBox as HTMLElement };

  /**
   *Определяем координаты родительского елемента.
   *  */
  get getLocationParentBoxs() {
    const locationParentBox = this.foundParentBoxs as HTMLElement;
    console.log('[locationParentBox Type]: ', typeof locationParentBox, locationParentBox)
    const boxLocation = locationParentBox.getBoundingClientRect();

    console.log('[parentBox]: ', locationParentBox,
      '[parentBox.class]: ', locationParentBox.id || locationParentBox.classList,
      '[parantBox.LOcations]:', boxLocation
    )
    return locationParentBox
  }



}
