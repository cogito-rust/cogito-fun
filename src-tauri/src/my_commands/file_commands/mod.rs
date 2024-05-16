// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri_plugin_store::{self, Store};

#[tauri::command]
pub fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}
