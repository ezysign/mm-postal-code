"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.findPostalCode = exports.validatePostalCode = void 0;
const flatArray = __importStar(require("./flat.json"));
const data = __importStar(require("./data.json"));
const postalCodeArray = Object.assign({}, data);
const flatCodeArray = flatArray;
__exportStar(require("../types/custom-types"), exports);
const constructPostalCode = (postalCode) => {
    if (!(0, exports.validatePostalCode)(postalCode))
        return undefined;
    const splittedCode = postalCode.trim().split('');
    return {
        regionCode: `${splittedCode[0]}${splittedCode[1]}`,
        tspCode: `${splittedCode[2]}${splittedCode[3]}`,
        qtrVCode: `${splittedCode[4]}${splittedCode[5]}${splittedCode[6]}`,
        postalCode: postalCode,
    };
};
/**
 * Validate postal code
 * @param postalCode
 * @returns boolean
 */
const validatePostalCode = (postalCode) => {
    return postalCode.trim().split('').length === 7;
};
exports.validatePostalCode = validatePostalCode;
/**
 *
 * @param postalCode
 * @returns undefined | PostalCode
 */
const findPostalCode = (postalCode) => {
    const decomposed = constructPostalCode(postalCode);
    if (!decomposed)
        return undefined;
    return postalCodeArray[decomposed.regionCode][decomposed.tspCode].find((item) => item.qv_code === decomposed.qtrVCode);
};
exports.findPostalCode = findPostalCode;
/**
 *
 * @param pattern any type of string postal code| village name , etc...
 * @param lang en|mm
 * @returns undefined | PostalCode
 */
const search = (pattern, lang = 'en') => {
    const dataArray = flatCodeArray.data;
    return dataArray.filter((item) => item.postal_code.includes(pattern) ||
        item[lang].region.includes(pattern) ||
        item[lang].town_township.includes(pattern) ||
        item[lang].qv_tract.includes(pattern));
};
exports.search = search;
