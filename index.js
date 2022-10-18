exports.flaformatter = function (e, type, setMax = false, callback = null) {

    //retira os caracteres indesejados...
    let val = type === "letters" ? e.target.value.replace(/[^a-zA-Z]/g, '') : e.target.value.replace(/[^\d]/g, "")

    if (type === "letters") {
        e.target.value = val
    } else {
        switch (type) {
            case 'rg':
                // 12.345.678-9
                e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4")
                setMax ? e.target.maxLength = 12 : ''
                break
            case 'cpf':
                // 123.123.123-12
                e.target.value = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                setMax ? e.target.maxLength = 14 : ''
                break
            case 'cnpj':
                // 12.123.123/1234-12
                e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
                setMax ? e.target.maxLength = 18 : ''
                break
            case 'cpf/cnpj':
                // 123.123.123-12 ou 12.123.123/1234-12
                val.length === 11 ? e.target.value = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
                break
            case 'telefone':
                // 1234 1234
                e.target.value = val.replace(/(\d{4})(\d{4})/, "$1 $2")
                setMax ? e.target.maxLength = 9 : ''
                break
            case 'int':
                // Only Integers
                e.target.value = val
                break
            case 'celular':
                // (12) 12345-1234
                e.target.value = val.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
                setMax ? e.target.maxLength = 14 : ''
                break
            case 'data':
                // 25/12/2022
                e.target.value = val.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
                setMax ? e.target.maxLength = 10 : ''
                break
            case 'cep':
                // 12345-123
                e.target.value = val.replace(/(\d{5})(\d{3})/, "$1-$2")
                setMax ? e.target.maxLength = 9 : ''
                break
            case 'money':

                val = parseFloat(val)
                val = (val / 100).toFixed(2) + ''
                val = val.replace(".", ",")
                val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

                val == 'NaN' ? e.target.value = '0,00' : e.target.value = val
                setMax ? e.target.maxLength = 16 : ''
                break
            case 'card':
                // 1234 1234 1234 1234
                val.length == 16 ? e.target.value = val.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4") : e.target.value = val
                setMax ? e.target.maxLength = 19 : ''
                break
            default:
                break
        }
        callback != null ? e.target.setAttribute(callback, val) : ''
    }
}