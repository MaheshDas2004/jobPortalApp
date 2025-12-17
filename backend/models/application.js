import mongoose from "mongoose";

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

    resume: {
      type: String, // resume file path / cloud URL
      required: true
    },

    coverLetter: {
      type: String
    },

    experience: {
      type: Number
    },

    expectedSalary: {
      type: String
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "interview",
        "rejected",
        "selected"
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

    employerNote: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate apply
applicationSchema.index(
  { jobId: 1, candidateId: 1 },
  { unique: true }
);

export default mongoose.model("Application", applicationSchema);