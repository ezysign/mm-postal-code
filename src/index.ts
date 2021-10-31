import * as flatArray from './flat.json'
import * as data from './data.json'
import { CodeData, PostalCode } from '../types/custom-types'

const postalCodeArray: CodeData = { ...data }
const flatCodeArray = flatArray as { data: PostalCode[] }

export * from '../types/custom-types'

const constructPostalCode = (
  postalCode: string,
): { regionCode: string; tspCode: string; qtrVCode: string; postalCode: string } | undefined => {
  if (!validatePostalCode(postalCode)) return undefined
  const splittedCode = postalCode.trim().split('')
  return {
    regionCode: `${splittedCode[0]}${splittedCode[1]}`,
    tspCode: `${splittedCode[2]}${splittedCode[3]}`,
    qtrVCode: `${splittedCode[4]}${splittedCode[5]}${splittedCode[6]}`,
    postalCode: postalCode,
  }
}
/**
 * Validate postal code
 * @param postalCode
 * @returns boolean
 */
export const validatePostalCode = (postalCode: string): boolean => {
  return postalCode.trim().split('').length === 7
}
/**
 *
 * @param postalCode
 * @returns undefined | PostalCode
 */
export const findPostalCode = (postalCode: string) => {
  const decomposed = constructPostalCode(postalCode)
  if (!decomposed) return undefined

  return postalCodeArray[decomposed.regionCode][decomposed.tspCode].find(
    (item) => item.qv_code === decomposed.qtrVCode,
  )
}
/**
 *
 * @param pattern any type of string postal code| village name , etc...
 * @param lang en|mm
 * @returns undefined | PostalCode
 */
export const search = (pattern: string, lang: 'en' | 'mm' = 'en') => {
  const dataArray = flatCodeArray.data as PostalCode[]
  return dataArray.filter(
    (item: PostalCode) =>
      item.postal_code.includes(pattern) ||
      item[lang].region.includes(pattern) ||
      item[lang].town_township.includes(pattern) ||
      item[lang].qv_tract.includes(pattern),
  )
}
