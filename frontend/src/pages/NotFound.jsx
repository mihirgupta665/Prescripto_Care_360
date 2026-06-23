import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const NotFound = () => {
    return (
        <main className='my-8'>
            <section className='relative flex min-h-[560px] overflow-hidden rounded-2xl border border-indigo-100 bg-[#F7F9FF] shadow-[0_18px_45px_rgba(49,46,129,0.08)] sm:min-h-[620px]'>
                <img
                    className='absolute inset-0 h-full w-full object-cover object-center'
                    src={assets.lost_in_space}
                    alt=''
                />
                <div className='absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20' />

                <div className='relative z-10 flex w-full items-center px-6 py-10 sm:px-10 lg:px-14'>
                    <div className='max-w-md'>
                        <p className='text-5xl font-bold leading-none text-primary sm:text-6xl'>404</p>
                        <h1 className='mt-4 text-3xl font-semibold leading-tight text-[#0B1558] sm:text-4xl'>Lost in Space?</h1>
                        <p className='mt-5 max-w-sm text-sm leading-6 text-gray-500 sm:text-base'>
                            The page you’re looking for doesn’t seem to exist or has been moved.
                        </p>
                        <div className='mt-5 h-0.5 w-9 rounded-full bg-primary' />
                        <p className='mt-5 text-sm text-gray-500 sm:text-base'>Let’s get you back on track.</p>

                        <div className='mt-8 flex flex-wrap items-center gap-3'>
                            <Link
                                to='/'
                                className='rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90'
                            >
                                Go Home
                            </Link>
                            <Link
                                to='/doctors'
                                className='rounded-lg px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/80'
                            >
                                Browse Doctors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default NotFound
