use tauri::{Manager, Window};
// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
pub async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window
    .get_webview_window("splashscreen")
    .expect("no window labeled 'splashscreen' found")
    .close()
    .unwrap();
  // Show main window
  window
    .get_webview_window("main")
    .expect("no window labeled 'main' found")
    .show()
    .unwrap();
}
