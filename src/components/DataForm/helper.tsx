import React from 'react';
import {
  get,
  hasIn,
  includes,
  isArray,
  isNull,
  isString,
  isUndefined,
} from 'lodash';
import { VALID_RENDER_TYPE_LIST } from './constants';
import {
  FormItemRelative,
  FormItemRelativeType,
  DataFormBlock,
  DataFormItem,
} from './interface';

export const isUndef = (value: unknown) =>
  isNull(value) || isUndefined(value) || value === '';

export const checkIsValidFormData = (dataSource: any[]) =>
  isArray(dataSource) &&
  (dataSource.length === 0 ||
    includes(VALID_RENDER_TYPE_LIST, get(dataSource, '0.renderType')));

export const checkIsValidGroupFormData = (dataSource: any[]) =>
  isArray(dataSource) &&
  (dataSource.length === 0 || hasIn(dataSource, '0.title'));

export const checkIsValidFromItemRelatives = (
  { type } = {} as FormItemRelative
) => {
  const validTypes = [
    FormItemRelativeType.hideOrDisplay,
    FormItemRelativeType.showItem,
    FormItemRelativeType.hideItem,
    FormItemRelativeType.fieldMap,
  ];

  if (!validTypes.includes(type)) return false;

  return true;
};

export type ItemExtra = {
  action?: 'click' | 'link';
  actionText?: string;
  actionPosition?: 'right' | 'left';
  actionTextColor?: string;
  text: string;
};

export const genExtraNode = (extra: ItemExtra | string, onClick: any) => {
  if (!extra) return null;

  if (isString(extra))
    return <span className="text-sm text-[#86909c]">{extra}</span>;

  const {
    // action = 'click',
    actionPosition = 'right',
    actionText,
    actionTextColor = '#2836ef',
    text,
  } = extra || {};

  return (
    <div className="flex items-center truncate">
      {actionPosition === 'left' ? (
        <>
          <span>{text}</span>
          <span
            className="cursor-pointer"
            onClick={onClick}
            style={{
              color: actionTextColor,
            }}
          >
            {actionText}
          </span>
        </>
      ) : (
        <>
          <span
            className="cursor-pointer"
            onClick={onClick}
            style={{
              color: actionTextColor,
            }}
          >
            {actionText}
          </span>
          <span>{text}</span>
        </>
      )}
    </div>
  );
};

export const genSingleFormInitialValues = (defs: DataFormItem[]) =>
  (defs as DataFormItem[]).reduce((acc, cur) => {
    return {
      ...acc,
      [cur.field]: cur.initialValue,
    };
  }, {});

function genValues(items: DataFormItem[]) {
  const values: Record<string, any> = {};
  for (const item of items) {
    values[item.field] = item.initialValue;
  }

  return values;
}

export const genGloupInitialValues = (defs: DataFormBlock[]) => {
  let values = {};

  function parseBlock(block: DataFormBlock) {
    const { children, items } = block;

    if (isArray(items)) {
      const tempValues = genValues(items);
      values = { ...values, ...tempValues };
      return;
    }

    if (isArray(children)) {
      parseBlockList(children);
    }
  }

  function parseBlockList(blocks: DataFormBlock[]) {
    for (const block of blocks) {
      parseBlock(block);
    }
  }

  parseBlockList(defs);

  return values;
};
