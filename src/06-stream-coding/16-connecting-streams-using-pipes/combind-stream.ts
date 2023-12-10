import { createCipheriv, createDecipheriv, scryptSync } from 'crypto'
import { createGzip, createGunzip } from 'zlib'
import pumpify from 'pumpify'

function createKey(password: string) {
  return scryptSync(password, 'salt', 24)
}

export function createCompressAndEncypt(password: string, iv) {
  const key = createKey(password)
  const combinedStteam = pumpify(
    createGzip(),
    createCipheriv('aes192', key, iv)
  )
  combinedStteam.iv = iv

  return combinedStteam
}

export function createDecryptAndDecompress(password: string, iv) {
  const key = createKey(password)
  return pumpify(createGunzip(), createDecipheriv('aes192', key, iv))
}
