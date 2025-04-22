import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedCars from "../components/RelatedCars";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {

  const { carId } = useParams()
  const { cars, currencySymbol, backendUrl, token, getCarsData } = useContext(AppContext);
  const [carInfo, setCarInfo] = useState(null);
  const [carSlots, setCarSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showImage, setShowImage] = useState(false);

  const navigate = useNavigate();

  const fetchCarInfo = () => {
    const carInfo = cars.find((car) => car._id === carId);
    setCarInfo(carInfo);
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRY", "SAT"];

  const getAvailableSlots = async () => {
    if (!carInfo) return;

    setCarSlots([]);

    // getting current date
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      if (currentDate.getDay() === 0) {
        continue;
      }

      // setting end time of the date with index
      let endTime = new Date(currentDate);

      if (currentDate.getDay() !== 6) {
        // Weekdays: 10:00 AM to 9:00 PM
        endTime.setHours(21, 0, 0, 0);

      } else {
        // Saturday: 10:00 AM to 6:00 PM
        endTime.setHours(18, 0, 0, 0);
      }

      // Adjust the start time for the current day
      if (today.getDate() === currentDate.getDate()) {
        // If today, start from the next hour or half-hour mark
        currentDate.setHours(Math.max(10, currentDate.getHours() + 1));
        currentDate.setMinutes(currentDate.getMinutes() > 60 ? 60 : 0);

      } else {
        // Other days: start at 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = carInfo.slots_booked[slotDate] && carInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          });
        }

        // increment current time by 60 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }
      
      setCarSlots(prev => ([...prev, timeSlots]));
    }
  };
  
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return; // <--- You already fixed this!
    }
  
    // Validate that a day is selected
    if (!carSlots[slotIndex] || carSlots[slotIndex].length === 0) {
      toast.warn("Please select a valid day to book an appointment");
      return;
    }
  
    // Validate that a time is selected
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }
  
    try {
      const date = carSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
  
      const { data } = await axios.post(
        `${backendUrl}/api/users/book-appointment`,
        { carId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (data.success) {
        toast.success(data.message);
        await getCarsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCarInfo();
  }, [cars, carId]);

  useEffect(() => {
    getAvailableSlots();
  }, [carInfo]);
  
  return carInfo && (
    <div className="mt-3">
      {/* --------Doctor Details-------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img onClick={() => setShowImage(true)} className="bg-stone-100 w-full sm:max-w-72 aspect-[1/1] object-contain rounded-lg cursor-pointer" src={carInfo.image} alt="" />
          <img onClick={() => {setShowImage(false); scrollTo(0, 0)}} className={`${showImage ? "fixed bottom-0 right-0 left-0 top-0 bg-stone-100 w-full h-full overflow-y-hidden aspect-[1/1] object-contain cursor-pointer" : "hidden"}`} src={carInfo.image} alt="" />
          {/* <p onClick={() => setShowImage(false)} className={`${showImage ? "fixed top-5 right-5 z-10 text-4xl font-bold text-black cursor-pointer" : "hidden"} `}>X</p> */}
        </div>

        <div className="flex-1 border border-primary rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* --------Doc Info: name, degree, expepience-------- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {carInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-3 text-base mt-1 text-gray-600">
            <p>{carInfo.aspiration}</p>
            <p>{carInfo.displacement + "cc"}</p>
            <button className="py-0.5 px-2 border text-sm rounded-full">{carInfo.power + "HP"}</button>
          </div>

          {/* -----Doctor About----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{carInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{carInfo.fees} / Hour</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 time">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {carSlots.length && carSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {carSlots.length && carSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
  onClick={bookAppointment}
  disabled={!slotTime}
  className={`text-sm font-light px-14 py-3 rounded-full my-6 ${
    slotTime ? "bg-primary text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Book an appointment
</button>
      </div>

      <RelatedCars carId={carId} brand={carInfo.brand} />
    </div>
  )
}

export default Appointment
