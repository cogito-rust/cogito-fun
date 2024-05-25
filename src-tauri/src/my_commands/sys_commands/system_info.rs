use serde;
use sysinfo::{Components, Cpu, Disks, Networks, System};

#[derive(serde::Serialize)]
pub struct SystemMemory {
  total: u64,
  used: u64,
  total_swap: u64,
  used_swap: u64,
}

#[tauri::command]
pub fn query_sys_memory() -> SystemMemory {
  let mut sys = System::new_all();

  // First we update all information of our `System` struct.
  sys.refresh_all();

  // RAM and swap information:
  let total_m = sys.total_memory();
  let used_m = sys.used_memory();
  let total_swap = sys.total_swap();
  let used_swap = sys.used_swap();

  SystemMemory {
    total: total_m,
    used: used_m,
    total_swap,
    used_swap,
  }
}

#[derive(serde::Serialize)]
pub struct SystemProfile {
  name: Option<String>,
  kernel_version: Option<String>,
  os_version: Option<String>,
  host_name: Option<String>,
  cpu_arch: Option<String>,
  memory: u64,
  cpu_count: usize,
}

#[tauri::command]
pub fn query_sys_profile() -> SystemProfile {
  let mut sys = System::new_all();

  // // First we update all information of our `System` struct.
  sys.refresh_all();
  let name = System::name();
  let kernel_v = System::kernel_version();
  let os_v = System::os_version();
  let host_name = System::host_name();
  let cpu_arch = System::cpu_arch();
  let mem = sys.total_memory();
  let cpus = sys.cpus().iter().count();

  SystemProfile {
    name,
    kernel_version: kernel_v,
    os_version: os_v,
    host_name,
    cpu_arch,
    memory: mem,
    cpu_count: cpus,
  }
}

#[tauri::command]
pub async fn query_system_all_info() {
  // Please note that we use "new_all" to ensure that all list of
  // components, network interfaces, disks and users are already
  // filled!
  let mut sys = System::new_all();

  // First we update all information of our `System` struct.
  sys.refresh_all();

  // Display system information:
  println!("System name:             {:?}", System::name());
  println!("System kernel version:   {:?}", System::kernel_version());
  println!("System OS version:       {:?}", System::os_version());
  println!("System host name:        {:?}", System::host_name());

  // Number of CPUs:
  println!("NB CPUs: {}", sys.cpus().len());

  // Display processes ID, name na disk usage:
  for (pid, process) in sys.processes() {
    println!("[{pid}] {} {:?}", process.name(), process.disk_usage());
  }

  // We display all disks' information:
  println!("=> disks:");
  let disks = Disks::new_with_refreshed_list();
  for disk in &disks {
    println!("{disk:?}");
  }

  // Network interfaces name, total data received and total data transmitted:
  let networks = Networks::new_with_refreshed_list();
  println!("=> networks:");
  for (interface_name, data) in &networks {
    println!(
      "{interface_name}: {} B (down) / {} B (up)",
      data.total_received(),
      data.total_transmitted(),
    );
    // If you want the amount of data received/transmitted since last call
    // to `Networks::refresh`, use `received`/`transmitted`.
  }

  // Components temperature:
  let components = Components::new_with_refreshed_list();
  println!("=> components:");
  for component in &components {
    println!("{component:?}");
  }
}
