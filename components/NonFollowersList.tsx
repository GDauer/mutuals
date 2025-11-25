'use client';

import { useState } from 'react';
import { InstagramUser } from '@/lib/instagramParser';
import ConfirmationModal from './modals/ConfirmationModal';
import SuccessState from './SuccessState';
import UserCard from './UserCard';

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
        return <SuccessState />;
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
                    <UserCard
                        key={user.id}
                        user={user}
                        onDelete={handleUnfollowClick}
                    />
                ))}
            </div>
        </div>
    );
}
