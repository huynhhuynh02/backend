process.env.DB_HOST = "127.0.0.1";
process.env.DB_USERNAME = "root";
process.env.NODE_ENV = "test";
// process.env.LE_ENV = true;
if (process.env.TRAVIS_ENV === '1') {
  process.env.DB_PASSWORD = "";
} else if (process.env.LE_ENV) {
  process.env.DB_PASSWORD = "12345678";
} else {
  process.env.DB_PASSWORD = "tanduy899";
}
process.env.DB_NAME = "yocto_erp_test";
process.env.WEB_URL = "http://localhost:4201";

process.env.PORT = 4001;
