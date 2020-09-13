import React, {useState, useEffect} from "react";
import "./board.css";

function Board(props) {
    const {table, activeLeft, setLeft, setMistakes, highlight, setHighlight} = props;
    const tiles = table.map((each, y) => each.map((tile, x) => <Boardtile key={`${x}, ${y}`} xy={[x, y]} table={table} status={tile} activeLeft={activeLeft} setLeft={setLeft} setMistakes={setMistakes} highlight={highlight} setHighlight={setHighlight} />));

    return (
        <div id="board">
                {tiles.flat()}
        </div>
    )
}

function Boardtile(props) {
    const {table, status, activeLeft, setLeft, setMistakes, highlight, setHighlight} = props;
    const [x, y] = props.xy;
    const [active, setActive] = useState(true);
    const [oofstyle] = useState({transform: `rotate(${Math.floor(Math.random() * 360) + 1}deg)`});
    const [classes, setClasses] = useState("");

    useEffect(() => { setActive(true); }, [table]);
    
    useEffect(() => {
        let classe = "tile";
        if ((x - y) % 2 === 0) { classe += " checker"; }
        if (!active) { classe = status ? "tile-inactive" : "tile-inactive oof flex-center"; }
        if (activeLeft === 0) { classe += " done"; }
        setClasses(classe);
    }, [active, activeLeft]);

    function setOff() {
        if (!active || activeLeft === 0) { return }
        if (status) {
            setLeft(prevState => prevState - 1);
        } else { setMistakes(prevState => prevState + 1); }
        setActive(false);
    }

    function unhighlight() {
        if (highlight[0] !== x || highlight[1] !== y) { return }
        setHighlight([null, null]);
    }

    return (
        <div className={classes} onClick={() => setOff()} onMouseEnter={() => setHighlight([x, y])} onMouseLeave={() => unhighlight()}>{!active && !status ? <p style={oofstyle}>oof</p> : null}</div>
    )
}

export default Board;