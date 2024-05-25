import React from 'react';
import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  InputTag,
  TimePicker,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Tooltip,
  Typography,
} from '@arco-design/web-react';
import { keys } from 'lodash';

const { Text } = Typography;

const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker, QuarterPicker, RangePicker, WeekPicker, YearPicker } =
  DatePicker;

export const GRID_TOTAL = 24;

export const TYPE_MAP_COMPONENT = {
  inputNumber: (props: Record<string, any>) => <InputNumber {...props} />,
  timePicker: (props: Record<string, any>) => <TimePicker {...props} />,
  timeRangePicker: (props: Record<string, any>) => (
    <TimePicker.RangePicker {...props} />
  ),
  checkboxGroup: (props: Record<string, any>) => <CheckboxGroup {...props} />,
  monthPicker: (props: Record<string, any>) => <MonthPicker {...props} />,
  quarterPicker: (props: Record<string, any>) => <QuarterPicker {...props} />,
  rangePicker: (props: Record<string, any>) => <RangePicker {...props} />,
  weekPicker: (props: Record<string, any>) => <WeekPicker {...props} />,
  yearPicker: (props: Record<string, any>) => <YearPicker {...props} />,
  cascader: (props: Record<string, any>) => <Cascader {...props} />,
  checkbox: (props: Record<string, any>) => <Checkbox {...props} />,
  datePicker: (props: Record<string, any>) => <DatePicker {...props} />,
  input: (props: Record<string, any>) => <Input {...props} />,
  textArea: (props: Record<string, any>) => <TextArea {...props} />,
  inputTag: (props: Record<string, any>) => <InputTag {...props} />,
  radio: (props: Record<string, any>) => <Radio {...props} />,
  radioGroup: (props: Record<string, any>) => {
    const { tipColor = '#333', tips, ...restProps } = props;
    return tips ? (
      <Tooltip color={tipColor} content={tips}>
        <RadioGroup {...restProps} />
      </Tooltip>
    ) : (
      <RadioGroup {...restProps} />
    );
  },
  rate: (props: Record<string, any>) => <Rate {...props} />,
  select: (props: Record<string, any>) => <Select {...props} />,
  slider: (props: Record<string, any>) => <Slider {...props} />,
  switch: (props: Record<string, any>) => <Switch {...props} />,
  treeSelect: (props: Record<string, any>) => <TreeSelect {...props} />,
  upload: (props: Record<string, any>) => <Upload {...props} />,
} as const;

export type SupportComponents = keyof typeof TYPE_MAP_COMPONENT;

export const VALID_RENDER_TYPE_LIST = keys(
  TYPE_MAP_COMPONENT
) as unknown as keyof typeof TYPE_MAP_COMPONENT;

export const SPECIFIC_FIELD_PROPS = {
  common: ['rules'],
  divider: [],
  avatar: ['size', 'shape'],
  image: ['preview', 'src', 'height', 'lazyload', 'width'],
  cascader: [
    'allowClear',
    'bordered',
    'disabled',
    'placeholder',
    'showSearch',
    'options',
  ],
  checkbox: ['defaultChecked', 'disabled'],
  datePicker: ['allowClear', 'disabled', 'disabledDate', 'format'],
  input: [
    'allowClear',
    'disabled',
    'showWordLimit',
    'placeholder',
    'maxLength',
  ],
  inputTag: ['allowClear', 'disabled', 'dragToSort', 'placeholder'],
  radio: ['direction', 'type', 'defaultValue', 'options'],
  rate: ['allowClear', 'allowHalf', 'disabled', 'count'],
  select: [
    'allowClear',
    'disabled',
    'placeholder',
    'mode',
    'options',
    'maxTagCount',
  ],
  slider: ['disabled', 'showTicks', 'max', 'min', 'step', 'range'],
  switch: ['type'],
  treeSelect: [
    'allowClear',
    'dragToSort',
    'treeCheckable',
    'placeholder',
    'treeData',
    'maxTagCount',
  ],
  upload: ['drag', 'multiple', 'accept', 'listType', 'tip', 'limit', 'name'],
};
