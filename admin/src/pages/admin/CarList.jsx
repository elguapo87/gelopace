import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react";

const CarList = () => {

  const { aToken, cars, getCarList, changeStatus } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getCarList();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg text-center font-medium'>All Cars</h1>
      <div className='w-full flex flex-wrap justify-center gap-4 pt-5 gap-y-6'>
        {cars.map((item) => (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={item._id}>
            <img className='bg-indigo-50 aspect-[1/1] object-contain group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            
            <div className="p-4">
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.brand}</p>

              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeStatus(item._id)} type="checkbox" checked={item.available} />
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarList
