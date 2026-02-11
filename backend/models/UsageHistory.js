const mongoose = require('mongoose');

const usageHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    tool_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
        required: true,
        index: true
    },
    tool_name: {
        type: String,
        required: true
    },
    input: {
        prompt: String,
        parameters: mongoose.Schema.Types.Mixed
    },
    output: {
        text: String,
        image_url: String,
        file_url: String,
        data: mongoose.Schema.Types.Mixed,
        model: String,
        tokens_used: Number
    },
    tokens_used: {
        type: Number,
        default: 0
    },
    execution_time: {
        type: Number, // in seconds
        default: 0
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    },
    error: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Compound index for efficient queries
usageHistorySchema.index({ user_id: 1, created_at: -1 });
usageHistorySchema.index({ tool_id: 1, created_at: -1 });

module.exports = mongoose.model('UsageHistory', usageHistorySchema);
