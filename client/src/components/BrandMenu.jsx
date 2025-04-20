import { brandData } from "../assets/assets";
import { Link } from "react-router-dom";


const BrandMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find by Brand</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted cars,
        schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center items-center gap-4 pt-5 w-full overflow-scroll">
        {brandData.map((item, index) => (
            <Link onClick={() => scrollTo(0,0)} className="p-3 border bg-stone-100  rounded-full flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" to={`/cars/${item.brand}`} key={index}>
                <img className="w-16 aspect-[1/1] object-contain sm:w-24 mb-2" src={item.image} alt="" />
                <p>{item.brand}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default BrandMenu