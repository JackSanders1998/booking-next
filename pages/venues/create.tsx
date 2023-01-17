import { getSession } from 'next-auth/react';
import {GetServerSidePropsContext} from "next";
import CreateVenueForm from "../../components/createVenueForm";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     // Check if user is authenticated
//     const session = await getSession(context);
//
//     // If not, redirect to the Homepage
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }
//
//     return {
//         props: {},
//     };
// }

const Create = () => {
    // const addVenue = data => axios.post('/api/venues', data);

    return (
        <div className="max-w-screen-sm mx-auto">
            <h1 className="text-xl font-medium text-gray-800">List your venue</h1>
            <p className="text-gray-500">
                Fill out the form below to list a new venue.
            </p>
            <div className="mt-8">
                <CreateVenueForm
                    buttonText="Add venue"
                    redirectPath="/"
                    // onSubmit={addVenue}
                />
            </div>
        </div>
    );
};

export default Create;