

const data = {
    suma: 0,
    srednia: 0,
    min: 0,
    max:0
}  

function setData(){
    const suma = document.getElementById("SUMA");
    const srednia = document.getElementById("SREDNIA");
    const min = document.getElementById("MIN");
    const max = document.getElementById("MAX");

    suma.innerText = ''+data.suma;
    srednia.innerText = ''+data.srednia;
    min.innerText = ''+data.min;
    max.innerText = ''+data.max;
}

function getAllInputs(){
   return document.querySelectorAll("input");
}


//add listener
function initialize(){
    const inputs = getAllInputs();
    for( let i = 0; inputs.length > i; i++){
        inputs[i].addEventListener('input', changeValues);
    }
    setData();
}
//function get value from all select
// function updateValues(value : number){
function updateValues(){
    const inputs = getAllInputs();
    const valueInputs : Array<number> = [];
    for( let i = 0; inputs.length > i; i++){
        const el = <HTMLInputElement>inputs[i];
        console.log(el.value)
       valueInputs.push(Number(el.value));
    }
    data.min = getMin(valueInputs);
    data.max = getMax(valueInputs);
    data.suma = getSum(valueInputs);
    data.srednia = getSum(valueInputs) / valueInputs.length;

    setData();
}

function getSum(value : Array<number>): number{
    const sum = value.reduce((a, b) => a + b, 0);
    return sum;
}

function getMin(value : Array<number>): number{
    const min = Math.min( ...value  );
    return min;
}
function getMax(value : Array<number>): number{
    const min = Math.min( ...value  );
    return min;
}

function changeValues(e : any) : void{
    if(Number(e.target.value)){
    // const value : number = (Number(e.target.value));
    //   updateValues(value);
      updateValues();
    }
}
initialize();
