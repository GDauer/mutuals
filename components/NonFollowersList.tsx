'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InstagramUser } from '@/lib/instagramParser';
import ConfirmationModal from './modals/ConfirmationModal';

const ITEMS_PER_PAGE = 10;

interface NonFollowersListProps {
    users: InstagramUser[];
}

export default function NonFollowersList({ users: initialUsers }: NonFollowersListProps) {
    const [users] = useState(initialUsers);
    const [unfollowedUsers, setUnfollowedUsers] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(1);
    const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);
    const [hasSeenModal, setHasSeenModal] = useState(false);

    // Filter out unfollowed users for display
    const activeUsers = users.filter(user => !unfollowedUsers.has(user.id));
    const totalPages = Math.ceil(activeUsers.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentUsers = activeUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleUnfollowClick = (id: number) => {
        if (!hasSeenModal) {
            setUserToUnfollow(id);
        } else {
            // Directly mark as unfollowed without showing modal
            setUnfollowedUsers(prev => new Set(prev).add(id));
        }
    };

    const confirmUnfollow = () => {
        if (userToUnfollow) {
            setUnfollowedUsers(prev => new Set(prev).add(userToUnfollow));
            setUserToUnfollow(null);
            setHasSeenModal(true);
        }
    };

    const cancelUnfollow = () => {
        setUserToUnfollow(null);
        setHasSeenModal(true);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    if (activeUsers.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Tudo pronto!</h2>
                <p className="text-gray-500">Você removeu todos da lista ou não há não-seguidores.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 relative">
            {/* Confirmation Modal */}
            {userToUnfollow && (
                <ConfirmationModal
                    onConfirm={confirmUnfollow}
                    onCancel={cancelUnfollow}
                />
            )}

            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
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
                            href={`https://www.instagram.com/${user.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
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
                            Delete
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
