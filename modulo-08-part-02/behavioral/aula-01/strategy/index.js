import ContextStrategy from "./src/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoBStrategy.js"
import PostegresStrategy from "./src/strategies/postegresStrategy.js"

const postgresConnectionString = "postgres://erickwendel:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostegresStrategy(postgresConnectionString))
await postgresContext.connect();


const mongoDBConnectionString = "mongodb://erickwendel:senhaadmin@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()

const data = [{
  name: 'andreisantos',
  type: 'transaction'
},
{
  name: 'mariasilva',
  type: 'activitylog'
}
]


const contextTypes = {
  transaction: postgresContext,
  activitylog: mongoDBContext
}

for (const {type, name } of data) {
  const context = contextTypes[type];

  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read())
}