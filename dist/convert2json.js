"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const enResults = [];
const mmResults = [];
fs_1.default.createReadStream('csv/Myanmar_Locations_Postal_Code_EN.csv')
    .pipe((0, csv_parser_1.default)())
    .on('data', (data) => {
    const codes = data.postal_code.split('');
    const postalcodeObject = Object.assign(Object.assign({}, data), {
        region_code: `${codes[0]}${codes[1]}`,
        town_ship_code: `${codes[2]}${codes[3]}`,
        qv_code: codes.length > 6 ? `${codes[4]}${codes[5]}${codes[6]}` : `${codes[4]}${codes[5]}`,
    });
    enResults.push(postalcodeObject);
})
    .on('end', () => { });
fs_1.default.createReadStream('csv/Myanmar_Locations_Postal_Code_MM.csv')
    .pipe((0, csv_parser_1.default)())
    .on('data', (data) => {
    const codes = data.postal_code.split('');
    const postalcodeObject = Object.assign(Object.assign({}, data), {
        region_code: `${codes[0]}${codes[1]}`,
        town_ship_code: `${codes[2]}${codes[3]}`,
        qv_code: codes.length > 6 ? `${codes[4]}${codes[5]}${codes[6]}` : `${codes[4]}${codes[5]}`,
    });
    mmResults.push(postalcodeObject);
})
    .on('end', () => {
    const data = enResults.map((item, index) => {
        // console.log(item);
        return Object.assign({
            en: {
                region: item['﻿region_name'],
                town_township: item.town_township,
                qv_tract: item.quarter_village_tract,
            },
            mm: {
                region: mmResults[index]['﻿region_name'],
                town_township: mmResults[index].town_township,
                qv_tract: mmResults[index].quarter_village_tract,
            },
        }, { tsp_code: item.town_ship_code, region_code: item.region_code, postal_code: item.postal_code, qv_code: item.quarter_village_code });
    });
    const regionGrouped = groupBy(data, 'region_code');
    Object.entries(regionGrouped).forEach((item) => {
        regionGrouped[item[0]] = groupBy(regionGrouped[item[0]], 'tsp_code');
        //   Object.entries(regionGrouped[item[0]]).forEach((village) => {
        //     regionGrouped[item[0]][village[0]] = groupBy(
        //       village[1],
        //       "quarter_village_tract"
        //     );
        //   });
    });
    fs_1.default.writeFileSync('src/data.json', JSON.stringify(regionGrouped));
});
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        ;
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
//# sourceMappingURL=convert2json.js.map