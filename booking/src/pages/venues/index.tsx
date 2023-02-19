import Layout from "@/components/layouts/Layout";
import Link from "next/link";
import _ from 'lodash';

import { api } from "../../utils/api";

const VenuesPage = () => {
  const {data: venues} = api.venue.getAll.useQuery()

  if (_.isEmpty(venues) || venues === undefined) {
    return <Layout>loading</Layout>
  }

  return (
    <Layout>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {venues.map((venue) => (
          <li
            key={venue.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <Link
              className="flex flex-1 flex-col p-2"
              href={`/venues/${venue.id}`}
            >
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {venue.title}
              </h3>
              <p className="text-sm text-gray-500">{venue.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default VenuesPage