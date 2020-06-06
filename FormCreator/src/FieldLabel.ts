export class FieldLabel {
    label: string = "label";
    constructor(label: string) {
        this.label = label ? label : this.label;
        this.render();
    }
    render(): HTMLLabelElement {
        const label = document.createElement("label");
        label.innerText = this.label;
        return label;
    }
}