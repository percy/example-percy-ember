import Controller from '@ember/controller';

export default class CompletedController extends Controller {
  get todos() {
    return this.model.filterBy('completed');
  }
}
