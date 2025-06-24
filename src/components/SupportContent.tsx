import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

import { supportTopics } from '../types';

import HeaderComponent from './HeaderComponent';
import UpdateChckerComponent from './UpdateCheckerComponent';
import DiagnosticComponent from './DiagnosticComponent';

const SupportContent: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

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
            <UpdateChckerComponent />

            {/* Diagnostic Submission */}
            <DiagnosticComponent />
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
    </div>
  );
};

export default SupportContent;