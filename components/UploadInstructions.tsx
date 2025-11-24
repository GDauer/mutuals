'use client';

import { motion } from 'framer-motion';
import { Upload, AlertCircle, FileJson } from 'lucide-react';
import { useState } from 'react';

interface UploadInstructionsProps {
    onFileUpload: (files: FileList) => void;
}

const steps = [
    {
        number: 1,
        title: "Acesse seu perfil no Instagram",
        description: 'Abra o Instagram pelo app ou acesse <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">instagram.com</a> e faça login'
    },
    {
        number: 2,
        title: "Vá em Configurações",
        description: "Clique no seu perfil e depois em Configurações"
    },
    {
        number: 3,
        title: 'Busque por "Baixar"',
        description: 'Na aba de pesquisa, escreva "Baixar" e selecione "Baixar suas informações"'
    },
    {
        number: 4,
        title: "Criar exportação",
        description: 'Selecione "Criar exportação"'
    },
    {
        number: 5,
        title: "Selecione sua conta",
        description: "Escolha a conta do Instagram que deseja exportar"
    },
    {
        number: 6,
        title: "Exportar para dispositivo",
        description: 'Selecione a opção "Exportar para dispositivo"'
    },
    {
        number: 7,
        title: "Alterar formato para JSON",
        description: 'Clique em "Formato", altere de "HTML" para "JSON" e depois clique em "Salvar"'
    },
    {
        number: 8,
        title: "Definir intervalo de datas",
        description: 'Clique em "Intervalo das datas" e selecione o período desejado (recomendado: desde sempre)'
    },
    {
        number: 9,
        title: "Personalizar informações",
        description: 'Selecione "Personalizar Informações" e deixe marcado apenas "Seguidores e Seguindo"'
    },
    {
        number: 10,
        title: "Salvar configurações",
        description: 'Clique em "Salvar" para confirmar suas escolhas'
    },
    {
        number: 11,
        title: "Iniciar exportação",
        description: 'Clique em "Iniciar Exportação" e aguarde o Instagram processar sua solicitação (pode levar até 48 horas)'
    },
    {
        number: 12,
        title: "Faça o upload aqui",
        description: "Quando receber o e-mail, baixe o arquivo ZIP e faça upload abaixo"
    }
];

export default function UploadInstructions({ onFileUpload }: UploadInstructionsProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileUpload(files);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileUpload(files);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto p-6"
        >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                        Como Exportar Seus Dados do Instagram
                    </h2>
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 text-left">
                            Infelizmente, o Instagram não permite que aplicativos acessem sua lista de seguidores de forma automática e legal.
                            Por isso, você precisa exportar seus dados manualmente.
                        </p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-bold mb-4">Passo a Passo:</h3>

                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div key={step.number} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
                                    {step.number}
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">{step.title}</h4>
                                    <p
                                        className="text-gray-600 dark:text-gray-400 text-sm"
                                        dangerouslySetInnerHTML={{ __html: step.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upload Area */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragging
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-zinc-700 hover:border-purple-400'
                        }`}
                >
                    <input
                        type="file"
                        id="file-upload"
                        accept=".json"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            {isDragging ? (
                                <FileJson className="w-8 h-8 text-white" />
                            ) : (
                                <Upload className="w-8 h-8 text-white" />
                            )}
                        </div>
                        <div>
                            <p className="text-lg font-semibold mb-1">
                                {isDragging ? 'Solte os arquivos aqui' : 'Clique para selecionar ou arraste os arquivos'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Selecione os 2 arquivos JSON: following.json e followers_1.json
                            </p>
                        </div>
                    </label>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Seus dados são processados localmente no seu navegador e não são enviados para nenhum servidor.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
