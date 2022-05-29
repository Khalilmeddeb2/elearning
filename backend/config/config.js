let environment = "dev";

let serverURLs = {
  dev: {
  // MONGO_DB: "mongodb://localhost:27017/elearning55",
  MONGO_DB: "mongodb+srv://khalilmeddeb:khalil1919@cluster0.71uoz.mongodb.net/test-pfe02-?retryWrites=true&w=majority",
  },
  //prod
  /*dev: {
    MONGO_DB: "mongodb://mongo:27017/elearning55",
  },*/
};

let config = {
  DB_URL: {
    url: `${serverURLs[environment].MONGO_DB}`,
  },
};

module.exports = {
  config: config,
};
