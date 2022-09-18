import Component from "./Component.js"

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

  export default AnimalList
  
  