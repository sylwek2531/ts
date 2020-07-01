import { Field } from "./IField";
import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";
import { EmailField } from "./EmailField";

export class SelectField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.select;
    value: string;
    option: any = {};
    id: number = new Date().getTime();
    events: string[] = ["focusout", "input", "change"]
  
    // constructor(name: string, label: string, value?: string, option?: any) {
    constructor(name: string, label: string, value?: string, option?: {[key:string] : string}) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
        if(option){
            this.option = option;
        }
        // console.log(FieldType.inputCheckbox == FieldType["inputCheckbox"])
    }
    setValue(value: string): boolean {
        this.value = value;
        if(this.getValue() === value){
            return true;
        }else{
            return false;
        }
    }
    addDefaultEvents(select:HTMLSelectElement): void {
        this.events.forEach(e => select.addEventListener(e, event => this.setValue(<string>(<HTMLSelectElement>event.target).value)));
    }
    getValue(): string {
        return this.value;
    }
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("select-group");
        const select = <HTMLSelectElement>document.createElement("select");
        select.id = this.id.toString() + this.name;

        if (Object.keys(this.option).length > 0) {
            for (const key in this.option) {
                const option = document.createElement("option");
                option.innerText = this.option[key];
                option.value = key;
                select.appendChild(option);
            }
            // this.option.forEach(el => {
            //     const option = document.createElement("option");
            //     option.innerText = el;
            //     option.value = el;
            //     select.appendChild(option);
            // })
        }
        select.name = this.name;
        select.value = this.value;
        element.append(this.label.render());
        element.append(select);
        //add default event
        this.addDefaultEvents(select);
        return element;
    }

}