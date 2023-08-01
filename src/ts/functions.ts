
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
  elem.insertAdjacentElement('beforeend', htmlDivElement);
}


let actualColumn: HTMLElement;
let actualCells: HTMLElement;
let box: any;
const onMouseOver = (e: MouseEvent) => {

  box = actualCells.getBoundingClientRect();
  console.log('box: ', {
    top_: box.top,
    right: box.right,
    bottom: box.bottom,
    left: box.left,
    clientX: e.clientX,
  })
  // actualCells.style.top = e.clientY + 'px';
  actualCells.style.top = e.clientY - (e.clientY - box.top) + box.bottom + 'px';

  // actualCells.style.left = + box.lef + e.clientX + 'px';
  // actualCells.style.left = e.clientX - 10 + 'px';
  actualCells.style.left = e.clientX - (e.clientX - box.lef) + 'px';

}

const onMouseUp = (e: MouseEvent) => {
  // const getParentOfColums = actualCells.parentElement;
  const eventTarget = e.target as HTMLElement;
  const eventCurentTarget = e.currentTarget as HTMLElement;

  console.log('d 0: ', e.target, eventTarget.classList.contains('task'))
  // console.log('d 1: ', 'task' in eventTarget.classList, eventCurentTarget.classList, eventCurentTarget)
  // console.log('d 2: ', eventTarget.classList[0])

  if ((e.target && eventTarget.classList.contains('task')) && (e.currentTarget
    || (e.currentTarget !== null && (e.currentTarget as HTMLElement).classList.contains('task')))) {
    console.log('END')
    actualColumn = eventTarget.parentElement as HTMLElement;
    console.log('d 2: ', eventTarget, eventCurentTarget)
    actualColumn.insertBefore(actualCells, eventTarget);
  }
  actualCells.classList.remove('draggend');


// }
  // if ('task' in eventTarget.classList[0] ) {

  // }
  // debugger;
  // if ('task' in eventTarget.classList.value)
  actualCells.removeAttribute('style');
  actualCells = undefined as any;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
}

export function mouseEvents(elem: HTMLElement) {

  elem.addEventListener('mousedown', (e: MouseEvent) => {
    console.log('------ START');
    e.preventDefault();
    elem.classList.add('draggend');
    // debugger;
    actualCells = elem;


    console.log('actualCells: ', actualCells);
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);

  });

}
