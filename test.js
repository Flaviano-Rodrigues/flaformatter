
const { exit } = require('process')
const readline = require('readline')
const { flaformatter } = require('.')


const question = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: line => {
        const completions = [
            'rg',
            'cpf/cnpj',
            'cnpj',
            'cpf',
            'telefone',
            'int',
            'celular',
            'data',
            'cep',
            'money',
            'card',
        ]
        const hits = completions.filter((c) => c.startsWith(line))
        // show all completions if none found
        return [hits.length ? hits : completions, line]
    }
})

let e = {
    target: {
        value: "123456789"
    }
}


let type = "rg"

question.question('Type: (rg) ', res => {
    res != "" ? type = res : ''

    question.question('Value: (123456789) ', val => {
        val != '' ? e.target.value = val : ''

        flaformatter(e, type)

        console.log('\n', `Response: ${e.target.value}`, '\n')

        exit()
    })

})

