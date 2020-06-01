import { Form } from './Form';
import './style.scss';
import { DocumentList } from './DocumentList';
import { Router } from './Router';

class App {
    constructor() {
        if (window.location.pathname == "/new-document.html") {
            const form = new Form();
            form.render();
        } else if (window.location.pathname == "/document-list.html") {
            const list = new DocumentList();
            const listRender = list.render();
            document.getElementById("list-documents").append(listRender);
        }else if (window.location.pathname == "/edit-document.html"){
            const getParam = Router.getParams("id");
            const documentList = new DocumentList();
            const getDocument = documentList.getDocument(getParam);
            const form = new Form();
            form.insertValue(getDocument);
            form.render();
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const app = new App();
});