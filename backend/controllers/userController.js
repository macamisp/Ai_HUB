const User = require('../models/User');
const UsageHistory = require('../models/UsageHistory');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                plan_type: user.plan_type,
                usage_count: user.usage_count,
                profile_image: user.profile_image,
                email_verified: user.email_verified,
                last_login: user.last_login,
                created_at: user.created_at
            }
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { name, profile_image } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (profile_image) updateData.profile_image = profile_image;
        updateData.updated_at = Date.now();

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile_image: user.profile_image
            }
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get user usage history
// @route   GET /api/user/history
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const { page = 1, limit = 20, tool } = req.query;

        const query = { user_id: req.user.userId };
        if (tool) {
            query.tool_name = tool;
        }

        const history = await UsageHistory.find(query)
            .sort({ created_at: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('tool_id', 'tool_name icon');

        const count = await UsageHistory.countDocuments(query);

        res.json({
            success: true,
            data: history,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalItems: count,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get History Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete history item
// @route   DELETE /api/user/history/:id
// @access  Private
exports.deleteHistory = async (req, res) => {
    try {
        const history = await UsageHistory.findOne({
            _id: req.params.id,
            user_id: req.user.userId
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message: 'History item not found'
            });
        }

        await history.deleteOne();

        res.json({
            success: true,
            message: 'History item deleted successfully'
        });
    } catch (error) {
        console.error('Delete History Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get usage statistics
// @route   GET /api/user/stats
// @access  Private
exports.getStats = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        // Get total usage
        const totalUsage = await UsageHistory.countDocuments({ user_id: req.user.userId });

        // Get usage by tool
        const usageByTool = await UsageHistory.aggregate([
            { $match: { user_id: user._id } },
            { $group: { _id: '$tool_name', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentActivity = await UsageHistory.aggregate([
            {
                $match: {
                    user_id: user._id,
                    created_at: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            success: true,
            stats: {
                totalUsage,
                usageCount: user.usage_count,
                planType: user.plan_type,
                usageByTool,
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
