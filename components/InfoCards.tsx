import { Info } from 'lucide-react';

const cards = [
    {
        title: "Comunidade Primeiro",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: "Conexão Simples",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Foco em Privacidade",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        title: "Contruído com Antigravity",
        description: "Contruído com Antigravity, o framework para construção de sites e aplicações web."
    }
];

export default function InfoCards() {
    return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800 hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <Info size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
