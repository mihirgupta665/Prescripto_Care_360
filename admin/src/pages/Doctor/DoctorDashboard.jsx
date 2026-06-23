import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets' 
import { AppContext } from '../../context/AppContext'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const DoctorDashboard = () => {

    const { dToken, dashData, getDashData } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)
    const [chartType, setChartType] = useState('line')
    const [chartMetric, setChartMetric] = useState('earnings')

    useEffect(() => {

        if(dToken){
            getDashData()
        }

    }, [dToken])

    const weeklyAnalytics = useMemo(
        () => dashData?.weeklyAnalytics || [],
        [dashData]
    )

    const graphWidth = Math.max(720, weeklyAnalytics.length * 125)

    const formatCurrency = (value) => `${currency} ${Number(value).toLocaleString()}`

    const isEarnings = chartMetric === 'earnings'
    const chartColor = isEarnings ? '#5F6FFF' : '#22C3A6'
    const chartTitle = isEarnings ? 'Earnings by Week' : 'Appointment Bookings by Week'
    const chartSubtitle = isEarnings ? 'Paid and completed revenue trend' : 'Booking growth across recent weeks'
    const chartValueLabel = isEarnings ? 'Earnings' : 'Appointments'
    const chartFormatter = isEarnings ? formatCurrency : (value) => value

    const renderChart = () => (
        <div className='analytics-scrollbar overflow-x-auto overflow-y-hidden pb-3'>
            <div style={{ width: graphWidth, height: 330 }}>
                <ResponsiveContainer width='100%' height='100%'>
                    {chartType === 'bar' ? (
                        <BarChart data={weeklyAnalytics} margin={{ top: 18, right: 30, left: 10, bottom: 32 }}>
                            <defs>
                                <linearGradient id='doctorWeeklyChart' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='0%' stopColor={chartColor} stopOpacity='0.95' />
                                    <stop offset='100%' stopColor={chartColor} stopOpacity='0.45' />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke='#E9EDF5' strokeDasharray='4 6' vertical={false} />
                            <XAxis dataKey='week' axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={12} />
                            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={chartFormatter} width={78} />
                            <Tooltip
                                cursor={{ fill: '#F4F6FF' }}
                                formatter={(value) => [chartFormatter(value), chartValueLabel]}
                                contentStyle={{ border: '1px solid #EEF0F7', borderRadius: 12, boxShadow: '0 12px 30px rgba(15,23,42,.12)' }}
                            />
                            <Bar dataKey={chartMetric} fill='url(#doctorWeeklyChart)' radius={[10, 10, 3, 3]} maxBarSize={54} animationDuration={950} />
                        </BarChart>
                    ) : (
                        <LineChart data={weeklyAnalytics} margin={{ top: 18, right: 34, left: 10, bottom: 32 }}>
                            <defs>
                                <linearGradient id='doctorWeeklyChart' x1='0' y1='0' x2='1' y2='0'>
                                    <stop offset='0%' stopColor={chartColor} />
                                    <stop offset='100%' stopColor='#22C3A6' />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke='#E9EDF5' strokeDasharray='4 6' vertical={false} />
                            <XAxis dataKey='week' axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={12} />
                            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={chartFormatter} width={78} />
                            <Tooltip
                                formatter={(value) => [chartFormatter(value), chartValueLabel]}
                                contentStyle={{ border: '1px solid #EEF0F7', borderRadius: 12, boxShadow: '0 12px 30px rgba(15,23,42,.12)' }}
                            />
                            <Line type='monotone' dataKey={chartMetric} stroke='url(#doctorWeeklyChart)' strokeWidth={4} dot={{ r: 5, fill: '#fff', stroke: chartColor, strokeWidth: 3 }} activeDot={{ r: 7 }} animationDuration={1050} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    )

    return dashData && (

        <div className='w-full min-w-0 p-5 md:p-7'>

            <div className='flex flex-wrap gap-5 xl:gap-8'>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all' >
                    <img className='w-14' src={assets.earning_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{currency} {dashData.earnings}</p>
                        <p className='text-gray-500'>Earnings</p>
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{dashData.appointments}</p>
                        <p className='text-gray-500'>Appointments</p>
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{dashData.patients}</p>
                        <p className='text-gray-500'>Patients</p>
                    </div>
                </div>

            </div>

            <section className='mt-9'>
                <div className='mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
                    <div className='flex flex-1 items-center gap-4'>
                        <h2 className='text-xl font-semibold text-slate-800'>Weekly Growth</h2>
                        <div className='h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent' />
                    </div>

                    <div className='flex flex-wrap gap-3'>
                        <div className='flex rounded-xl bg-slate-100 p-1'>
                            <button
                                onClick={() => setChartMetric('earnings')}
                                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${chartMetric === 'earnings' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Earnings
                            </button>
                            <button
                                onClick={() => setChartMetric('appointments')}
                                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${chartMetric === 'appointments' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Appointments
                            </button>
                        </div>

                        <div className='flex rounded-xl bg-indigo-50 p-1'>
                            <button
                                onClick={() => setChartType('line')}
                                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${chartType === 'line' ? 'bg-primary text-white shadow-sm' : 'text-indigo-500 hover:bg-white/80'}`}
                            >
                                Line
                            </button>
                            <button
                                onClick={() => setChartType('bar')}
                                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${chartType === 'bar' ? 'bg-primary text-white shadow-sm' : 'text-indigo-500 hover:bg-white/80'}`}
                            >
                                Bar
                            </button>
                        </div>
                    </div>
                </div>

                {weeklyAnalytics.length ? (
                    <div className='overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(49,46,129,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(49,46,129,0.11)]'>
                        <div className='border-b border-slate-100 p-5'>
                            <p className='text-base font-semibold text-slate-800'>{chartTitle}</p>
                            <p className='mt-1 text-sm text-slate-400'>{chartSubtitle}</p>
                        </div>
                        <div className='p-4 sm:p-6'>
                            {renderChart()}
                        </div>
                    </div>
                ) : (
                    <div className='flex h-72 items-center justify-center rounded-2xl border border-slate-100 bg-white text-sm text-slate-400 shadow-sm'>
                        No weekly analytics available yet.
                    </div>
                )}
            </section>

        </div>
    )
}

export default DoctorDashboard
