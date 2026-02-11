const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    tool_name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['communication', 'creative', 'productivity', 'development', 'education', 'content'],
        required: true
    },
    icon: {
        type: String,
        default: '🤖'
    },
    features: [{
        type: String
    }],
    usage_limits: {
        free: { type: Number, default: 10 },
        pro: { type: Number, default: 100 },
        enterprise: { type: Number, default: -1 } // -1 means unlimited
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tool', toolSchema);
