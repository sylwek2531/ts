import { Form } from './Form';
import './style.scss';
import { DocumentList } from './DocumentList';
import { Router } from './Router';
import { FormCreator } from './FormCreator';
import { DocumentsRelations } from './relations/Documents';

class App {
    constructor() {
        if (window.location.pathname == "/new-document.html") {
            const getParam = Router.getParams("id");
            const form = new Form(getParam);
            form.render();
        } else if (window.location.pathname == "/document-list.html") {
            const list = new DocumentList();
            const listRender = list.render();
            document.getElementById("list-documents").append(listRender);
        }else if (window.location.pathname == "/edit-document.html"){
            const getParam = Router.getParams("id");
            const documentList = new DocumentList();
            const getDocument = documentList.getDocument(getParam);
            if(getDocument === null){
                window.location.replace("/index.html");
            }
            const relations = new DocumentsRelations();
            const idDocument:string = relations.getIdFormByIdDocument(getParam)
            const form = new Form(idDocument);
            form.insertValue(getDocument);
            form.render();
        }else if(window.location.pathname == "/form-creator.html"){
            const creatorForm = new FormCreator();
            creatorForm.newForm();

        }
        else if(window.location.pathname == "/form-list.html"){
            
            const creatorForm = new DocumentList("9876543");
            const list = creatorForm.renderForms();
            document.getElementById("list-forms").append(list);

        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    const app = new App();
});