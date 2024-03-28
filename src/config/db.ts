// Configuration File for database connection
import { MongoClient, ServerApiVersion } from "mongodb";

function initMongoConnection() {
    let url = process.env.MONGODB_URL || "";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    connectToMongoDb(url)
        .then((r) => console.log("DB Connected Successfully"))
        .catch((e) => {
            console.log("error connecting to db");
        });
}

async function connectToMongoDb(url: string) {
    const client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!",
        );
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export default initMongoConnection;
