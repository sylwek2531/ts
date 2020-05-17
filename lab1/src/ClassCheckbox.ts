import { Input } from "./ClassInput";
import { FieldType } from "./ETypeField";
import { AppConfig } from "./AppConfig";

export class Checkbox extends Input {
    constructor(value: string) {
        super(FieldType.checkbox, AppConfig.D_CHECKBOX_NAME, value);
    }

}