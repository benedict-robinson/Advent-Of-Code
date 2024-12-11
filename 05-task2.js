const fsPromises = require("fs/promises")

fsPromises.readFile("./data/05-data.txt", "utf8")
.then(response => {
    const first = response.split("\n")
    const middle = first.findIndex((element) => !element)
    const formattedOrders = first.slice(0, middle).map(element => {
        const regex = /\d+/g
        const nestedArr = element.match(regex)
        return nestedArr.map(num => Number(num))
    })
    const formattedPages = first.slice(middle + 1).map(element => {
        const nums = element.split(",")
        return nums.map(num => Number(num))
    })
    return Promise.all([formattedOrders, formattedPages])
})
.then((data) => {
    const orders = data[0]
    const pages = data[1]

    // const ordersObj = getOrders(orders)
    // const corrects = findCorrects(pages, ordersObj)
    // const answer = sumOfMiddles(corrects)
})

function getOrders(arr) {
    const numOrders = {}
    arr.forEach(([num1, num2]) => {
        if (numOrders[num1]) {
            numOrders[num1].push(num2)
        }
        else {
            numOrders[num1] = [num2]
        }
    })
    return numOrders
}

function findCorrects(arr, obj) {
    const correctPrints = []
    const incorrectPrints = []
    arr.forEach((element) => {
        let isSafe = true
        for (let i = 0; i < element.length; i++) {
            const currNum = element[i]
            if (obj[currNum]) {
                for (let j = 0; j < i; j++) {
                    if (obj[currNum].includes(element[j])) {
                        isSafe = false
                    }
                }
            }
        }
        if (isSafe) {
            correctPrints.push(element)
        }
        else {
            incorrectPrints.push(element)
        }
    })
    console.log({incorrectPrints, obj})
    const corrected = incorrectPrints.map((element) => {
        let newArr = []
        element.forEach((num, index) => {
            if (!obj[num] || index === 0) {
                newArr.push(num)
            }
            else {
                newArr.forEach((newNum, i) => {
                    let hasBeenInserted = false
                    if (obj[num].includes(newNum) && !hasBeenInserted) {
                        newArr.splice(i, 0, num)
                        hasBeenInserted = true
                    }
                })
            }
        })
        return newArr
    })

    return corrected
}

function sumOfMiddles(arr) {
    const middles = arr.map(element => {
        const middle = Math.floor(element.length / 2)
        return element[middle]
    })
    return middles.reduce((acc, curr) => acc + curr, 0)
}

const practicePairs = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13]
];
const practicePages = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47]
];

const practiceObj = getOrders(practicePairs)

const correctPrints = findCorrects(practicePages, practiceObj)
console.log(correctPrints)
//const practiceAnswer = sumOfMiddles(correctPrints)
