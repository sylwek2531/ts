console.log("test");

enum FieldType {
    "inputText",
    "textarea",
    "inputDate",
    "inputEmail",
    "inputCheckbox",
    "select"
}

interface Field {
    name: string,
    label: FieldLabel,
    type: FieldType,
    value: string,
    render(): HTMLElement
}

class FieldLabel {
    label: string = "label";
    constructor(label: string) {
        this.label = label ? label : this.label
    }
    render(): HTMLLabelElement {
        const label = document.createElement("label");
        label.innerText = this.label;
        return label;
    }
}
class InputField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }

}
class TextAreaField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    
}
class DateField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    
}
class EmailField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    
}
class SelectField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    
}
class CheckboxField implements Field{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }

}