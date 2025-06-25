import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    Activity,
    Utensils,
    TrendingUp,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShoppingBagIcon,
    CalculatorIcon,
} from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/UserAtom';

interface NavItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

export default function Sidebar({ onToggle, isCollapsed }: { onToggle: () => void, isCollapsed: boolean }) {
    const user = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems: NavItem[] = [
        { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { name: 'Workouts', icon: <Activity size={20} />, path: '/workouts' },
        { name: 'Nutrition', icon: <Utensils size={20} />, path: '/nutrition' },
        { name: 'Tracking', icon: <TrendingUp size={20} />, path: '/tracking' },
        { name: 'Shop', icon: <ShoppingBagIcon size={20} />, path: '/shop' },
        { name: 'Calories', icon: <CalculatorIcon size={20} />, path: '/calories' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/user/logout", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/");
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-indigo-700 text-white transition-all duration-300 flex flex-col h-full`}>
            <div className="p-4 flex items-center justify-between border-b border-indigo-600">
                {isCollapsed ? (
                    <div className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                ) : (
                    <h1 className="text-xl font-bold">FitPass</h1>
                )}
                <button
                    onClick={onToggle}
                    className="p-1 rounded-md hover:bg-indigo-600 transition-colors"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <div className="p-4 flex items-center space-x-3 border-b border-indigo-600">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
                {!isCollapsed && (
                    <div className="overflow-hidden">
                        <p className="font-medium truncate">{user?.firstName || user?.username || 'User'}</p>
                        <p className="text-xs text-indigo-200 truncate">{user?.email}</p>
                    </div>
                )}
            </div>

            <nav className="flex-1 p-2 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-md transition-colors ${isActive(item.path)
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
                                    }`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-indigo-600">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-md text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
                    title={isCollapsed ? "Logout" : undefined}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="ml-3">Logout</span>}
                </button>
            </div>
        </div>
    );
}