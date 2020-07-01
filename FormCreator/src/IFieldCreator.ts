import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

export interface IFieldCreator{
    name: InputField,
    label: InputField,
    type: SelectField,
    value: InputField
}