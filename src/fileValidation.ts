import type { FileValidityAndDataURLResult, MimeType } from './types'

const MIME_TYPES: Record<MimeType, string[]> = {
  'image/png': ['89504e47'],
  'image/jpeg': ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2'],
  'application/pdf': ['255044462d'],
}

async function getBlobFileHeader(file: Blob, signatures: string[]) {
  return new Promise<string>((resolve): void => {
    const fileReader = new FileReader()

    fileReader.onloadend = (event) => {
      if (typeof event.target?.result !== 'string') {
        const biggestSignature = signatures.sort((a, b) => a.length - b.length)[signatures.length - 1]

        const bufferArray = new Uint8Array(event.target?.result || [])
        const bufferHead = bufferArray.subarray(0, biggestSignature.length / 2)
        const header = Array.from(bufferHead).reduce((acc, byte) => acc + byte.toString(16), '')
        resolve(header)
      } else {
        resolve('')
      }
    }

    fileReader.readAsArrayBuffer(file)
  })
}

/**
 * Returns an object containing a property that says if the mime type of given file
 * is valid and a property with the reader data URL
 */
export function getFileValidityAndDataURL(file: Blob, type: MimeType) {
  return new Promise<FileValidityAndDataURLResult>((resolve) => {
    const reader = new FileReader()

    reader.onloadend = async () => {
      const signatures = MIME_TYPES[type]
      const dataURL = reader.result as string

      if (signatures) {
        const headerString = await getBlobFileHeader(file, signatures)

        const isValid = signatures.some((signature) => headerString.startsWith(signature))

        resolve({ isValid, dataURL })
      } else {
        resolve({ isValid: false, dataURL })
      }
    }

    reader.readAsDataURL(file)
  })
}
