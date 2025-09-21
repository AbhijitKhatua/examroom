"use client"
import { useState, Suspense } from 'react';
import { Moment } from 'moment';
import dynamic from 'next/dynamic';

const DateRangePicker = dynamic(
    () => import('./DateRangePicker'),
    { ssr: false }
);

interface Service {
    name: string;
    uptime: number;
}

interface SystemStatus {
    name: string;
    status: 'operational' | 'investigation' | 'planned-maintenance' | 'resolved';
}

interface SystemInfo {
    id: number;
    num: string;
    type: string;
}

export default function Metrics() {
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);

    const services: Service[] = [
        { name: 'Examroom', uptime: 100 },
        { name: 'Item Banking', uptime: 99.9 },
        { name: 'Edison A', uptime: 100 },
        { name: 'Einstein', uptime: 100 },
        { name: 'ExamLock', uptime: 100 },
        { name: 'NIC', uptime: 100 },
        { name: 'Test Site', uptime: 100 },
    ];

    const systemStatuses: SystemStatus[] = [
        { name: 'Database', status: 'operational' },
        { name: 'API Server', status: 'operational' },
        { name: 'Microservices', status: 'operational' },
        { name: 'UI Servers', status: 'operational' },
        { name: 'Incidents', status: 'operational' },
        { name: 'Escalations', status: 'operational' },
    ];

    const systemInfo: SystemInfo[] = [
        { id: 1, num: '479', type: 'Agents Active' },
        { id: 2, num: '2.00 %', type: 'Abandoned Rate' },
        { id: 3, num: '00:05:29', type: 'Average Handle Time' },
        { id: 4, num: '00:05:29', type: 'Average Speed Of Answer' },
        { id: 5, num: '86.34 %', type: 'CSAT' },
        { id: 6, num: '32.34 %', type: 'Contentment Rate (IVR)' },
    ];

    const filters = [
        { id: 'ALL', label: 'ALL' },
        { id: 'SERVER_DB', label: 'SERVER_DB' },
        { id: 'BUSINESS_OPERATIONAL', label: 'BUSINESS_OPERATIONAL' },
        { id: 'SUPPORT_OPERATIONAL', label: 'SUPPORT_OPERATIONAL' },
    ];

    // const getStatusColor = (status: string) => {
    //     switch (status) {
    //         case 'operational':
    //             return 'text-green-500';
    //         case 'investigation':
    //             return 'text-red-500';
    //         case 'planned-maintenance':
    //             return 'text-yellow-500';
    //         case 'resolved':
    //             return 'text-purple-500';
    //         default:
    //             return 'text-gray-500';
    //     }
    // };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="flex flex-col justify-between mb-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                    />
                </Suspense>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-100 p-2 rounded-3xl sm:rounded-full justify-between">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`px-4 py-2 rounded-full text-[0.8rem] font-bold ${selectedFilter === filter.id
                            ? 'bg-teal-700 text-white'
                            : 'text-gray-600'
                            }`}
                        onClick={() => setSelectedFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Status Legend */}
            <div className="flex gap-6 mb-8 justify-between flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="material-icons text-teal-500">done</span>
                    <span className="text-sm text-teal-600">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-yellow-600">engineering</span>
                    <span className="text-sm text-yellow-600">Planned Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-purple-500">published_with_changes</span>
                    <span className="text-sm text-purple-600">Recently Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-red-500">manage_search</span>
                    <span className="text-sm text-red-600">Investigation</span>
                </div>
            </div>

            {/* Services Status */}
            <div className="mb-8">
                {services
                    .filter(service => {
                        if (selectedFilter === 'ALL') return true;
                        if (selectedFilter === 'BUSINESS_OPERATIONAL') {
                            return ['NIC', 'Test Site'].includes(service.name);
                        }
                        if (selectedFilter === 'SUPPORT_OPERATIONAL') {
                            return ['Examroom'].includes(service.name);
                        }
                        if (selectedFilter === 'SERVER_DB') {
                            return ['Item Banking', 'Edison A', 'Einstein', 'ExamLock'].includes(service.name);
                        }
                        return true;
                    })
                    .map((service) => (
                        <div
                            key={service.name}
                            className="flex justify-between items-center p-4 bg-white border-1 border-gray-200 hover:border-teal-500 "
                        >
                            <span className="font-medium">{service.name}</span>
                            <div className="flex items-center gap-2">
                                <span className="material-icons text-teal-500">done</span>
                                <span className="text-teal-500">{service.uptime}% uptime</span>
                            </div>
                        </div>
                    ))}
            </div>

            {selectedFilter === "SERVER_DB" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {systemStatuses.map((system) => (
                        <div
                            key={system.name}
                            className="p-4 py-12 bg-white border-1 border-neutral-200 hover:border-teal-500 flex flex-col items-center justify-center text-center text-neutral-600"
                        >
                            <span className="material-icons-outlined text-neutral-500">storage</span>
                            <span className="text-sm font-medium mb-1 mt-2">{system.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {(selectedFilter === "BUSINESS_OPERATIONAL" || selectedFilter === "SUPPORT_OPERATIONAL") && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {systemInfo.map((info) => (
                        <div
                            key={info.id}
                            className="p-4 py-12 bg-white border-1 border-neutral-200 hover:border-teal-500 flex flex-col items-center justify-center text-center text-neutral-600"
                        >
                            <span className="text-2xl text-neutral-400">{info.num}</span>
                            <span className="mt-2">{info.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
