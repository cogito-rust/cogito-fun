import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Grid } from '@arco-design/web-react';
import { every, isArray, isObject, isUndefined } from 'lodash';

import {
  DataFormItem,
  FormColLayout,
  FormCommonProps,
  FormItemRelative,
  FormItemRelativeType,
  RenderLinkageItemParams,
} from './interface';
import { TYPE_MAP_COMPONENT } from './constants';
import { SingleFormContainer } from './styles';
import {
  checkIsValidFromItemRelatives,
  genSingleFormInitialValues,
} from './helper';
import _ from 'lodash';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

const GRID_TOTAL = 24;

type SingleFormProps = Omit<
  FormCommonProps,
  | 'sourceData'
  | 'enableGroup'
  | 'labelCol'
  | 'groupHeaderTheme'
  | 'enableScrollContent'
  | 'isVisible'
  | 'enableEnterRecord'
> & {
  sourceData: DataFormItem[];
  onClickExtraText: (activeField: string) => void;
  formInitialValues?: Record<string, any>;
  onValuesChange: NDataFormWidget.UpdateMetaValuesAndActiveField;
  formColLayout: FormColLayout;
};

/**
 * NOTE: when the value of `enableGroup` value is false, then render this component.
 */
export function SingleDataForm(props: SingleFormProps) {
  const {
    // animateLoading,
    formColLayout,
    formInitialValues,
    formLayout = 'horizontal',
    formSize = 'default',
    gridColumns = 2,
    gutter = 16,
    isDisabled = false,
    labelAlign,
    onFormRef,
    onValuesChange,
    showColon = false,
    sourceData,
  } = props;
  const [form] = Form.useForm<any>();
  const [activeField, setActiveField] = useState<Record<string, any> | null>(
    null
  );
  const visibleRelativeFieldsRef = useRef<string[]>([]);
  const initialValues = genSingleFormInitialValues(sourceData);
  // const defaultValuesRef = useRef(initialValues);

  const finalInitialValues = isObject(formInitialValues)
    ? _.merge(initialValues, formInitialValues)
    : initialValues;

  const calcColSpan = Math.floor(GRID_TOTAL / gridColumns);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [JSON.stringify(finalInitialValues)]);

  useEffect(() => {
    onFormRef?.(form);
  }, []);

  const handleValuesChange = (
    value: Partial<FormData>,
    values: Partial<FormData>
  ) => {
    onValuesChange?.(value, values);

    const activeFieldKey = _.keys(value)[0];
    if (visibleRelativeFieldsRef.current.includes(activeFieldKey)) {
      // activeFieldRef.current = value;
      setActiveField((prev) => {
        if (value === null) return value;

        return {
          ...prev,
          ...value,
        };
      });
    }
  };

  const handleJudgeShouldUpdate = (
    prev: any,
    cur: any,
    info?: any,
    relatives?: any,
    field?: string
  ) => {
    if (relatives?.type === FormItemRelativeType.fieldMap) {
      const { maps = {} } = relatives || {};
      const { dependentField, pairs = {} } = maps;
      const dependentFieldValue = cur[dependentField];
      const mapFieldValue = pairs[dependentFieldValue];

      if (
        cur[dependentField] !== prev[dependentField] &&
        field &&
        mapFieldValue
      ) {
        form?.setFieldValue(field, mapFieldValue);
      }
    }

    return false;
  };

  const renderHideOrDisplayItem = useCallback(
    (itemProps: RenderLinkageItemParams) => {
      const {
        disabled = false,
        field,
        initialValue,
        label,
        providedProps,
        relatives,
        renderType,
        required,
        rules,
        values,
      } = itemProps;
      const { lists = [], listsLogic = 'or' } = relatives || {};

      // collecting all relative fields
      _.forEach(lists, ({ field }) => {
        if (!visibleRelativeFieldsRef.current.includes(field)) {
          visibleRelativeFieldsRef.current.push(field);
        }
      });

      let showItem = false;
      // console.log('values', values);

      if (listsLogic === 'or') {
        showItem = _.some(lists, ({ field, value }) => {
          if (isArray(value) && isArray(values[field])) {
            return _.some(value, (compareValue) =>
              values[field].includes(compareValue)
            );
          }

          return values[field] === value;
        });
      }

      if (listsLogic === 'and') {
        showItem = every(lists, ({ field, value }) => {
          if (isArray(value) && isArray(values[field])) {
            return _.some(value, (compareValue) =>
              values[field].includes(compareValue)
            );
          }

          return values[field] === value;
        });
      }

      if (showItem) {
        return (
          <Col span={calcColSpan}>
            <FormItem
              disabled={disabled}
              field={field}
              initialValue={initialValue}
              label={label}
              required={required}
              rules={rules}
            >
              {TYPE_MAP_COMPONENT[renderType]?.(providedProps)}
            </FormItem>
          </Col>
        );
      }

      return null;
    },
    [JSON.stringify(activeField)]
  );

  const renderFieldMapItem = (itemProps: RenderLinkageItemParams) => {
    const {
      disabled = false,
      field,
      initialValue,
      label,
      providedProps,
      relatives,
      renderType,
      required,
      rules,
      values,
    } = itemProps;
    const { maps } = relatives || {};
    const { dependentField = '', pairs = {} } = maps || {};

    const dependentFieldValue = values[dependentField];

    let finalInitialValue = initialValue;
    const mapInitialValue = pairs[dependentFieldValue];

    if (mapInitialValue) {
      finalInitialValue = mapInitialValue;
    }

    return (
      <Col span={calcColSpan}>
        <FormItem
          disabled={disabled}
          field={field}
          initialValue={finalInitialValue}
          label={label}
          required={required}
          rules={rules}
        >
          {TYPE_MAP_COMPONENT[renderType]?.(providedProps)}
        </FormItem>
      </Col>
    );
  };

  const renderLinkageItem = (linkageItemProps: RenderLinkageItemParams) => {
    const { relatives } = linkageItemProps;
    const { type } = relatives || {};

    const renderByRelativeType = {
      [FormItemRelativeType.hideOrDisplay]: renderHideOrDisplayItem,
      [FormItemRelativeType.hideItem]: renderHideOrDisplayItem,
      [FormItemRelativeType.showItem]: renderHideOrDisplayItem,
      [FormItemRelativeType.fieldMap]: renderFieldMapItem,
    };

    if (isUndefined(renderByRelativeType[type!])) return null;

    return renderByRelativeType[type!](linkageItemProps);
  };

  return (
    <SingleFormContainer>
      <Form
        colon={showColon}
        disabled={isDisabled}
        form={form}
        labelAlign={labelAlign}
        layout={formLayout}
        className="h-full"
        onValuesChange={handleValuesChange}
        size={formSize}
        {...formColLayout}
      >
        <Row gutter={gutter}>
          {sourceData.map(
            ({
              disabled = false,
              field,
              hidden = false,
              initialValue,
              key,
              label,
              relatives,
              renderType,
              required = false,
              rules,
              ...providedProps
            }) => {
              if (hidden) return null;

              const isValidRelatives = checkIsValidFromItemRelatives(relatives);

              if (isValidRelatives) {
                return (
                  <FormItem
                    key={key ? key : field}
                    noStyle
                    shouldUpdate={(prev, cur, info) =>
                      handleJudgeShouldUpdate(prev, cur, info, relatives, field)
                    }
                  >
                    {(values) =>
                      renderLinkageItem({
                        values,
                        relatives,
                        renderType,
                        providedProps,
                        required,
                        field,
                        initialValue,
                        label,
                        rules,
                      })
                    }
                  </FormItem>
                );
              }

              return (
                <Col key={key} span={calcColSpan}>
                  <FormItem
                    disabled={disabled}
                    field={field}
                    initialValue={initialValue}
                    key={key}
                    label={label}
                    required={required}
                    rules={rules}
                  >
                    {/* In here, we will pass specific props for certain component */}
                    {TYPE_MAP_COMPONENT[renderType]?.(providedProps)}
                  </FormItem>
                </Col>
              );
            }
          )}
        </Row>
      </Form>
    </SingleFormContainer>
  );
}
