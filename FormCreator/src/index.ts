import { Form } from './Form';
import './style.scss';
import { DocumentList } from './DocumentList';

class App {
    constructor() {
        if (window.location.pathname == "/new-document.html") {
            const form = new Form();
            form.render();
        } else if (window.location.pathname == "/document-list.html") {
            const list = new DocumentList();
            const listRender = list.render();
            document.getElementById("list-documents").append(listRender);
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const app = new App();
});