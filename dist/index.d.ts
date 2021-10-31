import { PostalCode } from '../types/custom-types';
export * from '../types/custom-types';
/**
 * Validate postal code
 * @param postalCode
 * @returns boolean
 */
export declare const validatePostalCode: (postalCode: string) => boolean;
/**
 *
 * @param postalCode
 * @returns undefined | PostalCode
 */
export declare const findPostalCode: (postalCode: string) => PostalCode;
/**
 *
 * @param pattern any type of string postal code| village name , etc...
 * @param lang en|mm
 * @returns undefined | PostalCode
 */
export declare const search: (pattern: string, lang?: 'en' | 'mm') => PostalCode[];
