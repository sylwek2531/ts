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
                list.innerText = el.toString();
                createList.append(list);
            })
            return createList;
        }
        createList.innerText = "Brak";
        return createList;
    }
}