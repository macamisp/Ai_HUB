const aiService = require('../services/aiService');
const UsageHistory = require('../models/UsageHistory');
const User = require('../models/User');
const Tool = require('../models/Tool');

// Helper function to track usage
const trackUsage = async (userId, toolId, toolName, input, output, tokensUsed, executionTime, status, error = null) => {
    try {
        const history = new UsageHistory({
            user_id: userId,
            tool_id: toolId,
            tool_name: toolName,
            input: input,
            output: output,
            tokens_used: tokensUsed,
            execution_time: executionTime,
            status: status,
            error: error
        });
        await history.save();
    } catch (err) {
        console.error('Error tracking usage:', err);
    }
};

// Helper function to update user usage count
const updateUserUsage = async (userId, category) => {
    try {
        await User.findByIdAndUpdate(userId, {
            $inc: { [`usage_count.${category}`]: 1 }
        });
    } catch (err) {
        console.error('Error updating user usage:', err);
    }
};

// @desc    AI Chat Assistant
// @route   POST /api/ai/chat
// @access  Private
exports.chat = async (req, res) => {
    const startTime = Date.now();

    try {
        const { prompt, options } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-chat' });

        // Generate response
        const result = await aiService.chatCompletion(prompt, options);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Chat Assistant',
            { prompt, parameters: options },
            { text: result.text, model: result.model, tokens_used: result.tokens },
            result.tokens,
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'chat');

        res.json({
            success: true,
            data: {
                response: result.text,
                model: result.model,
                tokensUsed: result.tokens,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        // Track failed usage
        const tool = await Tool.findOne({ slug: 'ai-chat' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Chat Assistant',
            { prompt: req.body.prompt },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Chat Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate chat response'
        });
    }
};

// @desc    AI Image Generator
// @route   POST /api/ai/image
// @access  Private
exports.generateImage = async (req, res) => {
    const startTime = Date.now();

    try {
        const { prompt, options } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-image' });

        // Generate image
        const result = await aiService.generateImage(prompt, options);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Image Generator',
            { prompt, parameters: options },
            { image_url: result.imageUrl, revised_prompt: result.revisedPrompt },
            0, // Images don't use tokens in the same way
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'image');

        res.json({
            success: true,
            data: {
                imageUrl: result.imageUrl,
                revisedPrompt: result.revisedPrompt,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        const tool = await Tool.findOne({ slug: 'ai-image' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Image Generator',
            { prompt: req.body.prompt },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Image Generation Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate image'
        });
    }
};

// @desc    AI Resume Builder
// @route   POST /api/ai/resume
// @access  Private
exports.buildResume = async (req, res) => {
    const startTime = Date.now();

    try {
        const userData = req.body;

        if (!userData.name || !userData.email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-resume' });

        // Generate resume
        const result = await aiService.buildResume(userData);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Resume Builder',
            { userData },
            { resume: result.resume, tokens_used: result.tokens },
            result.tokens,
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'resume');

        res.json({
            success: true,
            data: {
                resume: result.resume,
                tokensUsed: result.tokens,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        const tool = await Tool.findOne({ slug: 'ai-resume' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Resume Builder',
            { userData: req.body },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Resume Generation Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate resume'
        });
    }
};

// @desc    AI Code Generator
// @route   POST /api/ai/code
// @access  Private
exports.generateCode = async (req, res) => {
    const startTime = Date.now();

    try {
        const { description, language } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Code description is required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-code' });

        // Generate code
        const result = await aiService.generateCode(description, language);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Code Generator',
            { description, language },
            { code: result.code, language: result.language, tokens_used: result.tokens },
            result.tokens,
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'code');

        res.json({
            success: true,
            data: {
                code: result.code,
                language: result.language,
                tokensUsed: result.tokens,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        const tool = await Tool.findOne({ slug: 'ai-code' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Code Generator',
            { description: req.body.description, language: req.body.language },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Code Generation Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate code'
        });
    }
};

// @desc    AI Study Assistant
// @route   POST /api/ai/study
// @access  Private
exports.studyAssistant = async (req, res) => {
    const startTime = Date.now();

    try {
        const { topic, type } = req.body;

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'Topic is required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-study' });

        // Generate study content
        const result = await aiService.studyAssistant(topic, type);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Study Assistant',
            { topic, type },
            { content: result.content, type: result.type, tokens_used: result.tokens },
            result.tokens,
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'study');

        res.json({
            success: true,
            data: {
                content: result.content,
                type: result.type,
                tokensUsed: result.tokens,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        const tool = await Tool.findOne({ slug: 'ai-study' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Study Assistant',
            { topic: req.body.topic, type: req.body.type },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Study Assistant Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate study content'
        });
    }
};

// @desc    AI Content Generator
// @route   POST /api/ai/content
// @access  Private
exports.generateContent = async (req, res) => {
    const startTime = Date.now();

    try {
        const { contentType, topic, options } = req.body;

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: 'Topic is required'
            });
        }

        // Get tool info
        const tool = await Tool.findOne({ slug: 'ai-content' });

        // Generate content
        const result = await aiService.generateContent(contentType, topic, options);
        const executionTime = (Date.now() - startTime) / 1000;

        // Track usage
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Content Generator',
            { contentType, topic, options },
            { content: result.content, contentType: result.contentType, tokens_used: result.tokens },
            result.tokens,
            executionTime,
            'success'
        );

        // Update user usage count
        await updateUserUsage(req.user.userId, 'content');

        res.json({
            success: true,
            data: {
                content: result.content,
                contentType: result.contentType,
                tokensUsed: result.tokens,
                executionTime: executionTime
            }
        });
    } catch (error) {
        const executionTime = (Date.now() - startTime) / 1000;

        const tool = await Tool.findOne({ slug: 'ai-content' });
        await trackUsage(
            req.user.userId,
            tool?._id,
            'AI Content Generator',
            { contentType: req.body.contentType, topic: req.body.topic },
            null,
            0,
            executionTime,
            'failed',
            error.message
        );

        console.error('Content Generation Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate content'
        });
    }
};
