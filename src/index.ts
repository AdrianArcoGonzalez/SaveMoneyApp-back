import "./loadEnvironment";
import connectDatabase from "./database";
import startServer from "./server/startServer";

const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL as string;

(async () => {
  try {
    await startServer(+port);
    await connectDatabase(urlMongo);
  } catch (error) {
    process.exit(1);
  }
})();
