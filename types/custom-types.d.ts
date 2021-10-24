export interface En {
  region: string;
  town_township: string;
  qv_tract: string;
  postal_code: string;
  region_code: string;
  tsp_code: string;
  qv_code: string;
}

export interface Mm {
  region: string;
  town_township: string;
  qv_tract: string;
  postal_code: string;
  region_code: string;
  tsp_code: string;
  qv_code: string;
}

export interface PostalCode {
  en: En;
  mm: Mm;
  tsp_code: string;
  region_code: string;
  postal_code: string;
  qv_code: string;
}

export interface TownShipCodeData {
  [townshipCode: string]: Array<PostalCode>;
}
export interface CodeData {
  [regionCode: string]: TownShipCodeData;
}
