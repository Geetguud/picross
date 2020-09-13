import React, {useState, useEffect} from "react";
import "./pointer.css";

function Pointer(props) {
    const {on, table, highlight} = props;
    const position = on === "left" ? table : table[0];
    const pointers = position.map((each, index) => <PointerBuild key={(on + index)} on={on} index={index} table={table} highlight={highlight} />);
    const classes = on === "left" ? "pointer-deck left" : "pointer-deck top";

    return (
        <div className={classes}>
            {pointers}
        </div>
    )
}

function PointerBuild(props) {
    const {on, index, table, highlight} = props;
    const text = detect(table, on, index);
    const [classe, setClasse] = useState("pointer");
    
    useEffect(() => {
        let classes = on === "left" ? "pointer point-left" : "pointer point-top";
        if (on === "left" && highlight[1] === index) { classes += " highlight-left"; }
        else if (on === "top" && highlight[0] === index) { classes += " highlight-top"; };
        setClasse(classes);
    }, [highlight])

    return (
        <div className={classe}>
            {text}
        </div>
    )
}

function detect(table, on, index) {
    if (on === "left") {
        const target = table[index].slice();
        let detected = [];
        let detecting = 1;
        for (let i = 0; i < target.length; i++) {
            if (target[i] === false) { continue; }
            if (target[i + 1] === true) {
                detecting++;
            } else {
                detected.push(detecting);
                detecting = 1;
            }
        }
        if (detected.length === 0) { return "0" }
        return detected.map((each, index) => <p key={on + index}>{each}</p>)
    } else if (on === "top") {
        const target = table.slice();
        const y = target.length;
        let detected = [];
        let detecting = 1;
        for (let i = 0; i < y; i++) {
            if (target[i][index] === false) { continue; }
            if (i === (y - 1)) {
                detected.push(detecting);
                detecting = 1;
                continue;
            }
            if (target[i + 1][index] === true) {
                detecting++;
            } else {
                detected.push(detecting);
                detecting = 1;
            }
        }
        if (detected.length === 0) { return "0" }
        return detected.map((each, index) => <p key={on + index}>{each}</p>)
    }
}

export default Pointer;