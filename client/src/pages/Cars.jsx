import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from "react-router-dom";

const Cars = () => {

  const { cars } = useContext(AppContext);
  const { brand } = useParams();
  const [filterCars, setFilterCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

const applyFilters = () => {
  if (brand) {
    setFilterCars(cars.filter((car) => car.brand === brand));

  } else {
    setFilterCars(cars);
  }
};

useEffect(() => {
  applyFilters();
}, [cars, brand]);

  return (
    <div>
      <p className="text-gray-600 md:mt-3">Browse through the car brands.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        <button onClick={() => setShowFilters(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilters ? "bg-primary text-white" : ""}`}>Filters</button>

        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilters ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => brand === "Bmw" ? navigate("/cars") : navigate("/cars/Bmw")} className={`w-fit sm:w-auto pl-3 py-1.5 max-sm:pr-3 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Bmw" ? "bg-indigo-100 text-black" : ""}`}>Bmw</p>
          <p onClick={() => brand === "Alpine" ? navigate("/cars") : navigate("/cars/Alpine")} className={`w-fit sm:w-auto pl-3 py-1.5 max-sm:pr-3 sm:pr-16 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Alpine" ? "bg-indigo-100 text-black" : ""}`}>Alpine</p>
          <p onClick={() => brand === "Alfa Romeo" ? navigate("/cars") : navigate("/cars/Alfa Romeo")} className={`w-fit sm:w-auto pl-3 py-1.5 max-md:pr-3 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Alfa Romeo" ? "bg-indigo-100 text-black" : ""}`}>Alfa Romeo</p>
          <p onClick={() => brand === "Maserati" ? navigate("/cars") : navigate("/cars/Maserati")} className={`w-fit sm:w-auto pl-3 py-1.5 max-sm:pr-3 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Maserati" ? "bg-indigo-100 text-black" : ""}`}>Maserati</p>
          <p onClick={() => brand === "Porsche" ? navigate("/cars") : navigate("/cars/Porsche")} className={`w-fit sm:w-auto pl-3 py-1.5 max-sm:pr-3 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Porsche" ? "bg-indigo-100 text-black" : ""}`}>Porsche</p>
          <p onClick={() => brand === "Nissan" ? navigate("/cars") : navigate("/cars/Nissan")} className={`w-fit sm:w-auto pl-3 py-1.5 max-sm:pr-3 border border-gray-300 rounded transiton-all cursor-pointer ${brand === "Nissan" ? "bg-indigo-100 text-black" : ""}`}>Nissan</p>
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterCars.map((item) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-primary rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={item._id}>
              <img className='bg-stone-100 aspect-[1/1] object-contain' src={item.image} alt="" />

              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                {/* <p className="text-gray-600 text-sm">{item.brand}</p> */}
              </div>
            </div>
          ))}
        </div>   
      </div>
    </div>
  )
}

export default Cars
