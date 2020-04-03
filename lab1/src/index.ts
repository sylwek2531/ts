interface IInput {
    // drive (miles: number): boolean
    type: string,
    name: string,
    generate(): HTMLInputElement,
}
class Input implements IInput {
    type: string = "text";
    name: string = "inputData";
    value: string = ""
    constructor(type?: string, name?: string, value?: string) {
        this.type = type ? type : this.type;
        this.name = name ? name : this.name;
        this.value = value ? value : this.value;
    }

    generate(event?: string, action?: EventListener): HTMLInputElement {
        const inputElement = <HTMLInputElement>document.createElement('input');
        inputElement.type = this.type;
        inputElement.name = this.name;
        inputElement.addEventListener(event, action);
        return inputElement;
    }

}
class Checkbox extends Input {
    constructor(value: string) {
        super("checkbox", "inputValue", value);
    }

}
class Button {
    text: string = "remove";
    constructor(text?: string) {
        this.text = text ? text : this.text;

    }
    generate(event?: string, action?: EventListener): HTMLButtonElement {
        const buttonElement = <HTMLButtonElement>document.createElement("button");
        buttonElement.innerText = this.text;
        buttonElement.addEventListener(event, action);
        return buttonElement;
    }
}



class Form {
    //jaki typ?
    data = {
        sum: 0,
        average: 0,
        min: 0,
        max: 0
    };


    constructor() {

        document.getElementById("generate").addEventListener('click', () => { this.generate() });
        document.querySelector("#removeMore").addEventListener("click", () => { this.removeMultiple() });

    }
    generate() {
        const quantity = <HTMLInputElement>document.getElementById("quantity");
        if (!isNaN(parseInt(quantity.value))) {
            const listInputs = <HTMLDivElement>document.getElementById("listInputs");
            listInputs.innerHTML = "";
            for (let i = 0; i < parseInt(quantity.value); i++) {
                const generate = this.generateInput(i.toString());
                listInputs.append(generate);
            }
            quantity.value = "";
        } else {
            this.showAlert("The value is not correct");
        }

    }
    showAlert(message: string) {
        alert(message);
    }
    generateInput(i: string) {
        const element = <HTMLDivElement>document.createElement("div");
        element.dataset.index = i.toString();
        const checkbox = new Checkbox(i);
        element.append(checkbox.generate());
        const input = new Input();
        const generateInput = input.generate("focusout", (e) => { this.changeValues(e) });
        element.append(generateInput);
        const button = new Button();
        const generateButton = button.generate("click", (e) => { this.removeOnce(e) });
        element.append(generateButton);
        // return `<div data-index="${i}"><input value="${i}" name="inputValue" type="checkbox"></input><input name="inputData" type="text"></input><button class="remove">usun</button></div>`
        return element;
    }

    updateData(): boolean {
        const sum: HTMLElement = document.getElementById("sum");
        const average: HTMLElement = document.getElementById("average");
        const min: HTMLElement = document.getElementById("min");
        const max: HTMLElement = document.getElementById("max");

        sum.innerText = '' + this.data.sum;
        average.innerText = '' + this.data.average;
        min.innerText = '' + this.data.min;
        max.innerText = '' + this.data.max;

        return true;
    }
    updateValues() {
        const inputs = this.getAllInputs();
        const valueInputs: Array<number> = [];
        for (let i = 0; inputs.length > i; i++) {
            const el = <HTMLInputElement>inputs[i];
            if (parseInt(el.value)) {
                valueInputs.push(parseInt(el.value));
            }
        }
        this.data.min = this.getMin(valueInputs);
        this.data.max = this.getMax(valueInputs);
        this.data.sum = this.getSum(valueInputs);
        this.data.average = valueInputs.length > 0 ? this.getSum(valueInputs) / valueInputs.length : 0;

        this.updateData();
    }

    changeValues(e: any): void {
        let input: string = (<HTMLInputElement>e.target).value;
        if (parseInt(input) || input.length == 0) {
            this.updateValues();
        }
    }

    getSum(value: Array<number>): number {
        const sum = value.reduce((a, b) => a + b, 0);
        return sum;
    }

    getMin(value: Array<number>): number {
        if (value.length == 0) {
            return 0;
        }
        const min = Math.min(...value);
        return min;
    }

    getMax(value: Array<number>): number {
        if (value.length == 0) {
            return 0;
        }
        const max = Math.max(...value);
      
        return max;
    }
    getAllInputs(): NodeListOf<HTMLInputElement> {
        return document.querySelectorAll("#listInputs input[name='inputData']");
    }

    removeOnce(e: Event) {
        const button = <HTMLButtonElement>e.target;
        const getAttributeButton = <HTMLDivElement>button.parentNode;
        const removeElement = getAttributeButton.getAttribute("data-index");
        const elem = document.querySelector(`#listInputs div[data-index='${removeElement}']`);
        elem.parentNode.removeChild(elem);
        this.updateValues();
    }
    removeMultiple() {
        const allCheckedInput = document.querySelectorAll('input[name="inputValue"]:checked')
        if (allCheckedInput.length > 0) {


            for (let i = 0; allCheckedInput.length > i; i++) {
                let el = <HTMLDivElement>(<HTMLInputElement>allCheckedInput[i]).parentNode;
                const elIndex = el.getAttribute("data-index");
                const elem = <HTMLDivElement>document.querySelector(`#listInputs div[data-index='${elIndex}']`);
                elem.parentNode.removeChild(elem);
            }
            this.updateValues();
        }
    }

}



window.addEventListener('DOMContentLoaded', (event) => {
    const form = new Form();
});