import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from "./logo.png"
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
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
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
    razorpay_logo
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

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Experienced General Physician focused on preventive care, chronic disease management, and long-term patient wellness.',
        fees: 55,
        address: {
            line1: '221 Baker Street',
            line2: 'Marylebone, London'
        }
    },

    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '6 Years',
        about: 'Dedicated to women’s healthcare, pregnancy support, reproductive health, and routine gynecological care.',
        fees: 65,
        address: {
            line1: '14 Queen Victoria Road',
            line2: 'Kensington, London'
        }
    },

    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD Dermatology',
        experience: '5 Years',
        about: 'Specializes in acne treatment, skin allergies, eczema management, and cosmetic dermatology procedures.',
        fees: 45,
        address: {
            line1: '88 Notting Hill Gate',
            line2: 'Notting Hill, London'
        }
    },

    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD Pediatrics',
        experience: '7 Years',
        about: 'Provides comprehensive healthcare for children, including vaccinations, developmental assessments, and nutrition guidance.',
        fees: 50,
        address: {
            line1: '35 Camden High Street',
            line2: 'Camden Town, London'
        }
    },

    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM Neurology',
        experience: '12 Years',
        about: 'Experienced Neurologist treating migraines, epilepsy, stroke recovery cases, and nervous system disorders.',
        fees: 70,
        address: {
            line1: '72 King William Street',
            line2: 'City of London'
        }
    },

    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, DM Neurology',
        experience: '10 Years',
        about: 'Focused on advanced neurological diagnostics and personalized treatment plans for complex neurological conditions.',
        fees: 68,
        address: {
            line1: '24 Bishopsgate',
            line2: 'Canary Wharf, London'
        }
    },

    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Passionate about primary healthcare, preventive screenings, and helping patients maintain healthy lifestyles.',
        fees: 40,
        address: {
            line1: '57 Oxford Street',
            line2: 'Westminster, London'
        }
    },

    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO',
        experience: '5 Years',
        about: 'Provides compassionate care for women, focusing on reproductive health, fertility counseling, and prenatal services.',
        fees: 58,
        address: {
            line1: '92 Sloane Street',
            line2: 'Chelsea, London'
        }
    },

    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD Dermatology',
        experience: '3 Years',
        about: 'Treats skin disorders, pigmentation concerns, hair loss conditions, and cosmetic skin issues.',
        fees: 35,
        address: {
            line1: '11 Portobello Road',
            line2: 'Notting Hill, London'
        }
    },

    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '6 Years',
        about: 'Dedicated Pediatrician committed to ensuring healthy growth, development, and wellbeing for children.',
        fees: 48,
        address: {
            line1: '41 Abbey Road',
            line2: 'St John’s Wood, London'
        }
    },

    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM Gastroenterology',
        experience: '11 Years',
        about: 'Specializes in digestive health, liver diseases, gastrointestinal disorders, and endoscopic procedures.',
        fees: 67,
        address: {
            line1: '67 Fleet Street',
            line2: 'Southwark, London'
        }
    },

    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS, DM Neurology',
        experience: '9 Years',
        about: 'Offers expert care for neurological conditions with a focus on patient education and long-term recovery.',
        fees: 62,
        address: {
            line1: '18 Tower Bridge Road',
            line2: 'Bermondsey, London'
        }
    },

    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Committed to evidence-based medicine and helping patients achieve better overall health through preventive care.',
        fees: 52,
        address: {
            line1: '103 Regent Street',
            line2: 'Soho, London'
        }
    },

    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS',
        experience: '8 Years',
        about: 'Experienced in pregnancy care, women’s wellness, minimally invasive procedures, and reproductive health management.',
        fees: 63,
        address: {
            line1: '29 Piccadilly Circus',
            line2: 'Mayfair, London'
        }
    },

    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD Dermatology',
        experience: '4 Years',
        about: 'Provides personalized skincare treatments and specializes in acne, eczema, and skin rejuvenation therapies.',
        fees: 38,
        address: {
            line1: '76 Brick Lane',
            line2: 'Shoreditch, London'
        }
    }

]
