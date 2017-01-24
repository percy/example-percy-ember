import Ember from 'ember';

export default function destroyApp(application) {
  window.localStorage.clear();
	Ember.run(application, 'destroy');
}
