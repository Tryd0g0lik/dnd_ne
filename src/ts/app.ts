const { ReLocates } = require('./relocates.ts');
const { LStorage } = require('./localstorages.ts');
const { cellAdding } = require('./functions.ts');

let cell: any = undefined;
const cells = document.getElementsByClassName('task') as HTMLCollectionOf<HTMLDivElement>;
const tasks = document.getElementsByClassName('descrip');

/** Relocation - start */
const listenerEventDown = function (e: MouseEvent) {

  if ((e.target as HTMLElement).classList.contains('task')) {
    e.preventDefault()
    const elem = e.target;

    cell = new ReLocates(elem);
    cell.manageCss(e);
    debugger;
    document.documentElement.addEventListener('mouseup', listenerEventUp);
    document.documentElement.addEventListener('mouseover', listenerEventOver, true);
  }

}

const listenerEventOver = function (e: MouseEvent) {
  e.preventDefault();
  cell.manageCss(e);
}

const listenerEventUp = function (e: MouseEvent) {
  const eventTarget = e.target as HTMLElement;
  const actualColumn = eventTarget.parentElement as HTMLElement;
  if (eventTarget.classList.contains('task')) actualColumn.insertBefore(cell.elem, eventTarget);

  cell.manageCss(e);
  document.documentElement.removeEventListener('mouseover', listenerEventOver, true);
  document.documentElement.removeEventListener('mouseup', listenerEventUp);
  cell = undefined;
}

document.body.addEventListener('mousedown', listenerEventDown, true);
document.documentElement.removeEventListener('mousedown', listenerEventDown);

/**Relocations end */

/**LocalStorage  */
if (tasks !== undefined) {
  for (let i = 0; i < tasks.length; i++) {
    const task = new LStorage(tasks[i], tasks.length);
    task.receiveOfLS(i)
  }
}

/** Adding cells - start */

document.body.addEventListener('mousedown', (e: MouseEvent) => {
  e.preventDefault();
  if ((e.target as HTMLElement).classList.contains('footer-addCell')) {
    const column = (e.target as HTMLElement).parentElement?.parentElement?.parentElement;
    cellAdding(column);
  }
});
/** Adding cells - end */

/** Remover cells - start */
document.body.addEventListener('click', (e: MouseEvent) => {
  const targetEvent = e.target as HTMLElement;
  if (targetEvent.classList.contains('delete-task')) targetEvent.parentElement?.remove();
});
/** Remover cells - end */
