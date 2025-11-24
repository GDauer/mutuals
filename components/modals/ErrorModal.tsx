'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ErrorModalProps {
    error: string;
    onClose: () => void;
}

export default function ErrorModal({ error, onClose }: ErrorModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-zinc-800 text-center"
            >
                <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-24">
                        <Image
                            src="/sad-face.png"
                            alt="Sad face"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Ops! Algo deu errado</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {error}
                </p>
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium w-full"
                >
                    Entendi
                </button>
            </motion.div>
        </div>
    );
}
