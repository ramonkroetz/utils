import { isValidCnpj } from '../cnpj'

describe('utils', () => {
  describe('cnpj', () => {
    it('isValidCnpj() validates CNPJ correctly', () => {
      expect(isValidCnpj('73400598000180')).toBe(true)
      expect(isValidCnpj('73.400.598/0001-80')).toBe(true)
      expect(isValidCnpj(73400598000180)).toBe(true)
      expect(isValidCnpj('12.345.678/9123-45')).toBe(false)
      expect(isValidCnpj(12345678912345)).toBe(false)
    })
  })
})
