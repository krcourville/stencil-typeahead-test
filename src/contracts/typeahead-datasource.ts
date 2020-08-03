export interface TypeheadDataItem {
  caption: string;
  value: any;
}

export interface TypeaheadDatasource {
  (term: string): Promise<TypeheadDataItem[]>
}
