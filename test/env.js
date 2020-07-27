process.env.DB_HOST = "127.0.0.1";
process.env.DB_USERNAME = "root";
if (process.env.TRAVIS_ENV === '1') {
  process.env.DB_PASSWORD = "";
} else {
  process.env.DB_PASSWORD = "tanduy899";
}
process.env.DB_NAME = "yocto_erp";
process.env.WEB_URL = "http://localhost:4201";
process.env.NODE_ENV = "test";
