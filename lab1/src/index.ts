import { Form } from "./ClassForm";
import { AppConfig } from "./AppConfig";

window.addEventListener('DOMContentLoaded', (event) => {

    const form = new Form();
    document.querySelector(AppConfig.GENERATE_ACTION).addEventListener('click', () => {
        const quantity = <HTMLInputElement>document.querySelector(AppConfig.QUANTITY_FILED);

        if (!isNaN(parseInt(quantity.value))) {
            const listInputs = <HTMLDivElement>document.querySelector(AppConfig.FORM_WRAPPER);
            listInputs.innerHTML = "";
            form.generate(parseInt(quantity.value), listInputs);
            quantity.value = "";
        } else {
            showAlert("The value is not correct");
        }
    });
    document.querySelector(AppConfig.REMOVE_MORE_ACTION).addEventListener("click", form.removeMultiple);


    function showAlert(message: string) {
        alert(message);
    }
});