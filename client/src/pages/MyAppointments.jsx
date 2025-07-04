import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {

  const { backendUrl, token, getCarsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [                                           
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]; 
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/appointment-list`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/cancel-appointment`, { appointmentId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message);
        await getAppointments();
        await getCarsData();

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.map((item) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={item._id}>
            <div>
              <img className="w-32 bg-indigo-50" src={item.carData.image} alt="" />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.carData.name}</p>
              <p>{item.speciality}</p>
              <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {
                !item.cancelled && !item.isCompleted
                    &&
               <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
              }
              {
                item.cancelled
                    &&
                <p className="sm:min-w-48 px-5 py-2 border border-red-500 rounded text-red-500">Appointment Cancelled</p>
              }
              {
                item.isCompleted
                    &&
                <p className="sm:min-w-48 px-5 py-2 border border-green-500 rounded text-green-500">Appointment Completed</p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
