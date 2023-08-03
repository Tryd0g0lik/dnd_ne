
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

  heightForNewLocation(actualCells)
    .then((result) => {
      Array.from(result).forEach((cell) => {
        cell.addEventListener('mouseleave', handlerMouseLeave);
        document.documentElement.addEventListener('mouseup', handlerMouseUP);

        function handlerMouseUP(e: MouseEvent) {
          Array.from(result).forEach((cell) => { if (cell.hasAttribute('style')) cell.removeAttribute('style'); });
          document.body.removeEventListener('mouseup', handlerMouseUP);
          e.stopPropagation();
        }

        function handlerMouseLeave(e: MouseEvent) {
          if (cell.hasAttribute('style')) cell.removeAttribute('style');
          document.documentElement.removeEventListener('mouseleave', handlerMouseLeave);
          e.stopPropagation();
        }
      });
      return result
    });

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

  Array.from(document.getElementsByClassName('task')).forEach((elem) => {
    if (elem.hasAttribute('style')) elem.removeAttribute('style');
  });
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
  // document.documentElement.removeEventListener('mouseenter', () => heightForNewLocation);
  // document.documentElement.removeEventListener('mouseleave', () => heightForNewLocation);




  (boxLeft as any) = undefined;
  (boxTop as any) = undefined;
  (clientX as any) = undefined;
  (clientY as any) = undefined;
  // The finished to the DnD actions
}

const heightForNewLocation = async (elem: HTMLElement) => {

  let cells = await document.documentElement.getElementsByClassName('task') as HTMLCollectionOf<HTMLElement>;
  /**
   * this 'elem'  it's a new html-element which has the class 'draggend' at the now time.
   */
  const result = await Array.from(cells).filter((cell) => {
    if (cell.classList.contains('draggend') === false) return cell;
  });

  // for (let i = 0; i < cells.length; i++) {

  Array.from(result).forEach((cell) => {
    cell.addEventListener('mouseenter', heandlerMouseenter as any);

    function heandlerMouseenter(e: MouseEvent) {
      let box = cell.getBoundingClientRect();
      // let r = e.target as HTMLElement;

      if (e.clientY >= box.top && e.clientY <= box.bottom
        && e.clientX >= box.left && e.clientX <= box.right) {
        const r = e.target as HTMLElement;
        r.style.marginTop = String(elem.offsetHeight) + 'px';

      };
      // document.documentElement.removeEventListener('mouseenter', heightForNewLocation as any);
      document.documentElement.removeEventListener('mouseenter', heandlerMouseenter as any);
      e.stopPropagation();

      console.log('dsdsssssssssssssssssss');
    }
  });

  return result
};


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
