

const { MongoClient } = require('mongodb');

const uri =
    "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false";

const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db("insertDB");
        const foods = database.collection("foods");

        const docs = [
            { name: "cake", healthy: false },
            { name: "lettuce", healthy: true },
            { name: "donut", healthy: false }
        ];
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await foods.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);

        // Transaction
        const session = client.startSession();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        try {

            const transactionResults = await session.withTransaction(async () => {

                const usersUpdateResults = await foods.updateOne(
                    { name: 'cake' },
                    { $addToSet: { tastesLike: `Still like choco dream ${new Date().toISOString()}` } },
                    { session });

                console.info(`${usersUpdateResults.matchedCount} document(s) found`);
                console.info(`${usersUpdateResults.modifiedCount} document(s) was/were updated`);

            }, transactionOptions);

            if (transactionResults) {
                console.info("The update was successfully executed.");
            } else {
                console.warn("The transaction was intentionally aborted.");
            }

        } catch (e) {
            console.error("The transaction was aborted due to an unexpected error: " + e);
        } finally {
            await session.endSession();
        }


    } finally {
        await client.close();
    }
}
run().catch(console.dir);
