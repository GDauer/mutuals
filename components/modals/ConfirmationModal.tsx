'use client';

import { motion } from 'framer-motion';

interface ConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-zinc-800"
            >
                <h3 className="text-xl font-bold mb-4">Remover da Lista</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Ao clicar em "Delete", o usuário será removido desta lista. Você ainda precisa dar unfollow manualmente no Instagram clicando no card do usuário.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                        Confirmar
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
