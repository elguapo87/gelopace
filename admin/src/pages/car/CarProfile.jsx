import { useContext } from "react"
import { CarContext } from "../../context/CarContext"
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const CarProfile = () => {

  const { backendUrl, cToken, car, setCar, getCarData } = useContext(CarContext);
  const { currency } = useContext(AppContext);
  const [carImage, setCarImage] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const updateCar = async () => {
    try {
      const formData = new FormData();
      formData.append("image", carImage);
      formData.append("name", car.name);
      formData.append("email", car.email);
      formData.append("brand", car.brand);
      formData.append("displacement", car.displacement);
      formData.append("aspiration", car.aspiration);
      formData.append("about", car.about);
      formData.append("fees", car.fees);
      formData.append("available", car.available);

      const { data } = await axios.post(`${backendUrl}/api/cars/carinfo-update`, formData, {
        headers: { Authorization: `Bearer ${cToken}` }
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        await getCarData();

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (cToken) {
      getCarData();
    }
  }, [cToken]);

  return car && (
    <div>
      
      <div className="flex flex-col gap-4 m-5">
        <div>
          {
            isEdit
              ?
            <label htmlFor='car-img'>
              <div className='inline-block relative cursor-pointer'>
                <img className='sm:max-w-64 rounded opacity-75' src={carImage ? URL.createObjectURL(carImage) : car.image} alt="" />
                <img className='w-10 absolute bottom-[30%] right-[50%]' src={ assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setCarImage(e.target.files[0])} type="file" id="car-img" hidden />
            </label>
              :
            <img className="bg-primary/80 w-full aspect-[1/1] object-contain sm:max-w-64 rounded-lg" src={car.image} alt="" />
          }
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* -------Car info ------- */}
          {
            isEdit
              ?
            <input onChange={(e) => setCar(prev => ({ ...prev, name: e.target.value }))} value={car.name} className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" />
              :
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{car.name}</p>
          }

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, email: e.target.value }))} value={car.email} className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="email" />
                :
              <p>{car.email}</p>
            }
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, brand: e.target.value }))} value={car.brand} className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="text" />
                :
              <p>Car brand: <span className="text-2xl font-medium">{car.brand}</span></p>
            }
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, displacement: e.target.value }))} value={car.displacement} className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="text" />
                :
              <p>Displacement: <span className="text-lg font-medium">{car.displacement + "cc"}</span></p>
            }
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, power: e.target.value }))} value={car.power} className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="text" />
                :
              <p>Power: <span className="text-lg font-medium">{car.power + "hp"}</span></p>
            }
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, aspiration: e.target.value }))} value={car.aspiration} className="bg-gray-50 text-2xl font-medium max-w-60 mt-4" type="text" />
                :
              <p>Aspiration: <span className="text-lg font-medium">{car.aspiration}</span></p>
            }
          </div>

          {/* About Car */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About</p>
            {
              isEdit
                ?
              <textarea onChange={(e) => setCar(prev => ({ ...prev, about: e.target.value }))} value={car.about} rows={5} cols={50} className="bg-gray-50 p-1 text-sm font-medium  mt-4"></textarea>
                :
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">{car.about}</p>
            }
          </div>

          <div className="text-gray-600 font-medium mt-4">
            {
              isEdit
                ?
              <input onChange={(e) => setCar(prev => ({ ...prev, fees: e.target.value }))} value={car.fees} className="bg-gray-50 text-xl font-medium max-w-60 mt-4" type="number" />
                :
              <p className="text-gray-600 font-medium mt-4">
                Appointment fee: <span className="text-gray-800">{currency}{isEdit ? <input onChange={(e) => setCar(prev => ({ ...prev, fees: e.target.value }))} value={car.fees} type="number" /> : car.fees}</span>
              </p>
            }
          </div>

          <div className="flex gap-1 pt-2">
            <input onChange={() => isEdit && setCar(prev => ({ ...prev, available: !prev.available }))} type="checkbox" checked={car.available} />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ?
            <button onClick={updateCar} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Save</button>
              :
            <button onClick={() => setIsEdit(true)} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default CarProfile

