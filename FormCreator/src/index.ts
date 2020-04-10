import { Form } from './Form';


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