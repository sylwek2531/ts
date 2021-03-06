import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";
import { Field } from "./IField";

export class CheckboxField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.inputCheckbox;
    value: string;
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
    }
    setValue(value: string): boolean {
        this.value = value;
        if(this.getValue() === value){
            return true;
        }else{
            return false;
        }
    }
    addDefaultEvents(): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string {
        return this.value;
    }
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("check-group");
        const input = <HTMLInputElement>document.createElement("input");
        input.id = this.id.toString() + this.name;
        input.type = "checkbox";
        this.type = FieldType.inputCheckbox
        input.name = this.name;
        input.value = this.value;
        if(this.value){
            input.checked = true;
        }
        const label:HTMLLabelElement = this.label.render();
        label.htmlFor = input.id;
        element.append(label);
        element.append(input);
        return element;
    }

}
