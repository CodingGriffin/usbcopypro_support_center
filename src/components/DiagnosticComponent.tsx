import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, AlertCircle, Loader2, Bug, Send, User, Mail, Phone, MapPin, FileText, X } from 'lucide-react';

import actions from "../states/UsbCopyUpdates/actions";
import { supportTopics } from '../types';

interface DiagnosticFormData {
	name: string;
	email: string;
	telephone: string;
	driveSource: string;
	description: string;
  redScreen: string;
  supportCode: string;
	supportTopics: string[];
}

const DiagnosticComponent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error
  } = useSelector((state: any) => state.usbcopyUpdates);
  
	const [diagnosticStatus, setDiagnosticStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | null>(null);
	const [showDiagnosticForm, setShowDiagnosticForm] = useState(false);
  const [redScreenVisible, setRedScreenVisible] = useState(false);
  const [supportCodeOption, setSupportCodeOption] = useState('');
  const [supportCode, setSupportCode] = useState('');
	const [diagnosticForm, setDiagnosticForm] = useState<DiagnosticFormData>({
    name: '',
    email: '',
    telephone: '',
    driveSource: '',
    description: '',
    redScreen: '',
    supportCode: '',
    supportTopics: []
  });
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
    	const url = new URL(window.location.href);
      const jobNum = url.searchParams.get('j');
      const verNum = url.searchParams.get('v');
      const vid = url.searchParams.get('vid');
      const pid = url.searchParams.get('pid');
      const serialNumber = url.searchParams.get('support_code');
      const os = url.searchParams.get('os');
    
      console.log('Diagnostic data that would be sent:', diagnosticData);
      dispatch({
        type: actions.ADD_DIAGNOSTIC,
        payload: {
          mode: "insertDiagnostic",
          ver_num: verNum,
          job_num: jobNum,
          os_type: os,
          name: diagnosticData.name,
          email: diagnosticData.email,
          phone_num: diagnosticData.telephone,
          browser_info: diagnosticData.userAgent,
          drive_source: diagnosticData.driveSource,
          vid: vid,
          pid: pid,
          serial_number: serialNumber,
          issue_description: diagnosticData.description,
          issue_option: diagnosticData.supportTopics.join(', '),
          red_screen: diagnosticData.redScreen,
          support_code: diagnosticData.supportCode
        }
      });
      // Simulate random success/failure
      
      if (!loading) {
        setDiagnosticStatus('sent');
        setShowDiagnosticForm(false);
        // Reset form
        setDiagnosticForm({
          name: '',
          email: '',
          telephone: '',
          driveSource: '',
          description: '',
          redScreen: '',
          supportCode: '',
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

  const handleSupportTopicToggle = (topicId: string) => {
    setDiagnosticForm(prev => ({
      ...prev,
      supportTopics: prev.supportTopics.includes(topicId)
        ? prev.supportTopics.filter(id => id !== topicId)
        : [...prev.supportTopics, topicId]
    }));
  };

  const handleRedScreenToggle = () => {
    setRedScreenVisible(!redScreenVisible);
    if (redScreenVisible) {
      setSupportCodeOption('');
      setSupportCode('');
    }
  };

  const handleSupportCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 32) {
      setDiagnosticForm(prev => ({ ...prev, supportCode: value }))
      setSupportCode(value);
    }
  };

  const handleSupportCodeOptionChange = (option: string) => {
    setSupportCodeOption(option);
    if (option !== 'support-code-seen') {
      setSupportCode('');
    }
  };

	return (
		<>
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
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
                  <input
                    type=""
                    id="driveSource"
                    value={diagnosticForm.driveSource}
                    onChange={(e) => setDiagnosticForm(prev => ({ ...prev, driveSource: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Enter the source"
                  />
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
                        <>
                          {topic.title != 'If none of these steps help' &&
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
                          </label>}
                          {(diagnosticForm.supportTopics.includes('app-opens-cannot-continue') && topic.id == 'app-opens-cannot-continue') &&
                            <div className="ml-8 space-y-4">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className={`w-4 h-4 border-2 rounded cursor-pointer transition-all ${
                                    redScreenVisible 
                                      ? 'bg-blue-500 border-blue-500' 
                                      : 'border-gray-500 hover:border-blue-400'
                                  }`}
                                  onClick={handleRedScreenToggle}
                                >
                                  {redScreenVisible && (
                                    <svg className="w-2 h-2 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-gray-400 text-sm">Do you see a red screen?</span>
                              </div>

                              {/* Support code radio options */}
                              {redScreenVisible && (
                                <div className="ml-6 space-y-3 p-4 bg-gray-700 rounded-lg border border-gray-600">
                                  <h3 className="text-sm font-medium text-gray-200 mb-3">Any messages from the code:</h3>
                                  
                                  {[
                                    { value: 'no-support-code', label: 'No Support Code' },
                                    { value: 'no-drives-found', label: 'No Drives Found' },
                                    { value: 'support-code-seen', label: 'I see a Support Code' }
                                  ].map((option) => (
                                    <div key={option.value} className="flex items-center space-x-3">
                                      <div 
                                        className={`w-4 h-4 border-2 rounded-full cursor-pointer transition-all ${
                                          supportCodeOption === option.value 
                                            ? 'bg-blue-500 border-blue-500' 
                                            : 'border-gray-500 hover:border-blue-400'
                                        }`}
                                        onClick={() => {handleSupportCodeOptionChange(option.value); setDiagnosticForm(prev => ({ ...prev, redScreen: option.label }))} }
                                      >
                                        {supportCodeOption === option.value && (
                                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                        )}
                                      </div>
                                      <span className="text-sm text-gray-300">{option.label}</span>
                                    </div>
                                  ))}

                                  {/* Support code input */}
                                  {supportCodeOption === 'support-code-seen' && (
                                    <div className="mt-4 space-y-2">
                                      <label className="block text-sm font-medium text-gray-200">
                                        Enter Support Code:
                                      </label>
                                      <input
                                        type="text"
                                        value={supportCode}
                                        onChange={handleSupportCodeChange}
                                        placeholder="Enter support code (max 32 characters)"
                                        maxLength={32}
                                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <div className="text-xs text-gray-400 text-right">
                                        {supportCode.length}/32 characters
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          }
                        </>
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
		</>
	)
}

export default DiagnosticComponent