
export interface Storage {
    saveDocument(object: any): string,
    loadDocument(string: string): object,
    getDocuments(): object[]
}

