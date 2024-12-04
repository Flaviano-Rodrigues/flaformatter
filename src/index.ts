interface e {
  target: {
    value: string
    maxLength: number
    setAttribute: (callback: string, val: string) => void
  }
}

const flaformatter = (
  e: e,
  type: 'letters' | 'rg' | 'cpf' | 'cnpj' | 'cpf/cnpj' | 'telefone' | 'int' | 'celular' | 'data' | 'cep' | 'money' | 'card' | 'percent' | 'time',
  setMax = false,
  callback = null
): void => {
  // retira os caracteres indesejados...
  let val = type === 'letters' ? e.target.value.replace(/[^a-zA-Z]/g, '') : e.target.value.replace(/[^\d]/g, '')

  const max = (n: number): void => {
    if (setMax) e.target.maxLength = n
  }

  if (type === 'letters') {
    e.target.value = val
  } else {
    switch (type) {
      case 'rg':
        // 12.345.678-9
        e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
        max(12)
        break
      case 'cpf':
        // 123.123.123-12
        e.target.value = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        max(14)
        break
      case 'cnpj':
        // 12.123.123/1234-12
        e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
        max(18)
        break
      case 'cpf/cnpj':
        // 123.123.123-12 ou 12.123.123/1234-12
        val.length === 11 ? e.target.value = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : e.target.value = val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
        break
      case 'telefone':
        // 1234 1234
        e.target.value = val.replace(/(\d{4})(\d{4})/, '$1 $2')
        max(9)
        break
      case 'int':
        // Only Integers
        e.target.value = val
        break
      case 'celular':
        // (12) 12345-1234
        e.target.value = val.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        max(15)
        break
      case 'data':
        // 25/12/2022
        e.target.value = val.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
        max(10)
        break
      case 'cep':
        // 12345-123
        e.target.value = val.replace(/(\d{5})(\d{3})/, '$1-$2')
        max(9)
        break
      case 'money':

        const money = parseFloat(val)
        val = (money / 100).toFixed(2) + ''
        val = val.replace('.', ',')
        val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

        val === 'NaN' ? e.target.value = '0,00' : e.target.value = val
        max(16)
        break
      case 'percent':
        // 12.34%
        let percentValue = parseFloat(val.replace(',', '.'))

        percentValue = percentValue / 100

        if (setMax && percentValue > 100) {
          percentValue = 100
        }

        val = percentValue.toFixed(2).replace('.', ',')

        val === 'NaN' ? e.target.value = '0,00%' : e.target.value = `${val}%`

        max(6)
        break
      case 'card':
        // 1234 1234 1234 1234
        val.length === 16 ? e.target.value = val.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4') : e.target.value = val
        max(19)
        break
      case 'time':
        // 12:34
        e.target.value = val.replace(/(\d{2})(\d{2})/, '$1:$2')
        max(5)
        break
      default:
        break
    }
    if (callback != null) e.target.setAttribute(callback, val)
  }
}

export default flaformatter
