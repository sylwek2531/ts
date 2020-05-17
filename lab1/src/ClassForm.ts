import { Checkbox } from "./ClassCheckbox";
import { Input } from "./ClassInput";
import { Button } from "./ClassButton";
import { AppConfig } from "./AppConfig";

export class Form {
    data = {
        sum: 0,
        average: 0,
        min: 0,
        max: 0
    };

    constructor() { }

    generate(quantity: number, listInputs: HTMLElement) {
        for (let i = 0; i < quantity; i++) {
            const generate = this.generateInput(i.toString());
            listInputs.append(generate);
        }

    }

    generateInput(i: string): HTMLElement {
        const element = <HTMLDivElement>document.createElement("div");
        element.dataset.index = i.toString();

        const checkbox = new Checkbox(i);
        element.append(checkbox.generate());

        const input = new Input();
        const generateInput = input.generate();
        input.addEvents(generateInput);
        element.append(generateInput);


        const button = new Button();
        const generateButton = button.generate();
        generateButton.addEventListener("click", this.removeOnce);
        element.append(generateButton);

        return element;
    }

    updateData(): boolean {
        const sum: HTMLElement = document.querySelector(AppConfig.SUM_FIELD);
        const average: HTMLElement = document.querySelector(AppConfig.AVERAGE_FIELD);
        const min: HTMLElement = document.querySelector(AppConfig.MIN_FIELD);
        const max: HTMLElement = document.querySelector(AppConfig.MAX_FIELD);

        sum.innerText = '' + this.data.sum;
        average.innerText = '' + this.data.average;
        min.innerText = '' + this.data.min;
        max.innerText = '' + this.data.max;

        return true;
    }
    //update Values dokonczyc, czy update  zinputa czy z formu
    updateValues(): void {
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

    // changeValues(e: any): void {
    //     let input: string = (<HTMLInputElement>e.target).value;
    //     if (parseInt(input) || input.length == 0) {
    //         this.updateValues();
    //     }
    // }

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
        return document.querySelectorAll(`${AppConfig.FORM_WRAPPER} input[name='${AppConfig.D_INPUT_NAME}']`);
    }

    removeOnce(e: Event): void {
        const button = <HTMLButtonElement>e.target;
        const getAttributeButton = <HTMLDivElement>button.parentNode;
        const removeElement = getAttributeButton.getAttribute("data-index");
        const elem = document.querySelector(`${AppConfig.FORM_WRAPPER} div[data-index='${removeElement}']`);
        elem.parentNode.removeChild(elem);
        this.updateValues();
    }
    removeMultiple(): void {
        const allCheckedInput = document.querySelectorAll(`input[name="${AppConfig.D_CHECKBOX_NAME}"]:checked`)
        if (allCheckedInput.length > 0) {


            for (let i = 0; allCheckedInput.length > i; i++) {
                let el = <HTMLDivElement>(<HTMLInputElement>allCheckedInput[i]).parentNode;
                const elIndex = el.getAttribute("data-index");
                const elem = <HTMLDivElement>document.querySelector(`${AppConfig.FORM_WRAPPER} div[data-index='${elIndex}']`);
                elem.parentNode.removeChild(elem);
            }
            this.updateValues();
        }
    }

}