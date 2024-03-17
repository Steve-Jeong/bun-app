require("dotenv").config();

const {app} = require('./index')

function redisSetup() {
   // redis setup
  const RedisStore = require("connect-redis").default; // .default가 없으면 에러가 난다.
  const { createClient } = require("redis");

  // Initialize client. {url:'redis://redis:6379'}(O) {host:'redis', port:6379}(X)
  let redisClient = createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@redis:6379`,
  }); // 왜 let으로 했을까? -> const로 해도 프로그램 작동에 차이가 없음.
  async function connect() {
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
    redisClient.on("ready", () => console.log("Redis is ready to use"));
    await redisClient.connect().catch(console.error);

    // await redisClient.set("key", "234");
    // const value = await redisClient.get("key");
    // console.log(`redis key-value : key-${value}`);
  }

  connect();

  // Initialize store.
  const redisStore = new RedisStore({
    // 왜 let으로 했을까? -> const로 해도 프로그램 작동에 차이가 없음.
    client: redisClient,
    prefix: "myapp:", // default값인 sess:를 myapp:으로 변경
  });

    console.log("before express-session is run");
    console.log("app in redisSetup : ", app)
    const session = require("express-session");
    app.use(
      session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: "keyboard cat",
        name: "sessionId", // nodejs를 쓰면 session id이름이 connect.id인데 이를 일반적인 이름으로 바꾸어서 nodejs server를 쓴다는 것을 숨김으로서 해커 공격으로 부터 보호한다.
        cookie: {
          secure: process.env.NODE_ENV === "production", // Set to true in production
          httpOnly: true,
          maxAge: 30 * 1000, // 30 seconds
          sameSite: "strict", // Adjust according to your needs
        },
      })
    );
    console.log("after express-session is run");
}

exports.redisSetup = redisSetup;