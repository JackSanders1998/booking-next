import Layout from "@/components/layouts/Layout";

import { useRouter } from "next/router";
import { api } from "@/utils/api";

const VenuePage = () => {
  const id = useRouter().query.id as string;
  const {data: venue} = api.venue.getById.useQuery({id})

  return (
    <Layout>
      <h1>Venue page</h1>
      {id}
      {JSON.stringify(venue)}
    </Layout>
  );
}

export default VenuePage
