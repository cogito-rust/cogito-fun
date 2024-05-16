use local_ip_address::local_ip;
use serde::{Deserialize, Serialize};
use std::{net::TcpListener, ops::Range, process::Command, thread};
use tauri::{Manager, Window};

mod axum_server;

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

#[tauri::command]
pub async fn run_axum_server(app: tauri::AppHandle, port: u16) -> bool {
  let handle = app.app_handle();
  let boxed_handle = Box::new(handle.clone());

  thread::spawn(move || axum_server::axum_main(*boxed_handle, port));

  true
}

#[tauri::command]
pub fn query_available_ports(port_range: &str) -> Option<u16> {
  let convert_vec: Vec<u16> = port_range
    .split("..")
    .map(|s| s.parse::<u16>().unwrap_or(9527))
    .collect();

  let mut convert_range_pot = Range {
    start: convert_vec[0],
    end: convert_vec[1],
  };

  convert_range_pot.find(|port| check_port_available(*port))
}

#[tauri::command]
pub fn check_port_available(port: u16) -> bool {
  // let socket = UdpSocket::bind("127.0.0.1:0").unwrap();
  // match TcpListener::bind(("127.0.0.1", port)) {
  //   Ok(_) => true,
  //   Err(_) => false,
  // }
  let addr = format!("0.0.0.0:{}", port);

  TcpListener::bind(addr).is_ok()
}

#[tauri::command]
pub fn query_lan_ip() -> String {
  let local_ip_addr = local_ip().map_err(|_| "Can not get local ip address".to_string());

  match local_ip_addr {
    Ok(v) => v.to_string(),
    Err(_) => "".to_string(),
  }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UnixProcessInfo {
  command: String,
  pid: String,
  user: String,
  fd: String,
  ip_type: String,
  device: String,
  size_off: String,
  node: String,
  name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WindowProcessInfo {
  command: String,
  pid: String,
  name: String,
}

#[tauri::command]
pub fn query_unix_process_via_port(port: u16) -> Result<Vec<UnixProcessInfo>, String> {
  let output = Command::new("lsof")
    .arg("-i")
    .arg(format!(":{}", port))
    .output()
    .unwrap();
  // output.status
  println!("lsof status: {}", output.status);

  let sh_output = String::from_utf8(output.stdout).unwrap();

  // splitting by separator
  let info_vec: Vec<&str> = sh_output.split('\n').collect();

  let mut result: Vec<UnixProcessInfo> = vec![];

  // traversing loop and removing the title of first line and last lint empty string
  for (i, v) in info_vec.iter().enumerate() {
    if i == 0 || i == info_vec.len() - 1 {
      continue;
    }
    // splittin by whitespace, to find corresponding values
    let values: Vec<&str> = v.split_whitespace().collect::<Vec<&str>>();

    result.push(UnixProcessInfo {
      command: values[0].into(),
      pid: values[1].into(),
      user: values[2].into(),
      fd: values[3].into(),
      ip_type: values[4].into(),
      device: values[5].into(),
      size_off: values[6].into(),
      node: values[7].into(),
      name: values[8].into(),
    });
  }

  Ok(result)
}

#[tauri::command]
pub fn query_window_process_via_port(port: u16) -> Result<Vec<WindowProcessInfo>, String> {
  let output = Command::new("netstat").arg("-nao").output().unwrap();

  let sh_output = String::from_utf8(output.stdout).unwrap();
  println!("{}", sh_output);
  let info_vec: Vec<&str> = sh_output.split("\r\n").collect();

  let mut result: Vec<WindowProcessInfo> = vec![];

  for v in info_vec.iter() {
    let values: Vec<&str> = v.split_whitespace().collect::<Vec<&str>>();

    println!("{:?}", values);
  }

  Ok(result)
}
