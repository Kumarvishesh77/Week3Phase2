const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    userName: { type: String },
    userEmail: { type: String },
    avatar: {
        type: String,
        default: "/profileplaceHolder.jfif"
    },
    
    // Basic Details (Additional)
    age: { type: Number },
    gender: { type: String },

    // Career Status
    currentStatus: {
        type: String,
        enum: ["Student", "Working Professional", "Career Switcher", "Beginner"],
        default: "Beginner"
    },
    roleOrStudy: { type: String, default: "" },
    totalExperience: { type: Number, default: 0 },
    
    // Skills & Goals
    skills: [{
        name: { type: String },
        proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] }
    }],
    targetRole: { type: String, default: "" },
    
    // Other Details
    mobileNumber: { type: String, default: "" },
    
    // Completion Logic
    profileStatus: {
        type: String,
        enum: ["Complete", "Incomplete"],
        default: "Incomplete"
    },
    completionPercentage: { type: Number, default: 0 },

    assessments: [{
        skill: { type: String },
        level: { type: String },
        score: { type: Number },
        passed: { type: Boolean },
        date: { type: Date, default: Date.now }
    }],

    lastProfileUpdated: { type: Date, default: Date.now }
}, { timestamps: true, strict: false });

module.exports = mongoose.model("Profile", profileSchema);
