const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tool = require('../models/Tool');

dotenv.config();

const tools = [
    {
        tool_name: 'AI Chat Assistant',
        slug: 'ai-chat',
        description: 'Have intelligent conversations with AI. Get answers, brainstorm ideas, or just chat!',
        category: 'communication',
        icon: '💬',
        features: [
            'Natural language processing',
            'Context-aware responses',
            'Multi-language support',
            'Conversation history'
        ],
        usage_limits: {
            free: 10,
            pro: 100,
            enterprise: -1
        },
        is_active: true
    },
    {
        tool_name: 'AI Image Generator',
        slug: 'ai-image',
        description: 'Create stunning images from text descriptions. Turn your imagination into reality!',
        category: 'creative',
        icon: '🎨',
        features: [
            'Text-to-image generation',
            'Multiple art styles',
            'High-resolution output',
            'Image customization'
        ],
        usage_limits: {
            free: 5,
            pro: 50,
            enterprise: -1
        },
        is_active: true
    },
    {
        tool_name: 'AI Resume Builder',
        slug: 'ai-resume',
        description: 'Build professional, ATS-friendly resumes in minutes. Stand out from the crowd!',
        category: 'productivity',
        icon: '📄',
        features: [
            'Professional templates',
            'ATS-friendly format',
            'PDF export',
            'Customizable sections'
        ],
        usage_limits: {
            free: 3,
            pro: 30,
            enterprise: -1
        },
        is_active: true
    },
    {
        tool_name: 'AI Code Generator',
        slug: 'ai-code',
        description: 'Generate code in any programming language. From snippets to full functions!',
        category: 'development',
        icon: '💻',
        features: [
            'Multi-language support',
            'Code explanation',
            'Syntax highlighting',
            'Best practices'
        ],
        usage_limits: {
            free: 10,
            pro: 100,
            enterprise: -1
        },
        is_active: true
    },
    {
        tool_name: 'AI Study Assistant',
        slug: 'ai-study',
        description: 'Your personal study companion. Get explanations, flashcards, and quizzes!',
        category: 'education',
        icon: '📚',
        features: [
            'Topic explanations',
            'Flashcard generation',
            'Quiz creation',
            'Study tips'
        ],
        usage_limits: {
            free: 10,
            pro: 100,
            enterprise: -1
        },
        is_active: true
    },
    {
        tool_name: 'AI Content Generator',
        slug: 'ai-content',
        description: 'Create engaging content effortlessly. Blog posts, social media, emails, and more!',
        category: 'content',
        icon: '✍️',
        features: [
            'Blog post generation',
            'Social media captions',
            'Email templates',
            'SEO optimization'
        ],
        usage_limits: {
            free: 5,
            pro: 50,
            enterprise: -1
        },
        is_active: true
    }
];

const seedTools = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected');

        // Clear existing tools
        await Tool.deleteMany({});
        console.log('🗑️  Cleared existing tools');

        // Insert new tools
        const createdTools = await Tool.insertMany(tools);
        console.log(`✅ ${createdTools.length} tools seeded successfully!`);

        console.log('\n📊 Tools Created:');
        createdTools.forEach(tool => {
            console.log(`   - ${tool.icon} ${tool.tool_name} (${tool.slug})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding tools:', error);
        process.exit(1);
    }
};

seedTools();
