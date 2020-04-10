export class LocStorage implements Storage {
    [name: string]: any;
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
        this.setItem(key, JSON.stringify(object));
        return key;
    }
    loadDocument(string: string): object {
        const getDocument = this.getItem(string);
        return JSON.parse(getDocument);
    }
    getDocuments(): object[] {
        return JSON.parse(localStorage.getItem("1234567890"));
    }

}