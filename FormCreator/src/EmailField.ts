import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";
import { Field } from "./IField";

export class EmailField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.inputEmail;
    value: string;
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
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
        element.classList.add("input-group");
        const input = <HTMLInputElement>document.createElement("input");
        input.id = this.id.toString() + this.name;
        input.type = "email";
        input.name = this.name;
        input.value = this.value;
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}