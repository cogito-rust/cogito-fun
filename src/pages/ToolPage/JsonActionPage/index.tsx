import { Button } from '@nextui-org/react';
import { Window } from '@tauri-apps/api/window';
import { Webview } from '@tauri-apps/api/webview';

const UNIQUE_JSON_ACTION_EDITOR = 'json_action_editor_label';

const UNIQUE_DATAFORM_VIEW = 'dataform_view_label';

export const JsonActionPage = () => {
  const handleNewJSONEditorWindow = () => {
    const jsonEditorWindow = new Window(UNIQUE_JSON_ACTION_EDITOR, {
      title: 'JSON ACTION',
      width: 1024,
      height: 768,
    });
    const webview = new Webview(jsonEditorWindow, UNIQUE_JSON_ACTION_EDITOR, {
      url: '/window/jsonactioneditor',
      x: 0,
      y: 0,
      width: 1024,
      height: 768,
    });

    webview.once('tauri://created', function () {
      console.log('webview successfully created');
      // webview successfully created
    });
    webview.once('tauri://error', function (e) {
      // an error happened creating the webview
      console.log(e);
    });
  };

  const handleNewDataFormViewWindow = () => {
    const dataFormViewWindow = new Window(UNIQUE_DATAFORM_VIEW, {
      title: 'JSON ACTION',
      width: 1024,
      height: 768,
    });
    const webview = new Webview(dataFormViewWindow, UNIQUE_DATAFORM_VIEW, {
      url: '/window/dataformview',
      x: 0,
      y: 0,
      width: 1024,
      height: 768,
    });

    webview.once('tauri://created', function () {
      console.log('webview successfully created');
      // webview successfully created
    });
    webview.once('tauri://error', function (e) {
      // an error happened creating the webview
      console.log(e);
    });
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Button color="primary" onClick={handleNewJSONEditorWindow}>
        json editor window
      </Button>

      <Button color="primary" onClick={handleNewDataFormViewWindow}>
        DataForm view window
      </Button>
    </div>
  );
};
