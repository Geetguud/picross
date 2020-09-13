import React, { useState } from "react";
import "./sidebar.css";

function Sidebar(props) {
    const {initialActive, activeLeft, mistakes, initializing} = props;
    const progress = Math.round(((initialActive - activeLeft) / initialActive) * 10000) / 100;
    const [opted, setOpted] = useState("10x10");

    function optin(event) { setOpted(event.target.value); }

    function newgame() {
        const size = opted.split("x").map(each => parseInt(each));
        initializing(size);
    }

    return (
        <div className="sidebar flex-center">
            <h1 className="title">picross</h1>
            <p className="progress">oofs: {mistakes}</p>
            <p className="progress">progress: {progress}%</p>
            <p className="progress">tile left: {activeLeft}</p>
            <div className="settings flex-center">
                <p className="setup">setting</p>
                <label className="setup">size:
                    <select className="size-opt setting-opt" value={opted} onChange={optin}>
                        <option value="5x5">5 x 5</option>
                        <option value="10x5">10 x 5</option>
                        <option value="10x10">10 x 10</option>
                        <option value="15x10">15 x 10</option>
                        <option value="15x15">15 x 15</option>
                        <option value="20x15">20 x 15</option>
                        <option value="20x20">20 x 20</option>
                    </select>
                </label>
                <button className="newgame setting-opt" onClick={() => newgame()}>new game</button>
            </div>
            <button className="changelight setting-opt" onClick={() => changelight()}>change light</button>
        </div>
    )
}

function changelight() {
    const root = document.documentElement;
    const varLight = ["--lighterlight", "--light", "--darklight", "--darkerlight"];
    const varDark = ["--darkerdark", "--dark", "--lightdark", "--lighterdark"];
    const valueLight = varLight.map(each => getComputedStyle(root).getPropertyValue(each));
    const valueDark = varDark.map(each => getComputedStyle(root).getPropertyValue(each));
    varLight.forEach((each, index) => { root.style.setProperty(each, valueDark[index]); });
    varDark.forEach((each, index) => { root.style.setProperty(each, valueLight[index]); });
}

export default Sidebar;