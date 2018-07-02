import UnknownComponent from './unknown/Unknown';
import _ from 'lodash';

export default class Components {
  static get components() {
    if (!Components._components) {
      Components._components = {};
    }
    return Components._components;
  }

  static setComponents(comps) {
    _.assign(Components.components, comps);
  }

  static addComponent(name, comp) {
    return Components.setComponent(name, comp);
  }

  static setComponent(name, comp) {
    Components.components[name] = comp;
  }

  static create(component, options, data, nobuild) {
    let comp = null;
    if (component.type && Components.components.hasOwnProperty(component.type)) {
      comp = new Components.components[component.type](component, options, data);
    }
    else {
      comp = new UnknownComponent(component, options, data);
    }
    if (!nobuild) {
      comp.build();
      comp.isBuilt = true;
    }
    return comp;
  }
}
