import AnimalList from "./AnimalList.js";

class AnimalElement extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" });
      let animalList = Object.create(new AnimalList());
      let element = animalList.renderDOM(animalList.display())
      this.shadowRoot.append(element);
    }
  }
  
  export default AnimalElement