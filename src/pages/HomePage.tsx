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

        {/* Small centered banner as requested */}
        <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold tracking-widest">
            HAVEN BOUTIQUE HOTEL
          </h2>
        </div>

        <Introduction />

        {/* Rooms sit directly below the intro / "Our Story" section */}
        <div id="rooms">
          <Rooms />

          {/* Repeat banner after the section that follows the overview area */}
          <div className="py-8 text-center">
            <h2 className="text-2xl font-semibold tracking-widest">
              HAVEN BOUTIQUE HOTEL
            </h2>
          </div>
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
