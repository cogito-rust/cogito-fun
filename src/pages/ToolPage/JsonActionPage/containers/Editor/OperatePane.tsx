import styled from 'styled-components';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { PiGraphDuotone } from 'react-icons/pi';
import { VscListTree } from 'react-icons/vsc';
import useGraph from 'src/store/useGraph';
import { Tooltip } from '@nextui-org/react';
import useConfig from 'src/store/useConfig';
import { ViewMode } from 'src/enums/viewMode.enum';

const Container = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 36px;
  width: 360px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 3;
`;

export const OperatePane = () => {
  const fullscreen = useGraph((state) => state.fullscreen);
  const viewMode = useConfig((state) => state.viewMode);

  const { toggleFullscreen } = useGraph();
  const { setViewMode } = useConfig();

  const handleToggleSidebar = () => {
    toggleFullscreen(!fullscreen);
  };

  const handleToggleViewMode = () => {
    setViewMode(viewMode === ViewMode.Graph ? ViewMode.Tree : ViewMode.Graph);
  };

  return (
    <Container>
      <div className="flex items-center w-full h-full px-3">
        <Tooltip
          content={fullscreen ? '退出全屏' : '全屏'}
          size="sm"
          offset={16}
        >
          <div
            onClick={handleToggleSidebar}
            className="cursor-pointer hover:text-primary hover:scale-125 transition-all duration-300"
          >
            {fullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          </div>
        </Tooltip>
        <Tooltip
          content={
            viewMode === ViewMode.Graph ? '使用树形视图' : '使用图形视图'
          }
          size="sm"
          offset={16}
        >
          <div
            onClick={handleToggleViewMode}
            className="cursor-pointer hover:text-primary hover:scale-125 transition-all duration-300"
          >
            {viewMode === ViewMode.Graph ? <VscListTree /> : <PiGraphDuotone />}
          </div>
        </Tooltip>
      </div>
    </Container>
  );
};
