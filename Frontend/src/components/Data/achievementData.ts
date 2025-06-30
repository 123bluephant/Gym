// src/data/achievementData.ts
import { Award, Trophy, Medal, Star, CheckCircle, TrendingUp } from 'lucide-react';
import React from 'react';

export interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ReactElement;
    unlocked: boolean;
    date?: string;
    rarity?: string;
    progress?: number;
}

export const achievements: Achievement[] = [
    {
        id: 1,
        title: "First Workout",
        description: "Completed your first workout session",
        icon: React.createElement(Trophy, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2023-05-15",
        rarity: "Common"
    },
    {
        id: 2,
        title: "5-Day Streak",
        description: "Worked out for 5 consecutive days",
        icon: React.createElement(Medal, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2023-06-02",
        rarity: "Common"
    },
    {
        id: 3,
        title: "Marathon Runner",
        description: "Ran a total of 26.2 miles",
        icon: React.createElement(Award, { className: "w-6 h-6" }),
        unlocked: false,
        progress: 45,
        rarity: "Rare"
    },
    {
        id: 4,
        title: "Early Bird",
        description: "Completed 5 morning workouts before 8AM",
        icon: React.createElement(Star, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2023-06-10",
        rarity: "Common"
    },
    {
        id: 5,
        title: "Weight Master",
        description: "Reached your target weight goal",
        icon: React.createElement(CheckCircle, { className: "w-6 h-6" }),
        unlocked: false,
        progress: 30,
        rarity: "Epic"
    },
    {
        id: 6,
        title: "30-Day Streak",
        description: "Consistent daily workouts",
        icon: React.createElement(TrendingUp, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2024-03-01",
        rarity: "Rare"
    },
    {
        id: 7,
        title: "Strength Master",
        description: "Complete 50 strength sessions",
        icon: React.createElement(Award, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2024-02-15",
        rarity: "Rare"
    },
    {
        id: 8,
        title: "Flexibility Pro",
        description: "100 hours of yoga",
        icon: React.createElement(Medal, { className: "w-6 h-6" }),
        unlocked: false,
        progress: 76,
        rarity: "Epic"
    },
    {
        id: 9,
        title: "Cardio Champion",
        description: "Burn 10,000 calories",
        icon: React.createElement(Trophy, { className: "w-6 h-6" }),
        unlocked: true,
        date: "2024-01-20",
        rarity: "Legendary"
    },
    {
        id: 10,
        title: "HIIT Hero",
        description: "50 HIIT sessions completed",
        icon: React.createElement(CheckCircle, { className: "w-6 h-6" }),
        unlocked: false,
        progress: 36,
        rarity: "Rare"
    }
];

export const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case 'Common': return 'text-gray-600 bg-gray-100';
        case 'Rare': return 'text-blue-600 bg-blue-100';
        case 'Epic': return 'text-purple-600 bg-purple-100';
        case 'Legendary': return 'text-yellow-600 bg-yellow-100';
        default: return 'text-gray-600 bg-gray-100';
    }
};