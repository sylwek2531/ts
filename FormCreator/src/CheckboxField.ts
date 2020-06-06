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
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}
