
export class Button {
    text: string = "remove";
    constructor(text?: string) {
        this.text = text ? text : this.text;

    }
    generate(): HTMLButtonElement {
        const buttonElement = <HTMLButtonElement>document.createElement("button");
        buttonElement.innerText = this.text;
        return buttonElement;
    }
}
