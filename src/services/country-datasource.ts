import { TypeaheadDatasource } from '../contracts/typeahead-datasource';

const countries = [
  'Canada',
  'France',
  'Mexico',
  'United Kingdom',
  'United States',
  'Italy',
  'Spain',
  'Sweden',
  'Switzerland'
]

export const countryDatasource: TypeaheadDatasource = (term: string) => {
  if (term && term.length > 1) {
    const items = countries
      .filter(country => new RegExp(term, 'i').test(country))
      .map(country => ({
        caption: country,
        value: country
      }))
    return Promise.resolve(items);
  }

  return Promise.resolve([]);
}
