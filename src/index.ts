import "./loadEnvironment";
import connectDatabase from "./database";
import startServer from "./server/startServer";
import environments from "./utils/environment";

(async () => {
  try {
    await startServer(environments.port);
    await connectDatabase(environments.databaseUrl);
  } catch (error) {
    process.exit(1);
  }
})();
