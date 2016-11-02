import { foo, bar } from './i18n';

export const logFoo = () => console.log(foo());
export const logBar = () => console.log(bar());

export const logFizz = () => console.log('Hello TREE_SHAKING.fizz.');
export const logBuzz = () => console.log('Hello TREE_SHAKING.buzz.');
