import Layout from "../../components/layout"
import {Venue} from "../api/venue/get-all-venues";

import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const venue = await prisma?.venue.findUnique({
        where: {
            id: String(params?.id),
        },
    });
    return {
        props: venue,
    };
};

async function publishPost(id: string): Promise<void> {
    await fetch(`/api/publish/${id}`, {
        method: "PUT",
    });
    await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
    await fetch(`/api/post/${id}`, {
        method: "DELETE",
    });
    Router.push("/");
}

export default function VenuePage({ id, name, city }: Venue) {
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
