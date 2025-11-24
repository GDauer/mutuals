'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data generator
const generateMockUsers = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        username: `user_${i + 1}`,
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`
    }));
};

const MOCK_USERS = generateMockUsers(50);
const ITEMS_PER_PAGE = 10;

export default function NonFollowersList() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [page, setPage] = useState(1);
    const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleUnfollowClick = (id: number) => {
        setUserToUnfollow(id);
    };

    const confirmUnfollow = () => {
        if (userToUnfollow) {
            setUsers(users.filter(user => user.id !== userToUnfollow));
            setUserToUnfollow(null);
        }
    };

    const cancelUnfollow = () => {
        setUserToUnfollow(null);
    };

    const handleUnfollowAll = () => {
        setUsers([]);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    if (users.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">You're all caught up!</h2>
                <p className="text-gray-500">No non-followers found.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 relative">
            {/* Confirmation Modal */}
            {userToUnfollow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-zinc-800"
                    >
                        <h3 className="text-xl font-bold mb-4">Confirmar Unfollow</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Esta ação não pode ser desfeita por nós, tem certeza que deseja continuar?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelUnfollow}
                                className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmUnfollow}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                                Confirmar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Previous
                    </button>
                    <span className="font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Next
                    </button>
                </div>

                <button
                    onClick={handleUnfollowAll}
                    className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors border border-red-100"
                >
                    Unfollow All
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {currentUsers.map((user) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow"
                    >
                        <a
                            href={`#profile/${user.username}`}
                            className="flex items-center gap-4 flex-1 group"
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                <img
                                    src={user.profilePic}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
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
                            onClick={() => handleUnfollowClick(user.id)}
                            className="px-4 py-1.5 text-sm font-medium border border-gray-200 dark:border-zinc-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                        >
                            Unfollow
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
