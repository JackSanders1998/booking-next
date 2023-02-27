import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import type { Venue } from "@prisma/client";
import { Calendar } from "@/components/Calendar/Calendar";
import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

export const BookVenue = ({ venue }: { venue: Venue }) => {
  // const [date, setDate] = useState();
  const now = today(getLocalTimeZone());
  const disabledRanges = [
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const { locale } = useLocale();
  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  return (
    <>
      <Head>
        <title>{venue.title}</title>
      </Head>
      <div className="min-h-screen w-full py-2">
        <div className="flex gap-16">
          <div className="w-5/6">
            <h2 className="font-readex text-slate-12 py-2 text-2xl font-semibold">
              Book a show at {venue.title}
            </h2>
            <p className="font-readex text-slate-11 py-2 text-base font-normal">
              Click on a date in the calendar to see available timeslots. Pick
              all the timeslots you&#39;d be available to play at {venue.title}{" "}
              from the list.
            </p>
          </div>
        </div>
        <Calendar
          // value={date} onChange={(value) => {dateList.push(value); setDateList(dateList)}}
          aria-label="Appointment date"
          minValue={today(getLocalTimeZone())}
          isDateUnavailable={isDateUnavailable}
        />
      </div>
    </>
  );
};

const BookVenuePage = () => {
  const id = useRouter().query.id as string;
  const { data: venue } = api.venue.getById.useQuery({ id });

  if (!!venue) {
    return (
      <Layout>
        <BookVenue venue={venue} />
      </Layout>
    );
  } else {
    return <>loading...</>;
  }
};

export default BookVenuePage;
