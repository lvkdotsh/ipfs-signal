use std::sync::Arc;

use color_eyre::eyre::Result;
use config::{Config, Environment};
use serde::Deserialize;

use crate::{cache::Cache, database::Database, storage::Storage};

pub type State = Arc<AppState>;

#[derive(Debug)]
pub struct AppState {
    pub config: AppConfig,
    pub database: Database,
    pub storage: Storage,
    pub cache: Cache,
}

#[derive(Deserialize, Debug)]
pub struct AppConfig {
    /// Information
    pub database_url: String,
    pub s3_endpoint_url: String,
    pub s3_region: String,
    pub s3_bucket_name: String,
    pub s3_access_key: String,
    pub s3_secret_key: String,
    pub github_app: Option<GithubAppConfig>,
}

/// Github App Config
/// 
/// Setup your app with Callback URL
/// /api/github/oauth
/// 
/// Setup URL (optional)
/// /github/setup
/// 
/// Webhook URL (optional)
/// /api/github/webhook
#[derive(Deserialize, Debug)]
pub struct GithubAppConfig {
    pub client_id: String,
    pub client_secret: String,
}

impl AppState {
    pub async fn new() -> Result<Self> {
        let config = Config::builder()
            .add_source(Environment::default())
            .build()?;

        // Deserialize into the AppConfig struct
        let config: AppConfig = config.try_deserialize()?;

        let database = Database::new(&config.database_url).await?;

        let storage = Storage::from_config(&config);

        let cache = Cache::default();

        Ok(Self {
            config,
            database,
            storage,
            cache,
        })
    }
}
