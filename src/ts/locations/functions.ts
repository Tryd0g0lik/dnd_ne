/** HANDLEs for events  start*/
let actualColumn: HTMLElement;
let actualCells: HTMLElement;

let boxLeft: number;
let boxTop: number;
let clientX: number;
let clientY: number;

const onMouseOver = (e: MouseEvent) => {
  /**
   *there is the active box locationing dinding inder course(mouse)
   */
  actualCells.style.top = e.clientY - (clientY - boxTop) + 'px'; // 28 это кнопка "удалить ячейку"
  actualCells.style.left = e.clientX - (clientX - boxLeft) + 'px';
  (e.target as HTMLElement).removeEventListener('mouseenter', heightForNewLocation);
  document.body.addEventListener('mouseleave', handleRemoveAttributePaddingTop, true)
}


const onMouseUp = (e: MouseEvent) => {
  const eventTarget = e.target as HTMLElement;
  if ((e.target && eventTarget.classList.contains('task')) && (e.currentTarget
    || (e.currentTarget !== null && (e.currentTarget as HTMLElement).classList.contains('task')))) {
    /**
     * THe DnD action to the new position/
     */
    actualColumn = eventTarget.parentElement as HTMLElement;
    actualColumn.insertBefore(actualCells, eventTarget);
  }

  actualCells.classList.remove('draggend');
  actualCells.removeAttribute('style');

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);

  (boxLeft as any) = undefined;
  (boxTop as any) = undefined;
  (clientX as any) = undefined;
  (clientY as any) = undefined;
  actualCells = undefined as any;
  // The finished to the DnD actions
}


async function heightForNewLocation(e: MouseEvent) {
  /**
   * This's Handle for a event
   */
  const response = (e.target as HTMLElement);

  if (actualCells !== undefined
    && response.classList.contains('task')
    && response.classList.contains('draggend') === false) {
    let box = response.getBoundingClientRect();

    if (e.clientY >= box.top && e.clientY <= box.bottom
      && e.clientX >= box.left && e.clientX <= box.right) {
      const r = e.target as HTMLElement;
      r.style.paddingTop = String(actualCells.offsetHeight) + 'px';
    };
  }

}


async function handleRemoveAttributePaddingTop() {
  /**
   * This's Handle for a event
   */
  Array.from(document.getElementsByClassName('task')).forEach((elem) => {
    if (elem.hasAttribute('style')) elem.removeAttribute('style');
    elem.removeEventListener('mouseleave', handleRemoveAttributePaddingTop);
  });
}


function mouseEvents(elem: HTMLElement, e: MouseEvent) {
  /**
 * Start DnD action
 */

  /**
   * geting the box's location wich has a proporty ':hover'
   */
  boxLeft = (elem.getBoundingClientRect()).left; // It's Left point of the coordinate to the HTMLElement, before 'draggend' class get
  boxTop = (elem.getBoundingClientRect()).top;
  clientX = e.clientX;
  clientY = e.clientY

  elem.classList.add('draggend');
  actualCells = elem;

  document.body.addEventListener('mouseenter', heightForNewLocation, true);
  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
}


export function hadlerMmouseEvent(e: MouseEvent) {
  /**
* This's headler for a 'mousedown' MouseEvent
*/

  if ((e.target as HTMLElement).classList.contains('task')) {
    const cell = e.target as HTMLElement;
    e.preventDefault();
    mouseEvents(cell, e);
  }
  document.documentElement.removeEventListener('mousedown', hadlerMmouseEvent);
}
/** HANDLEs for events - end*/

