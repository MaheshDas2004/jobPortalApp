const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    instituteName: {
      type: String,
      required: true,
      trim: true
    },

    domain: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    courseSpecialization: {
      type: String,
      required: true
    },

    graduatingYear: {
      type: String,
      required: true
    },

    courseDuration: {
      type: String,
      required: true
    },

    differentlyAbled: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
    },

    userType: {
      type: String,
      default: "College Students"
    },

    resume: {
      type: String
    },

    coverLetter: {
      type: String
    },

    status: {
      type: String,
      enum: [
        "applied",
        "accepted",
        "rejected"
      ],
      default: "applied"
    },

    interview: {
      date: {
        type: Date
      },
      mode: {
        type: String,
        enum: ["online", "offline"]
      },
      link: {
        type: String
      }
    },
  },
  {
    timestamps: true
  }
);

applicationSchema.index(
  { jobId: 1, candidateId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);