import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopCars = () => { 

  const { cars } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Cars to Choose</h1>

      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of our cars.</p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {cars.slice(0, 10).map((item) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={item._id} className="border border-primary rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                <img className="bg-stone-100 aspect-[1/1] object-contain" src={item.image} alt="" />

                <div className="p-4">
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-500"}`}>
                        <p className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}></p><p>{item.available ? "Available" : "Not Available"}</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                    {/* <p className="text-gray-600 text-sm">{item.brand}</p> */}
                </div>
            </div>
        ))}
      </div>

      <button onClick={() => { navigate("/cars"); scrollTo(0, 0) }} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">More</button>
    </div>
  )
}

export default TopCars