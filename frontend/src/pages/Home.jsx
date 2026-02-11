import { Link } from 'react-router-dom';
import { FaRocket, FaCheck } from 'react-icons/fa';

const Home = () => {
    const features = [
        'AI Chat Assistant',
        'AI Image Generator',
        'AI Resume Builder',
        'AI Code Generator',
        'AI Study Assistant',
        'AI Content Generator'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Logo */}
                    <h1 className="text-6xl font-extrabold gradient-text mb-6 animate-fade-in">
                        AI Hub
                    </h1>

                    {/* Tagline */}
                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
                        All-in-One AI Platform
                    </p>

                    {/* Description */}
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                        Access multiple powerful AI tools in one unified platform.
                        From chat assistance to image generation, we've got you covered.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link to="/register" className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center">
                            <FaRocket className="mr-2" />
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn-outline px-8 py-4 text-lg">
                            Sign In
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card flex items-center space-x-3 animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                    <FaCheck className="text-white text-sm" />
                                </div>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">6+</div>
                            <div className="text-gray-600 dark:text-gray-400">AI Tools</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
                            <div className="text-gray-600 dark:text-gray-400">Availability</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">∞</div>
                            <div className="text-gray-600 dark:text-gray-400">Possibilities</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        © 2024 AI Hub. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
