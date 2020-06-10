module.exports = {
  development: {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "td_url_db",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  test: {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "database",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
}