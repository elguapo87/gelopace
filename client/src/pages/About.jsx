import { useState } from "react";
import { assets } from "../assets/assets";

const About = () => {

  const [showFull, setShowFull] = useState(false);

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>ABOUT <span className="text-grat-700 font-medium">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img onClick={() => setShowFull(true)} className="w-full md:max-w-[360px] cursor-pointer" src={assets.race_track} alt="" />
        <img onClick={() => {setShowFull(false); scrollTo(0, 0)}} className={`${showFull ? "fixed w-screen h-screen bottom-0 left-0 right-0 top-0 aspect-[1/1] object-fill cursor-pointer" : "hidden"}`} src={assets.race_track} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            The Gelopace: Where Innovation Meets Speed 
            Nestled on the outskirts of the city, the Velocity Proving Grounds is more than just a racetrack—it's
            a state-of-the-art facility where engineering dreams are put to the ultimate test. Spanning over 500 acres,
            this purpose-built track is designed to simulate a wide range of driving conditions, allowing automakers to
            push the boundaries of performance, safety, and innovation.
          </p>
          <p>
            The main track stretches 4.5 miles and features a mix of high-speed straights, sharp hairpins, and challenging
            chicanes. With varying gradients and surfaces, it mimics real-world scenarios, from urban streets to rugged mountain passes.
            Adjacent to the main circuit, specialized areas like skid pads, wet tracks, and off-road courses cater to specific testing needs
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            What sets the Velocity Proving Grounds apart is its commitment to sustainability. Solar panels line the pit building roofs,
            and an on-site water recycling system ensures minimal environmental impact. The facility also hosts community events, where
            car enthusiasts can witness the latest prototypes in action.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Access to a network of trusted driving instructors professionals in your area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your driving skills.</p>
        </div>
      </div>
    </div>
  )
}

export default About