import { Field } from "./IField";
import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";

export class InputField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.inputText;
    value: string;
    id: number = new Date().getTime();
    events: string[] = ["focusout", "input", "change"]
    constructor(name: string, label: string, value?: string) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
    }
    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string {
        return this.value;
    }
    addDefaultEvents(): void {
        // this.events.forEach(e => element.addEventListener(e, event => this.setValue(<string>(<HTMLInputElement>event.target).value)));
    }
    setValue(value:string) :boolean{
        this.value = value;
        if(this.getValue() === value){
            return true;
        }else{
            return false;
        }
    }
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("input-group");
        const input = <HTMLInputElement>document.createElement("input");
        input.id = this.id.toString() + this.name;
        input.type = "text";
        input.name = this.name;
        input.value = this.value;

        //this.type wumagany tutaj? jesli nie a weysoetlam nie mam tego klucza
        this.type = FieldType.inputText
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}