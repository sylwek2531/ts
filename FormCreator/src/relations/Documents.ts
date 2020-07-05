import { LocStorage } from "../locStorage"

export class DocumentsRelations{
    key:string = "relationsFormsDocuments" 
    locStorageInstance:LocStorage;

    constructor(){
        this.locStorageInstance = new LocStorage(this.key);
    }
    getIdFormByIdDocument(idDocument:string):string{
        const getRelations:string[] = this.locStorageInstance.getDocuments();
        const relations = this.parseToRelationsType(getRelations);
        const idForm = relations.find((el)=>el.idDocument == idDocument);
        return idForm.idForm;
    }
    parseToRelationsType(data:Array<string>){
        const relations:Array<DocumentsRelationsType> = data.map(el=>{
            return JSON.parse(JSON.stringify(el));
        })
        return relations;
    }
    saveDocumentRelations(idDocument:string, idForm: string){
        const relation:DocumentsRelationsType = {
            idDocument: idDocument,
            idForm: idForm,
        }
        this.locStorageInstance.saveDocumentRelation(relation);
    }
}
type DocumentsRelationsType = {
    idDocument: string;
    idForm: string;
}