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
    // 1️⃣ PROFILE HEADER (TOP CARD) - Data derived from other fields or separate for this view
    avatar: {
        type: String, // URL or Base64
        default: "/profileplaceHolder.jfif"
    },
    jobTitle: { type: String, default: "" },
    department: { type: String, default: "" },
    organizationName: { type: String, default: "SkillBridge" },
    profileStatus: {
        type: String,
        enum: ["Active", "Incomplete", "Verified"],
        default: "Incomplete"
    },
    completionPercentage: { type: Number, default: 0 },

    // 2️⃣ BASIC INFORMATION
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], default: "Prefer not to say" },
    nationality: { type: String, default: "" },
    secondaryEmail: { type: String, default: "" },
    mobileNumber: { type: String, default: "" },

    // 3️⃣ PROFESSIONAL DETAILS
    reportingManager: { type: String, default: "" },
    employmentType: {
        type: String,
        enum: ["Permanent", "Contract", "Intern", "Part-time"],
        default: "Permanent"
    },
    joiningDate: { type: Date },
    workLocation: { type: String, default: "" },
    totalExperience: { type: Number, default: 0 }, // In years
    skills: [{ type: String }],
    assessments: [{
        userName: { type: String },
        userEmail: { type: String },
        skill: { type: String },
        level: { type: String },
        score: { type: Number },
        passed: { type: Boolean },
        date: { type: Date, default: Date.now }
    }],
    certifications: [{ type: String }],
    resumeUrl: { type: String, default: "" },

    // 4️⃣ CONTACT INFORMATION
    officeEmail: { type: String, default: "" },
    personalEmail: { type: String, default: "" },
    officePhone: { type: String, default: "" },
    emergencyContactName: { type: String, default: "" },
    emergencyContactNumber: { type: String, default: "" },
    residentialAddress: { type: String, default: "" },
    officeAddress: { type: String, default: "" },

    // 5️⃣ EDUCATION DETAILS (MULTI-ENTRY)
    education: [{
        degree: { type: String },
        institution: { type: String },
        university: { type: String },
        graduationYear: { type: Number },
        grade: { type: String }
    }],

    // 6️⃣ IDENTIFICATION & COMPLIANCE (ADMIN / HR ACCESS)
    govtIdType: { type: String, default: "" },
    idNumber: { type: String, default: "" }, // Should be encrypted/masked in production
    nationalId: { type: String, default: "" }, // PAN / SSN
    workAuthorization: { type: String, default: "" },
    backgroundVerificationStatus: {
        type: String,
        enum: ["Not Started", "In Progress", "Verified", "Rejected"],
        default: "Not Started"
    },

    // 7️⃣ PREFERENCES & SETTINGS
    language: { type: String, default: "English" },
    timeZone: { type: String, default: "UTC" },
    notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true }
    },
    theme: { type: String, enum: ["Light", "Dark"], default: "Light" },
    communicationPreferences: { type: String, default: "Email" },

    // 8️⃣ SYSTEM INFORMATION (READ-ONLY)
    lastProfileUpdated: { type: Date, default: Date.now },
    lastLogin: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
