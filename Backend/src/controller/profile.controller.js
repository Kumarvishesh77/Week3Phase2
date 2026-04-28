const Profile = require("../models/profile.model");
const User = require("../models/user.model");

const calculateCompletion = (profile, user) => {
    const fields = [
        user.fullname, user.email, profile.dob, profile.gender, profile.nationality,
        profile.mobileNumber, profile.jobTitle, profile.department, profile.workLocation,
        profile.residentialAddress, profile.education.length > 0
    ];
    const filledFields = fields.filter(field => field && field !== "").length;
    return Math.round((filledFields / fields.length) * 100);
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user id is in req.user from auth middleware
        let profile = await Profile.findOne({ userId }).populate("userId", "username fullname email role createdAt");
        
        if (!profile) {
            // If profile doesn't exist, create one (auto-provisioning)
            const user = await User.findById(userId);
            profile = await Profile.create({ 
                userId,
                mobileNumber: user.mobileNumber || "" // if it was captured during registration
            });
            profile = await profile.populate("userId", "username fullname email role createdAt");
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        
        // Remove read-only fields if they are sent in request
        delete updates.userId;
        delete updates.completionPercentage;
        delete updates.lastProfileUpdated;

        let profile = await Profile.findOne({ userId });
        if (!profile) {
            profile = new Profile({ userId });
        }

        // Apply updates
        Object.assign(profile, updates);
        profile.lastProfileUpdated = Date.now();
        
        // Update completion percentage
        const user = await User.findById(userId);
        profile.completionPercentage = calculateCompletion(profile, user);
        
        if (profile.completionPercentage === 100) {
            profile.profileStatus = "Active";
        }

        await profile.save();

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.uploadAvatar = async (req, res) => {
    // Basic placeholder for avatar upload
    try {
        const userId = req.user.id;
        const { avatarUrl } = req.body;
        
        const profile = await Profile.findOneAndUpdate(
            { userId },
            { avatar: avatarUrl, lastProfileUpdated: Date.now() },
            { new: true }
        );

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
