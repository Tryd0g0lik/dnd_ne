
class Task {
  elem: HTMLElement;
  /**
   * TODO: This will be making changes to the text from cells
   * :params elemenrt: This's date the HTMLElement type. Here store the task's text.
   */
  constructor(element: HTMLElement) { this.elem = element; }

  get reciveTask(): string { return (this.elem.textContent as string).slice(); }

  set changeTask(text: string) { if (text.length > 0) this.elem.innerHTML = text }
}


export class LStorage extends Task {
  existence: (string | null);
  len: number;

  /**
   *TODO: For a vache work on the page.
   * 'chackKey()' - checking key from the localStorage.
   * 'getItemsLS()'- geting datas from the localStorage. It's return the 'Object{}' format/
   * 'setItemsLS()' - for conservation datas to the localStorage.
   * 'receiveOfLS()' - receiver or cache datas from the localStorage and the page update.
   * 'saveToLS()' - this's datas conservation to the localStorage
   * @param element: this's HTMLElement's type box for keep a text from the cell.
   * @param len: this's length or the 'element' count .
   */
  constructor(element: HTMLElement, len: number) {
    super(element)
    this.existence = null;
    this.len = len;
    this.startWork();
  }

  private chackKey(str: string) { this.existence = localStorage.getItem(str); }
  private getItemLS() { return JSON.parse(localStorage.getItem('columns') as any) }
  private setItemLS(elem: {}) { localStorage.setItem('columns', JSON.stringify(elem)); }

  receiveOfLS(i: number) {
    this.chackKey('columns')
    if (this.existence !== null) {
      const storage = this.getItemLS();
      super.changeTask = storage.tasks[i];
    }
  }

  private saveToLS() {
    const task = super.reciveTask;
    this.chackKey('columns');

    if (this.existence === null) {
      this.setItemLS({ tasks: [task] });
      return
    }

    if (this.len !== this.getItemLS().tasks.length) {
      let respons = this.getItemLS();
      const { tasks } = (respons);
      if (String(tasks).indexOf(this.reciveTask) === -1) {
        respons.tasks.push(task);
        this.setItemLS(respons);
      }
    }
  }

  startWork() { this.saveToLS(); }
}
