use tauri_plugin_log::{Target, TargetKind};

pub mod my_commands;

use my_commands::file_commands::greet;
use my_commands::sys_commands::{
  check_port_available,
  query_available_ports,
  query_lan_ip,
  query_unix_process_via_port,
  query_window_process_via_port,
  // close_splashscreen,
  run_axum_server,
  system_info::{query_sys_memory, query_sys_profile, query_system_all_info},
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_log::Builder::new().build())
    .plugin(tauri_plugin_websocket::init())
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .plugin(tauri_plugin_http::init())
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_sql::Builder::default().build())
    .plugin(tauri_plugin_store::Builder::new().build())
    .plugin(tauri_plugin_shell::init())
    .plugin(
      tauri_plugin_log::Builder::new()
        .targets([
          Target::new(TargetKind::Stdout),
          Target::new(TargetKind::LogDir { file_name: None }),
          Target::new(TargetKind::Webview),
        ])
        .build(),
    )
    .invoke_handler(tauri::generate_handler![
      greet,
      run_axum_server,
      query_available_ports,
      check_port_available,
      query_lan_ip,
      query_unix_process_via_port,
      query_window_process_via_port,
      query_sys_memory,
      query_sys_profile,
      query_system_all_info
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
