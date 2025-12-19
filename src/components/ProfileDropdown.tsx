import { useState, useRef, useEffect } from 'react';
import type { User } from '../store/useStore';
import { LogOut, Settings, HelpCircle, CreditCard, ChevronRight } from 'lucide-react';

interface ProfileDropdownProps {
    user: User;
    onLogout: () => void;
    onSettingsClick?: () => void;
    trigger: React.ReactNode;
    align?: 'left' | 'right' | 'top-right' | 'bottom-left';
}

export const ProfileDropdown = ({ user, onLogout, onSettingsClick, trigger, align = 'right' }: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const positionClasses = {
        'right': 'absolute right-0 top-full mt-2 w-72 origin-top-right',
        'left': 'absolute left-0 top-full mt-2 w-72 origin-top-left',
        'top-right': 'absolute left-full bottom-0 mb-2 ml-2 w-72 origin-bottom-left',
        'bottom-left': 'absolute bottom-full left-0 mb-4 w-[260px] origin-bottom-left',

    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`
                        z-50 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-700 
                        animate-in fade-in zoom-in-95 duration-200
                        ${positionClasses[align] || positionClasses['right']}
                    `}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 dark:border-neutral-700">
                        <p className="text-xs text-gray-500 font-medium mb-1">Signed in as</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-bold text-sm truncate text-gray-900 dark:text-white">{user.name}</h4>
                                <p className="text-xs text-gray-500 truncate">{user.email || 'user@example.com'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                        {/* Subscription */}
                        <button className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 rounded-lg transition-colors group">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                <span>Subscription</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                        </button>

                        {/* Settings */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onSettingsClick?.();
                            }}
                            className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                <span>Settings</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                        </button>

                        {/* Helpdesk */}
                        <button className="w-full flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50 rounded-lg transition-colors group">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                <span>Helpdesk</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                        </button>
                    </div>

                    {/* Footer / Logout */}
                    <div className="p-2 border-t border-gray-100 dark:border-neutral-700">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="w-full flex items-center gap-3 p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
