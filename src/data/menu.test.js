import { MENU, getTopMenu } from './menu';

let menu;

beforeEach(() => {
  menu = getTopMenu();
});

it('MENU exists', () => {
  expect(menu[0].name).toEqual('Pizza');
});