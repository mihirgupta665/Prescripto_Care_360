import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'

const NotFound = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    const isAdmin = Boolean(aToken)
    const dashboardPath = isAdmin ? '/admin-dashboard' : '/doctor-dashboard'
    const secondaryPath = isAdmin ? '/all-appointments' : '/doctor-appointments'

    return (
        <main className='w-full min-w-0 px-4 py-5 sm:px-6 md:px-7'>
            <section className='relative flex min-h-[calc(100vh-130px)] overflow-hidden rounded-2xl border border-indigo-100 bg-[#F7F9FF] shadow-[0_18px_45px_rgba(49,46,129,0.08)]'>
                <img
                    className='absolute inset-0 h-full w-full object-cover object-center'
                    src={assets.lost_in_space}
                    alt=''
                />
                <div className='absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20' />

                <div className='relative z-10 flex w-full items-center px-6 py-10 sm:px-10 lg:px-14'>
                    <div className='max-w-md'>
                        <p className='text-5xl font-bold leading-none text-primary sm:text-6xl'>404</p>
                        <h1 className='mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl'>Lost in Space?</h1>
                        <p className='mt-5 max-w-sm text-sm leading-6 text-slate-500 sm:text-base'>
                            This panel page does not seem to exist or may have moved. Let’s guide you back to a working workspace.
                        </p>
                        <div className='mt-8 flex flex-wrap gap-3'>
                            <Link
                                to='/'
                                className='rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90'
                            >
                                Go Home
                            </Link>
                            {(aToken || dToken) && (
                                <Link
                                    to={dashboardPath}
                                    className='rounded-lg border border-indigo-200 bg-white/80 px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-white'
                                >
                                    Open Dashboard
                                </Link>
                            )}
                            {(aToken || dToken) && (
                                <Link
                                    to={secondaryPath}
                                    className='rounded-lg px-5 py-3 text-sm font-semibold text-slate-600 transition hover:text-primary'
                                >
                                    Appointments
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default NotFound
