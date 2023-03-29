const { createApp } = require("./app");
const dbDataSource = require("./api/models/dataSource");

const startServer = async () => {
  const app = createApp();

  await dbDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(
      `🚀🚀🚀 Server Listening to request on 127.0.0.1:${PORT} 🚀🚀🚀`
    );
  });
};

startServer();
