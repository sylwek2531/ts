export class Router{
    constructor(){

    }
    static getParams(key :string):string{
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const getKey = urlParams.get(key);
        return getKey;
    }
}