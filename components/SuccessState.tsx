'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function SuccessState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-4"
        >
            <div className="relative inline-block mb-8">
                {/* Confetti/Sparkles Effect */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-12 -left-12 text-yellow-400"
                >
                    <Sparkles size={48} />
                </motion.div>
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="absolute -top-8 -right-12 text-purple-400"
                >
                    <Sparkles size={40} />
                </motion.div>

                {/* Main Success Icon */}
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200 dark:shadow-green-900/20 mx-auto">
                    <CheckCircle size={64} className="text-white" />
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Parabéns! Tudo Limpo!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                Você removeu todos da lista ou não há não-seguidores.
                Sua conta está organizada e livre de conexões unilaterais!
            </p>
        </motion.div>
    );
}
