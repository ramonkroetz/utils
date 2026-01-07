const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

// Code from https://www.geradorcnpj.com/javascript-validar-testedCnpj.htm

/** Returns whether a CNPJ is valid or not */
export function isValidCnpj(cnpj: string | number) {
  const isMasked = CNPJ_REGEX.test(cnpj.toString())
  const testedCnpj = isMasked ? cnpj.toString().replace(/[^\d]+/g, '') : cnpj.toString()

  if (testedCnpj === '') return false

  if (testedCnpj.length !== 14) return false

  const knownInvalidCnpjs = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ]

  if (knownInvalidCnpjs.includes(testedCnpj)) return false

  // Valida DVs
  let length = testedCnpj.length - 2
  let numbers = testedCnpj.substring(0, length)
  const digits = testedCnpj.substring(length)
  let sum = 0
  let position = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * position--
    if (position < 2) position = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result.toString() !== digits.charAt(0)) return false

  length++
  numbers = testedCnpj.substring(0, length)
  sum = 0
  position = length - 7
  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * position--
    if (position < 2) position = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

  if (result.toString() !== digits.charAt(1)) return false

  return true
}
