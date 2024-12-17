const fsPromises = require("fs/promises")

fsPromises.readFile("./data/06-data.txt", "utf8")
.then(response => {
    const map = response.split("\n")
    console.log(map)
})


function findAndTrackGuard(array) {

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
const guardLoc = findGuard(array)

let isUp = true
let isRight = false
let isDown = false
let isLeft = false

const previousSquares = []

function trackGuard(arr, loc) {
    previousSquares.push(loc)
    if (isUp) {
        if (loc[0] === 0) {
            return "complete"
        }
        let nextSquareCoord = [loc[0] - 1, loc[1]]
        let nextSquare = arr[nextSquareCoord[0]][nextSquareCoord[1]]
        if (nextSquare === "." || nextSquare === "^") {
            return trackGuard(arr, nextSquareCoord)
        }
        if (nextSquare === "#") {
            isUp = false
            isRight = true
            nextSquareCoord = [loc[0], loc[1] + 1]
            return trackGuard(arr, nextSquareCoord)
        }
    }
    if (isRight) {
        if (loc[1] + 1 >= arr[0].length) {
            return "complete"
        }
        let nextSquareCoord = [loc[0], loc[1] + 1]
        let nextSquare = arr[nextSquareCoord[0]][nextSquareCoord[1]]
        if (nextSquare === "." || nextSquare === "^") {
            return trackGuard(arr, nextSquareCoord)
        }
        if (nextSquare === "#") {
            isRight = false
            isDown = true
            nextSquareCoord = [loc[0] + 1, loc[1]]
            return trackGuard(arr, nextSquareCoord)
        }
    }
    if (isDown) {
        if (loc[0] + 1 >= arr.length) {
            return "complete"
        }
        let nextSquareCoord = [loc[0] + 1, loc[1]]
        let nextSquare = arr[nextSquareCoord[0]][nextSquareCoord[1]]
        if (nextSquare === "." || nextSquare === "^") {
            return trackGuard(arr, nextSquareCoord)
        }
        if (nextSquare === "#") {
            isDown = false
            isLeft = true
            nextSquareCoord = [loc[0], loc[1] - 1]
            return trackGuard(arr, nextSquareCoord)
        }
    }
    if (isLeft) {
        if (loc[1] === 0) {
            return "complete"
        }
        let nextSquareCoord = [loc[0], loc[1] - 1]
        let nextSquare = arr[nextSquareCoord[0]][nextSquareCoord[1]]
        if (nextSquare === "." || nextSquare === "^") {
            return trackGuard(arr, nextSquareCoord)
        }
        if (nextSquare === "#") {
            isLeft = false
            isUp = true
            nextSquareCoord = [loc[0] - 1, loc[1]]
            return trackGuard(arr, nextSquareCoord)
        }
    }
}
trackGuard(array, guardLoc)
const uniqueArrays = Array.from(
    new Set(previousSquares.map(JSON.stringify)),  
    JSON.parse                           
  );

  return uniqueArrays.length

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