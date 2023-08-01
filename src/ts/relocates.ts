const { mouseEvents } = require('./functions.ts');


export class ReLocates {
  columns: HTMLDivElement

  constructor(selector: HTMLDivElement) {
    /**
     * Выбираем колонку
     */
    this.columns = selector;
    this.startWork();
  }

  get getCells(): HTMLCollectionOf<HTMLDivElement> {
    const divElements = this.columns.getElementsByClassName('task') as HTMLCollectionOf<HTMLDivElement>;
    return divElements
  }

  setDnd() { // elements: HTMLCollectionOf<HTMLDivElement>
    // let actualElement: HTMLElement;

    Array.from(this.getCells).forEach((elem: HTMLDivElement) => {
      mouseEvents(elem);


    });
  }

  startWork() {
    this.setDnd()
  }
}
