import countriesModule from 'node-countries';

function sortArrayByParam(targetArray, param) {
  // sorts an array of objects by a property in ascending order
  return targetArray.sort((obj1, obj2) => {
    if (obj1[param].toLowerCase() > obj2[param].toLowerCase()) {
      return 1;
    }
    return -1;
  });
}

function getCountriesAndStates() {
  let rejectFields = [
    'JSON',
    'getCountryByName',
    'findCountryByName',
    'getCountryByNameOrShortName',
    'findCountryByNameOrShortName'
  ];
  const allCountries = Object.keys(countriesModule)
    .filter(thizKey => !rejectFields.includes(thizKey))
    .map(thizKey => countriesModule[thizKey]);
  const allCountriesSorted = sortArrayByParam(allCountries, 'name');

  const transformed = allCountriesSorted
    .map(({ name: label, alpha2: value }) => ({ label, value }));

  return transformed;
}

const list = getCountriesAndStates();

console.info(list)

export default list;
