# Myanmar Postal Code 
All Region & State Location Data With Postal Code 
**(7 Digit For Quarter &amp; Village Tract)**

![alt text](https://github.com/MyanmarPost/MyanmarPostalCode/blob/main/Myanmar_Postal-Code-Explained.png?raw=true)

# About Postal Code

The postal code is a combination of **Seven Numbers**, which define three different levels of geographical unit. It is part of a coding system created and used by the Myanmar Post for sorting mail. The postal codes are an abbreviated form of address, which enable a group of delivery points (a delivery point being a property or business location) to be specifically identified.

# Usage

```javascript
// return postal code Object
/*
{
  en: {
    region: 'Bago Region (East)',
    town_township: 'Kaytumati Town',
    qv_tract: 'Ta Pin Shwe Htee Quarter'
  },
  mm: {
    region: 'ပဲခူးတိုင်းဒေသကြီး (အရှေ့)',
    town_township: 'ကေတုမတီ မြို့',
    qv_tract: 'တပင်ရွှေထီး ရပ်ကွက်'
  },
  tsp_code: '68',
  region_code: '08',
  postal_code: '0868002',
  qv_code: '002'
}
*/
findPostalCode('0868002')

// Wild card search Search by township or postal code or region
search('Bago')

search('Bago Township')


```


# Postal Code Definition
- Each postal code consists of three parts. The first part is the state or region code. 
- The second part enables mail to be sent to the correct local area for delivery.
This part of the code contains the town and township district to which the mail is to be
delivered.
- The final part is used to sort the mail at the local area delivery office. It
consists of three numeric character followed by town and township area. The last three number define quarter or village tract within the sector.

# Valid Formats

The following table contains the valid formats of a postal code. 
> ***For example:***

| Region / State  |         Town/ Township       |   Quarter/ Village Tract    |
|-----------------|------------------------------|-----------------------------|
|     08          |             68               |          `'002'`            |
| Bago Region     | Kaytumadi Town               | `'Ta Pin Shwe Htee Quarter'`|

# Data Format
All data format only support unicode standard (ISO-10646).
> Only Support **Unicode**



# License

Postal code data is published under `GPL 3.0` license and copyright to [© Myanmar Post](https://myanmarpost.com.mm). Original 'Postal Codes' were created by Myanmar Post.


The utils lib and codes is published under **MIT** LICENSE.



