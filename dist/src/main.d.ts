export declare const deComposePostalCode: (postalCode: string) => {
    regionCode: string;
    tspCode: string;
    qtrVCode: string;
    postalCode: string;
};
export declare const validatePostalCode: (postalCode: string[]) => boolean;
export declare const findPostalCode: (postalCode: string) => import("../types/custom-types").PostalCode;
