import Head from "next/head";

import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>amp - Booking made simple for music venues</title>
        <meta
          name="description"
          content="Booking made simple for music venues"
        />
      </Head>
      <Layout>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Pricing />
        <Faqs />
      </Layout>
    </>
  );
}
