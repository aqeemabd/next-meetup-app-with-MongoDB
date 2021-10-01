import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";

const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups} />
    );
}

// export const getServerSideProps = async (context) => {

//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//             res: res,
//             req: req
//         }
//     }
// }

export const getStaticProps = async () => {

    // Uncomment below code and add your connection string from MongoDB to MongoClient.connect('connection string')
    // const client = await MongoClient.connect('')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}
 
export default HomePage;