const fs = require('fs')
const fsPromises = require('fs').promises

function compareLengths(arr1, arr2) {
    const sortedLeft = arr1.sort((a,b) => a - b)
    const sortedRight = arr2.sort((a,b) => a - b)
    const distances = []
    sortedLeft.forEach((num, index) => {
        distances.push(Math.abs(num - sortedRight[index]))
    })
    return distances.reduce((acc, curr) => acc + curr)
}

function similarityScore(arr1, arr2) {
    const similarities = []
    arr1.forEach((element) => {
        const inRightSide = arr2.filter(e => e === element).length
        similarities.push(inRightSide * element)
    })
    return similarities.reduce((acc, curr) => acc + curr)
}

fs.readFile('./data/01-data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const leftList = []
    const rightList = []
    const regex = /[\n   ]/
    const splitData = data.split(regex).filter(element => element)
    splitData.forEach((element, index) => {
        if (index % 2 === 1) rightList.push(element)
        else leftList.push(element)
    })

    console.log(similarityScore(leftList, rightList))
  });


// const left = [3,4,2,1,3,3]
// const right = [4,3,5,3,9,3]
// console.log(similarityScore(left, right))




 