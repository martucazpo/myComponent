class Component {
  constructor(propsObject = {}) {
    this.props = propsObject;
    this.state = {};
    this.notDom = document.createElement("div");
  }
}
Component.prototype.setState = function (...args) {
  if (typeof args[0] === "object") {
    return (this.state = (function (prevState, arg) {
      let newState = arg;
      let state = Object.assign({}, prevState, newState);
      return state;
    })(this.state, args[0]));
  } else if (typeof args[0] === "function") {
    let callback = args[0];
    let prevState = this.state;
    return (this.state = setState(callback(prevState)));
  } else {
    console.error("Argument must be a type of object or a type of function");
    return this;
  }
};
Component.prototype.renderDOM = function (elem) {
  this.notDom.innerHTML = "";
  this.notDom.append(elem);
  return this.notDom;
};

export default Component








