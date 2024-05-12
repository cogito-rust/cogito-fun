import {
  Sandpack,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

export const ReactSandpackPage = () => {
  return (
    <section>
      <SandpackProvider template="react">
        <SandpackCodeEditor />
        <SandpackPreview showOpenInCodeSandbox={false} />
      </SandpackProvider>
    </section>
  );
};
