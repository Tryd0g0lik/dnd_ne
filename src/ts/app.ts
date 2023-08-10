const { ReLocates } = require('./locations/relocates.ts');
const { Mains } = require('./mains/main.ts');
const { GetSaveToLocalStorage } = require('./caches/localstorages.ts');




const article = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
let elem: HTMLDivElement;

for (elem of article) new Mains(elem);

new ReLocates(document.getElementsByTagName('article'));
new GetSaveToLocalStorage();

