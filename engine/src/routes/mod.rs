use std::sync::Arc;

use poem::{
    get, handler, listener::TcpListener, middleware::Cors, web::Html, EndpointExt, Route, Server,
};
use poem_openapi::{OpenApi, OpenApiService};
use site::SiteApi;
use tracing::info;
use user::UserApi;

use crate::state::AppState;

pub mod site;
pub mod user;

fn get_api() -> impl OpenApi {
    (SiteApi, UserApi)
}

pub async fn serve(state: AppState) {
    info!("Serving HTTP");

    let state = Arc::new(state);

    let api_service =
        OpenApiService::new(get_api(), "Hello World", "1.0").server("http://localhost:3000/api");
    let spec = api_service.spec_endpoint();
    let app = Route::new()
        .nest("/api", api_service)
        .nest("/openapi.json", spec)
        .at("/docs", get(get_openapi_docs))
        .with(Cors::new())
        .data(state);

    let listener = TcpListener::bind("0.0.0.0:3000");

    Server::new(listener).run(app).await.unwrap()
}

#[handler]
async fn get_openapi_docs() -> Html<&'static str> {
    Html(include_str!("./index.html"))
}
