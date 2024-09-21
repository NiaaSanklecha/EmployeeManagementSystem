const { MongoClient } = require('mongodb');

let db;

const getNextCounter = async (name) => {
    console.log("nestCounter");
    const result = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnDocument: "after" }
      );
    console.log("count", result);
    return result.current;
  };

  async function connectToDB(){
    const client = new MongoClient(process.env.DB_URL);
  await client.connect();
  console.log("[Connected to MongoDB");
  db = client.db("EmployeeManagementSystem");
  // const counterCollection = db.collection("counters");
  }

  const getDB = () => db;

module.exports = { getNextCounter, connectToDB, getDB };