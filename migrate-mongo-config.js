const config = {
  mongodb: {
    url: process.env.MONGO_URL,

    databaseName: "test",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",

  useFileHash: false,

  moduleSystem: "commonjs",
};

module.exports = config;
