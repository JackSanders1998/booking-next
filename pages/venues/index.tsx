import Layout from "../../components/layout";
import {Venue} from "../api/venues/get-all-venues";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export default function VenuesPage() {
    const { data: session } = useSession()
    const [venues, setVenues] = useState<Venue[]>([])

    // Fetch venues
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/venues/get-all-venues')
            setVenues(await res.json())
        }
        fetchData()
    }, [session])

    return (
        <Layout>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {venues.map((venue) => (
                    <li
                        key={venue.id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-2">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">{venue.name}</h3>
                            <p className="text-sm text-gray-500">{venue.city}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </ Layout>
    )
}
