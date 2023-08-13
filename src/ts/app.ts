const { ReLocates } = require('./locations/relocates.ts');
const { Mains } = require('./mains/main.ts');
const { LStorage } = require('./caches/localstorages.ts');

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

    document.documentElement.addEventListener('mouseup', listenerMouseUp);
    document.documentElement.addEventListener('mouseover', listenerMouseOver, true);
  }

}

const listenerMouseOver = function (e: MouseEvent) {
  e.preventDefault();
  cell.manageCss(e);
}

const listenerMouseUp = function (e: MouseEvent) {
  const eventTarget = e.target as HTMLElement;
  const actualColumn = eventTarget.parentElement as HTMLElement;
  if (eventTarget.classList.contains('task')) actualColumn.insertBefore(cell.elem, eventTarget);

  cell.manageCss(e);
  document.documentElement.removeEventListener('mouseover', listenerMouseOver, true);
  document.documentElement.removeEventListener('mouseup', listenerMouseUp);
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

