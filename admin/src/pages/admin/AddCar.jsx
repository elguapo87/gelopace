import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const AddCar = () => {

  const { aToken, backendUrl } = useContext(AdminContext);
  const [carImage, setCarImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState("");
  const [aspiration, setAspiration] = useState("");
  const [displacement, setDisplacement] = useState("");
  const [power, setPower] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!carImage) {
        return toast.error("Image Not Selected")
      }

      const formData = new FormData();
      formData.append("image", carImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("brand", brand);
      formData.append("aspiration", aspiration);
      formData.append("displacement", displacement);
      formData.append("power", power);
      formData.append("fees", Number(fees));
      formData.append("about", about);

      const { data } = await axios.post(`${backendUrl}/api/admin/add-car`, formData, {
        headers: { aToken }
      });

      if (data.success) {
        toast.success(data.message);
        setCarImage(false);
        setName("");
        setEmail("");
        setPassword("");
        setBrand("");
        setAspiration("");
        setDisplacement("")
        setPower("");
        setFees("");
        setAbout("");

      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Car</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="car-img">
            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={carImage ? URL.createObjectURL(carImage) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setCarImage(e.target.files[0])} type="file" id="car-img" hidden />
          <p>Upload Car <br /> picture</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Car Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Car Name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Car Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Car Email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Car Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder="Car Password" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Car Brand</p>
              <input onChange={(e) => setBrand(e.target.value)} value={brand} className="border rounded px-3 py-2" type="text" placeholder="Car Brand" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Displacement</p>
              <input onChange={(e) => setDisplacement(e.target.value)} value={displacement} className="border rounded px-3 py-2" type="text" placeholder="Displacement" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Power</p>
              <input onChange={(e) => setPower(e.target.value)} value={power} className="border rounded px-3 py-2" type="text" placeholder="Power (in hp)" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Aspiration</p>
              <input onChange={(e) => setAspiration(e.target.value)} value={aspiration} className="border rounded px-3 py-2" type="text" placeholder="Aspiration Type" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="fees" required />
            </div> 
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Car</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" placeholder="Write About Car" rows={5} required></textarea>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Car</button>
      </div>
    </form>
  )
}

export default AddCar
