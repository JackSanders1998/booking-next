import Layout from "@/components/layouts/Layout"
// import BookingTool from "@/components/BookingTool"
import Head from "next/head"
import { useRouter } from "next/router"
import { api } from "@/utils/api"
import { Venue } from "@prisma/client"
import { Calendar } from "@/components/Calendar/Calendar";

export const BookVenue = ({venue}: {venue: Venue}) => {
  return (
    <>
      <Head>
        <title>{venue.title}</title>
      </Head>
      <div className="py-2 w-full min-h-screen">
        <div className="flex gap-16">
          <div className="w-5/6">
            <h2 className="py-2 font-readex font-semibold text-2xl text-slate-12">
              Book a show at {venue.title}
            </h2>
            <p className="py-2 font-readex font-normal text-base text-slate-11">
              Click on a date in the calendar to see available timeslots. Pick all the timeslots
              you&#39;d be available to play at {venue.title} from the list.
            </p>
          </div>
        </div>
        <Calendar />
          {/* <BookingTool /> */}
      </div>
    </>
  )
}

const BookVenuePage = () => {
    const id = useRouter().query.id as string;
    const {data: venue} = api.venue.getById.useQuery({id})

    if (!!venue) {
        return (
            <Layout>
                <BookVenue venue={venue}/>
            </Layout>
          )
    } else {
        return (
            <>loading...</>
        )
    }

}

export default BookVenuePage