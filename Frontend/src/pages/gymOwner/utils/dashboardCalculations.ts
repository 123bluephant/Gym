import { Member, Payment, WorkoutSession } from '../types/types';

export const calculateMonthlyRevenue = (payments: Payment[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyData: { [key: string]: number } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(currentMonth - i);
        const key = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
        monthlyData[key] = 0;
    }
    
    // Sum payments by month
    payments.forEach(payment => {
        const paymentDate = new Date(payment.date);
        const month = paymentDate.getMonth();
        const year = paymentDate.getFullYear();
        const key = `${monthNames[month]}-${year}`;
        
        if (monthlyData.hasOwnProperty(key)) {
            monthlyData[key] += payment.amount;
        }
    });
    
    // Convert to array format
    const revenueTrend = Object.entries(monthlyData).map(([key, revenue]) => {
        const [month, year] = key.split('-');
        return { month, revenue };
    });
    
    const monthlyRevenue = revenueTrend[revenueTrend.length - 1].revenue;
    const prevMonthRevenue = revenueTrend.length > 1 ? revenueTrend[revenueTrend.length - 2].revenue : 0;
    const revenueChange = prevMonthRevenue > 0 ? 
        Math.round(((monthlyRevenue - prevMonthRevenue) / prevMonthRevenue) * 100) : 0;
    
    return { monthlyRevenue, revenueTrend, revenueChange };
};

export const calculateMemberGrowth = (members: Member[]) => {
    const now = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(now.getMonth() - (5 - i));
        return {
            month: date.getMonth(),
            year: date.getFullYear(),
            name: monthNames[date.getMonth()]
        };
    });
    
    const memberGrowth = months.map(m => ({
        date: m.name,
        count: members.filter(member => {
            const joinDate = new Date(member.joinDate);
            return joinDate.getMonth() <= m.month && 
                   joinDate.getFullYear() <= m.year &&
                   (joinDate.getMonth() !== m.month || joinDate.getFullYear() !== m.year ||
                    new Date(joinDate).setHours(0,0,0,0) <= new Date(now.getFullYear(), m.month, 1).getTime());
        }).length
    }));
    
    const newSignups = members.filter(m => {
        const joinDate = new Date(m.joinDate);
        return joinDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }).length;
    
    const prevMonthSignups = memberGrowth.length > 1 ? 
        memberGrowth[memberGrowth.length - 2].count - 
        (memberGrowth.length > 2 ? memberGrowth[memberGrowth.length - 3].count : 0) : 0;
    
    const signupChange = prevMonthSignups > 0 ? 
        Math.round(((newSignups - prevMonthSignups) / prevMonthSignups) * 100) : 
        (newSignups > 0 ? 100 : 0);
    
    return { memberGrowth, newSignups, signupChange };
};

export const calculateWorkoutTrends = (workouts: WorkoutSession[]) => {
    const now = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(now.getMonth() - (5 - i));
        return {
            month: date.getMonth(),
            year: date.getFullYear(),
            name: monthNames[date.getMonth()]
        };
    });
    
    const workoutTrends = months.map(m => {
        const monthWorkouts = workouts.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate.getMonth() === m.month && workoutDate.getFullYear() === m.year;
        });
        
        return {
            month: m.name,
            strength: monthWorkouts.filter(w => w.type === 'Strength').length,
            cardio: monthWorkouts.filter(w => w.type === 'Cardio').length,
            yoga: monthWorkouts.filter(w => w.type === 'Yoga').length
        };
    });
    
    const currentMonthWorkouts = workouts.filter(w => {
        const workoutDate = new Date(w.date);
        return workoutDate.getMonth() === now.getMonth() && workoutDate.getFullYear() === now.getFullYear();
    });
    
    const prevMonthWorkouts = workouts.filter(w => {
        const workoutDate = new Date(w.date);
        const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        return workoutDate.getMonth() === prevMonth && workoutDate.getFullYear() === prevYear;
    });
    
    const avgSessions = workouts.length > 0 ? 
        workouts.length / new Set(workouts.map(w => w.memberId)).size : 0;
    
    const sessionChange = prevMonthWorkouts.length > 0 ? 
        Math.round(((currentMonthWorkouts.length - prevMonthWorkouts.length) / prevMonthWorkouts.length) * 100) : 
        (currentMonthWorkouts.length > 0 ? 100 : 0);
    
    return { workoutTrends, avgSessions, sessionChange };
};