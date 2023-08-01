
function cellCreate(): HTMLDivElement {
  /* создаём ячейку */
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
  /* добавляем ячейку в селектор */
  const htmlDivElement = cellCreate();
  console.log('cellAdding - htmlDivElement 3 : ', htmlDivElement);
  elem.insertAdjacentElement('beforeend', htmlDivElement);
}


// let elem: HTMLElement;
let actualCells: HTMLElement;
const onMouseOver = (e: MouseEvent) => {
  actualCells.style.top = e.clientY + 'px';
  actualCells.style.left = e.clientY + 'px';

}

const onMouseUp = () => {
  actualCells.classList.remove('draggend');
  actualCells = undefined as any;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
}

// const onMouseDown = (e:MouseEvent) => {
//   e.preventDefault();
//   elem.classList.add('draggend');
//   actualCells = elem;

//   document.documentElement.addEventListener('mouseup', onMouseUp);
//   document.documentElement.addEventListener('mouseover', onMouseOver)

// }
export function mouseEvents() {
  const getUserColumns = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLElement>;
  let getCellsOfColumn: HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < (getUserColumns).length; i++) {
    getCellsOfColumn = getUserColumns[i].getElementsByClassName('.task') as HTMLCollectionOf<HTMLElement>;

    // Array.from(getCellsOfColumn).forEach((item) => {
    for (let item of getCellsOfColumn) {
      item.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault();
        item.classList.add('draggend');
        actualCells = item;

        document.documentElement.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseover', onMouseOver)

      });
    }
    // })
  }

}
