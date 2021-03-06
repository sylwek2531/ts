import { FieldLabel } from "./FieldLabel";
import { FieldType } from "./EFieldType";

export interface Field {
    name: string,
    label: FieldLabel,
    type: FieldType,
    value: string,
    render(): HTMLElement,
    getValue(): string,
    setValue(value:string): boolean,
    addDefaultEvents(element : HTMLElement):void,
}   

