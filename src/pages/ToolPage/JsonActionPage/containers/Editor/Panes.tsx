import React, { lazy } from 'react';

import styled from 'styled-components';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import useGraph from 'src/store/useGraph';
import JsonEditor from './JsonEditor';
import LiveEditor from './LiveEditor';
import { OperatePane } from './OperatePane';

export const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  /* height: calc(100vh - 67px); */
  height: 100vh;

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

// const JsonEditor = lazy(() => import('./JsonEditor'));

// const LiveEditor = lazy(() => import('./LiveEditor'));

const Panes: React.FC = () => {
  const fullscreen = useGraph((state) => state.fullscreen);

  return (
    <StyledEditor proportionalLayout={false}>
      <Allotment.Pane
        preferredSize={450}
        minSize={fullscreen ? 0 : 300}
        maxSize={600}
        visible={!fullscreen}
        key="json-editor"
      >
        <JsonEditor />
      </Allotment.Pane>
      <Allotment.Pane minSize={0} key="live-editor">
        <LiveEditor />
        <OperatePane />
      </Allotment.Pane>
    </StyledEditor>
  );
};

export default Panes;
