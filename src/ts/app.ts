const { ReLocates } = require('./locations/relocates.ts');
const { Mains } = require('./mains/main.ts');
const { LStorage } = require('./caches/localstorages.ts');




// const article = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
// let elem: HTMLDivElement;


const tasks = document.getElementsByClassName('descrip');
for (let i = 0; i < tasks.length; i++) {
  const task = new LStorage(tasks[i], tasks.length);
  task.receiveOfLS(i)
}




// for (elem of article) new Mains(elem);

// new ReLocates(document.getElementsByTagName('article'));

