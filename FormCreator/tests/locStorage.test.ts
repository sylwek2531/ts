import { LocStorage } from "../src/locStorage";
import { idText } from "typescript";


describe("Save form to localstorage", ()=>{
    const localStorage = new LocStorage();
    const testData = {
        "item" : "one",
        "key" : "value"
    }
    const testedKey:string = "09876543";
    
    it("Should save form in localstorage and return testedKey", ()=>{
        
        const save = localStorage.saveDocument(testData, testedKey);
        expect(save).toBe(testedKey);
    })

})