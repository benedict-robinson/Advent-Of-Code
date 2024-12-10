const fsPromises = require("fs/promises")



const practice = [ "MMMSXXMASM", "MSAMXMSMSA", "AMXSXMAAMM", "MSAMASMSMX", "XMASAMXAMM", "XXAMMXXAMA", "SMSMSASXSS", "SAXAMASAAA", "MAMMMXMMMM", "MXMXAXMASX" ]

function horizontals(arr) {
    let count = 0
    arr.forEach(str => {
        const regex = /(?=(XMAS|SAMX))/g
        const matches = str.match(regex)
        count += matches?.length || 0
    })
    return count
}

function verticals(arr) {
    let count = 0
    arr.forEach((str, indexArr) => {
        str.split("").forEach((letter, indexStr) => {
            if (letter === "X" && indexArr >= 3) {
                if (arr[indexArr - 1][indexStr] === "M" && arr[indexArr - 2][indexStr] === "A" && arr[indexArr - 3][indexStr] === "S") {
                    count++
                }
            }
            if (letter === "X" && arr.length - indexArr >= 4) {
                if (arr[indexArr + 1][indexStr] === "M" && arr[indexArr + 2][indexStr] === "A" && arr[indexArr + 3][indexStr] === "S") {
                    count++
                }
            }
        })
    })
    return count
}
function diagonals(arr) {
    let count = 0
    arr.forEach((str, indexArr) => {
        str.split("").forEach((letter, indexStr) => {
            const strLength = str.length
            if (letter === "X" && indexArr >= 3) {
                if (indexStr >= 3 && arr[indexArr - 1][indexStr - 1] === "M" && arr[indexArr - 2][indexStr - 2] === "A" && arr[indexArr - 3][indexStr - 3] === "S") {
                    count++
                }
                if (strLength - indexStr >= 4 && arr[indexArr - 1][indexStr + 1] === "M" && arr[indexArr - 2][indexStr + 2] === "A" && arr[indexArr - 3][indexStr + 3] === "S") {
                    count++
                }
            }
            if (letter === "X" && arr.length - indexArr >= 4) {
                if (indexStr >= 3 && arr[indexArr + 1][indexStr - 1] === "M" && arr[indexArr + 2][indexStr - 2] === "A" && arr[indexArr + 3][indexStr - 3] === "S") {
                    count++
                }
                if (strLength - indexStr >= 4 && arr[indexArr + 1][indexStr + 1] === "M" && arr[indexArr + 2][indexStr + 2] === "A" && arr[indexArr + 3][indexStr + 3] === "S") {
                    count++
                }
            }
        })
    })
    return count
}

function xMas(arr) {
    let count = 0
    arr.forEach((str, indexArr) => {
        if (indexArr !== 0 && indexArr !== arr.length - 1)
        str.split("").forEach((letter, indexStr) => {
            if (letter === "A" && indexStr !== 0 && indexStr !== str.length - 1) {
                if (arr[indexArr - 1][indexStr - 1] === "M" && arr[indexArr + 1][indexStr + 1] === "S") {
                    if (arr[indexArr + 1][indexStr - 1] === "M" && arr[indexArr - 1][indexStr + 1] === "S") {
                        count++
                    }
                    if (arr[indexArr + 1][indexStr - 1] === "S" && arr[indexArr - 1][indexStr + 1] === "M") {
                        count++
                    }
                }
                if (arr[indexArr - 1][indexStr - 1] === "S" && arr[indexArr + 1][indexStr + 1] === "M") {
                    if (arr[indexArr + 1][indexStr - 1] === "M" && arr[indexArr - 1][indexStr + 1] === "S") {
                        count++
                    }
                    if (arr[indexArr + 1][indexStr - 1] === "S" && arr[indexArr - 1][indexStr + 1] === "M") {
                        count++
                    }
                }
            }
        })
    })
    return count
}

console.log(xMas(practice))

fsPromises.readFile("./data/04-data.txt", "utf-8").then((response) => {
    const lines = response.split("\n")
    const total = diagonals(lines) + verticals(lines) + horizontals(lines)
    console.log(total)
    console.log(xMas(lines))
})