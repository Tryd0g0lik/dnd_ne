const { hadlerMmouseEvent } = require('./functions.ts');


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
        this.startWork();
        document.documentElement.removeEventListener('click', this.getCells as any);
      });
    });
  }

  getDnd() { // setDnd rename in the getDnd and choose a type from the GET to the METHOD/
    const collums = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
    Array.from(collums).forEach(async (collum: HTMLElement) => { // Get column from the page    
      document.body.addEventListener('mousedown', hadlerMmouseEvent, true);
    });
  }

  startWork() {
    const cells = document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLDivElement>;
    this.getCells = cells;
    this.getDnd();

  }
}
