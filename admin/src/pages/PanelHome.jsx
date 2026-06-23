import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'

const PanelHome = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const isAdmin = Boolean(aToken)

    const quickActions = isAdmin
        ? [
            {
                title: 'Admin Dashboard',
                description: 'Review performance, appointments, doctors, and patient activity.',
                to: '/admin-dashboard',
                icon: assets.home_icon,
                tone: 'bg-indigo-50'
            },
            {
                title: 'Appointments',
                description: 'Track bookings and manage appointment status from one place.',
                to: '/all-appointments',
                icon: assets.appointments_icon,
                tone: 'bg-emerald-50'
            },
            {
                title: 'Doctor Directory',
                description: 'Check doctor availability and keep the care team organized.',
                to: '/doctor-list',
                icon: assets.people_icon,
                tone: 'bg-sky-50'
            },
            {
                title: 'Add Doctor',
                description: 'Create a polished provider profile with credentials and fees.',
                to: '/add-doctor',
                icon: assets.add_icon,
                tone: 'bg-amber-50'
            }
        ]
        : [
            {
                title: 'Doctor Dashboard',
                description: 'View earnings, appointments, patients, and weekly growth.',
                to: '/doctor-dashboard',
                icon: assets.home_icon,
                tone: 'bg-indigo-50'
            },
            {
                title: 'My Appointments',
                description: 'Review consultations and update appointment outcomes quickly.',
                to: '/doctor-appointments',
                icon: assets.appointments_icon,
                tone: 'bg-emerald-50'
            },
            {
                title: 'Profile',
                description: 'Keep your professional details, fees, and availability current.',
                to: '/doctor-profile',
                icon: assets.people_icon,
                tone: 'bg-sky-50'
            }
        ]

    const stats = isAdmin
        ? [
            { label: 'Care Network', value: 'Admin' },
            { label: 'Workspace', value: 'Operations' },
            { label: 'Access', value: 'Full Panel' }
        ]
        : [
            { label: 'Care Network', value: 'Doctor' },
            { label: 'Workspace', value: 'Clinical' },
            { label: 'Access', value: 'Profile Panel' }
        ]

    return (
        <main className='w-full min-w-0 px-4 py-5 sm:px-6 md:px-7'>
            <section className='overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(49,46,129,0.07)]'>
                <div className='grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.4fr_.9fr] lg:items-center'>
                    <div>
                        <p className='text-sm font-semibold text-primary'>{isAdmin ? 'Prescripto360Care Admin' : 'Prescripto360Care Doctor'}</p>
                        <h1 className='mt-3 max-w-3xl text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl'>
                            {isAdmin ? 'Manage patient care with a clearer operational view.' : 'Stay focused on appointments, profile readiness, and weekly practice growth.'}
                        </h1>
                        <p className='mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base'>
                            {isAdmin
                                ? 'A clean starting point for coordinating doctors, monitoring bookings, and keeping the care workflow moving smoothly.'
                                : 'A practical home base for reviewing today’s work, checking performance, and keeping your doctor profile ready for patients.'}
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3'>
                            <Link
                                to={isAdmin ? '/admin-dashboard' : '/doctor-dashboard'}
                                className='rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90'
                            >
                                Open Dashboard
                            </Link>
                            <Link
                                to={isAdmin ? '/all-appointments' : '/doctor-appointments'}
                                className='rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary'
                            >
                                View Appointments
                            </Link>
                        </div>
                    </div>

                    <div className='grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4'>
                        {stats.map((item) => (
                            <div key={item.label} className='flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm'>
                                <p className='text-sm text-slate-500'>{item.label}</p>
                                <p className='text-sm font-semibold text-slate-800'>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='mt-7'>
                <div className='mb-5 flex items-center gap-4'>
                    <h2 className='text-xl font-semibold text-slate-800'>Quick Access</h2>
                    <div className='h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent' />
                </div>

                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {quickActions.map((item) => (
                        <Link
                            key={item.title}
                            to={item.to}
                            className='group flex min-h-44 flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-md'
                        >
                            <div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tone}`}>
                                    <img className='h-6 w-6 object-contain' src={item.icon} alt='' />
                                </div>
                                <h3 className='mt-5 text-base font-semibold text-slate-800'>{item.title}</h3>
                                <p className='mt-2 text-sm leading-6 text-slate-500'>{item.description}</p>
                            </div>
                            <p className='mt-5 text-sm font-medium text-primary transition group-hover:translate-x-1'>Open</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default PanelHome
