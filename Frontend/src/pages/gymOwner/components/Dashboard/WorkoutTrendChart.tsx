import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface WorkoutData {
    month: string;
    strength: number;
    cardio: number;
    yoga: number;
}

interface WorkoutTrendChartProps {
    data: WorkoutData[];
}

const WorkoutTrendChart: React.FC<WorkoutTrendChartProps> = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: '#e5e7eb',
                },
                ticks: {
                    callback: function(value: any) {
                        return value.toLocaleString();
                    }
                }
            },
        },
    };

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Strength Training',
                data: data.map(item => item.strength),
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderRadius: 4,
            },
            {
                label: 'Cardio',
                data: data.map(item => item.cardio),
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderRadius: 4,
            },
            {
                label: 'Yoga',
                data: data.map(item => item.yoga),
                backgroundColor: 'rgba(244, 63, 94, 0.7)',
                borderRadius: 4,
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default WorkoutTrendChart;