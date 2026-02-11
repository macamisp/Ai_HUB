const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

// Check if API key is configured
const isConfigured = () => {
    return !!OPENAI_API_KEY && OPENAI_API_KEY !== '';
};

// AI Chat Assistant
exports.chatCompletion = async (prompt, options = {}) => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: options.model || 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: options.systemPrompt || 'You are a helpful AI assistant.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            text: response.data.choices[0].message.content,
            model: response.data.model,
            tokens: response.data.usage.total_tokens
        };
    } catch (error) {
        console.error('OpenAI Chat Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate chat response');
    }
};

// AI Image Generator
exports.generateImage = async (prompt, options = {}) => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/images/generations`,
            {
                prompt: prompt,
                n: options.n || 1,
                size: options.size || '1024x1024',
                quality: options.quality || 'standard'
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            imageUrl: response.data.data[0].url,
            revisedPrompt: response.data.data[0].revised_prompt
        };
    } catch (error) {
        console.error('OpenAI Image Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate image');
    }
};

// AI Resume Builder
exports.buildResume = async (userData) => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    const prompt = `Create a professional resume in markdown format based on the following information:

Name: ${userData.name}
Email: ${userData.email}
Phone: ${userData.phone || 'Not provided'}
Location: ${userData.location || 'Not provided'}

Education:
${userData.education || 'Not provided'}

Experience:
${userData.experience || 'Not provided'}

Skills:
${userData.skills || 'Not provided'}

Additional Information:
${userData.additional || 'Not provided'}

Please create a well-structured, ATS-friendly resume with proper sections and formatting.`;

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional resume writer. Create clean, ATS-friendly resumes in markdown format.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            resume: response.data.choices[0].message.content,
            tokens: response.data.usage.total_tokens
        };
    } catch (error) {
        console.error('OpenAI Resume Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate resume');
    }
};

// AI Code Generator
exports.generateCode = async (description, language = 'javascript') => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    const prompt = `Generate ${language} code for the following requirement:\n\n${description}\n\nProvide clean, well-commented, production-ready code.`;

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert ${language} developer. Generate clean, efficient, and well-documented code.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.5,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            code: response.data.choices[0].message.content,
            language: language,
            tokens: response.data.usage.total_tokens
        };
    } catch (error) {
        console.error('OpenAI Code Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate code');
    }
};

// AI Study Assistant
exports.studyAssistant = async (topic, type = 'explain') => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
        case 'explain':
            systemPrompt = 'You are a patient and knowledgeable tutor. Explain concepts clearly with examples.';
            userPrompt = `Explain the following topic in detail with examples: ${topic}`;
            break;
        case 'flashcards':
            systemPrompt = 'You are a study assistant. Create flashcards in JSON format with question and answer pairs.';
            userPrompt = `Create 5 flashcards for studying: ${topic}. Return as JSON array with "question" and "answer" fields.`;
            break;
        case 'quiz':
            systemPrompt = 'You are a quiz creator. Create multiple choice questions in JSON format.';
            userPrompt = `Create 5 multiple choice questions about: ${topic}. Return as JSON array with "question", "options" (array), and "correctAnswer" (index) fields.`;
            break;
        default:
            systemPrompt = 'You are a helpful study assistant.';
            userPrompt = topic;
    }

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 1500
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let content = response.data.choices[0].message.content;

        // Try to parse JSON for flashcards and quiz
        if (type === 'flashcards' || type === 'quiz') {
            try {
                content = JSON.parse(content);
            } catch (e) {
                // If parsing fails, return as text
            }
        }

        return {
            content: content,
            type: type,
            tokens: response.data.usage.total_tokens
        };
    } catch (error) {
        console.error('OpenAI Study Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate study content');
    }
};

// AI Content Generator
exports.generateContent = async (contentType, topic, options = {}) => {
    if (!isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (contentType) {
        case 'blog':
            systemPrompt = 'You are a professional blog writer. Create engaging, SEO-friendly blog posts.';
            userPrompt = `Write a ${options.length || 'medium'}-length blog post about: ${topic}`;
            break;
        case 'social':
            systemPrompt = 'You are a social media expert. Create engaging social media posts.';
            userPrompt = `Create a ${options.platform || 'general'} social media post about: ${topic}`;
            break;
        case 'email':
            systemPrompt = 'You are a professional email writer. Create clear, professional emails.';
            userPrompt = `Write a ${options.tone || 'professional'} email about: ${topic}`;
            break;
        case 'article':
            systemPrompt = 'You are a professional article writer. Create informative, well-researched articles.';
            userPrompt = `Write an article about: ${topic}`;
            break;
        default:
            systemPrompt = 'You are a professional content writer.';
            userPrompt = `Create content about: ${topic}`;
    }

    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.8,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            content: response.data.choices[0].message.content,
            contentType: contentType,
            tokens: response.data.usage.total_tokens
        };
    } catch (error) {
        console.error('OpenAI Content Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to generate content');
    }
};

// Mock responses for when API key is not configured
exports.getMockResponse = (toolType) => {
    const mockResponses = {
        chat: {
            text: 'This is a mock response. Please configure your OpenAI API key in the .env file to use real AI responses.',
            model: 'mock',
            tokens: 0
        },
        image: {
            imageUrl: 'https://via.placeholder.com/1024x1024?text=Configure+OpenAI+API+Key',
            revisedPrompt: 'Mock image - Please configure OpenAI API key'
        },
        resume: {
            resume: '# Mock Resume\n\nPlease configure your OpenAI API key to generate real resumes.',
            tokens: 0
        },
        code: {
            code: '// Mock code\n// Please configure your OpenAI API key to generate real code',
            language: 'javascript',
            tokens: 0
        },
        study: {
            content: 'Mock study content. Please configure your OpenAI API key.',
            type: 'explain',
            tokens: 0
        },
        content: {
            content: 'Mock content. Please configure your OpenAI API key to generate real content.',
            contentType: 'blog',
            tokens: 0
        }
    };

    return mockResponses[toolType] || mockResponses.chat;
};
