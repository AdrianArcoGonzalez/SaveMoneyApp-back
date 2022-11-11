interface Environments {
  databaseUrl: string;
  port: number;
}

const environments: Environments = {
  databaseUrl: process.env.MONGOURL,
  port: +process.env.PORT,
};

export default environments;
