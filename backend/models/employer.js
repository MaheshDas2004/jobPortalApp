const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function (v) {
                return !v || /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    password: {
        type: String,
        required: true
    },
    // Company profile fields
    companyName: {
        type: String,
        trim: true
    },
    companyDescription: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    industry: {
        type: String,
        trim: true
    },
    companyLocation: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    companyLogo: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Employer", employerSchema);
