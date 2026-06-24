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
import lost_in_space from './lost_in_space.png'
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
    razorpay_logo,
    lost_in_space
}

export const specialityData = [
    {
        speciality: 'General Physician',
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
        about: 'Dr. Richard James is an experienced General Physician dedicated to preventive healthcare and effective treatment plans. He focuses on diagnosing common illnesses, managing chronic conditions, and promoting healthy lifestyles. His patient-first approach and commitment to modern medical practices have earned him a reputation for delivering reliable and compassionate care.',
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
        about: 'Dr. Emily Larson specializes in women’s healthcare, reproductive wellness, and prenatal care. She provides personalized treatment plans and supports patients through every stage of life. Her compassionate nature and strong clinical expertise help create a comfortable environment where patients can confidently discuss and manage their health concerns.',
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
        about: 'Dr. Sarah Patel is passionate about treating skin disorders and helping patients achieve healthy skin. She specializes in acne treatment, eczema management, skin rejuvenation, and cosmetic dermatology. By combining advanced treatments with individualized care, she ensures effective results and improved confidence for her patients.',
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
        about: 'Dr. Christopher Lee provides comprehensive healthcare services for infants, children, and adolescents. His expertise includes routine checkups, vaccinations, growth monitoring, and developmental assessments. He believes in building trust with both children and parents while ensuring every child receives the highest standard of medical care.',
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
        about: 'Dr. Jennifer Garcia is a highly experienced Neurologist specializing in disorders affecting the brain and nervous system. She has extensive expertise in treating migraines, epilepsy, stroke-related conditions, and neurological disorders. Her commitment to accurate diagnosis and personalized care helps patients achieve improved neurological health and quality of life.',
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
        about: 'Dr. Andrew Williams focuses on diagnosing and treating complex neurological conditions. He works closely with patients to develop tailored treatment strategies that improve long-term outcomes. His expertise, combined with a patient-centered approach, enables him to deliver comprehensive neurological care using the latest advancements in medicine.',
        fees: 68,
        address: {
            line1: '24 Bishopsgate',
            line2: 'Canary Wharf, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Olivia Brown',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Olivia Brown is committed to providing high-quality primary healthcare services. She specializes in preventive medicine, routine health screenings, and the management of common medical conditions. Her friendly approach and dedication to patient education help individuals make informed decisions about their overall health and wellness.',
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
        about: 'Dr. Timothy White provides expert gynecological care with a focus on women’s health, fertility guidance, and pregnancy support. He is dedicated to creating a supportive environment where patients feel comfortable discussing sensitive health concerns. His goal is to deliver safe, effective, and personalized medical care.',
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
        about: 'Dr. Ava Mitchell specializes in diagnosing and treating a wide range of skin conditions, including acne, pigmentation issues, and allergies. She believes in combining medical expertise with patient education to achieve lasting results. Her modern treatment methods ensure patients receive effective and personalized dermatological care.',
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
        about: 'Dr. Jeffrey King is dedicated to promoting healthy growth and development in children. He provides preventive care, nutritional guidance, vaccinations, and treatment for common childhood illnesses. His warm and approachable personality helps children feel comfortable during medical visits while ensuring excellent healthcare outcomes.',
        fees: 48,
        address: {
            line1: '41 Abbey Road',
            line2: "St John's Wood, London"
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM Gastroenterology',
        experience: '11 Years',
        about: 'Dr. Zoe Kelly specializes in digestive health and the treatment of gastrointestinal disorders. She has extensive experience managing liver diseases, acid reflux, and other digestive conditions. Her patient-focused approach ensures accurate diagnosis, effective treatment, and ongoing support throughout the recovery process.',
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
        about: 'Dr. Patrick Harris is committed to helping patients manage neurological disorders through advanced diagnostic techniques and evidence-based treatments. He works closely with patients and their families to develop individualized care plans that support recovery, symptom management, and improved quality of life.',
        fees: 62,
        address: {
            line1: '18 Tower Bridge Road',
            line2: '    '
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Chloe Evans focuses on preventive medicine, chronic disease management, and routine healthcare services. She believes in building long-term relationships with patients and providing personalized care tailored to individual needs. Her dedication to medical excellence helps patients maintain healthier and more fulfilling lives.',
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
        about: 'Dr. Ryan Martinez specializes in reproductive health, prenatal care, and women’s wellness services. He is known for his compassionate communication style and dedication to patient comfort. By combining modern medical techniques with personalized attention, he delivers comprehensive gynecological care for every patient.',
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
        about: 'Dr. Amelia Hill is passionate about helping patients achieve healthy and confident skin. She treats acne, eczema, psoriasis, and other dermatological conditions using modern evidence-based treatments. Her commitment to patient satisfaction and personalized care ensures excellent outcomes and long-term skin health.',
        fees: 38,
        address: {
            line1: '76 Brick Lane',
            line2: 'Shoreditch, London'
        }
    }
]
