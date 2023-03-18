import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import BookingDates from "../components/BookingDates";
import PlaceImg from "../components/PlaceImg";

const BookingsPage = () => {
  const [booking, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/booked-place").then((res) => {
      setBookings(res.data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div>
        {booking?.length > 0 &&
          booking.map((el) => (
            <Link
              key={el.id}
              to={`/account/bookings/${el._id}`}
              className="flex gap-3 bg-gray-200 rounded-2xl mb-2 overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={el.place} />
              </div>
              <div className="py-2 pr-3 grow">
                <h2 className="text-xl">{el.place.title}</h2>
                <div className="text-xl">
                  <BookingDates el={el} className="mb-2 mt-4 text-gray-500" />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">Total price: ${el.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
