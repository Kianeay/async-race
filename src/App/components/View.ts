/* eslint-disable no-empty-function */
import Controller from './Controller';

export default class View {
  private appPage: Element | null = null;

  constructor(private controller: Controller, private root: Element) {}

  changePage(page: string) {
    /*     switch (page) {
      case 'main':

        break;

      default:

        break;
    } */
    this.root.innerHTML = '';
    this.root.append(this.appPage);
  }
}
