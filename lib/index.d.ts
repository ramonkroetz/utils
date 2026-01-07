/** Returns the browser id of the user */
declare function getBrowserId(): Promise<string>;

/** Returns whether a CNPJ is valid or not */
declare function isValidCnpj(cnpj: string | number): boolean;

/** Returns whether a CPF is valid or not */
declare function isValidCpf(cpf: string | number): boolean;

type MimeType = 'image/png' | 'image/jpeg' | 'application/pdf';
type FileValidityAndDataURLResult = {
    isValid: boolean;
    dataURL: string;
};

/**
 * Returns an object containing a property that says if the mime type of given file
 * is valid and a property with the reader data URL
 */
declare function getFileValidityAndDataURL(file: Blob, type: MimeType): Promise<FileValidityAndDataURLResult>;

export { type FileValidityAndDataURLResult, type MimeType, getBrowserId, getFileValidityAndDataURL, isValidCnpj, isValidCpf };
