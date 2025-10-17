import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service repo;

  model() {
    return this.repo.findAll();
  }
}
