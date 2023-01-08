import Layout from "../../components/layout"
import {Venue} from "../api/venues/get-all-venues";
import ErrorPage from "next-auth/core/pages/error";
import {useRouter} from "next/router";
import AccessDenied from "../../components/access-denied";


export default function VenuePage({ id, name, city }: Venue) {
    const router = useRouter()
    if (!router.isFallback && !id) {
        return <AccessDenied />
    }
    return (
        <Layout>
            <h1>Venue page</h1>
            a single venue
            {id}
            {name}
            {city}
        </Layout>
    )
}
