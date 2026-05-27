import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import HorizontalGallery from "@/components/HorizontalGallery";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import Experiences from "@/components/Experiences";
import PullQuote from "@/components/PullQuote";
import Dining from "@/components/Dining";
import Location from "@/components/Location";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#F5F0EB]">
      <Navbar />
      <main>
        <Hero />

        <div className="py-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-widest">
            HAVEN BOUTIQUE HOTEL
          </h2>
          <p className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#1A1A18]/45">
            A Hidden Paradise
          </p>
        </div>

        <Introduction />

        {/* Rooms sit directly below the intro / "Our Story" section */}
        <div id="rooms">
          <Rooms />
        </div>

        {/* Gallery + Life at Haven horizontal scroll */}
        <div id="gallery">
          <Gallery />
          <HorizontalGallery />
        </div>

        <div id="amenities">
          <Amenities />
        </div>

        <div id="experiences">
          <Experiences />
        </div>

        <PullQuote />

        <div id="dining">
          <Dining />
        </div>

        <Location />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
}
