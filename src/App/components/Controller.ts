import navigate from '../../Router/Router';
import Model from './Model';
import View from './View';

export default class Controller {
  private model = new Model(this);

  private view = new View(this, this.root);

  constructor(private root: Element) {
    window.addEventListener(
      'popstate',
      (e) => {
        this.changePage(e.state.page);
      },
      false,
    );
    window.addEventListener(
      'app:router:pageChange',
      (e: CustomEvent) => {
        this.changePage(e.detail.page);
      },
      false,
    );

    navigate('garage');
  }

  changePage(page: string) {
    this.view.changePage(page);
  }

  getStore() {
    return this.model.getStore();
  }

  setStore(state: any) {
    this.model.setStore(state);
  }
}
