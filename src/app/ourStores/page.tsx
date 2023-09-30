"use client";
import React, { Component } from "react";
import Location1Map from "./Location"; // Import your Location1Map component
import Location2Map from "./location2"; // Import your Location2Map component#
import { FaLocationArrow } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";

interface LocationPageProps {}

interface LocationPageState {
  activeLocation: number;
}

class LocationPage extends Component<LocationPageProps, LocationPageState> {
  constructor(props: LocationPageProps) {
    super(props);
    this.state = {
      activeLocation: 1, // Default to the first location
    };
  }

  handleLocationChange = (locationNumber: number) => {
    this.setState({ activeLocation: locationNumber });
  };

  render() {
    return (
      <div className="md:flex gap-4">
        {/* Container to display the map preview */}
        <div className="overflow-hidden overflow-y-auto">
          {this.state.activeLocation === 1 ? (
            <Location1Map />
          ) : (
            <Location2Map />
          )}
        </div>

        <div className="text-[var(--color-text)] flex flex-col gap-4 mb-2 md:my-4 ">
          <h1 className="text-2xl font-bold text-center md:text-left">
            Our Stores
          </h1>
          <div className="bg-white p-6 flex flex-col gap-2 md:w-[80%]">
            <h2 className="font-bold text-lg">Ware house(lagos agege)</h2>
            <p>63a capitol road, opposite car wash bus stop agege</p>
            <div className="flex  gap-2 phones">
              <p className="flex justify-center items-center gap-2">
                <BsTelephoneFill /> <span>09020704026</span>
              </p>
              <p className="flex justify-center items-center  gap-2">
                <BsTelephoneFill /> <span>07068795736</span>
              </p>
            </div>

            <div className="left-2 flex justify-center">
              <button
                onClick={() => this.handleLocationChange(1)}
                className="bg-[var(--color-primary)] text-white px-5 py-3 lato text-sm   flex justify-center items-center gap-4 rounded-full"
              >
                <FaLocationArrow /> VEIW GOOGLE MAP
              </button>
            </div>
          </div>

          {/* second shop  */}
          <div className="bg-white p-6 flex flex-col gap-2 md:w-[80%]">
            <h2 className="font-bold text-lg">Ikeja branch(Airport market)</h2>
            <p>Ms 1,68 FAAN Airport Market Plaza, Ikeja Along Bus Stop</p>
            <div className="left-2 flex justify-center">
              <button
                onClick={() => this.handleLocationChange(2)}
                className="bg-[var(--color-primary)] text-white px-5 py-3 lato text-sm   flex justify-center items-center gap-4 rounded-full"
              >
                <FaLocationArrow /> VEIW GOOGLE MAP
              </button>
            </div>
          </div>
          {/* third branch  */}
          <div className="bg-white p-6 flex flex-col gap-2 md:w-[80%]">
            <h2 className="font-bold text-lg">Second branch (ikeja)</h2>
            <p>2 balogun street, anifowose ikeja(Ikeja)</p>
            <div className="flex gap-2 phones">
              <p className="flex justify-center items-center gap-2">
                <BsTelephoneFill /> <span>08080636435</span>
              </p>
            </div>
            <div className="left-2 flex justify-center">
              <button className="bg-[var(--color-primary)] text-white px-5 py-3 lato text-sm   flex justify-center items-center gap-4 rounded-full">
                <FaLocationArrow /> VEIW GOOGLE MAP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationPage;
