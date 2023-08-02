
function cellCreate(): HTMLDivElement {
  /**
   * Created a new html code to the cell
   */
  const divTask = document.createElement('div');
  divTask.classList.add('task');
  const htmlBlovkWClacssDeleteTask: HTMLDivElement = document.createElement('div');
  htmlBlovkWClacssDeleteTask.classList.add('delete-task');
  htmlBlovkWClacssDeleteTask.innerText = 'x';
  divTask.insertAdjacentElement('beforeend', htmlBlovkWClacssDeleteTask);
  const divDescrip = document.createElement('div');
  divDescrip.classList.add('descrip');
  divDescrip.innerHTML = "<span>Добавлять карточки с помощью кнопки 'Add another card'. Вот так это выглядит:</span>"


  const divFooter = document.createElement('div');
  divFooter.classList.add('task_footer');

  const spanFooterVoice = document.createElement('span');
  spanFooterVoice.classList.add('voice');

  const spanFooterMenu = document.createElement('span');
  spanFooterMenu.classList.add('footer_menu');

  const spanFeedback = document.createElement('span');
  spanFeedback.classList.add('feedback');

  divTask.insertAdjacentElement('beforeend', divDescrip)
    ?.insertAdjacentElement('beforeend', divFooter) as HTMLDivElement;

  divFooter.insertAdjacentElement('beforeend', spanFooterVoice)
    ?.insertAdjacentElement('beforeend', spanFooterMenu)
    ?.insertAdjacentElement('beforeend', spanFeedback);
  divTask.insertAdjacentElement('beforeend', divFooter) as HTMLDivElement;
  return divTask

}


export function cellAdding(elem: HTMLElement) {
  /**
   * Cell is add
   * 
   */
  const htmlDivElement = cellCreate();
  elem.insertAdjacentElement('beforeend', htmlDivElement);
}


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
  actualCells = undefined as any;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);

  (boxLeft as any) = undefined;
  (boxTop as any) = undefined;
  (clientX as any) = undefined;
  (clientY as any) = undefined;
  // The finished to the DnD actions
}


export function mouseEvents(elem: HTMLElement, e: MouseEvent) {
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


  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
}
