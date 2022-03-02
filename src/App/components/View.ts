import Controller from './Controller';
import Garage from '../../components/Cars/Garage';
import Winners from '../../components/Winners/Winners';

export default class View {
  private appPage: Element | null = null;

  constructor(private controller: Controller, private root: Element) {}

  changePage(page: string) {
    switch (page) {
      case 'garage':
        this.appPage = Garage();
        break;

      case 'winners':
        this.appPage = Winners();
        break;

      default:
        break;
    }
    this.root.innerHTML = '';
    this.root.append(this.appPage);
  }
}
