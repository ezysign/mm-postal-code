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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostalCode = exports.validatePostalCode = exports.deComposePostalCode = void 0;
const data = __importStar(require("./data.json"));
const postalCodeArray = Object.assign({}, data);
const deComposePostalCode = (postalCode) => {
    const splittedCode = postalCode.split('');
    if (!(0, exports.validatePostalCode)(splittedCode))
        return undefined;
    return {
        regionCode: `${splittedCode[0]}${splittedCode[1]}`,
        tspCode: `${splittedCode[2]}${splittedCode[3]}`,
        qtrVCode: `${splittedCode[4]}${splittedCode[5]}${splittedCode[6]}`,
        postalCode: postalCode,
    };
};
exports.deComposePostalCode = deComposePostalCode;
const validatePostalCode = (postalCode) => {
    return postalCode.length === 7;
};
exports.validatePostalCode = validatePostalCode;
const findPostalCode = (postalCode) => {
    const decomposed = (0, exports.deComposePostalCode)(postalCode);
    if (!decomposed)
        return undefined;
    return postalCodeArray[decomposed.regionCode][decomposed.tspCode].find((item) => item.qv_code === decomposed.qtrVCode);
};
exports.findPostalCode = findPostalCode;
console.log((0, exports.findPostalCode)('1101001'));
//# sourceMappingURL=main.js.map