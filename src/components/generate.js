function generateTable(size) {
    let table = [];
    const [sizeX, sizeY] = size;
    const constant = (sizeX * sizeY);
    const min = (constant - generateRandom(Math.round(constant * 2/5), Math.round(constant * 3/5)));
    const max = (constant - generateRandom(Math.round(constant * 1/5), Math.round(constant * 3/10)));
    let actives = generateRandom(min, max);

    for (let i = 0; i < sizeY; i++) {
        table.push([]);
        for (let j = 0; j < sizeX; j++) {
            table[i].push(false);
        }
    }

    while (actives > 0) {
        for (let i = 0; i < sizeY && actives > 0; i++) {
            for (let j = 0; j < sizeX && actives > 0; j++) {
                if (table[i][j] === false) {
                    if (generateActive() === true) {
                        actives--;
                        table[i][j] = true;
                    }
                }
            }
        }
    }
    
    return table;
}

function generateActive() {
    const condition1 = generateRandom(1, 1000);
    const condition2 = generateRandom(-1000, 0);
    const res = generateRandom(condition2, condition1);
    if (res < -100 || res > 100) { return false }
    return true
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default generateTable;