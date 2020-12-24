declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    REDIS_SECRET: string;
    DB_PASSWORD: string;
    REDIS_SECRET: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    CORS_ORIGIN: string;
  }
}
