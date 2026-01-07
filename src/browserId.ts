import Fingerprint from '@fingerprintjs/fingerprintjs'

/** Returns the browser id of the user */
export async function getBrowserId() {
  const fpPromise = await Fingerprint.load()
  const result = await fpPromise.get()
  return result.visitorId
}
