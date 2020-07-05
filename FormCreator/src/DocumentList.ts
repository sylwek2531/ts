import { LocStorage } from "./locStorage";

export class DocumentList {
    allDocuments: string[];
    key:string;
    constructor(key?:string){
        if(key && key.length){
            this.key = key;
        }
        this.getDocumentList();
    }
    getDocumentList() {
        const getAllDocuemnt = new LocStorage(this.key);
        this.allDocuments = getAllDocuemnt.getDocuments();
    }
    render(): HTMLUListElement {
        const createList = document.createElement("ul");
        createList.classList.add("list-documents")
        if(this.allDocuments.length > 0){
        
            this.allDocuments.forEach(el => {
                const list = document.createElement("li");
                const a = document.createElement("a");
                a.href = "edit-document.html?id="+el; 
                a.innerText = el.toString();
                list.append(a);
                const button = document.createElement("button");
                button.classList.add("delete-action");
                button.innerText = "Usuń";
                button.addEventListener("click", (e)=>{
                    this.removeDocument(el,e);
                })
                list.append(button);
                createList.append(list);
            })
            return createList;
        }
        createList.innerText = "Brak";
        return createList;
    }
    renderForms(): HTMLUListElement {
        const createList = document.createElement("ul");
        createList.classList.add("list-documents")
        if(this.allDocuments.length > 0){
        
            this.allDocuments.forEach(el => {
                const list = document.createElement("li");
                const a = document.createElement("a");
                a.href = "new-document.html?id="+el; 
                const form = this.getDocument(el.toString());
                a.innerText = form["title"];
                list.append(a);
                const button = document.createElement("button");
                button.classList.add("delete-action");
                button.innerText = "Usuń";
                button.addEventListener("click", (e)=>{
                    this.removeDocument(el,e);
                })
                list.append(button);
                createList.append(list);
            })
            return createList;
        }
        createList.innerText = "Brak";
        return createList;
    }
    getDocument(id:string):any{
        const getDocument = new LocStorage();
        return  getDocument.loadDocument(id);
    }
    removeDocument(id:string,e:Event){
        const button = <HTMLButtonElement> e.target;
        (button.parentNode as HTMLUListElement).remove();
            const removeDocument = new LocStorage(this.key);
            removeDocument.removeDocument(id);
    }
}
