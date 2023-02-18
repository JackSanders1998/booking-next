import Layout from "@/components/layouts/Layout";
import { Venue } from "../api/venue/beta";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useSession } from "next-auth/react";

const VenuePage = () => {
  const router = useRouter()
  const { id } = router.query
  const [ content , setContent ] = useState()
  const { data: session, status } = useSession()

  const getVenue = async () => {
    const res = await ('/api/venue/cle1uci4b00022rncuo6dqg01')
  }


  return (
    <Layout>
      <h1>Venue page</h1>a single venue
      {/* {id} */}
      {/* <div>{pid.id}</div> */}
    </Layout>
  );
}

export default VenuePage
