import appointment_img from './appointment_img.png'
import girl from "./girl_flag.png"
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import gelopace from "./gelopace.png"
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import Dermatologist from './Dermatologist.svg'
import bmw from "./bmw.png"
import alfa from "./alfa_romeo.png"
import maserati from "./maserati.png"
import porsche from "./porsche.png"
import alpine from "./alpine.png"
import nissan from "./nissan.png"
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import mustang from "./mustang.png"
import bmw_img from "./bmw_img.png"
import alpine_img from "./alpine_img.png"
import alfa_img from "./alfa_img.png"
import maserati_img from "./maserati_img.png"
import porsche_img from "./Porsche_img.png"
import nissan_img from "./nissan_img.png"
import suzuka from "./suzuka.jpg"
import mazda_laguna from "./mazda_laguna.jpg"
import race_cars from "./race_cars.jpeg"
import race_track from "./race_track.jpeg"
import office from "./office.png"
import bmw_m2_img from "./bmw_m2.png"
import cars_img from "./cars_list.png"

export const assets = {
    appointment_img,
    girl,
    header_img,
    group_profiles,
    logo,
    gelopace,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    mustang,
    suzuka,
    mazda_laguna,
    race_cars,
    race_track,
    office,
    cars_img
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const brandData = [
    {
        brand: 'Bmw',
        image: bmw
    },
    {
        brand: 'Alpine',
        image: alpine
    },
    {
        brand: 'Alfa Romeo',
        image: alfa
    },
    {
        brand: 'Maserati',
        image: maserati
    },
    {
        brand: 'Porsche',
        image: porsche
    },
    {
        brand: 'Nissan',
        image: nissan
    },
]

export const cars = [
    {
        _id: 'car1',
        name: 'Bmw M3 GTS',
        image: bmw_img,
        brand: 'Bmw',
        aspiration: 'Naturally-Aspirated V8',
        displacement: "",
        power: '450',
        about: 'The ultimate factory M3 comes with more in all the right departments and less wherever it made sense for a street-legal track car. Instead of the standard M3 4.0-liter V8, the E92 M3 GTS has “more” in the form of its high-revving 4.4-liter V8, which gives it 40 more horsepower.',
        fees: 300
    },
    {
        _id: 'car2',
        name: 'Bmw M2',
        image: bmw_m2_img,
        brand: 'Bmw',
        aspiration: 'Turbo inline-6',
        displacement: "",
        power: '365',
        about: 'Here is BMW’s recipe for the M2 Coupé. First, take the suspension and braking of the larger M3 and M4 and fit them in a lighter and more nimble chassis. Then, rather than attempting to imitate the bigger brothers’ powerplants, just take the best parts and infuse them perfectly.',
        fees: 280
    },
    {
        _id: 'car3',
        name: 'Alpine A110',
        image: alpine_img,
        brand: 'Alpine',
        aspiration: 'Turbo inline 4',
        power: '242',
        about: '"It’s pronounced “Al-peen,” and named for the type of driving Alpine founder Jean Rédélé designed his cars to be adept at. It’s been 24 years since the last Alpine A610 rolled off the assembly line. The new A110 was designed from the ground up with a primary goal in mind: Lightness. Throughout the A110, from its all-aluminum body and all-aluminum chassis to the integrated components, it delivers weight savings, agility, and efficiency. Less than 2,500 pounds, with a rear/mid-engine places the Alpine squarely facing tough competitors like the Porsche Cayman or Audi TT. Hit the mountain roads and find out if Colin Chapman is still right in saying “Simplify, then add lightness.” Alpine is banking he was."',
        fees: 230
    },
    {
        _id: 'car4',
        name: 'Alfa Romeo Giulia Quadrifoglio',
        image: alfa_img,
        brand: 'Alfa Romeo',
        aspiration: 'Turbo v6',
        displacement: "",
        power: '505',
        about: '"It’s been 21 years since Alfa Romeo sold cars in the United States, and one drive of the new Giulia might infer they spent the entire time making sure their next entry was perfect. The Giulia Quadrifoglio is all Alfa Romeo, with exotic lines, delicate styling touches, and the performance you expect from an Italian sport sedan. In Quadrifoglio dress the biggest treat is the 505 horsepower Ferrari-derived 2.9-liter twin-turbo V6.',
        fees: 300
    },
    {
        _id: 'car5',
        name: 'Maserati MC20',
        image: maserati_img,
        brand: 'Maserati',
        aspiration: 'Turbo v6',
        displacement: "",
        power: '621',
        about: 'Power for the MC20 Coupé and Cielo come from a twin-turbocharged 3.0-liter V-6 rated for 621 horsepower and 538 pound-feet of torque.',
        fees: 350
    },
    {
        _id: 'car6',
        name: 'Porsche 911 GT3',
        image: porsche_img,
        brand: 'Porsche',
        aspiration: 'Naturally-Aspirated flat-6',
        displacement: "",
        power: '510',
        about: 'For almost 25 years the 911 GT3 has accepted only the limits of physics – and left the ordinary far behind. Motorsport-tested design and maximum performance ensure it unwaveringly bridges the boundary between the racetrack and the road.',
        fees: 350
    },
    {
        _id: 'car7',
        name: 'Nissan GTR',
        image: nissan_img,
        brand: 'Nissan',
        aspiration: 'Turbo v6',
        displacement: "",
        power: '600',
        about: '"With its more aggressive styling, the upgraded 2020 R35 Nismo features faster acceleration, improved cornering force and better braking performance than the previous 2017 model. Nissan has iteratively refined and improved its R35 “Godzilla” for over a decade.',
        fees: 350
    },
    
]