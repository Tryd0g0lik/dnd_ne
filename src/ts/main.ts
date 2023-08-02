const { cellAdding } = require('./functions.ts');
const { ReLocates } = require('./relocates.ts');


export class Main {

  elem: HTMLDivElement

  constructor(selector: HTMLDivElement) {
    /**
     * Выбираем колонку
     */
    this.elem = selector; 
    // Перенести  в "get getLink():", а "get getLink():" сделать отдельной функцией.
    //   тем самым новуй объект вынести и сделать рестарт при добовлении
    this.startWork();
  }

  get getLink(): HTMLDivElement {
    /* подвал отбираем из dom-ма */
    const elem = this.elem; //.cloneNode() as HTMLDivElement;
    return elem.querySelector('footer .cell') as HTMLDivElement;
  }

  set setForAddingCell(elem: HTMLDivElement) {
    /* вставляем ячейку */
    cellAdding(elem);
  }

  getToTasksRemover() {
    const arrElements = this.elem.getElementsByClassName('task') as HTMLCollectionOf<HTMLDivElement>;
    Array.from(arrElements).forEach((item: HTMLDivElement) => {
      /**
       * Вешаем функцию удаления на каждую из ячеек
       */
      const cssBlockAfter = item.getElementsByClassName('delete-task')[0] as HTMLDivElement;
      cssBlockAfter.addEventListener('mousedown', (e: MouseEvent) => {
        e.stopPropagation();
        item.remove();
      });
    });

  }

  startWork() {
    this.getToTasksRemover();

    this.getLink.addEventListener('click', (e: MouseEvent) => {
      /**
       * Добавляем ячейки
       */
      e.preventDefault();
      e.stopPropagation();

      this.setForAddingCell = this.elem

      /**
       * Вешаем удаление
       */
      this.getToTasksRemover();
    });



  }
}

function work() {
  const article = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
  let elem: HTMLDivElement;

  for (elem of article) {
    new Main(elem)
    new ReLocates(elem)

  }
}
// mouseEvents();
work();
