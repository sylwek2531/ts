import { FieldType } from "./ETypeField";
import { IInput } from "./IInput";
import { AppConfig } from "./AppConfig";

export class Input implements IInput {
    //skoro implementuje interfejs z danymi typami, czy muze typować jescze raz w klasie te atrybuty?? , czemu nie/tak??
    type: string = FieldType.text;
    name: string = AppConfig.D_INPUT_NAME;
    value: string = ""
    events: string[] = ["focusout", "input", "change"]
    constructor(type?: string, name?: string, value?: string) {
        this.type = type ? type : this.type;
        this.name = name ? name : this.name;
        this.value = value ? value : this.value;
    }

    generate(): HTMLInputElement {
        const inputElement = <HTMLInputElement>document.createElement('input');
        inputElement.type = this.type;
        inputElement.name = this.name;
        return inputElement;
    }
    addEvents(element: HTMLInputElement): void {
        this.events.forEach(e => element.addEventListener(e, event => this.updateValue(<HTMLInputElement>event.target)));
    }
    updateValue(e: HTMLInputElement): void {
        this.value = e.value;
    }

}