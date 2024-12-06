const fsPromises = require("fs/promises")

fsPromises.readFile("./data/02-data.txt", "utf-8")
.then((data) => {
    const splitData = data.split("\n")
    const formattedData = splitData.map(element => {
        const numArr = element.split(" ")
        return numArr.map(num => Number(num))
    })
    //console.log(formattedData)
   console.log(assessDanger(formattedData))
})
.catch((err) => {
    console.log(err)
})

function assessDanger(arr) {
    const safe = arr.map((elements, index) => {
        const assessed = []
        elements.forEach((num, index) => {
            assessed.push(assessIndividual(elements.filter((element, index2) => index2 !== index)))
        })
        return assessed
    })
    const safesPostDamp = safe.map(arr => {
        if (!arr.includes(true)) {
            return false
        }
        return true
    })
    console.log(safesPostDamp)
    return safesPostDamp.filter(e => e).length
}

function assessIndividual(array) {
    let isBigger = 0
    let isSmaller = 0
    let unsafe = false
    array.forEach((num, index) => {
        if (num > array[index-1]) isBigger++
        if (num < array[index - 1]) isSmaller++
        const difference = Math.abs(num - array[index - 1])
        if (num === array[index - 1]) unsafe = true
        if (difference && difference > 3) unsafe = true  
        console.log({num, isBigger, isSmaller, unsafe, difference})      
    })
    if (isBigger && isSmaller || unsafe) {
        return false
    }
    return true
}

const arrTest = [[1, 3, 4, 7, 19, 23], [6, 4, 2, 1], [5, 7, 1, 9, 2, 5], [90, 56, 23], [67, 68, 68, 69], [567, 568, 570, 571]]
const expected = [false, true, false, false, false, true]

//console.log(assessDanger(arrTest))
