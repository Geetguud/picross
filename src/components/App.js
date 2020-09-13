import React, {useState, useEffect} from "react";
import Board from "./Board";
import Sidebar from "./Sidebar";
import Pointer from "./Pointer";
import initialize from "./initialize";

function App() {
    const [table, setTable] = useState(null);
    const [activeLeft, setLeft] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [highlight, setHighlight] = useState([null, null]);
    const [initialActive, setInitialActive] = useState(null);
    const initOperator = {setTable, setInitialActive, setLeft, setMistakes, setHighlight};

    function initializing(size) { initialize(initOperator, size); }
    
    useEffect(() => { initialize(initOperator, [10, 10]) }, []);

    if (table === null) { return null }
    
    return (
        <main className="main flex-center">
            <div id="board-area">
                <Pointer 
                    on={"left"}
                    table={table}
                    highlight={highlight}
                />
                <Pointer 
                    on={"top"}
                    table={table}
                    highlight={highlight}
                />
                <Board 
                    table={table} 
                    activeLeft={activeLeft}
                    setLeft={setLeft} 
                    setMistakes={setMistakes} 
                    highlight={highlight}
                    setHighlight={setHighlight}
                />
            </div>
            <Sidebar
                initialActive={initialActive}
                activeLeft={activeLeft} 
                mistakes={mistakes} 
                initializing={initializing}
            />
        </main>
    )
}

export default App;