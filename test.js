
const readline = require('readline')
const { flaformatter } = require('.')


const question = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let e = {
    target: {
        value: "123456789"
    }
}


let type = "rg"

question.question('Type:', (res) => {
    type = res

    question.question('Value:', (val) => {
        e.target.value = val

        flaformatter(e, type)

        console.log('\n', `Response: ${e.target.value}`, '\n')

    })

})
