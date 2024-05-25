/**
 * /// <reference path="../data-form.d.ts" />
 */

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { SingleDataForm } from './SingleDataForm';
import { GroupDataForm } from './GroupDataFrom';
// import {
//   fakeFormBlocks,
//   fakeFormItems,
//   FAKE_MOCK_DATA,
// } from '../__testing_data_sets__';
import {
  BroadcastDataFormAction,
  DataFormBlock,
  DataFormItem,
  FormColLayout,
  FormCommonProps,
} from './interface';
import { FormContainer } from './styles';
import { EmptyContent } from './EmptyContent';
import { GRID_TOTAL } from './constants';
import { isEmpty } from 'lodash';
import { checkIsValidFormData, checkIsValidGroupFormData } from './helper';
import { FormInstance, Message } from '@arco-design/web-react';
import _ from 'lodash';
import mockSourceData from './fakeData.json';

export function DataFormViewPage(props: DataFormComponentProps) {
  const {
    enableEnterRecord = false,
    enableFold = true,
    enableGroup = true,
    enableScrollContent,
    grid = { col: 1, row: 1, gap: 0 },
    isVisible = true,
    labelCol = 4,
    onExtraTextAction,
    onUpdateBottomRow,
    onUpdateFormStatus,
    parentRowSpace,
    sourceData = mockSourceData,
    topRow,
    widgetId,
    ...commonProps
  } = props;
  console.log(': -> ', sourceData);
  const cleanSourceData =
    (sourceData as any[])?.filter((d) => !isEmpty(d)) ?? [];
  const [isValidDataSource, setIsValidDataSource] = useState(true);
  const formRef = useRef<FormInstance<
    any,
    any,
    string | number | symbol
  > | null>(null);
  // const fakeItems = enableGroup ? fakeFormBlocks(2, 2, 2, 2) : fakeFormItems(8);
  // const fakeItems = enableGroup
  //   ? FAKE_MOCK_DATA
  //   : get(FAKE_MOCK_DATA, '0.children.0.items');

  // console.log(fakeItems);
  const wrapperCol = GRID_TOTAL - labelCol;
  const formColLayout: FormColLayout = {
    labelCol: {
      span: labelCol,
    },
    wrapperCol: {
      span: wrapperCol,
    },
  };
  const handleValuesChange = useCallback(
    (activeField: Record<string, any>, fieldValues: Record<string, any>) => {
      //
      const isValid = true;

      // if (formRef.current) {
      //   const fieldErrorObj = formRef.current.getFieldsError();

      //   if (_.keys(fieldErrorObj).length > 0) {
      //     isValid = false;
      //   }

      //   console.log(fieldErrorObj, 'isValid: -> ', isValid);
      // }

      // onUpdateMetaValuesAndActiveField?.(activeField, fieldValues, isValid);
    },
    [formRef.current]
  );

  const handleClickExtraText = useCallback((activeField: string) => {
    onExtraTextAction(activeField);
  }, []);

  const handleFormRef = useCallback(
    (form: FormInstance<any, any, string | number | symbol>) => {
      formRef.current = form;
    },
    []
  );

  // const handleManual = (payload: {
  //   action: BroadcastDataFormAction;
  //   data: any;
  // }) => {
  //   if (!formRef.current) return;

  //   if (payload.action === 'validate') {
  //     formRef.current[payload.action]?.(null, (errors, values) => {
  //       if (_.keys(errors).length > 0) {
  //         onUpdateFormStatus(false);
  //       } else {
  //         onUpdateFormStatus(true);
  //       }
  //     });
  //     return;
  //   }

  //   if (payload.action === 'setFieldsValue' && payload.data) {
  //     formRef.current[payload.action]?.(payload.data);
  //     return;
  //   }

  //   formRef.current[payload.action]?.(payload.data);
  // };

  // useEffect(() => {
  //   broadcast.receive(widgetId, handleManual);

  //   return () => {
  //     formRef.current?.resetFields();
  //   };
  // }, []);

  // NOTE: Checking the sourceData whether valid
  useEffect(() => {
    if (!cleanSourceData?.length) return;

    const checkValidSourceData = enableGroup
      ? checkIsValidGroupFormData(cleanSourceData)
      : checkIsValidFormData(cleanSourceData);

    if (!checkValidSourceData) {
      Message.info('当前数据源格式不正确，请检查后重试！');
    }

    setIsValidDataSource(checkValidSourceData);
  }, [enableGroup, cleanSourceData]);
  // const calcFormRealBottomRow = useCallback(() => {
  //   if (!formContainerRef.current || enableScrollContent) return;

  //   const { height } = formContainerRef.current.getBoundingClientRect();
  //   const curBottomRow =
  //     (height + 2 * WIDGET_PADDING + grid.gap * 2) / parentRowSpace + topRow;

  //   return ceil(curBottomRow);
  // }, [enableScrollContent]);

  // useEffect(() => {
  //   /**
  //    * NOTE: Flattening the form fields automatically when current form have a large amount of fields.
  //    */
  //   if (enableScrollContent === false && cleanSourceData?.length > 0) {
  //     const calcBottomRow = calcFormRealBottomRow();
  //     onUpdateBottomRow?.(calcBottomRow);
  //   }
  // }, [enableScrollContent, cleanSourceData]);

  if (isVisible === false) return null;

  if (!cleanSourceData?.length || !isValidDataSource) return <EmptyContent />;

  return (
    <FormContainer>
      {enableGroup ? (
        <GroupDataForm
          formColLayout={formColLayout}
          {...commonProps}
          enableFold={enableFold}
          onClickExtraText={handleClickExtraText}
          onFormRef={handleFormRef}
          onValuesChange={handleValuesChange}
          sourceData={cleanSourceData as DataFormBlock[]}
          // sourceData={FAKE_MOCK_DATA}
        />
      ) : (
        <SingleDataForm
          {...commonProps}
          formColLayout={formColLayout}
          onClickExtraText={handleClickExtraText}
          onFormRef={handleFormRef}
          onValuesChange={handleValuesChange}
          sourceData={cleanSourceData as DataFormItem[]}
          // sourceData={fakeItems as DataFormItem[]}
        />
      )}
    </FormContainer>
  );
}

export type DataFormComponentProps = FormCommonProps & {
  bottomRow: number;
  topRow: number;
  grid?: {
    col: number;
    row: number;
    gap: number;
  };
  parentRowSpace?: number;
  enableFold?: boolean;
  widgetId: string;
  formInitialValues?: Record<string, any>;
  onExtraTextAction: (field: string) => void;
  onUpdateBottomRow: (bottomRow: number) => void;
  onUpdateFormStatus: (status: boolean) => void;
};
