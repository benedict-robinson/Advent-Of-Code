const fsPromises = require("fs/promises")

fsPromises.readFile("./data/02-data.txt", "utf-8")
.then((data) => {
    const splitData = data.split("\n")
    const formattedData = splitData.map(element => {
        const numArr = element.split(" ")
        return numArr.map(num => Number(num))
    })
    //console.log(formattedData)
   //console.log(assessDanger(formattedData))
})
.catch((err) => {
    console.log(err)
})

function assessDanger(arr) {
    const safe = arr.map(element => {
        return assessIndividual(element) ? true : false
    })
    return safe.filter(e => e).length
}

function assessIndividual(array) {
    let isBigger = 0
    let isSmaller = 0
    let isSame = 0
    let isTooGreatDifference = 0
    let unsafe = false
    array.forEach((num, index) => {
        if (num > array[index-1]) isBigger++
        if (num < array[index - 1]) isSmaller++
        const difference = Math.abs(num - array[index - 1])
        if (num === array[index - 1]) isSame++
        if (difference && difference > 3) isTooGreatDifference++
        console.log({num, isBigger, isSmaller, unsafe, difference})      
    })
    if (isBigger && isSmaller || unsafe) {
        return false
    }
    return true
}

const arrTest = [[1, 3, 4, 7, 19, 23], [6, 4, 2, 1], [5, 7, 1, 9, 2, 5], [90, 56, 23], [67, 68, 68, 69], [567, 568, 570, 571]]
const expected = [false, true, false, false, false, true]

console.log(assessDanger(arrTest))
