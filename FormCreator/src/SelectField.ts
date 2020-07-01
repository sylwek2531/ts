import { Field } from "./IField";
import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";

export class SelectField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.select;
    value: string;
    option: string[];
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string, option?: string[]) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
        this.option = option;
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
        element.classList.add("select-group");
        const select = <HTMLSelectElement>document.createElement("select");
        select.id = this.id.toString() + this.name;
        if (this.option.length > 0) {
            this.option.forEach(el => {
                const option = document.createElement("option");
                option.innerText = el;
                option.value = el;
                select.appendChild(option);
            })
        }
        select.name = this.name;
        select.value = this.value;
        element.append(this.label.render());
        element.append(select);
        return element;
    }

}