'use client';

import { motion } from 'framer-motion';
import { InstagramUser } from '@/lib/instagramParser';
import Image from 'next/image';

interface UserCardProps {
    user: InstagramUser;
    onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow"
        >
            <a
                href={`https://www.instagram.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 flex-1 group"
            >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative">
                    <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized
                    />
                </div>
                <div>
                    <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 group-hover:opacity-80 transition-opacity">
                        {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
            </a>

            <button
                onClick={() => onDelete(user.id)}
                className="px-4 py-1.5 text-sm font-medium border border-gray-200 dark:border-zinc-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
            >
                Delete
            </button>
        </motion.div>
    );
}
