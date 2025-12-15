const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
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
            validator: function(v) {
                return !v || /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema);