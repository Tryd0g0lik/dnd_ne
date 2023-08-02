
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
let boxLeft: number;


const onMouseOver = (e: MouseEvent) => {
  box = (e.target as HTMLElement).getBoundingClientRect();
  console.log('box: ', {
    ev: e,
    right: box.right,
    bottom: box.bottom,
    left: box.left,
    clientY: e.clientY,
    clientX: e.clientX,
  })

  actualCells.style.top = box.top + (e.clientY - box.top - 28) + 'px'; // 28 это кнопка "удалить ячейку"
  console.log('boxLeft: ', boxLeft)
  actualCells.style.left = e.clientX - (e.clientX - boxLeft) + 'px';
  console.log(actualCells)
}

const onMouseUp = (e: MouseEvent) => {
  const eventTarget = e.target as HTMLElement;
  const eventCurentTarget = e.currentTarget as HTMLElement;

  console.log('d 0: ', e.target, eventTarget.classList.contains('task'))

  if ((e.target && eventTarget.classList.contains('task')) && (e.currentTarget
    || (e.currentTarget !== null && (e.currentTarget as HTMLElement).classList.contains('task')))) {
    console.log('END', box)
    actualColumn = eventTarget.parentElement as HTMLElement;
    console.log('d 2: ', eventTarget, eventCurentTarget)
    actualColumn.insertBefore(actualCells, eventTarget);
  }
  actualCells.classList.remove('draggend');
  actualCells.removeAttribute('style');
  actualCells = undefined as any;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
  box = undefined;
}

export function mouseEvents(elem: HTMLElement) {

  elem.addEventListener('mousedown', (e: MouseEvent) => {
    console.log('------ START');
    e.preventDefault();

    boxLeft = (elem.getBoundingClientRect()).left; // Left координнаты HTMLElement до приобретения класса 'draggend'
    elem.classList.add('draggend');
    // debugger;
    actualCells = elem;

    console.log('actualCells: ', actualCells);
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);

  });

}
