interface Environments {
  databaseUrl: string;
  port: number;
  secret: string;
}

const environments: Environments = {
  databaseUrl: process.env.MONGOURL,
  port: +process.env.PORT,
  secret: process.env.SECRET,
};

export default environments;
