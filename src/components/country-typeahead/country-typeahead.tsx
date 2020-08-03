import { h, Component} from '@stencil/core';
import { countryDatasource } from '../../services/country-datasource';

/**
 * TODO: what is a good way to handle this?
 * Do we really want to add another component just to set a datasource?
 * Extend dhi-typeahead and set a default datasource?
 * @param props
 */

@Component({
  tag: 'dhi-country-typeahead',
  styleUrl: 'country-typeahead.css'
})
export class CountryTypeahead {

  render() {
    return (
      <dhi-typeahead datasource={countryDatasource}/>
    );
  }
}


