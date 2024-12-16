const fsPromises = require("fs/promises")

fsPromises.readFile("./data/06-data.txt", "utf8")
.then(response => {
    const map = response.split("\n")
})


function findGuard(arr) {
    let count = 0
    const guardLocation = []
    arr.forEach((element, index) => {
        if (element.indexOf("^") !== -1) {
            guardLocation.push(index)
            guardLocation.push(element.indexOf("^"))
        }
    })
    return guardLocation
}

function trackGuard(arr, loc) {
    console.log({arr, loc})
    let isUp = true
    let isRight = false
    let isDown = false
    let isLeft = false
    if (isUp) {
        const nextSquareCoord = [loc[0] - 1, loc[1]]
        let nextSquare = arr[nextSquareCoord[0]][nextSquareCoord[1]]
        if (nextSquare === ".") {
            const newArr = [...arr]
            newArr[nextSquareCoord[0]][nextSquareCoord[1]] = "^"
            newArr[loc[0]][loc[1]] = "."
            trackGuard(newArr, nextSquareCoord)
        }
    }
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
const guardLoc = findGuard(grid)

console.log(trackGuard(grid, guardLoc))