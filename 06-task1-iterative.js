const fsPromises = require("fs/promises")

fsPromises.readFile("./data/06-data.txt", "utf8")
.then(response => {
    const map = response.split("\n")
    console.log(findAndTrackGuard(map))
})

function findAndTrackGuard(array) {
    
    function findGuard(arr) {
        for (let i = 0; i < arr.length; i++) {
            const j = arr[i].indexOf("^");
            if (j !== -1) return [i, j];
        }
        return null;
    }

    const directions = {
        up: [-1, 0],
        right: [0, 1],
        down: [1, 0],
        left: [0, -1]
    };

    let direction = "up"; 
    const visited = new Set(); 
    const rows = array.length;
    const cols = array[0].length;

    let [x, y] = findGuard(array);

    const coordToString = (a, b) => `${a},${b}`;

    visited.add(coordToString(x, y));

    while (true) {
        let [dx, dy] = directions[direction];
        let nextX = x + dx;
        let nextY = y + dy;

        if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
            break;
        }

        const nextSquare = array[nextX][nextY];

        if (nextSquare === "." || nextSquare === "^") {
            
            x = nextX;
            y = nextY;
            visited.add(coordToString(x, y));
        } else if (nextSquare === "#") {
            
            if (direction === "up") direction = "right";
            else if (direction === "right") direction = "down";
            else if (direction === "down") direction = "left";
            else if (direction === "left") direction = "up";
        }
    }

    return visited.size; 
}

const grid = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#..."
];

console.log(findAndTrackGuard(grid))
