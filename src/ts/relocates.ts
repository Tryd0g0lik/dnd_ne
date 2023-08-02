const { mouseEvents } = require('./functions.ts');


export class ReLocates {
  /**
   * It's class for a Dnd actions
   */

  columns: HTMLDivElement | undefined;
  constructor() {
    /**
     * To chooses a column for a event
     */
    this.columns = undefined;
    this.startWork();
  }

  set getCells(elems: HTMLCollectionOf<HTMLDivElement>) {
    // вешаем прослушку на кнопку ДОБАВИТЬ

    Array.from(elems).forEach((elem: HTMLDivElement) => {
      elem.addEventListener('click', (e: MouseEvent) => {
        // this.getDnd();
        this.startWork();

        document.documentElement.removeEventListener('click', this.getCells as any);
      });
    });
  }

  getDnd() { // setDnd rename in the getDnd and choose a type from the GET to the METHOD/
    const collums = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
    Array.from(collums).forEach(async (collum: HTMLElement) => {
      const cells = await collum.getElementsByClassName('task');

      await Array.from(cells).forEach((cell: Element) => {
        (cell as HTMLDivElement).addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault();
          console.log('cell: ', cell);
          mouseEvents(cell, e);
          cell.removeEventListener('mousedown', this.getDnd);

        });

      });


    });
  }

  startWork() {

    this.getCells = document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLDivElement>;
    this.getDnd();
  }
}
