import  { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Send,  Building, Calendar, AlertCircle, Eye, Edit, CheckCircle } from 'lucide-react';

const formTypes = [
  {
    id: 'rti',
    title: 'RTI Application',
    description: 'Right to Information request',
    icon: FileText,
    color: 'blue',
    template: {
      title: 'Application under Right to Information Act, 2005',
      fields: ['applicantName', 'address', 'subject', 'informationSought', 'reasonForInformation']
    }
  },
  {
    id: 'complaint',
    title: 'Police Complaint',
    description: 'File a police complaint',
    icon: AlertCircle,
    color: 'red',
    template: {
      title: 'Police Complaint Application',
      fields: ['complainantName', 'address', 'incidentDate', 'incidentLocation', 'complaintDetails']
    }
  },
  {
    id: 'leave',
    title: 'Leave Application',
    description: 'Request leave from work/school',
    icon: Calendar,
    color: 'green',
    template: {
      title: 'Leave Application',
      fields: ['applicantName', 'designation', 'leaveType', 'fromDate', 'toDate', 'reason']
    }
  },
  {
    id: 'bank',
    title: 'Bank Forms',
    description: 'Account opening, loan applications',
    icon: Building,
    color: 'purple',
    template: {
      title: 'Bank Account Opening Application',
      fields: ['applicantName', 'fatherName', 'address', 'phoneNumber', 'accountType', 'initialDeposit']
    }
  }
];

const fieldLabels: { [key: string]: string } = {
  applicantName: 'Applicant Name',
  complainantName: 'Complainant Name',
  address: 'Address',
  subject: 'Subject',
  informationSought: 'Information Sought',
  reasonForInformation: 'Reason for Information',
  incidentDate: 'Incident Date',
  incidentLocation: 'Incident Location',
  complaintDetails: 'Complaint Details',
  designation: 'Designation/Class',
  leaveType: 'Leave Type',
  fromDate: 'From Date',
  toDate: 'To Date',
  reason: 'Reason',
  fatherName: 'Father\'s Name',
  phoneNumber: 'Phone Number',
  accountType: 'Account Type',
  initialDeposit: 'Initial Deposit Amount'
};

export default function FormCreator() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [generatedForm, setGeneratedForm] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateForm = async () => {
    if (!selectedForm) return;
    
    setIsGenerating(true);
    
    // Simulate form generation
    setTimeout(() => {
      const selectedTemplate = formTypes.find(f => f.id === selectedForm);
      if (selectedTemplate) {
        let formContent = `${selectedTemplate.template.title}\n\n`;
        formContent += `Date: ${new Date().toLocaleDateString()}\n\n`;
        
        selectedTemplate.template.fields.forEach(field => {
          const label = fieldLabels[field];
          const value = formData[field] || '[To be filled]';
          formContent += `${label}: ${value}\n`;
        });
        
        formContent += `\n\nSignature: _________________\n`;
        formContent += `Name: ${formData.applicantName || formData.complainantName || '[Name]'}\n`;
        formContent += `Date: ${new Date().toLocaleDateString()}`;
        
        setGeneratedForm(formContent);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const downloadForm = () => {
    if (!generatedForm) return;
    
    const blob = new Blob([generatedForm], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedForm}_application.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedForm(null);
    setFormData({});
    setGeneratedForm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Form Creator</h1>
          <p className="text-gray-600">Generate official documents and applications instantly</p>
        </div>

        {!selectedForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formTypes.map((form) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedForm(form.id)}
              >
                <div className={`w-12 h-12 bg-${form.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <form.icon className={`h-6 w-6 text-${form.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{form.title}</h3>
                <p className="text-sm text-gray-600">{form.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {selectedForm && !generatedForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Create {formTypes.find(f => f.id === selectedForm)?.title}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {formTypes.find(f => f.id === selectedForm)?.template.fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fieldLabels[field]}
                  </label>
                  {field.includes('Date') ? (
                    <input
                      type="date"
                      value={formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : field.includes('Details') || field.includes('Sought') || field.includes('reason') ? (
                    <textarea
                      value={formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                    />
                  ) : field === 'leaveType' ? (
                    <select
                      value={formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select leave type</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                    </select>
                  ) : field === 'accountType' ? (
                    <select
                      value={formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select account type</option>
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Fixed Deposit">Fixed Deposit</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={generateForm}
                disabled={isGenerating}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    <span>Generate Form</span>
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {generatedForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Form Generated Successfully!</h2>
                    <p className="text-gray-600">Your document is ready for download</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Preview</span>
                </h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded border">
                  {generatedForm}
                </pre>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={downloadForm}
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Form</span>
                </button>
                <button
                  onClick={() => navigator.share && navigator.share({ text: generatedForm })}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Share Form</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Create New
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}