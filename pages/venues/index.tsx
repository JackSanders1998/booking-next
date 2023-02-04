import Layout from "../../components/layout";
// import {useSession} from "next-auth/react";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export interface Venue {
    id:             number,
    title:          string,
    description:    string,

}

export const getServerSideProps = async (): Promise<{props: { venues: Venue[]}}> => {
    // Get all venue
    const venues = await prisma.venue.findMany();
    // Pass the data to the VenuesPage
    return {
        props: {
            venues: JSON.parse(JSON.stringify(venues)),
        },
    };
}

export default function VenuesPage({ venues = [] }: {venues: Venue[]}) {
    // const { data: session } = useSession()

    return (
        <Layout>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {venues.map((venue) => (
                    <li
                        key={venue.id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-2">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">{venue.title}</h3>
                            <p className="text-sm text-gray-500">{venue.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </ Layout>
    )
}
