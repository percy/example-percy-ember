import Controller from '@ember/controller';

export default class ActiveController extends Controller {
  get todos() {
    return this.model.filterBy('completed', false);
  }
}
