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
        this.label = label ? label : this.label;
        this.render();
    }
    render(): HTMLLabelElement {
        const label = document.createElement("label");
        label.innerText = this.label;
        return label;
    }
}
class InputField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.inputText;
    value: string;
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
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
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}
class TextAreaField implements Field {
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
class DateField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.inputDate;
    value: string;
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
    }
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("input-group");
        const input = <HTMLInputElement>document.createElement("input");
        input.id = this.id.toString() + this.name;

        input.type = "date";
        input.name = this.name;
        input.value = this.value;
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}
class EmailField implements Field {
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
class SelectField implements Field {
    name: string;
    label: FieldLabel;
    type: FieldType.select;
    value: string;
    option: string[];
    id: number = new Date().getTime();
    constructor(name: string, label: string, value?: string, option?: string[]) {
        this.name = name;
        this.label = new FieldLabel(label);
        this.value = value ? value : "";
        this.option = option;
    }
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("select-group");
        const select = <HTMLSelectElement>document.createElement("select");
        select.id = this.id.toString() + this.name;
        if (this.option.length > 0) {
            this.option.forEach(el => {
                const option = document.createElement("option");
                option.innerText = el;
                option.value = el;
                select.appendChild(option);
            })
        }
        select.name = this.name;
        select.value = this.value;
        element.append(this.label.render());
        element.append(select);
        return element;
    }

}
class CheckboxField implements Field {
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
    render(): HTMLDivElement {
        const element = document.createElement("div");
        element.classList.add("form-group");
        element.classList.add("check-group");
        const input = <HTMLInputElement>document.createElement("input");
        input.id = this.id.toString() + this.name;
        input.type = "checkbox";
        input.name = this.name;
        input.value = this.value;
        element.append(this.label.render());
        element.append(input);
        return element;
    }

}

class Form {
    renderElement: string = "input-wrapper";
    renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", ["Informatyka i  ekjonometria", "Budownictwo", "Mechatronika"]), new CheckboxField("eLearning", "Czy preferujesz e-learning", "Preferuje"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "imie"), InputField, EmailField, SelectField, CheckboxField, TextAreaField];
    constructor(renderElement?: string) {
        this.renderElement = renderElement ? renderElement : this.renderElement;

    }
    getValue() {
        const answer: {[key:string] : string|number} = {};

        this.renderForm.forEach(el =>{
            answer[el.name] = (<HTMLInputElement>document.getElementById(el.id + el.name)).value;
        })
        return answer;
    }
    render() {
        const forms = document.createElement("div");
        this.renderForm.forEach(el => forms.append(el.render()));
        const renderElement: HTMLElement = document.getElementById(this.renderElement);
        renderElement.append(forms);
    }
}
class App {
    constructor() {
        const form = new Form();
        form.render();
        document.getElementById("save").addEventListener("click", () => {
            console.log(form.getValue());
        })
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const app = new App();
});