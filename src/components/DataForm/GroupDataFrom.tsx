import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Grid } from '@arco-design/web-react';
import cs from 'classnames';
import _, { every, isArray, isObject, isUndefined } from 'lodash';

import {
  DataFormBlock,
  FormCommonProps,
  DataFormItem,
  FormColLayout,
  SupportRenderType,
  FormItemRelativeType,
  RenderLinkageItemParams,
} from './interface';
import { TYPE_MAP_COMPONENT, GRID_TOTAL } from './constants';
import { GroupFormContainer, GroupFormWrapper } from './styles';
import {
  checkIsValidFromItemRelatives,
  genExtraNode,
  genGloupInitialValues,
} from './helper';
import { IconUp } from '@arco-design/web-react/icon';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

type GroupFormProps = Omit<
  FormCommonProps,
  | 'sourceData'
  | 'enableGroup'
  | 'labelCol'
  | 'enableScrollContent'
  | 'isVisible'
  | 'enableEnterRecord'
> & {
  sourceData: DataFormBlock[];
  formColLayout: FormColLayout;
  enableFold?: boolean;
  formInitialValues?: Record<string, any>;
  onClickExtraText: (activeField: string) => void;
  onValuesChange: NDataFormWidget.UpdateMetaValuesAndActiveField;
};

/**
 * NOTE: when the value of `enableGroup` value is false, then render this component.
 */
export function GroupDataForm(props: GroupFormProps) {
  const {
    // animateLoading,
    enableFold = false,
    formColLayout,
    formInitialValues,
    formLayout = 'horizontal',
    formSize = 'default',
    gridColumns = 1,
    groupHeaderTheme = 'classic',
    isDisabled = false,
    labelAlign,
    onClickExtraText,
    onFormRef,
    onValuesChange,
    showColon = false,
    sourceData,
  } = props;
  const [form] = Form.useForm();

  const calcColSpan = Math.floor(GRID_TOTAL / gridColumns);
  const [activeField, setActiveField] = useState<Record<string, any> | null>(
    null
  );
  const [visibleActiveField, setVisibleActiveField] = useState<Record<
    string,
    any
  > | null>(null);
  // const activeFieldRef = useRef(null);
  const allRelativeFieldsRef = useRef<string[]>([]);
  const visibleRelativeFieldsRef = useRef<string[]>([]);
  const headerFoldRecordRef = useRef<{ [key: string]: boolean }>({});
  const initialValues: Record<string, any> = genGloupInitialValues(sourceData);
  const finalInitialValues = isObject(formInitialValues)
    ? _.merge(initialValues, formInitialValues)
    : initialValues;

  useEffect(() => {
    form.setFieldsValue(finalInitialValues);
  }, [JSON.stringify(finalInitialValues)]);

  useEffect(() => {
    onFormRef?.(form);
  }, []);

  const handleValuesChange = (
    value: Partial<FormData>,
    values: Partial<FormData>
  ) => {
    const activeFieldKey = _.keys(value)[0];

    if (allRelativeFieldsRef.current.includes(activeFieldKey)) {
      // activeFieldRef.current = value;
      setActiveField((prev) => {
        if (value === null) return value;

        return {
          ...prev,
          ...value,
        };
      });
    }

    if (visibleRelativeFieldsRef.current.includes(activeFieldKey)) {
      setVisibleActiveField((prev) => {
        if (value === null) return value;

        return {
          ...prev,
          ...value,
        };
      });
    }

    onValuesChange?.(value, values);
  };

  const handleToggleFold = (key: string) => {
    const groupChildElem = document.querySelector(`.group-header-ref-${key}`);
    const groupHeaderIconElem = document.querySelector(
      `.group-header-icon-${key}`
    );

    if (!groupHeaderIconElem) return;

    if (headerFoldRecordRef.current[key]) {
      headerFoldRecordRef.current[key] = false;
      groupHeaderIconElem.classList.remove('-rotate-180');
      // groupHeaderIconElem.classList.add('rotate-180');

      if (!groupChildElem) return;

      groupChildElem.classList.remove('group-header-ref-fold');
      groupChildElem.classList.add('group-header-ref-unfold');
    } else {
      headerFoldRecordRef.current[key] = true;
      // groupHeaderIconElem.classList.remove('rotate-180');
      groupHeaderIconElem.classList.add('-rotate-180');

      if (!groupChildElem) return;

      groupChildElem.classList.remove('group-header-ref-unfold');
      groupChildElem.classList.add('group-header-ref-fold');
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
        disabled,
        extra,
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
      const {
        lists = [],
        listsLogic = 'or',
        type = FormItemRelativeType.hideOrDisplay,
      } = relatives || {};

      // collecting all relative fields
      _.forEach(lists, ({ field }) => {
        if (!visibleRelativeFieldsRef.current.includes(field)) {
          visibleRelativeFieldsRef.current.push(field);
        }
      });

      let showItem = false;
      // console.log('values', values);
      if (listsLogic === 'or') {
        showItem = _.some(lists, ({ field, logic, value }) => {
          if (logic === 'or' && isArray(value)) {
            return _.some(value, (compareValue) => {
              if (compareValue === 'undefined' && values[field] === undefined)
                return true;

              return compareValue === values[field];
            });
          }

          if (isArray(value) && isArray(values[field])) {
            if (value.length === 0 && values[field].length === 0) return true;

            return _.some(value, (compareValue) =>
              values[field].includes(compareValue)
            );
          }

          return values[field] === value;
        });
      }

      if (listsLogic === 'and') {
        showItem = every(lists, ({ field, logic, value }) => {
          if (logic === 'or' && isArray(value)) {
            return _.some(value, (compareValue) => {
              if (compareValue === 'undefined' && values[field] === undefined) {
                return true;
              }

              return compareValue === values[field];
            });
          }

          if (isArray(value) && isArray(values[field])) {
            if (value.length === 0 && values[field].length === 0) return true;

            return _.some(value, (compareValue) =>
              values[field].includes(compareValue)
            );
          }

          return values[field] === value;
        });
      }

      // if (type === FormItemRelativeType.hideItem && showItem) return null;

      // if (
      //   (type === FormItemRelativeType.showItem ||
      //     type === FormItemRelativeType.hideOrDisplay) &&
      //   !showItem
      // )
      //   return null;

      const isDisplayNone =
        (type === FormItemRelativeType.hideItem && showItem) ||
        ((type === FormItemRelativeType.showItem ||
          type === FormItemRelativeType.hideOrDisplay) &&
          !showItem);

      return (
        <Col
          className={cs({
            hidden: isDisplayNone,
          })}
          span={calcColSpan}
        >
          <FormItem
            disabled={disabled}
            extra={genExtraNode(extra!, () => onClickExtraText(field))}
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
    },
    [JSON.stringify(visibleActiveField)]
  );

  const renderFieldMapItem = (itemProps: RenderLinkageItemParams) => {
    const {
      disabled,
      extra,
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
          extra={genExtraNode(extra!, () => onClickExtraText(field))}
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

    if (!type) return null;

    const renderByRelativeType = {
      [FormItemRelativeType.hideOrDisplay]: renderHideOrDisplayItem,
      [FormItemRelativeType.hideItem]: renderHideOrDisplayItem,
      [FormItemRelativeType.showItem]: renderHideOrDisplayItem,
      [FormItemRelativeType.fieldMap]: renderFieldMapItem,
    };

    if (isUndefined(renderByRelativeType[type])) return null;

    return renderByRelativeType[type](linkageItemProps);
  };

  const renderField = (renderType: SupportRenderType, availableProps: any) => {
    return TYPE_MAP_COMPONENT[renderType]?.(availableProps);
  };

  const renderFormItem = ({
    disabled = false,
    extra,
    field,
    hidden = false,
    initialValue,
    label,
    relatives,
    renderType,
    required = false,
    rules = [],
    ...providedProps
  }: DataFormItem) => {
    if (hidden) return null;

    const isValidRelatives = checkIsValidFromItemRelatives(relatives);

    if (isValidRelatives) {
      return (
        <FormItem
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
              extra,
              disabled,
              ...providedProps,
            })
          }
        </FormItem>
      );
    }

    return (
      <Col key={field} span={calcColSpan}>
        <FormItem
          disabled={disabled}
          extra={genExtraNode(extra!, () => onClickExtraText(field))}
          field={field}
          initialValue={initialValue}
          label={label}
          required={required}
          rules={rules}
        >
          {renderField(renderType, providedProps)}
        </FormItem>
      </Col>
    );
  };

  const renderBlock = useCallback(
    (
      {
        children,
        hidden = false,
        items,
        key,
        relatives,
        subtitle,
        title,
      }: DataFormBlock,
      isSubDomain = false
    ) => {
      /**
       * NOTE: The below variable stand for the `title` element's render level, when this function was
       * called one time, lt's value will increase one
       */
      if (hidden) return null;

      const { lists = [], listsLogic = 'or', type } = relatives || {};

      /**
       * NOTE: for the form render firstly
       */
      // collecting all relative fields
      const miniInitialValues: Record<string, any> = {};
      _.forEach(lists, ({ field }) => {
        if (!allRelativeFieldsRef.current.includes(field)) {
          allRelativeFieldsRef.current.push(field);
        }

        miniInitialValues[field] = initialValues[field];
      });

      let hitRelatedField = false;

      if (
        type === FormItemRelativeType.hideBlock ||
        type === FormItemRelativeType.showBlock
      ) {
        const mergeActiveField = isObject(activeField)
          ? {
              ...miniInitialValues,
              ...activeField,
            }
          : initialValues;

        if (listsLogic === 'or') {
          hitRelatedField = _.some(lists, ({ field, logic, value }) => {
            const activeFieldValue: string[] = mergeActiveField[field];

            /**
             * NOTE: 1. the dependency field is select component and only some values will trigger the effect
             */
            if (logic === 'or' && isArray(value)) {
              return _.some(value, (compareValue) => {
                if (
                  compareValue === 'undefined' &&
                  mergeActiveField[field] === undefined
                )
                  return true;

                return compareValue === mergeActiveField[field];
              });
            }

            /**
             * NOTE: 2. two compared values are empty array
             */
            if (isArray(value) && isArray(activeFieldValue)) {
              if (value.length === 0 && activeFieldValue.length === 0)
                return true;

              return _.some(value, (compareValue) =>
                activeFieldValue.includes(compareValue)
              );
            }

            return mergeActiveField[field] === value;
          });
        }

        if (listsLogic === 'and') {
          hitRelatedField = _.every(lists, ({ field, logic, value }) => {
            const activeFieldValue: string[] = mergeActiveField[field];
            /**
             * NOTE: the dependency field is select component and only some values will trigger the effect
             */
            if (logic === 'or' && isArray(value)) {
              return _.some(value, (compareValue) => {
                if (
                  compareValue === 'undefined' &&
                  mergeActiveField[field] === undefined
                )
                  return true;
                return compareValue === mergeActiveField[field];
              });
            }

            if (isArray(value) && isArray(activeFieldValue)) {
              if (value.length === 0 && activeFieldValue.length === 0)
                return true;
              return _.some(value, (compareValue) =>
                activeFieldValue.includes(compareValue)
              );
            }

            return mergeActiveField[field] === value;
          });
        }
      }

      const isDisplayNone =
        (type === FormItemRelativeType.hideBlock && hitRelatedField) ||
        (type === FormItemRelativeType.showBlock && !hitRelatedField);

      // if (type === FormItemRelativeType.hideBlock && hitRelatedField)
      //   return null;

      // if (type === FormItemRelativeType.showBlock && !hitRelatedField)
      //   return null;

      return (
        <GroupFormWrapper
          className={cs({
            hidden: isDisplayNone,
          })}
          key={key}
        >
          {title && (
            <div
              className={cs(
                'group-form-header',
                !isSubDomain ? `group-header-${groupHeaderTheme}` : ''
              )}
            >
              <div className="group-form-title-wrapper">
                <p className="mb-0">{title}</p>
                {enableFold && !isSubDomain && (
                  <div
                    className={`px-3 py-1 cursor-pointer`}
                    onClick={() => handleToggleFold(key!)}
                  >
                    <IconUp
                      className={`group-header-icon-${key}`}
                      style={{
                        color: '#2836EF',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`group-header-ref-${key}`}>
            {isArray(items) ? (
              <Row className="mt-3" gutter={16}>
                {items.map(renderFormItem)}
              </Row>
            ) : (
              isArray(children) && (
                <div className={`group-form-subtitle-area`}>
                  {children.map((formBlock) => renderBlock(formBlock, true))}
                </div>
              )
            )}
          </div>
        </GroupFormWrapper>
      );
    },
    [JSON.stringify(activeField)]
  );

  return (
    <GroupFormContainer>
      <Form
        colon={showColon}
        disabled={isDisabled}
        form={form}
        labelAlign={labelAlign}
        layout={formLayout}
        onValuesChange={handleValuesChange}
        className="h-full"
        size={formSize}
        {...formColLayout}
      >
        {sourceData.map((formBlock) => renderBlock(formBlock))}
      </Form>
    </GroupFormContainer>
  );
}
