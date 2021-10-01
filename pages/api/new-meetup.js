import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if(req.method === 'POST') {
        const data = req.body

        // Uncomment below code and add your connection string from MongoDB to MongoClient.connect('connection string')
    // const client = await MongoClient.connect('')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)

        console.log(result)

        client.close()

        res.status(201).json({message: 'Meetup inserted!'})
    }
}

export default handler