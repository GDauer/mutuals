'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useRef, useState } from 'react';

import Image from 'next/image';
import NonFollowersList from './NonFollowersList';
import UploadInstructions from './UploadInstructions';
import ErrorModal from './modals/ErrorModal';
import { parseInstagramData, InstagramUser } from '@/lib/instagramParser';

type UploadStep = 'initial' | 'instructions' | 'uploaded';

export default function Hero() {
  const [uploadStep, setUploadStep] = useState<UploadStep>('initial');
  const [users, setUsers] = useState<InstagramUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleConnect = () => {
    setUploadStep('instructions');
  };

  const handleFileUpload = async (files: FileList) => {
    try {
      setError(null);
      const parsedUsers = await parseInstagramData(files);
      setUsers(parsedUsers);
      setUploadStep('uploaded');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar arquivo');
      console.error('Upload error:', err);
    }
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-20">
      {/* Error Modal */}
      {error && <ErrorModal error={error} onClose={closeErrorModal} />}

      <motion.div
        style={{ y, opacity: uploadStep === 'initial' ? opacity : 1 }}
        className="flex flex-col items-center z-10 mb-8"
      >
        {/* Logo */}
        <div className="relative w-48 h-48">
          <Image
            src="/logo.png"
            alt="Mutuals Logo"
            fill
            className="object-contain drop-shadow-2xl rounded-full"
            priority
          />
        </div>
      </motion.div>

      {uploadStep === 'initial' && (
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-center z-10"
        >
          {/* Connect Button */}
          <button
            onClick={handleConnect}
            className="group relative px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              <Instagram size={20} />
              <span>Conectar com o Instagram</span>
            </div>
          </button>
        </motion.div>
      )}

      {uploadStep === 'instructions' && (
        <div className="w-full z-10">
          <UploadInstructions onFileUpload={handleFileUpload} />
        </div>
      )}

      {uploadStep === 'uploaded' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full z-10"
        >
          <NonFollowersList users={users} />
        </motion.div>
      )}

      {/* Background Elements for depth */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black" />
    </div>
  );
}
