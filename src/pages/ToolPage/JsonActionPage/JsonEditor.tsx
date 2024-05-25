import { MantineProvider, createTheme } from '@mantine/core';
import { ThemeProvider } from 'styled-components';

import Panes from './containers/Editor/Panes';
import { lightTheme } from 'src/constants/theme';

const theme = createTheme({
  autoContrast: true,
  fontSmoothing: false,
  respectReducedMotion: true,
  primaryShade: 8,
});

export const JsonActionEditorPage = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <ThemeProvider theme={lightTheme}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <Panes />
        </MantineProvider>
      </ThemeProvider>
    </div>
  );
};
