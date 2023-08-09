const { hadlerMmouseEvent } = require('./functions.ts');


export class ReLocates {
  /**
   * It's class for a Dnd actions
   */

  columns: HTMLCollectionOf<HTMLDivElement> | undefined;
  constructor(columns = undefined) {
    /**
     * To chooses a column for a event
     */
    this.columns = columns;
    this.startWork();
  }

  set getCells(elems: HTMLCollectionOf<HTMLDivElement>) {
    // вешаем прослушку на кнопку ДОБАВИТЬ
    Array.from(elems).forEach((elem: HTMLDivElement) => {
      elem.addEventListener('click', () => {
        this.startWork();
        document.documentElement.removeEventListener('click', this.getCells as any);
      });
    });
  }

  getDnd() { // setDnd rename in the getDnd and choose a type from the GET to the METHOD/    
    if (this.columns != undefined) {
      Array.from(this.columns).forEach(async (collum: HTMLElement) => { // Get column from the page    
      document.body.addEventListener('mousedown', hadlerMmouseEvent, true);
    });
    }
  }

  startWork() {
    const cells = document.getElementsByClassName('cell') as HTMLCollectionOf<HTMLDivElement>;
    this.getCells = cells;
    this.getDnd();

  }
}
