const { ReLocates } = require('./relocates.ts');
const { Mains } = require('./main.ts');



const article = document.getElementsByTagName('article') as HTMLCollectionOf<HTMLDivElement>;
let elem: HTMLDivElement;

for (elem of article) new Mains(elem);
new ReLocates();

