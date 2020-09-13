import generateTable from "./generate";

function initialize(operator, size) {
    const {setTable, setInitialActive, setLeft, setMistakes, setHighlight} = operator;

    const init = generateTable(size);
    setTable(init);
    setInitialActive(init.flat().filter(each => each).length);
    setLeft(init.flat().filter(each => each).length);
    setMistakes(0);
    setHighlight([null, null]);
    
    const root = document.documentElement;
    const computeSize = (50 / Math.max(...size));
    root.style.setProperty("--x", size[0]);
    root.style.setProperty("--y", size[1]);
    root.style.setProperty("--size", computeSize + "rem");
}

export default initialize;