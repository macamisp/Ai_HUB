import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import {
    FaComments,
    FaImage,
    FaFileAlt,
    FaCode,
    FaBook,
    FaPen,
    FaRocket,
    FaCrown
} from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();

    const tools = [
        {
            id: 1,
            name: 'AI Chat Assistant',
            description: 'Have intelligent conversations with AI',
            icon: FaComments,
            color: 'from-blue-500 to-blue-600',
            category: 'communication',
            comingSoon: true
        },
        {
            id: 2,
            name: 'AI Image Generator',
            description: 'Create stunning images from text',
            icon: FaImage,
            color: 'from-purple-500 to-purple-600',
            category: 'creative',
            comingSoon: true
        },
        {
            id: 3,
            name: 'AI Resume Builder',
            description: 'Build professional resumes instantly',
            icon: FaFileAlt,
            color: 'from-green-500 to-green-600',
            category: 'productivity',
            comingSoon: true
        },
        {
            id: 4,
            name: 'AI Code Generator',
            description: 'Generate code in any language',
            icon: FaCode,
            color: 'from-orange-500 to-orange-600',
            category: 'development',
            comingSoon: true
        },
        {
            id: 5,
            name: 'AI Study Assistant',
            description: 'Your personal study companion',
            icon: FaBook,
            color: 'from-pink-500 to-pink-600',
            category: 'education',
            comingSoon: true
        },
        {
            id: 6,
            name: 'AI Content Generator',
            description: 'Create engaging content effortlessly',
            icon: FaPen,
            color: 'from-indigo-500 to-indigo-600',
            category: 'content',
            comingSoon: true
        }
    ];

    const usageStats = user?.usage_count || {};
    const totalUsage = Object.values(usageStats).reduce((a, b) => a + b, 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Choose an AI tool to get started
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Plan Card */}
                    <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">Current Plan</p>
                                <p className="text-2xl font-bold capitalize">{user?.plan_type}</p>
                            </div>
                            <FaCrown className="text-4xl opacity-80" />
                        </div>
                    </div>

                    {/* Usage Card */}
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Usage</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsage}</p>
                            </div>
                            <FaRocket className="text-4xl text-primary-600" />
                        </div>
                    </div>

                    {/* Tools Card */}
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Available Tools</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{tools.length}</p>
                            </div>
                            <div className="text-4xl">🤖</div>
                        </div>
                    </div>
                </div>

                {/* AI Tools Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        AI Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                                <div
                                    key={tool.id}
                                    className="card hover:scale-105 cursor-pointer relative overflow-hidden group"
                                >
                                    {/* Coming Soon Badge */}
                                    {tool.comingSoon && (
                                        <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            Coming Soon
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-3xl text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {tool.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {tool.description}
                                    </p>

                                    {/* Usage Count */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Used: {usageStats[tool.category] || 0} times
                                        </span>
                                        <button
                                            disabled={tool.comingSoon}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${tool.comingSoon
                                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                                                }`}
                                        >
                                            {tool.comingSoon ? 'Soon' : 'Use Tool'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upgrade Banner (for free users) */}
                {user?.plan_type === 'free' && (
                    <div className="mt-8 card bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
                                <p className="opacity-90">
                                    Unlock unlimited access to all AI tools and premium features
                                </p>
                            </div>
                            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
