const data = {
    suma: 0,
    srednia: 0,
    min: 0,
    max: 0
};
function setData() {
    const suma = document.getElementById("SUMA");
    const srednia = document.getElementById("SREDNIA");
    const min = document.getElementById("MIN");
    const max = document.getElementById("MAX");
    suma.innerText = '' + data.suma;
    srednia.innerText = '' + data.srednia;
    min.innerText = '' + data.min;
    max.innerText = '' + data.max;
}
function getAllInputs() {
    return document.querySelectorAll("input");
}
function initialize() {
    const inputs = getAllInputs();
    for (let i = 0; inputs.length > i; i++) {
        inputs[i].addEventListener('input', changeValues);
    }
    setData();
}
function updateValues() {
    const inputs = getAllInputs();
    const valueInputs = [];
    for (let i = 0; inputs.length > i; i++) {
        const el = inputs[i];
        // console.log(el.value);
        valueInputs.push(Number(el.value));
    }
    data.min = getMin(valueInputs);
    data.max = getMax(valueInputs);
    data.suma = getSum(valueInputs);
    data.srednia = getSum(valueInputs) / valueInputs.length;
    setData();
}
function getSum(value) {
    const sum = value.reduce((a, b) => a + b, 0);
    return sum;
}
function getMin(value) {
    const min = Math.min(...value);
    return min;
}
function getMax(value) {
    const min = Math.min(...value);
    return min;
}
function changeValues(e) {
    if (Number(e.target.value)) {
        updateValues();
    }
}
initialize();
//# sourceMappingURL=index.js.map