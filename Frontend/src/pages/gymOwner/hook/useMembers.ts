// src/hooks/useMembers.ts
import { useState, useEffect } from 'react';
import { Member } from '../types/types';

const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Dummy data
                const dummyMembers: Member[] = [
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '555-1234',
                        joinDate: '2023-01-15',
                        status: 'Active',
                        membershipType: 'Premium',
                        lastActivity: {
                            date: '2023-06-20T09:30:00',
                            type: "Strength",
                            duration: 60
                        },
                        lastActivityType: 'Strength',
                        height: 180,
                        weight: 80,
                        fitnessGoals: ["General Fitness"],
                        assignedTrainerId: 't1'
                    },
                    {
                        id: '2',
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        phone: '555-5678',
                        joinDate: '2023-02-10',
                        status: 'Active',
                        membership: {
                            tier: 'VIP',
                            startDate: '2023-06-20',
                            endDate: '2023-06-20',
                            autoRenew: true,
                        },
                        lastActivity: {
                            date: '2023-06-21T17:45:00',
                            type: 'Yoga',
                            duration: 60
                        },
                        lastActivityType: 'Yoga',
                        height: 165,
                        weight: 60,
                        fitnessGoals: ['Flexibility'],
                        assignedTrainerId: 't2'
                    },
                    // Add more members...
                    {
                        id: '3',
                        name: 'Mike Johnson',
                        email: 'mike@example.com',
                        joinDate: '2023-05-01',
                        status: 'Active',
                        membershipType: 'Basic',
                        lastActivity: {
                            date: '2023-06-19T08:15:00',
                            type: 'Cardio',
                            duration: 45
                        },
                        lastActivityType: 'Cardio',
                        assignedTrainerId: 't1'
                    },
                    {
                        id: '4',
                        name: 'Sarah Williams',
                        email: 'sarah@example.com',
                        phone: '555-9012',
                        joinDate: '2023-03-22',
                        status: 'Inactive',
                        membershipType: 'Premium',
                        lastActivity: {
                            date: '2023-05-30T16:20:00',
                            duration: 60,
                            type: 'Strength'
                        },
                        lastActivityType: 'Strength Training'
                    },
                    {
                        id: '5',
                        name: 'David Brown',
                        email: 'david@example.com',
                        joinDate: '2023-06-05',
                        status: 'Active',
                        membershipType: 'Basic',
                        lastActivity: {
                            date: '2023-06-22T07:30:00',
                            type: 'Cardio',
                            duration: 45
                        },
                        lastActivityType: 'Cardio'
                    }
                ];

                setMembers(dummyMembers);
                setLoading(false);
            } catch (err) {
                setError('Failed to load members');
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return { members, loading, error };
};

export default useMembers;