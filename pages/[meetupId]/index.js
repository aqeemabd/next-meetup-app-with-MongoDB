import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
    return (
        <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description}/>
    );
}

export const getStaticPaths = async () => {
    // Uncomment below code and add your connection string from MongoDB to MongoClient.connect('connection string')
    // const client = await MongoClient.connect('')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export const getStaticProps = async (context) => {

    const meetupId = context.params.meetupId

    // Uncomment below code and add your connection string from MongoDB to MongoClient.connect('connection string')
    // const client = await MongoClient.connect('')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    })

    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

 
export default MeetupDetails;