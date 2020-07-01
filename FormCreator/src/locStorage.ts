import { Router } from "./Router";

export class LocStorage implements Storage {
    //[name: string]: any;
    keyMain: string = "1234567890";
    length: number;
    clear(): void {
        localStorage.clear();
    }
    getItem(key: string): string {
        return localStorage.getItem(key);
    }
    key(index: number): string {
        return localStorage.key(index);
    }
    removeItem(key: string): void {
        return localStorage.removeItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    saveDocument(object: any, getId : string): string {
        //drugia parametr id
        // const getId = Router.getParams("id");
        
        if(!getId){
            let key: string = Date.now().toString();
            const getDocuments = this.getDocuments();
            if (getDocuments.length == 0) {
                this.setItem(this.keyMain, JSON.stringify([]));
            } 
            getDocuments.push(key);
            this.setItem(this.keyMain, JSON.stringify(getDocuments));
            this.setItem(key, JSON.stringify(object));
            return key;
        }else{
            this.setItem(getId, JSON.stringify(object));
            return getId;
        }

    }
    loadDocument(string: string): object {
        const getDocument = this.getItem(string);
        return JSON.parse(getDocument);
    }
    getDocuments(): string[] {
        let documents = localStorage.getItem(this.keyMain) ? JSON.parse(localStorage.getItem(this.keyMain)) : [];
        return documents;
    }
    removeDocument(id:string):void{
        const getDocuments = this.getDocuments();
        const index = getDocuments.indexOf(id, 0);
        if (index > -1) {
            getDocuments.splice(index, 1);
        }
        this.setItem(this.keyMain, JSON.stringify(getDocuments));
        this.removeItem(id);
    }

}