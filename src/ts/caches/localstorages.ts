interface ColumnCells {
  column: string;
  tasks: Array<string>;
}


export class GetSaveToLocalStorage {
  #getcolumns: any;  //HTMLCollectionOf<HTMLElement>
  #cell: any;
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
  set settingCells(elems: HTMLCollectionOf<HTMLElement>) {
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

  get settingCells(): Array<ColumnCells> { return this.#response as Array<ColumnCells>; }


  /***
   * Saving all data (task text from the cell).
   * :params `elems`: At entrance the Aray<Object>. It's got from the 'get getCells'
   */
  saveLStorage(elems: Array<ColumnCells>) {
    localStorage.setItem('columns', JSON.stringify({ tasks: elems }));
  }

  /**
   * Loads datas from the localStorage.
   */
  loaderStorage() {
    window.addEventListener('DOMContentLoaded', () => {
      this.#cell = JSON.parse(localStorage.getItem('columns') as string);
      // debugger;
      Array.from(this.#cell.tasks).forEach((desc: any) => {

        let pageColumnName;
        for (let i = 0; i < this.#getcolumns.length; i++) {
          pageColumnName = this.#getcolumns[i].getElementsByClassName('header')[0];
          if (pageColumnName.innerHTML.trim().indexOf(desc.column.trim()) >= 0) break
        }

        pageColumnName = (pageColumnName as HTMLDivElement).parentElement;
        const cellsOfColumns = pageColumnName?.getElementsByClassName('task') as HTMLCollectionOf<HTMLElement>

        for (let i = 0; i < cellsOfColumns.length; i++) cellsOfColumns[i].getElementsByClassName('descrip')[0].innerHTML = desc.tasks[i];
        pageColumnName = undefined;
      });
    });
  }

  startWork() {
    this.loaderStorage();
    // this.settingCells = this.#getcolumns;
    // this.saveLStorage(this.settingCells);
  }
}
