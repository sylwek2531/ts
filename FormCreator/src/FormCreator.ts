import { SelectField } from "./SelectField";
import FieldTypeTranslations, { FieldType } from "./EFieldType";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { CheckboxField } from "./CheckboxField";
import { IFieldCreator } from "./IFieldCreator";
import { Field } from "./IField";
import { LocStorage } from "./locStorage";

export class FormCreator {
  renderElement: string = "input-wrapper";
  renderForm: Array<IFieldCreator> = [];
  //jaki typ?
  data = {
    sum: 0,
    average: 0,
    min: 0,
    max: 0,
  };
  locStorage: LocStorage;
  inputField : { [key : string] :  SelectField | InputField} = {};
  constructor(renderElement?: string) {
    this.renderElement = renderElement ? renderElement : this.renderElement;
    this.locStorage = new LocStorage("9876543");
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
    const newForm: { name: string; label: string; type: string; value: string; }[] = [];
    this.getAllInputs().forEach((el:IFieldCreator) => {
      console.log(el)
      const createField = {
        name: el.name.value,
        label: el.label.value,
        type:  el.type.value,
        value: el.value.value
      }
      newForm.push(createField);
    });
    this.locStorage.saveDocument(newForm);
    window.location.href = '/index.html';

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
        FieldTypeTranslations
      );
      // Object.values(FieldType)
    
    element.append(selectField.render());


    const inputText = new InputField("label" + i, "Etykieta pola");
    const inputRender = inputText.render();
    element.append(inputRender);


    const inputTextName = new InputField("name" + i, "Nazwa pola");
    const nameRender = inputTextName.render();
    element.append(nameRender);


    const inputTextDvalue = new InputField("value" + i, "Domyślna wartość");
    const textDefaultRender = inputTextDvalue.render();
    element.append(textDefaultRender);

//zatypowac to 
    const newInput : IFieldCreator = {
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

  getAllInputs(): Array<IFieldCreator> {
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
