import { InputField } from "./InputField";
import { EmailField } from "./EmailField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { TextAreaField } from "./TextAreaField";
import { LocStorage } from "./locStorage";
import { FieldType } from "./EFieldType";
import { FormCreator } from "./FormCreator";
import { DateField } from "./DateField";

export class Form {
    renderElement: string = "input-wrapper";
    renderForm = this.owe();
    // renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", {"1" :"Informatyka i  ekjonometria", "2":"Budownictwo", "3":"Mechatronika"}), new CheckboxField("eLearning", "Czy preferujesz e-learning"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", ["Informatyka i  ekjonometria", "Budownictwo", "Mechatronika"]), new CheckboxField("eLearning", "Czy preferujesz e-learning", "Preferuje"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "Imię")];
    // renderForm = [new InputField("name", "imie"), InputField, EmailField, SelectField, CheckboxField, TextAreaField];
    constructor(renderElement?: string) {
        this.renderElement = renderElement ? renderElement : this.renderElement;

    }
    owe():Array<any>{
      const lo = new LocStorage();
      const returnLocal:any = lo.loadDocument("1593641245592");
      let parsedArray: { name: string; label: string; type: string; value: string; }[] = [];
        const renderFormElements:Array<any> = [];
        parsedArray = Object.keys(returnLocal).map(function(personNamedIndex){
            let person = returnLocal[personNamedIndex];
            // do something with person
            return person;
        });

        parsedArray.forEach(el=>{
            switch (parseInt(el.type)) {
                case FieldType.inputText:
                    renderFormElements.push(new InputField(el.name, el.label, el.value));
                    break;
                case FieldType.textarea:
                    renderFormElements.push(new TextAreaField(el.name, el.label, el.value));
                    break;
                case FieldType.inputDate:
                    renderFormElements.push(new DateField(el.name, el.label, el.value));
                    break;
                case FieldType.inputEmail:
                    renderFormElements.push(new EmailField(el.name, el.label, el.value));
                    break;
                case FieldType.inputCheckbox:
                    renderFormElements.push(new CheckboxField(el.name, el.label, el.value));
                    break;
                case FieldType.select:
                    renderFormElements.push(new SelectField(el.name, el.label, el.value));
                    break;
                default:
                    break;
            }
        })
    
        return renderFormElements;

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

        const answer: { [key: string]: string | number | boolean } = {};

        this.renderForm.forEach(el => {
            if(el.type === FieldType.inputCheckbox){
                // console.log(document.getElementById(el.id + el.name+":checked"));
                // answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name+":checked")).value;
                // console.log((<HTMLInputElement>document.getElementById(el.id + el.name)).checked)
                answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name)).checked;
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

        //do przeniesienia
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