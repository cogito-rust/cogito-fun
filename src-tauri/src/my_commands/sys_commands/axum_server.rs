use axum::{extract::Path, response::Json, routing::get, Router};
use serde_json::{json, Value};
use std::path::PathBuf;
use tauri::AppHandle;
use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::{with_store, StoreCollection};

#[tokio::main]
pub async fn axum_main(app_hander: AppHandle, port: u16) {
  // build our application with a single route
  let app = Router::new().route("/", get(root)).route(
    "/json/view/:json_id",
    get({ move |path| json_action_view(path, app_hander) }),
  );

  let addr = format!("0.0.0.0:{}", &port);

  // run our app with hyper, listening globally on port 3000
  let listener = tokio::net::TcpListener::bind(addr).await.unwrap();

  axum::serve(listener, app).await.unwrap();
}

async fn root() -> &'static str {
  "hello world"
}

async fn json_action_view(Path(json_id): Path<u32>, app_hander: AppHandle) -> Json<Value> {
  println!("json id: {}", json_id);
  let stores = app_hander.state::<StoreCollection<Wry>>();
  let path = PathBuf::from("store.bin");

  let store_json = with_store(app_hander.app_handle().clone(), stores, path, |store| {
    // Note that values must be serde_json::Value instances,
    // otherwise, they will not be compatible with the JavaScript bindings.
    store.insert("some-key".to_string(), json!({ "value": 5 }))?;

    // Get a value from the store.
    let value = store
      .get("some-key")
      .expect("Failed to get value from store");
    // println!("{}", value); // {"value":5}

    // You can manually save the store after making changes.
    // Otherwise, it will save upon graceful exit as described above.
    // store.save()?;

    Ok(value.clone())
  });

  Json(json!(match store_json {
    Ok(val) => val,
    Err(_) => Value::Null,
  }))
}
