import { Component, h, State } from '@stencil/core';
import { TypeheadDataItem } from '../../contracts/typeahead-datasource';
import { countryDatasource } from '../../services/country-datasource';
import { TypeaheadItemRendererProps } from '../../contracts/typeahead-item-renderer-props';

/**
"
 * @param props
 */
function CountryItemRender(props: TypeaheadItemRendererProps) {
  return (
    <div>**{props?.item?.caption}</div>
  )
}

@Component({
  tag: 'location-entry-form',
  styleUrl: 'location-entry-form.css'
})
export class LocationEntryForm {

  @State() country?: string;

  handleCountryChange(evt: CustomEvent<TypeheadDataItem>) {
    this.country = evt.detail.value;
  }

  render() {
    return (
      <form>
        <label>
          <div>Country</div>
          <dhi-typeahead
            datasource={countryDatasource}
            onItemChange={this.handleCountryChange.bind(this)}
            itemRender={CountryItemRender}
          />
        </label>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          In augue libero, vulputate
        </p>
        <p>
          Selected Country: {this.country || 'not selected'}
        </p>
      </form>
    );
  }
}
