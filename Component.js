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
      this.state = Object.assign({}, prevState, newState);
      return this.state;
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


class AnimalList extends Component {
  constructor() {
    super();
    this.state = {
      animal: "",
      animals: ["cat", "dog", "hedghog", "bear", "tree rat"],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      animals: [this.state.animal, ...this.state.animals],
      animal: "",
    });
    this.renderDOM(this.display());
    return this;
  }
  display() {
    let div = document.createElement("div");
    let form = document.createElement("form");
    form.addEventListener("submit", this.handleSubmit);
    let input = document.createElement("input");
    input.addEventListener("input", this.handleInput);
    input.setAttribute("name", "animal");
    input.setAttribute("type", "text");
    input.value = this.state.animal;
    input.required = true;
    form.append(input);
    let subBtn = document.createElement("button");
    subBtn.setAttribute("type", "submit");
    subBtn.innerText = "ADD ANIMAL";
    form.append(subBtn);
    div.append(form);
    let ul = document.createElement("ul");
    this.state.animals.forEach((animal) => {
      let li = document.createElement("li");
      li.innerText = animal;
      ul.append(li);
    });
    div.append(ul);
    return div;
  }
}

class animalElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let animalList = Object.create(new AnimalList());
    let element = animalList.renderDOM(animalList.display())
    this.shadowRoot.append(element);
  }
}

window.customElements.define("animal-list", animalElement);



