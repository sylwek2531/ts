import { LocStorage } from "./locStorage";

export class DocumentList {
    allDocuments: string[];
    constructor(){
        this.getDocumentList();
    }
    getDocumentList() {
        const getAllDocuemnt = new LocStorage();
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
    getDocument(id:string):object{
        const getDocument = new LocStorage();
        return  getDocument.loadDocument(id);
    }
    removeDocument(id:string,e:Event){
        const button = <HTMLButtonElement> e.target;
        (button.parentNode as HTMLUListElement).remove();
            const removeDocument = new LocStorage();
            removeDocument.removeDocument(id);
    }
}