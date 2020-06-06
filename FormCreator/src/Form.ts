import { InputField } from "./InputField";
import { EmailField } from "./EmailField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { TextAreaField } from "./TextAreaField";
import { LocStorage } from "./locStorage";
import { FieldType } from "./EFieldType";

export class Form {
    renderElement: string = "input-wrapper";
    renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", ["Informatyka i  ekjonometria", "Budownictwo", "Mechatronika"]), new CheckboxField("eLearning", "Czy preferujesz e-learning"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", ["Informatyka i  ekjonometria", "Budownictwo", "Mechatronika"]), new CheckboxField("eLearning", "Czy preferujesz e-learning", "Preferuje"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "Imię")];
    // renderForm = [new InputField("name", "imie"), InputField, EmailField, SelectField, CheckboxField, TextAreaField];
    constructor(renderElement?: string) {
        this.renderElement = renderElement ? renderElement : this.renderElement;

    }
    // insertValue(documentData:{ [key: string]: string | number }){
    insertValue(documentData:any){
        this.renderForm.forEach(el => {
            if(documentData.hasOwnProperty(el.name)){
                el.value = documentData[el.name];
            }
          
        })
    }
    getValue() {
        const answer: { [key: string]: string | number } = {};

        this.renderForm.forEach(el => {
            if(el.type === FieldType.inputCheckbox){
                // console.log(document.getElementById(el.id + el.name+":checked"));
                // answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name+":checked")).value;
                answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name)).value;
            }else{
                answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name)).value;
            }
        })
        return answer;
    }
    render() {
        const forms = document.createElement("div");
        this.renderForm.forEach(el => forms.append(el.render()));
        const renderElement: HTMLElement = document.getElementById(this.renderElement);

        const buttonSave = document.createElement("button");
        buttonSave.innerText = "Save";
        buttonSave.addEventListener("click", () => {
            this.save();
        })

        const buttonBack = document.createElement("button");
        buttonBack.innerText = "Back";
        buttonBack.addEventListener("click", () => {
            window.history.back();
            // window.location.href = '/index.html';
        })

        renderElement.append(forms);
        renderElement.append(buttonBack);
        renderElement.append(buttonSave);
    }
    save() {
        const save = new LocStorage();
        save.saveDocument(this.getValue());
        window.location.href = '/index.html';
    }
}