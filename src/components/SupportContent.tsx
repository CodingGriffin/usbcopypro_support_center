import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Loader2, ChevronRight, ChevronDown, Bug, Send, User, Mail, Phone, MapPin, FileText, X, Monitor, Triangle, Circle } from 'lucide-react';

import HeaderComponent from './HeaderComponent';

interface DiagnosticFormData {
  name: string;
  email: string;
  telephone: string;
  driveSource: string;
  description: string;
  supportTopics: string[];
}

const SupportContent: React.FC = () => {
  const [updateStatus, setUpdateStatus] = useState<'checking' | 'available' | 'up-to-date' | null>(null);
  const [diagnosticStatus, setDiagnosticStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [showDiagnosticForm, setShowDiagnosticForm] = useState(false);
  const [diagnosticForm, setDiagnosticForm] = useState<DiagnosticFormData>({
    name: '',
    email: '',
    telephone: '',
    driveSource: '',
    description: '',
    supportTopics: []
  });

  const supportTopics = [
    {
      id: 'app-opens-cannot-continue',
      title: 'App opens initially, but cannot continue',
      shortTitle: 'App opens but cannot continue',
      icon: Monitor,
      description: 'Issues when the app starts but encounters problems',
      sections: [
        {
          title: 'App opens, shows an immediate error',
          content: [
            'Please check for updates. If there are no updates available, please send a diagnostic to the manufacturer, as they may be able to provide an update.'
          ]
        },
        {
          title: 'Red Screen',
          content: [
            'A valid USB drive purchased from the company where this software was developed must be used to access the data contained.',
            'If you are certain that the USB drive is securely plugged into a working USB port, and the USB drive fully initiated and is visible on your computer:',
            'If the red screen still appears then the drive may be faulty or damaged:',
            'Check for updates.',
            'Send a diagnostic report to the manufacturer, they may be able to provide an update quickly.',
            'If none of these steps help you open the app, please contact the company where you got the drive, report your support code and request a software update.'
          ]
        }
      ]
    },
    {
      id: 'app-never-opens',
      title: 'App never opens',
      shortTitle: 'App never opens',
      icon: Triangle,
      description: 'When the app fails to start at all',
      sections: [
        {
          title: 'If you see an error as soon as you try to open the app',
          content: [
            'Make sure the drive is fully connected and showing up on your computer.',
            'If it still doesn\'t work, try it on another computer.',
            'If the app continues to fail, please contact the company where you got the drive.'
          ]
        },
        {
          title: 'If your computer has antivirus/security software or you\'re using a work/corporate computer',
          content: [
            'Antivirus or security software may be blocking the app. You can check if the app was blocked and ask your IT person or department for help.',
            'Work or corporate computers may not allow access to USB drives or update servers. Try using the drive on a different computer, such as a personal laptop.',
            'The drive is write-protected to prevent these systems from changing or deleting its contents.'
          ]
        }
      ]
    },
    {
      id: 'none-of-these-help',
      title: 'If none of these steps help',
      shortTitle: 'None of these steps help',
      icon: Circle,
      description: 'Additional support options when other solutions don\'t work',
      sections: [
        {
          title: 'Additional Support Steps',
          content: [
            'If no updates are available, please send a diagnostic report to the manufacturer.',
            'Then, contact the company where you got the drive and let them know about your experience.'
          ]
        }
      ]
    }
  ];

  const checkForUpdates = async () => {
    setUpdateStatus('checking');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly show updates available or up-to-date
    const hasUpdates = Math.random() > 0.5;
    setUpdateStatus(hasUpdates ? 'available' : 'up-to-date');
  };

  const handleSupportTopicToggle = (topicId: string) => {
    setDiagnosticForm(prev => ({
      ...prev,
      supportTopics: prev.supportTopics.includes(topicId)
        ? prev.supportTopics.filter(id => id !== topicId)
        : [...prev.supportTopics, topicId]
    }));
  };

  const handleDiagnosticFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiagnosticStatus('sending');
    
    try {
      // Collect system diagnostic data along with form data
      const diagnosticData = {
        ...diagnosticForm,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        performance: {
          memory: (performance as any).memory ? {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize
          } : null,
          timing: performance.timing ? {
            loadEventEnd: performance.timing.loadEventEnd,
            navigationStart: performance.timing.navigationStart
          } : null
        }
      };

      // Simulate API call to diagnostic endpoint
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log('Diagnostic data that would be sent:', diagnosticData);
      
      // Simulate random success/failure
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        setDiagnosticStatus('sent');
        setShowDiagnosticForm(false);
        // Reset form
        setDiagnosticForm({
          name: '',
          email: '',
          telephone: '',
          driveSource: '',
          description: '',
          supportTopics: []
        });
      } else {
        setDiagnosticStatus('error');
      }
    } catch (error) {
      console.error('Failed to send diagnostic:', error);
      setDiagnosticStatus('error');
    }
  };

  const openUpdateWindow = () => {
    window.open('/updates', '_blank');
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <HeaderComponent />
        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Update Checker */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Updates</h3>
                <Download size={24} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              </div>
              
              {updateStatus === null && (
                <button
                  onClick={checkForUpdates}
                  className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Check for Updates
                </button>
              )}
              
              {updateStatus === 'checking' && (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="animate-spin mr-2 text-gray-600 dark:text-gray-300" size={20} />
                  <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Checking...</span>
                </div>
              )}
              
              {updateStatus === 'available' && (
                <div className="space-y-3">
                  <div className="flex items-center text-green-600 dark:text-green-400 transition-colors duration-300">
                    <CheckCircle size={20} className="mr-2" />
                    <span>Updates available!</span>
                  </div>
                  <button
                    onClick={openUpdateWindow}
                    className="w-full bg-green-500 dark:bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 flex items-center justify-center font-medium"
                  >
                    View Updates
                    <Download size={16} className="ml-2" />
                  </button>
                </div>
              )}
              
              {updateStatus === 'up-to-date' && (
                <div className="flex items-center text-gray-600 dark:text-gray-300 py-2 transition-colors duration-300">
                  <CheckCircle size={20} className="mr-2" />
                  <span>You're up to date!</span>
                </div>
              )}
            </div>

            {/* Diagnostic Submission */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Diagnostics</h3>
                <Bug size={24} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              </div>
              
              {diagnosticStatus === null && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Send system information to help us troubleshoot issues</p>
                  <button
                    onClick={() => setShowDiagnosticForm(true)}
                    className="w-full bg-purple-500 dark:bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center font-medium"
                  >
                    Send Diagnostic
                    <Send size={16} className="ml-2" />
                  </button>
                </div>
              )}
              
              {diagnosticStatus === 'sending' && (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="animate-spin mr-2 text-gray-600 dark:text-gray-300" size={20} />
                  <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Sending...</span>
                </div>
              )}
              
              {diagnosticStatus === 'sent' && (
                <div className="space-y-3">
                  <div className="flex items-center text-green-600 dark:text-green-400 transition-colors duration-300">
                    <CheckCircle size={20} className="mr-2" />
                    <span>Diagnostic sent successfully!</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Thank you for helping us improve the system</p>
                  <button
                    onClick={() => setDiagnosticStatus(null)}
                    className="w-full bg-gray-500 dark:bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Send Another
                  </button>
                </div>
              )}
              
              {diagnosticStatus === 'error' && (
                <div className="space-y-3">
                  <div className="flex items-center text-red-600 dark:text-red-400 transition-colors duration-300">
                    <AlertCircle size={20} className="mr-2" />
                    <span>Failed to send diagnostic</span>
                  </div>
                  <button
                    onClick={() => setShowDiagnosticForm(true)}
                    className="w-full bg-red-500 dark:bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Support Topics */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Support Topics</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">Find solutions to common drive application issues</p>
              </div>
              
              <div className="space-y-4">
                {supportTopics.map((topic) => {
                  const Icon = topic.icon;
                  const isExpanded = expandedTopic === topic.id;
                  
                  return (
                    <div key={topic.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300">
                              <Icon size={24} className="text-red-600 dark:text-red-400 transition-colors duration-300" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{topic.title}</h3>
                              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{topic.description}</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isExpanded ? (
                              <ChevronDown size={24} className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                            ) : (
                              <ChevronRight size={24} className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-6 animate-in slide-in-from-top-2 duration-200 transition-colors">
                          <div className="space-y-6">
                            {topic.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center transition-colors duration-300">
                                  <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 transition-colors duration-300">
                                    <span className="text-red-600 dark:text-red-400 font-bold text-sm transition-colors duration-300">{sectionIndex + 1}</span>
                                  </div>
                                  {section.title}
                                </h4>
                                <div className="ml-9 space-y-2">
                                  {section.content.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-start">
                                      <div className="w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300"></div>
                                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{item}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Form Modal */}
      {showDiagnosticForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowDiagnosticForm(false)}
          />
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500 max-h-[80vh] overflow-hidden transition-colors duration-300">
            {/* Form Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 transition-colors duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Send Diagnostic Report</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Help us troubleshoot your issue</p>
              </div>
              <button
                onClick={() => setShowDiagnosticForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <form onSubmit={handleDiagnosticFormSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    <User size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={diagnosticForm.name}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    <Mail size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={diagnosticForm.email}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Telephone Field */}
                <div>
                  <label htmlFor="telephone" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    <Phone size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    value={diagnosticForm.telephone}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, telephone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Drive Source Field */}
                <div>
                  <label htmlFor="driveSource" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    <MapPin size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Where did you obtain the drive? *
                  </label>
                  <select
                    id="driveSource"
                    required
                    value={diagnosticForm.driveSource}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, driveSource: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  >
                    <option value="">Select source...</option>
                    <option value="official-website">Official Website</option>
                    <option value="retail-store">Retail Store</option>
                    <option value="online-marketplace">Online Marketplace</option>
                    <option value="colleague-friend">Colleague/Friend</option>
                    <option value="company-distribution">Company Distribution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    <FileText size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Issue Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={diagnosticForm.description}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Please describe the issue you're experiencing in detail..."
                  />
                </div>

                {/* Support Topics Checkboxes */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                    <CheckCircle size={16} className="mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                    Which of these issues are you experiencing? (Optional)
                  </label>
                  <div className="space-y-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors duration-300">
                    {supportTopics.map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <label key={topic.id} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={diagnosticForm.supportTopics.includes(topic.id)}
                            onChange={() => handleSupportTopicToggle(topic.id)}
                            className="w-4 h-4 text-purple-600 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-2 transition-colors duration-300"
                          />
                          <div className="ml-3 flex items-center">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors duration-200">
                              <Icon size={16} className="text-red-600 dark:text-red-400 transition-colors duration-300" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
                              {topic.shortTitle}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <button
                    type="button"
                    onClick={() => setShowDiagnosticForm(false)}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={diagnosticStatus === 'sending'}
                    className="px-6 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {diagnosticStatus === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={16} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Report
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportContent;