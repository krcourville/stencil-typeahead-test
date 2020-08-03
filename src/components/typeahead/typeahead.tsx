import { Component, h, Prop, State, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { TypeaheadDatasource, TypeheadDataItem } from '../../contracts/typeahead-datasource';
import { TypeaheadItemRendererProps } from '../../contracts/typeahead-item-renderer-props';
import Debounce from 'debounce-decorator';

function DefaultItemRenderer(props: TypeaheadItemRendererProps) {
  return (
    <span>{props?.item?.caption}</span>
  )
}


@Component({
  tag: 'dhi-typeahead',
  styleUrl: 'typeahead.css'
})
export class Typeahead {

  @Element() el: HTMLElement;

  @Prop() datasource?: TypeaheadDatasource;
  @Prop() itemRender?: (props: TypeaheadItemRendererProps) => any;

  @State() term?: string;
  @State() items?: TypeheadDataItem[];
  @State() open = false;
  @State() selectedItem?: TypeheadDataItem;
  @State() selectedIdx?: number = -1;

  @Event() itemChange: EventEmitter<TypeheadDataItem>;

  @Listen('click', { target: 'document' })
  handleClickOutside(evt: any) {
    if (!this.el.contains(evt.target)) {
      this.open = false;
    }
  }

  @Listen('keydown')
  handleComponentKeyPress(evt: any) {
    const { key } = evt;
    if (evt.target.type === 'text') {
      const ignoreKeys = ['ArrowDown', 'ArrowUp', 'Enter'];
      if (ignoreKeys.includes(key)) {
        evt.preventDefault();
      }
    }

    switch (key) {
      case 'Escape':
        this.open = false;
        break;
      case 'ArrowDown':
        if (this.items && this.selectedIdx < this.items.length - 1) {
          this.selectedIdx++;
          if (this.items.length) {
            this.open = true;
          }
        }
        break;
      case 'ArrowUp':
        if (this.items && this.selectedIdx > 0) {
          this.selectedIdx--;
          if (this.items.length) {
            this.open = true;
          }
        }
        break;
      case 'Enter':
        this.handleSelect(this.items[this.selectedIdx], this.selectedIdx);
    }

  }

  @Debounce(250)
  async handleInputKeyPress(evt: any) {
    const { key } = evt;
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter') {
      evt.preventDefault();
      return false;
    }
    this.selectedIdx = -1;

    let term: string = evt.target.value;
    if (!term) {
      this.open = false;
      return;
    }

    term = term.trim();

    if (term && term.length && this.term != term) {
      this.term = term;
      if (typeof this.datasource == 'function') {
        this.items = await this.datasource(term);
        this.open = this.items.length > 0;
      }
    } else {
      this.open = false;
    }
  }

  handleSelect = (item: TypeheadDataItem, idx: number) => {
    this.selectedItem = item;
    this.selectedIdx = idx;
    this.open = false;
    this.itemChange.emit(item);
  };

  render() {
    const ItemRender = this.itemRender || DefaultItemRenderer;
    return (
      <div class="typeahead">
        <input onKeyDown={this.handleInputKeyPress.bind(this)}
          value={this.selectedItem && this.selectedItem.caption} />

        {this.open &&
          <div class="overlay">
            {this.items && this.items.map((item, idx) => (
              <div class={'typeahead-item ' + (this.selectedIdx === idx ? 'selected' : '')}
                onClick={() => this.handleSelect(item, idx)}>
                <ItemRender item={item}/>
              </div>
            ))}
          </div>
        }

      </div>
    );
  }
}
