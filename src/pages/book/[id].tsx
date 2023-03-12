import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import type { Venue } from "@prisma/client";
import { Calendar } from "@/components/Calendar/Calendar";
import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import type { Draft } from "immer";
import produce from "immer";
import { atom,Provider, useAtom } from "jotai";
import { dateValueAtom } from "stores/DateValueStore";

const BookVenue = ({ venue }: { venue: Venue }) => {
  const [days, setDays] = useAtom(dateValueAtom);

  const handleAdd = (calendarDay: DateValue) => {
    setDays(
      produce((draft: Draft<DateValue>[]) => {
        const selectedDay = draft.find(
          (selectedDay) =>
            JSON.stringify(selectedDay) === JSON.stringify(calendarDay)
        );
        if (selectedDay) {
          console.log("selectedDay", selectedDay)
          draft = draft.filter(
            (selectedDay) =>
              JSON.stringify(selectedDay) !== JSON.stringify(calendarDay)
          );
        }
        draft.push(calendarDay);

      })
    );
  };

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
          aria-label="Appointment date"
          minValue={today(getLocalTimeZone())}
        />
        <div>
          {days.map((day) => (
            <div key={`${day.year}_${day.month}_${day.day}`}>
              {JSON.stringify(day)}
            </div>
          ))}
        </div>
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
        <Provider>
          <BookVenue venue={venue} />
        </Provider>
      </Layout>
    );
  } else {
    return <>loading...</>;
  }
};

export default BookVenuePage;
