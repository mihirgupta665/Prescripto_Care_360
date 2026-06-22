import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const Dashboard = () => {

    const { aToken, dashData, getDashData } = useContext(AdminContext)
    const [metric, setMetric] = useState('appointments')
    const [chartType, setChartType] = useState('bar')

    useEffect(() => {

        if(aToken){
            getDashData()
        }

    }, [aToken])

    const analyticsData = useMemo(
        () => dashData?.doctorAnalytics || [],
        [dashData]
    )

    const isEarnings = metric === 'earnings'
    const valueLabel = isEarnings ? 'Earnings' : 'Appointments'
    const graphWidth = Math.max(760, analyticsData.length * 135)
    const pieColors = ['#5F6FFF', '#22C3A6', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16']
    const metricTotal = analyticsData.reduce((total, doctor) => total + doctor[metric], 0)

    const formatValue = (value) => isEarnings ? `$${Number(value).toLocaleString()}` : value

    return dashData && (

        <div className='w-full min-w-0 p-5 md:p-7'>

            <div className='flex flex-wrap gap-5 xl:gap-8'>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all' >
                    <img className='w-14' src={assets.doctor_icon} alt="" />
                    <div>
                        <p className="text-xl text-semibold text-gray-700">{dashData.doctors}</p>
                        <p className='text-gray-500'>Doctors</p>
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="text-xl text-semibold text-gray-700">{dashData.appointments}</p>
                        <p className='text-gray-500'>Appointments</p>
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center gap-5 bg-white p-4 min-w-64 min-h-32 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div>
                        <p className="text-xl text-semibold text-gray-700">{dashData.patients}</p>
                        <p className='text-gray-500'>Patients</p>
                    </div>
                </div>

            </div>

            <section className='mt-9'>
                <div className='flex items-center gap-4 mb-5'>
                    <h2 className='text-xl font-semibold text-slate-800'>Analytics</h2>
                    <div className='h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent' />
                </div>

                <div className='overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(49,46,129,0.07)]'>
                    <div className='flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between'>
                        <div>
                            <p className='text-base font-semibold text-slate-800'>Doctor performance</p>
                            <p className='mt-1 text-sm text-slate-400'>Compare demand and paid earnings across your team</p>
                        </div>

                        <div className='flex flex-wrap gap-3'>
                            <div className='flex rounded-xl bg-slate-100 p-1'>
                                <button
                                    onClick={() => setMetric('appointments')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${metric === 'appointments' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Doctor Demand
                                </button>
                                <button
                                    onClick={() => setMetric('earnings')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${metric === 'earnings' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Doctor Earnings
                                </button>
                            </div>

                            <div className='flex rounded-xl bg-indigo-50 p-1'>
                                <button
                                    onClick={() => setChartType('line')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${chartType === 'line' ? 'bg-primary text-white shadow-sm' : 'text-indigo-500 hover:bg-white/70'}`}
                                >
                                    Line
                                </button>
                                <button
                                    onClick={() => setChartType('pie')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${chartType === 'pie' ? 'bg-primary text-white shadow-sm' : 'text-indigo-500 hover:bg-white/70'}`}
                                >
                                    Pie
                                </button>
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${chartType === 'bar' ? 'bg-primary text-white shadow-sm' : 'text-indigo-500 hover:bg-white/70'}`}
                                >
                                    Bar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 sm:p-6'>
                        {analyticsData.length && (chartType !== 'pie' || metricTotal > 0) ? (
                            <div className='analytics-scrollbar overflow-x-auto pb-3'>
                                <div style={{ width: chartType === 'pie' ? '100%' : graphWidth, minWidth: chartType === 'pie' ? 620 : undefined, height: 390 }}>
                                    <ResponsiveContainer width='100%' height='100%'>
                                        {chartType === 'bar' ? (
                                            <BarChart key={`${metric}-bar`} data={analyticsData} margin={{ top: 18, right: 28, left: 12, bottom: 40 }}>
                                                <defs>
                                                    <linearGradient id='analyticsBar' x1='0' y1='0' x2='0' y2='1'>
                                                        <stop offset='0%' stopColor='#5F6FFF' />
                                                        <stop offset='100%' stopColor='#8F9AFF' />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid stroke='#E9EDF5' strokeDasharray='4 6' vertical={false} />
                                                <XAxis dataKey='name' axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={14} interval={0} />
                                                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={formatValue} width={75} />
                                                <Tooltip
                                                    cursor={{ fill: '#F4F6FF' }}
                                                    formatter={(value) => [formatValue(value), valueLabel]}
                                                    contentStyle={{ border: '1px solid #EEF0F7', borderRadius: 12, boxShadow: '0 10px 30px rgba(15,23,42,.10)' }}
                                                />
                                                <Bar dataKey={metric} fill='url(#analyticsBar)' radius={[9, 9, 2, 2]} maxBarSize={55} animationDuration={900} />
                                            </BarChart>
                                        ) : chartType === 'line' ? (
                                            <LineChart key={`${metric}-line`} data={analyticsData} margin={{ top: 18, right: 35, left: 12, bottom: 40 }}>
                                                <defs>
                                                    <linearGradient id='analyticsLine' x1='0' y1='0' x2='1' y2='0'>
                                                        <stop offset='0%' stopColor='#5F6FFF' />
                                                        <stop offset='100%' stopColor='#22C3A6' />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid stroke='#E9EDF5' strokeDasharray='4 6' vertical={false} />
                                                <XAxis dataKey='name' axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={14} interval={0} />
                                                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={formatValue} width={75} />
                                                <Tooltip
                                                    formatter={(value) => [formatValue(value), valueLabel]}
                                                    contentStyle={{ border: '1px solid #EEF0F7', borderRadius: 12, boxShadow: '0 10px 30px rgba(15,23,42,.10)' }}
                                                />
                                                <Line type='monotone' dataKey={metric} stroke='url(#analyticsLine)' strokeWidth={4} dot={{ r: 5, fill: '#fff', stroke: '#5F6FFF', strokeWidth: 3 }} activeDot={{ r: 7 }} animationDuration={1000} />
                                            </LineChart>
                                        ) : (
                                            <PieChart key={`${metric}-pie`}>
                                                <Pie
                                                    data={analyticsData}
                                                    dataKey={metric}
                                                    nameKey='name'
                                                    cx='50%'
                                                    cy='46%'
                                                    innerRadius={72}
                                                    outerRadius={128}
                                                    paddingAngle={3}
                                                    cornerRadius={6}
                                                    animationDuration={1000}
                                                    label={analyticsData.length <= 8 ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : false}
                                                    labelLine={analyticsData.length <= 8}
                                                >
                                                    {analyticsData.map((doctor, index) => (
                                                        <Cell
                                                            key={doctor.doctorId}
                                                            fill={pieColors[index % pieColors.length]}
                                                            stroke='white'
                                                            strokeWidth={2}
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value, _name, item) => [formatValue(value), item.payload.name]}
                                                    contentStyle={{ border: '1px solid #EEF0F7', borderRadius: 12, boxShadow: '0 10px 30px rgba(15,23,42,.10)' }}
                                                />
                                            </PieChart>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                                {chartType === 'pie' && (
                                    <div className='flex min-w-max justify-center gap-5 px-4 pb-2'>
                                        {analyticsData.map((doctor, index) => (
                                            <div key={doctor.doctorId} className='flex items-center gap-2 text-xs text-slate-500'>
                                                <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                                                <span>{doctor.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='flex h-72 items-center justify-center text-sm text-slate-400'>
                                {analyticsData.length ? `No ${valueLabel.toLowerCase()} data available for the pie chart yet.` : 'No doctor analytics available yet.'}
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </div>

    )
}

export default Dashboard
