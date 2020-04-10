import { InputField } from "./InputField";
import { EmailField } from "./EmailField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { TextAreaField } from "./TextAreaField";

export class Form {
    renderElement: string = "input-wrapper";
    renderForm = [new InputField("name", "Imię"), new InputField("surname", "Nazwisko"), new EmailField("email", "E-mail"), new SelectField("fieldStudy", "Wybrany kierunek studiów", "", ["Informatyka i  ekjonometria", "Budownictwo", "Mechatronika"]), new CheckboxField("eLearning", "Czy preferujesz e-learning", "Preferuje"), new TextAreaField("comments", "Uwagi")];
    // renderForm = [new InputField("name", "imie"), InputField, EmailField, SelectField, CheckboxField, TextAreaField];
    constructor(renderElement?: string) {
        this.renderElement = renderElement ? renderElement : this.renderElement;

    }
    getValue() {
        const answer: { [key: string]: string | number } = {};

        this.renderForm.forEach(el => {
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