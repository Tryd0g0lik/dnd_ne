interface ColumnCells {
  column: string;
  tasks: Array<string>;
}


export class GetSaveToLocalStorage {
  #getcolumns: HTMLCollectionOf<HTMLElement>
  #cell: Array<string> | Array<Object>;
  #response: Array<ColumnCells>

  constructor() {
    this.#getcolumns = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLElement>;
    this.#cell = [];
    this.#response = [];
    this.startWork();
  }



  /**
   * :params elems: it's loading 'this.#getcolumns:HTMLCollectionOf<HTMLElement>' from the constructor;
   * Then loading the 'this.#cell:Array<[]>' data/ It's a cell's contents.
   * On processing data at the finising will been get a 'this.#response: Array<ColumnCells>' 
   * 
   *  Every one column of www-page is the one's line for the localStorage.
   */
  set getCells(elems: HTMLCollectionOf<HTMLElement>) {

    Array.from(elems).forEach((elem: HTMLElement) => {
      const columnName = elem.getElementsByClassName('header')[0].innerHTML as string;
      const cells = elem.getElementsByClassName('task') as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < cells.length; i++) {
        const cellContent = cells[i].getElementsByClassName('descrip')[0].textContent;
        if (cellContent !== null) (this.#cell as Array<string>).push(cellContent);
      }
      this.#response.push({ "column": columnName, "tasks": this.#cell as Array<string> });

      this.#cell = [];

    });
  }

  get getCells(): Array<ColumnCells> { return this.#response as Array<ColumnCells>; }

  saveLStorage(elems: Array<ColumnCells>) {
    /***
     * Saving all data (task text from the cell).
     * :params `elems`: At entrance the Aray<Object>. It's getting from the 'get getCells'
     * Every one column of www-page is the one's line for the localStorage.
     */
    (elems).forEach((elem: ColumnCells) => {
      const object = Object.values(elem);
      localStorage.setItem(object[0].trim() as string, JSON.stringify({ tasks: elem.tasks }));
    });
  }


  /**
   * Loads data from the localStorage and saves they to the www-page
   */
  loaderStorage() {
    let cells: HTMLCollectionOf<HTMLElement>;
    window.addEventListener('DOMContentLoaded', async () => {
      await Array.from(this.#getcolumns).forEach((column: HTMLElement) => {
        /**
         * THere is will be load the column's data.
         * :params columnName: it geting the one column name. After getting the name we can loads the all data/tasks for column
         * :this.#cell: it's Array<tasks>
         * And update tasks for a page on the completed.
         */
        const columnName = column.getElementsByClassName('header')[0].innerHTML.trim() as string;
        (this.#cell) = JSON.parse(localStorage.getItem(columnName) as string)['tasks'];
        cells = (column as HTMLElement).getElementsByClassName('descrip') as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < this.#cell.length; i++) cells[i].innerHTML = this.#cell[i] as string;
      });
    });
  }

  async startWork() {
    this.getCells = await this.#getcolumns;
    this.saveLStorage(this.getCells);
    this.loaderStorage()

  }
}
