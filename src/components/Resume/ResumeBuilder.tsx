import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Download, Eye, Edit, Plus, Briefcase, GraduationCap, Award, CheckCircle, FileText } from 'lucide-react';

interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  skills: string[];
}

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const sections = [
    { id: 'personal', title: 'Personal Info', icon: User, color: 'blue' },
    { id: 'experience', title: 'Experience', icon: Briefcase, color: 'green' },
    { id: 'education', title: 'Education', icon: GraduationCap, color: 'purple' },
    { id: 'skills', title: 'Skills', icon: Award, color: 'orange' }
  ];

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      grade: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let resume = `${resumeData.personal.name}\n`;
      resume += `${resumeData.personal.email} | ${resumeData.personal.phone}\n`;
      resume += `${resumeData.personal.location}\n\n`;
      
      if (resumeData.personal.summary) {
        resume += `PROFESSIONAL SUMMARY\n`;
        resume += `${resumeData.personal.summary}\n\n`;
      }
      
      if (resumeData.experience.length > 0) {
        resume += `WORK EXPERIENCE\n`;
        resumeData.experience.forEach(exp => {
          resume += `${exp.jobTitle} at ${exp.company}\n`;
          resume += `${exp.startDate} - ${exp.endDate}\n`;
          resume += `${exp.description}\n\n`;
        });
      }
      
      if (resumeData.education.length > 0) {
        resume += `EDUCATION\n`;
        resumeData.education.forEach(edu => {
          resume += `${edu.degree} - ${edu.institution}\n`;
          resume += `Year: ${edu.year} | Grade: ${edu.grade}\n\n`;
        });
      }
      
      if (resumeData.skills.length > 0) {
        resume += `SKILLS\n`;
        resume += resumeData.skills.join(', ');
      }
      
      setGeneratedResume(resume);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadResume = () => {
    if (!generatedResume) return;
    
    const blob = new Blob([generatedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personal.name || 'resume'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (generatedResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Resume Generated!</h2>
                  <p className="text-gray-600">Your professional resume is ready</p>
                </div>
              </div>
              <button
                onClick={() => setGeneratedResume(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Resume Preview</span>
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded border max-h-96 overflow-y-auto">
                {generatedResume}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={downloadResume}
                className="flex-1 bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Resume</span>
              </button>
              <button
                onClick={() => setGeneratedResume(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Resume
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Builder</h1>
          <p className="text-gray-600">Create a professional resume with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resume Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? `bg-${section.color}-50 text-${section.color}-700 border-l-4 border-${section.color}-500`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      <span>Generate Resume</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              {activeSection === 'personal' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      value={resumeData.personal.name}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, name: e.target.value }
                      }))}
                      placeholder="Full Name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, email: e.target.value }
                      }))}
                      placeholder="Email Address"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      value={resumeData.personal.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, phone: e.target.value }
                      }))}
                      placeholder="Phone Number"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, location: e.target.value }
                      }))}
                      placeholder="Location"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    value={resumeData.personal.summary}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, summary: e.target.value }
                    }))}
                    placeholder="Professional Summary"
                    rows={4}
                    className="w-full mt-6 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}

              {activeSection === 'experience' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                    <button 
                      onClick={addExperience}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-6 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                            placeholder="Job Title"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Start Date (e.g., Jan 2020)"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="End Date (e.g., Present)"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Job Description and Achievements"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No work experience added yet. Click "Add Experience" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'education' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    <button 
                      onClick={addEducation}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Education</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="p-6 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Degree (e.g., B.Tech Computer Science)"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="Institution Name"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            placeholder="Year of Graduation"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={edu.grade}
                            onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                            placeholder="Grade/CGPA"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                    {resumeData.education.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No education added yet. Click "Add Education" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'skills' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="Add a skill (e.g., JavaScript, Communication)"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button
                        onClick={addSkill}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium flex items-center space-x-2"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkill(index)}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    {resumeData.skills.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No skills added yet. Add your skills to showcase your abilities.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}