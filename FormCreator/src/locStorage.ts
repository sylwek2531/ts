export class LocStorage implements Storage {
    [name: string]: any;
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
        localStorage.removeItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    saveDocument(object: any): string {
        const key: string = Date.now().toString();
        const getDocuments = this.getDocuments();
        if (getDocuments.length == 0) {
            this.setItem(this.keyMain, JSON.stringify([]));
        } 
        getDocuments.push(key);
        this.setItem(this.keyMain, JSON.stringify(getDocuments));

        this.setItem(key, JSON.stringify(object));
        return key;
    }
    loadDocument(string: string): object {
        const getDocument = this.getItem(string);
        return JSON.parse(getDocument);
    }
    getDocuments(): string[] {
        let documents = localStorage.getItem(this.keyMain) ? JSON.parse(localStorage.getItem(this.keyMain)) : [];

        return documents;
    }

}