export interface ListSearcherProps {
  onChange: Function;
  searchKey: string;
  onSubmit: Function;
  selectableValues: Array<any>;
  listComponent?: any;
  label?:string;
  isLoading?: boolean;
  style?: any;
  isFocused?: boolean;
  onTextFieldClick: Function;
}
