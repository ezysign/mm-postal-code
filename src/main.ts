import * as data from './data.json'
import { CodeData } from '../types/custom-types'

const postalCodeArray: CodeData = { ...data }

export const deComposePostalCode = (
  postalCode: string,
): { regionCode: string; tspCode: string; qtrVCode: string; postalCode: string } | undefined => {
  const splittedCode = postalCode.split('')
  if (!validatePostalCode(splittedCode)) return undefined
  return {
    regionCode: `${splittedCode[0]}${splittedCode[1]}`,
    tspCode: `${splittedCode[2]}${splittedCode[3]}`,
    qtrVCode: `${splittedCode[4]}${splittedCode[5]}${splittedCode[6]}`,
    postalCode: postalCode,
  }
}

export const validatePostalCode = (postalCode: string[]): boolean => {
  return postalCode.length === 7
}

export const findPostalCode = (postalCode: string) => {
  const decomposed = deComposePostalCode(postalCode)
  if (!decomposed) return undefined

  return postalCodeArray[decomposed.regionCode][decomposed.tspCode].find(
    (item) => item.qv_code === decomposed.qtrVCode,
  )
}

console.log(findPostalCode('1101001'))
