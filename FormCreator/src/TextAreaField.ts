import { Field } from "./IField";
import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";

export class TextAreaField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.textarea;
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
        element.classList.add("textarea-group");
        const input = <HTMLTextAreaElement>document.createElement("textarea");
        input.id = this.id.toString() + this.name;
        input.name = this.name;
        input.value = this.value;
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}