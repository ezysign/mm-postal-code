import csv from 'csv-parser'
import fs from 'fs'

const enResults = []
const mmResults = []
fs.createReadStream('csv/Myanmar_Locations_Postal_Code_EN.csv')
  .pipe(csv())
  .on('data', (data) => {
    const codes = data.postal_code.split('')
    const postalcodeObject = {
      ...data,
      ...{
        region_code: `${codes[0]}${codes[1]}`,
        town_ship_code: `${codes[2]}${codes[3]}`,
        qv_code: codes.length > 6 ? `${codes[4]}${codes[5]}${codes[6]}` : `${codes[4]}${codes[5]}`,
      },
    }
    enResults.push(postalcodeObject)
  })
  .on('end', () => {})

fs.createReadStream('csv/Myanmar_Locations_Postal_Code_MM.csv')
  .pipe(csv())
  .on('data', (data) => {
    const codes = data.postal_code.split('')
    const postalcodeObject = {
      ...data,
      ...{
        region_code: `${codes[0]}${codes[1]}`,
        town_ship_code: `${codes[2]}${codes[3]}`,
        qv_code: codes.length > 6 ? `${codes[4]}${codes[5]}${codes[6]}` : `${codes[4]}${codes[5]}`,
      },
    }

    mmResults.push(postalcodeObject)
  })
  .on('end', () => {
    const data = enResults.map((item, index) => {
      // console.log(item);
      return {
        ...{
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
        },
        tsp_code: item.town_ship_code,
        region_code: item.region_code,
        postal_code: item.postal_code,
        qv_code: item.quarter_village_code,
      }
    })

    const regionGrouped = groupBy(data, 'region_code')
    Object.entries(regionGrouped).forEach((item) => {
      regionGrouped[item[0]] = groupBy(regionGrouped[item[0]], 'tsp_code')
      //   Object.entries(regionGrouped[item[0]]).forEach((village) => {
      //     regionGrouped[item[0]][village[0]] = groupBy(
      //       village[1],
      //       "quarter_village_tract"
      //     );
      //   });
    })

    fs.writeFileSync('write.json', JSON.stringify(regionGrouped))
  })

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
