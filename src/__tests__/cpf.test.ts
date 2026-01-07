import { isValidCpf } from '../cpf'

describe('utils', () => {
  describe('cpf', () => {
    it('isValidCpf() validates CPF correctly', () => {
      expect(isValidCpf('95108159005')).toBe(true)
      expect(isValidCpf('951.081.590-05')).toBe(true)
      expect(isValidCpf(95108159005)).toBe(true)
      expect(isValidCpf('12345678912')).toBe(false)
      expect(isValidCpf(12345678912)).toBe(false)
      expect(isValidCpf('33333333333')).toBe(false)
      expect(isValidCpf(33333333333)).toBe(false)
      expect(isValidCpf('333.333.333-33')).toBe(false)
    })
  })
})
