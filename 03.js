const fsPromises = require("fs/promises")

fsPromises.readFile("./data/03-data.txt", "utf-8")
.then((response) => {
    const regex = /mul\(\d+,\d+\)/gm
    const uncorrupteds = response.match(regex)
    const answers = uncorrupteds.map(equation => {
        const nums = equation.match(/\d+/g)
        return Number(nums[0]) * Number(nums[1])
    })
    console.log(answers.reduce((acc, curr) => acc + curr))
})

fsPromises.readFile("./data/03-data.txt", "utf-8")
.then((response) => {
    const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/gm
    const uncorrupteds = response.match(regex)
    let isEnabled = true
    let count = 0
    uncorrupteds.forEach((element) => {
        if (element === "do()") {
            isEnabled = true
        }
        else if (element === "don't()") {
            isEnabled = false
        }
        else if (isEnabled) {
            const nums = element.match(/\d+/g)
            const answer = Number(nums[0]) * Number(nums[1])
            count += answer
        }
    })
    console.log(count)
})