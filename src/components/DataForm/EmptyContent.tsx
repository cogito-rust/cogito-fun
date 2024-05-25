import React from 'react';

import { EmptyContentContainer } from './styles';

export function EmptyContent() {
  return (
    <EmptyContentContainer>
      <p>表单内容为空, 请在右侧配置数据源</p>
    </EmptyContentContainer>
  );
}
