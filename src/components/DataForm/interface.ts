import { RulesProps } from '@arco-design/web-react';
import { TreeSelectDataType } from '@arco-design/web-react/es/TreeSelect/interface';
import { ItemExtra } from './helper';
import { SupportComponents } from './constants';

export type BroadcastDataFormAction =
  | 'validate'
  | 'setFieldsValue'
  | 'resetFields';

export interface FormColLayout {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  };
}

export interface DataFormBlock {
  title: string;
  key?: string;
  subtitle?: string;
  hidden?: boolean;
  extra?: {
    renderType?: 'text' | 'button' | 'link';
  }[];
  children?: DataFormBlock[];
  items?: DataFormItem[];
  relatives?: {
    type: FormItemRelativeType.hideBlock | FormItemRelativeType.showBlock;
    listsLogic: ListsLogic;
    lists: {
      field: string;
      value: string;
      logic?: 'or';
    }[];
  };
}

interface FormItemOption {
  value: string;
  label: string;
  children?: FormItemOption[];
  disabled?: boolean;
}

export const enum FormItemRelativeType {
  hideOrDisplay = 'hideOrDisplay',
  hideItem = 'hideItem',
  showItem = 'showItem',
  hideBlock = 'hideBlock',
  showBlock = 'showBlock',
  fieldMap = 'fieldMap',
}

export type ListsLogic = 'and' | 'or';

export interface FormItemRelative {
  type:
    | FormItemRelativeType.fieldMap
    | FormItemRelativeType.hideItem
    | FormItemRelativeType.showItem
    | FormItemRelativeType.hideOrDisplay;
  lists?: {
    field: string;
    value: string;
    logic?: 'or';
  }[];
  listsLogic?: ListsLogic;
  maps?: {
    dependentField: string;
    pairs: Record<string, any>;
  };
}

export interface DataFormItem {
  key?: string | number; // if the value of property is empty, we'll automatically generate one unique key
  renderType: SupportRenderType;
  label: string;
  field: string;
  hidden?: boolean;
  initialValue?: unknown;
  defaultValue?: unknown;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean; // This quickly way to mark current field is required
  src?: string;
  allowClear?: boolean;
  defaultChecked?: boolean;
  maxTagCount?: number;
  autoSize?: boolean;
  maxLength?: number;
  allowHalf?: boolean;
  count?: number;
  max?: number;
  min?: number;
  step?: number;
  type?: 'circle' | 'round' | 'line';
  switchSize?: 'small' | 'default';
  checkedText?: string | number;
  uncheckedText?: string | number;
  options?: FormItemOption[];
  treeData?: TreeSelectDataType[];
  rules?: RulesProps<any>[];
  drag?: boolean;
  multiple?: boolean;
  accept?: string;
  listType?: 'text' | 'picture-list' | 'picture-card';
  tip?: string;
  relatives?: FormItemRelative;
  extra?: string | ItemExtra;
}

export type DataFormSource = DataFormBlock[] | DataFormItem[];

export type SupportRenderType =
  | 'inputNumber'
  | 'timePicker'
  | 'checkboxGroup'
  | 'monthPicker'
  | 'quarterPicker'
  | 'rangePicker'
  | 'weekPicker'
  | 'yearPicker'
  | 'cascader'
  | 'checkbox'
  | 'datePicker'
  | 'input'
  | 'textArea'
  | 'inputTag'
  | 'radio'
  | 'radioGroup'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'treeSelect'
  | 'upload';

export interface FormCommonProps {
  enableGroup: boolean;
  sourceData: DataFormBlock[] | DataFormItem[];
  gridColumns: number;
  isDisabled: boolean;
  isVisible: boolean;
  enableScrollContent: boolean;
  animateLoading: boolean;
  labelAlign: 'left' | 'right';
  labelCol: number;
  enableEnterRecord: boolean;
  gutter: number | number[];
  formLayout: 'horizontal' | 'vertical';
  showColon?: boolean;
  formSize?: 'default' | 'mini' | 'small' | 'large';
  groupHeaderTheme?: 'classic' | 'accordion';
  onFormRef?: (formRef: any) => void;
}

// declare interface UpdateMetaValuesAndActiveField {
//   onUpdateMetaValuesAndActiveField: (
//     activeField: Record<string, any>,
//     fieldValues: Record<string, any>
//   ) => void;
// }

export interface RenderLinkageItemParams {
  field: any;
  initialValue: any;
  label: any;
  providedProps: any;
  relatives?: FormItemRelative;
  renderType: SupportComponents;
  required: any;
  rules: any;
  values: any;
  disabled?: boolean;
  extra?: string | ItemExtra;
}
