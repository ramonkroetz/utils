const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

// Code from http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js

/** Returns whether a CPF is valid or not */
export function isValidCpf(cpf: string | number) {
  const isMasked = CPF_REGEX.test(cpf.toString())
  const testedCpf = isMasked ? cpf.toString().replace(/[^\d]/g, '') : cpf.toString()

  let sum = 0
  if (
    testedCpf === '00000000000' ||
    testedCpf === '11111111111' ||
    testedCpf === '22222222222' ||
    testedCpf === '33333333333' ||
    testedCpf === '44444444444' ||
    testedCpf === '55555555555' ||
    testedCpf === '66666666666' ||
    testedCpf === '77777777777' ||
    testedCpf === '88888888888' ||
    testedCpf === '99999999999'
  ) {
    return false
  }

  for (let i = 1; i <= 9; i++) {
    sum += Number(testedCpf.substring(i - 1, i)) * (11 - i)
  }

  let remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number(testedCpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += Number(testedCpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number(testedCpf.substring(10, 11))) return false
  return true
}
