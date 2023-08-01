
function cellCreate(): HTMLDivElement {
  /* создаём ячейку */
  const divTask = document.createElement('div');
  divTask.classList.add('task');
  const htmlBlovkWClacssDeleteTask: HTMLDivElement = document.createElement('div');
  htmlBlovkWClacssDeleteTask.classList.add('delete-task');
  htmlBlovkWClacssDeleteTask.innerText = 'x';
  divTask.insertAdjacentElement('beforeend', htmlBlovkWClacssDeleteTask);
  const divDescrip = document.createElement('div');
  divDescrip.classList.add('descrip');
  divDescrip.innerHTML = "<span>Добавлять карточки с помощью кнопки 'Add another card'. Вот так это выглядит:</span>"


  const divFooter = document.createElement('div');
  divFooter.classList.add('task_footer');

  const spanFooterVoice = document.createElement('span');
  spanFooterVoice.classList.add('voice');

  const spanFooterMenu = document.createElement('span');
  spanFooterMenu.classList.add('footer_menu');

  const spanFeedback = document.createElement('span');
  spanFeedback.classList.add('feedback');

  divTask.insertAdjacentElement('beforeend', divDescrip)
    ?.insertAdjacentElement('beforeend', divFooter) as HTMLDivElement;

  divFooter.insertAdjacentElement('beforeend', spanFooterVoice)
    ?.insertAdjacentElement('beforeend', spanFooterMenu)
    ?.insertAdjacentElement('beforeend', spanFeedback);
  divTask.insertAdjacentElement('beforeend', divFooter) as HTMLDivElement;
  return divTask

}


export function cellAdding(elem: HTMLElement) {
  /* добавляем ячейку в селектор */
  const htmlDivElement = cellCreate();
  console.log('htmlDivElement 3 : ', htmlDivElement);
  elem.insertAdjacentElement('beforeend', htmlDivElement);
}

let items: HTMLElement;
let actualElement: HTMLElement;
let user = {
  onMouseEventOver(e: MouseEvent) {
    // actualElement = document.querySelector('.task.draggend') as HTMLElement;
    console.log('onMouseEventOver :', e.clientY, e.clientX, actualElement);
    // console.log('(event.pageX, event.pageY: ', e.clientX)

    actualElement.style.top = e.clientY - 10 + 'px';
    actualElement.style.left = e.clientX - 10 + 'px';


  },

  onMouseDown(e: MouseEvent, htmlElem: HTMLElement) {
    /**
     * params htmlElem: it's element with type HTMLElement has a MouesEvent
     */
    e.preventDefault();
    console.log('e.currentTarget:: ', e.currentTarget)
    console.log('htmlElem 1:: ', htmlElem)
    if (htmlElem === e.target || htmlElem === e.currentTarget) {
      console.log('htmlElem 2:: ', htmlElem)
      e.stopPropagation();
      actualElement = htmlElem as HTMLElement;
      actualElement.classList.add('draggend');

    };
  },

  onMouseUp(e: MouseEvent) {
    // actualElement.style.top = e.offsetY + 'px';
    // actualElement.style.left = e.pageX + 'px';


    const mouseUpItem = e.target as HTMLElement;
    items = mouseUpItem.parentElement as HTMLElement
    // items = document.querySelector('#column-01') as HTMLElement;
    console.log(e)
    // actualElement.style.top = '';
    // actualElement.style.left = '';
    console.log('onMouseUp :', e.clientY, e.clientX, actualElement);
    console.log("items: ", items);
    console.log("actualElement: ", actualElement);
    console.log("mouseUpItem: ", mouseUpItem);
    // debugger;

    items.insertBefore(actualElement, mouseUpItem);
    actualElement.classList.remove('draggend');

    document.documentElement.removeEventListener('mouseup', user.onMouseUp);
    document.documentElement.removeEventListener('mouseover', user.onMouseEventOver);
    actualElement = undefined as any;

  },
}

export function mouseEvents(columns: HTMLElement, blocks: HTMLCollectionOf<HTMLElement>) {
  /**
   * param columns: it's a html-block which has sections for movements
   * param blocks: This's sections which will been movement by the once
   */
  user.onMouseDown = user.onMouseDown.bind(user.onMouseDown);// as Function;
  user.onMouseEventOver = user.onMouseEventOver.bind(user.onMouseEventOver); //as Function;
  user.onMouseUp = user.onMouseUp.bind(user.onMouseUp); // as Function;
  console.log('blocks 0: ', blocks);
  for (let i = 0; i < (blocks).length; i++) {
    blocks[i].addEventListener('mousedown', (e: MouseEvent) => {
      user.onMouseDown(e, blocks[i]);

      document.documentElement.addEventListener('mouseup', user.onMouseUp);
      document.documentElement.addEventListener('mouseover', user.onMouseEventOver);

      // document.documentElement.removeEventListener('mouseover', () => user.onMouseEventOver);
      // document.documentElement.removeEventListener('mousedown', () => user.onMouseDown);

    });
  };




}
