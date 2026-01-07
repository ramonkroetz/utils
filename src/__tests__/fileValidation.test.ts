import fs from 'node:fs'
import path from 'node:path'

import { getFileValidityAndDataURL } from '../fileValidation'

describe('utils', () => {
  describe('fileValidation', () => {
    const mockPath = path.resolve(__dirname, './mocks')
    const pngPath = path.resolve(mockPath, 'google-logo.png')
    const jpegPath = path.resolve(mockPath, 'view.jpeg')
    const falsePng = path.resolve(mockPath, 'false-png.png')
    const pdf = path.resolve(mockPath, 'test-pdf.pdf')
    const falsePdf = path.resolve(mockPath, 'false-pdf.pdf')
    const txtFile = path.resolve(mockPath, 'test.txt')

    it('should obtain true when asking to verify png from a png file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(pngPath)]), 'image/png')
      expect(result.isValid).toBe(true)
    })
    it('should obtain false when asking to verify jpeg from a png file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(pngPath)]), 'image/jpeg')
      expect(result.isValid).toBe(false)
    })

    it('should obtain false when asking to verify png from a jpeg file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(jpegPath)]), 'image/png')
      expect(result.isValid).toBe(false)
    })
    it('should obtain false when asking to verify jpeg from a jpeg file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(jpegPath)]), 'image/jpeg')
      expect(result.isValid).toBe(true)
    })

    it('should obtain false when asking to verify png from a fake png file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(falsePng)]), 'image/png')
      expect(result.isValid).toBe(false)
    })

    it('should obtain true when asking to verify pdf from a pdf file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(pdf)]), 'application/pdf')
      expect(result.isValid).toBe(true)
    })
    it('should obtain false when asking to verify pdf from a false pdf file', async () => {
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(falsePdf)]), 'application/pdf')
      expect(result.isValid).toBe(false)
    })

    it('should return false if the user try to send a different file that is not in the signatures', async () => {
      // @ts-expect-error
      const result = await getFileValidityAndDataURL(new Blob([fs.readFileSync(txtFile)]), 'text/plain')
      expect(result.isValid).toBe(false)
    })
  })
})
