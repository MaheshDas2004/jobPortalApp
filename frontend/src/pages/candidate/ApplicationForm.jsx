import React, { useState } from "react";
import { ArrowRight, Upload, MapPin, Info } from "lucide-react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    instituteName: "",
    differentlyAbled: "No",
    userType: "College Students",
    domain: "",
    course: "",
    courseSpecialization: "",
    graduatingYear: "",
    courseDuration: "",
    termsAccepted: false,
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.instituteName.trim()) newErrors.instituteName = "Institute name is required";
    if (!formData.domain) newErrors.domain = "Domain is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.courseSpecialization) newErrors.courseSpecialization = "Specialization is required";
    if (!formData.graduatingYear) newErrors.graduatingYear = "Graduating year is required";
    if (!formData.courseDuration) newErrors.courseDuration = "Course duration is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms and conditions";
    if (!resume) newErrors.resume = "Please upload your CV/Resume";
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("Form submitted:", formData, resume);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white border-2 border-gray-200 p-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">
              AC
            </div>
            <div>
              <h2 className="font-bold text-sm">Accountant / Accounts Executive</h2>
              <p className="text-xs text-gray-600">unstatic Pvt Ltd</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Registration Form</h1>
        </div>

        <div className="space-y-6">
          {/* Upload CV Section */}
          <div>
            <label className="block text-sm font-bold mb-2">
              Upload CV / Resume<span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-3">Submit your resume in doc, docx, pdf</p>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {resume ? resume.name : "Click to upload"}
                </span>
              </label>
            </div>
            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
          </div>

          {/* Basic Details */}
          <div>
            <h3 className="font-bold text-sm mb-4">Basic Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Mahesh"
                  className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Last Name<span className="text-gray-400 text-xs"> (if applicable)</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Das"
                  className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mahesh.dass3309@gmail.com"
                className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">
                Mobile<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <select className="px-2 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none">
                  <option>🇮🇳 +91</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9358310568"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold mb-3">
              Gender<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {["Female", "Male", "Transgender", "Woman", "Intersex", "Man-Binary", "Prefer not to say"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`px-4 py-2 border-2 text-sm font-semibold transition ${
                    formData.gender === g
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Location<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Jalandhar, Punjab, India"
                className="w-full px-4 py-2 border-2 border-gray-300 bg-white focus:border-black focus:outline-none pr-10"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Institute Name */}
          <div>
            <label className="text-xs font-bold uppercase mb-2 block">
              Institute Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              placeholder="lovely proffessional university"
              className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
            />
            {errors.instituteName && <p className="text-red-500 text-xs mt-1">{errors.instituteName}</p>}
          </div>

          {/* Differently Abled */}
          <div>
            <label className="text-xs font-bold uppercase mb-4 flex items-center space-x-2">
              <span>Differently Abled<span className="text-red-500">*</span></span>
              <Info className="h-4 w-4 text-gray-400" />
            </label>
            <div className="flex space-x-3">
              {["No", "Yes"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, differentlyAbled: option })}
                  className={`px-6 py-2 border-2 text-sm font-semibold transition ${
                    formData.differentlyAbled === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div>
            <h3 className="font-extrabold text-lg mb-6 uppercase">User Details</h3>
            
            {/* Type */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase mb-4 block">
                Type<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-3">
                {["College Students", "Professional", "Fresher"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: type })}
                    className={`px-4 py-2 border-2 text-sm font-semibold transition ${
                      formData.userType === type
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase mb-2 block">
                Domain<span className="text-red-500">*</span>
              </label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
              >
                <option value="">Select Domain</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
              {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
            </div>

            {/* Course */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase mb-2 block">
                Course<span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
              >
                <option value="">Select Course</option>
                <option value="B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)">
                  B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)
                </option>
                <option value="M.Tech/ME">M.Tech/ME</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
              </select>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
            </div>

            {/* Course Specialization */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase mb-2 block">
                Course Specialization<span className="text-red-500">*</span>
              </label>
              <select
                name="courseSpecialization"
                value={formData.courseSpecialization}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-100 focus:border-black focus:outline-none"
              >
                <option value="">Select Specialization</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
              {errors.courseSpecialization && <p className="text-red-500 text-xs mt-1">{errors.courseSpecialization}</p>}
            </div>

            {/* Graduating Year */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase mb-4 block">
                Graduating Year<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-3">
                {["2026", "2027", "2028", "2029"].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setFormData({ ...formData, graduatingYear: year })}
                    className={`px-6 py-2 border-2 text-sm font-semibold transition ${
                      formData.graduatingYear === year
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              {errors.graduatingYear && <p className="text-red-500 text-xs mt-1">{errors.graduatingYear}</p>}
            </div>

            {/* Course Duration */}
            <div>
              <label className="text-xs font-bold uppercase mb-4 block">
                Course Duration<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-3">
                {["3 Years", "4 Years"].map((duration) => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => setFormData({ ...formData, courseDuration: duration })}
                    className={`px-6 py-2 border-2 text-sm font-semibold transition ${
                      formData.courseDuration === duration
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
              {errors.courseDuration && <p className="text-red-500 text-xs mt-1">{errors.courseDuration}</p>}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-gray-50 p-6 border-2 border-gray-200">
            <h3 className="font-extrabold text-lg mb-4 uppercase">Terms & Conditions</h3>
            <label className="flex items-start space-x-4 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 h-5 w-5"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I hereby confirm my consent to receive this data mentioned in this form via any form 
                mentioned with this recruiter for the opportunity for further analysis, processing, and 
                outreach. Your data will ever be used by Unstatic for providing you regular and consistent 
                updates on this opportunity. You also agree to the privacy policy and terms of use of Unstatic.
              </span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between pt-8 gap-4">
            <button
              type="button"
              className="flex-1 px-8 py-4 border-2 border-gray-400 bg-gray-100 text-black font-bold hover:border-black hover:bg-white transition uppercase"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition flex items-center justify-center space-x-2 border-2 border-black hover:bg-white hover:text-black uppercase"
            >
              <span>Submit Application</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}