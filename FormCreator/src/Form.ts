import { InputField } from "./InputField";
import { EmailField } from "./EmailField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { TextAreaField } from "./TextAreaField";
import { LocStorage } from "./locStorage";
import { FieldType } from "./EFieldType";
import { FormCreator } from "./FormCreator";
import { DateField } from "./DateField";
import { Router } from "./Router";

export class Form {
    renderElement: string = "input-wrapper";
    titleElement: string = "form-title";
    actionElement:string = "action-wrapper";
    renderForm: Array<any> ;
    id: string;
    title:string;
   
    constructor(id?: string) {
        if(id && id.length){
            this.id = id;
            this.renderForm = this.createObjectFields();
        }

    }
    createObjectFields():Array<any>{
      const lo = new LocStorage();
      const returnLocal:any = lo.loadDocument(this.id);
      this.title = returnLocal.title;
      let parsedArray: { name: string; label: string; type: string; value: string; }[] = [];
        const renderFormElements:Array<any> = [];
        parsedArray = Object.keys(returnLocal.form).map(function(keyField){
            let field = returnLocal.form[keyField];
            return field;
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
        
        this.createTitleForm();
        this.createActionForm();

        renderElement.append(forms);
    }
    createTitleForm(){
        const renderTitleElement: HTMLElement = document.getElementById(this.titleElement);
        renderTitleElement.innerText = this.title;

    }
    createActionForm(){
        const renderActionElement: HTMLElement = document.getElementById(this.actionElement);
        renderActionElement.append(this.createBackButton());
        renderActionElement.append(this.createSaveButton());
    }
    createSaveButton(): HTMLButtonElement{
        const buttonSave = document.createElement("button");
        buttonSave.classList.add("save-action");
        buttonSave.innerText = "Save";
        buttonSave.addEventListener("click", () => {
            this.save();
        })
        return buttonSave;
    }
    createBackButton():HTMLButtonElement{
        const buttonBack = document.createElement("button");
        buttonBack.classList.add("back-action");
        buttonBack.innerText = "Back";
        buttonBack.addEventListener("click", () => {
            window.history.back();
            // window.location.href = '/index.html';
        })
        return buttonBack;
    }
    save() {
        const save = new LocStorage();
        if (window.location.pathname == "/edit-document.html"){
            let isEdit = Router.getParams("id");
            save.saveDocument(this.getValue(), isEdit != null ? isEdit : "");

         }else{
            save.saveDocument(this.getValue());
         }
        window.location.href = '/index.html';
    }
}