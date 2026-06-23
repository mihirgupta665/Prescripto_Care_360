import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {

    const { aToken, doctors, getAllDoctors, changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className='w-full min-w-0 max-h-[90vh] overflow-y-scroll px-4 py-5 sm:px-6'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='grid w-full grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    doctors.map((item, index) => (
                        <div className='w-full overflow-hidden border border-indigo-200 rounded-xl cursor-pointer bg-white group shadow-sm transition hover:-translate-y-0.5 hover:shadow-md' key={index}>
                            <div className='w-full bg-indigo-50 group-hover:bg-primary transition-all duration-500'>
                                <img className='w-full h-64 sm:h-56 object-contain object-bottom' src={item.image} alt={item.name} />
                            </div>
                            <div className='p-4'>
                                <p className='text-neutral-800 text-lg font-medium leading-snug'>{item.name}</p>
                                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                                <div className='mt-2 flex items-center gap-1 text-sm'>
                                    <input onChange={() => changeAvailability(item._id) } type="checkbox" checked={item.available} />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default DoctorsList
