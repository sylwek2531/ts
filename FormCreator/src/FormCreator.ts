import { SelectField } from "./SelectField";
import { FieldType } from "./EFieldType";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { CheckboxField } from "./CheckboxField";

export class FormCreator {
  renderElement: string = "input-wrapper";
  renderForm: object[] = [];
  //jaki typ?
  data = {
    sum: 0,
    average: 0,
    min: 0,
    max: 0,
  };
  constructor(renderElement?: string) {
    this.renderElement = renderElement ? renderElement : this.renderElement;
  }
  newForm() {
    document.getElementById("generate").addEventListener("click", () => {
      this.generate();
    });
    document.querySelector("#removeMore").addEventListener("click", () => {
      this.removeMultiple();
    });
    document.querySelector("#save").addEventListener("click", () => {
      this.saveForm();
    });
  }
  saveForm() {
    this.getAllInputs().forEach((el) => {
      let newForm = [];

      console.log(el);
    });
    // korzyta z locStorag klasy
  }

  generate() {
    const quantity = <HTMLInputElement>document.getElementById("quantity");
    if (!isNaN(parseInt(quantity.value))) {
      const listInputs = <HTMLDivElement>document.getElementById("listInputs");
      listInputs.innerHTML = "";
      for (let i = 0; i < parseInt(quantity.value); i++) {
        const generate = this.generateInput(i.toString());
        listInputs.append(generate);
      }
      quantity.value = "";
    } else {
      this.showAlert("The value is not correct");
    }
  }
  showAlert(message: string) {
    alert(message);
  }
  generateInput(i: string) {
    const element = <HTMLDivElement>document.createElement("div");
    element.classList.add("form-row-group");
    element.dataset.index = i.toString();
    const selectField = new SelectField(
      "type" + i,
      "Typ pola",
      "",
      Object.values(FieldType)
    );
    
    element.append(selectField.render());


    const inputText = new InputField("label" + i, "Etykieta pola");
    const inputRender = inputText.render();
    // inputText.addDefaultEvents(<HTMLInputElement>inputRender.querySelector("input"));
    element.append(inputRender);


    const inputTextName = new InputField("name" + i, "Nazwa pola");
    const nameRender = inputTextName.render();
    // inputTextName.addDefaultEvents(<HTMLInputElement>nameRender.querySelector("input"));
    element.append(nameRender);


    const inputTextDvalue = new InputField("value" + i, "Domyślna wartość");
    const textDefaultRender = inputTextDvalue.render();
    // inputTextDvalue.addDefaultEvents(<HTMLInputElement>textDefaultRender.querySelector("input"));
    element.append(textDefaultRender);


    const newInput = {
      type: selectField,
      label: inputText,
      name: inputTextName,
      value: inputTextDvalue,
    };
    this.renderForm.push(newInput);
    
    const checkbox = new CheckboxField("remove", "Zaznacz do usunięcia");
    element.append(checkbox.render());

    const button = new Button();
    const generateButton = button.render();
    generateButton.addEventListener("click", (e) => {
      this.removeOnce(e);
    });
    element.append(generateButton);
    return element;
  }

  getAllInputs(): object[] {
    return this.renderForm;
  }

  removeOnce(e: Event) {
    const button = <HTMLButtonElement>e.target;
    const getAttributeButton = <HTMLDivElement>button.parentNode;
    const removeElement = getAttributeButton.getAttribute("data-index");
    const elem = document.querySelector(
      `#listInputs div[data-index='${removeElement}']`
    );
    elem.parentNode.removeChild(elem);
  }
  removeMultiple() {
    const allCheckedInput = document.querySelectorAll(
      'input[name="remove"]:checked'
    );
    if (allCheckedInput.length > 0) {
      for (let i = 0; allCheckedInput.length > i; i++) {
        let el = <HTMLDivElement>(
          (<HTMLInputElement>allCheckedInput[i]).parentNode.parentNode
        );
        const elIndex = el.getAttribute("data-index");
        const elem = <HTMLDivElement>(
          document.querySelector(`#listInputs div[data-index='${elIndex}']`)
        );
        elem.parentNode.removeChild(elem);
      }
    }
  }
}
