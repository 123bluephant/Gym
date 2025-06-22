import React, { useState } from 'react';
import { Shield, Eye, Lock, Users, Database, Globe, CheckCircle, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const privacySections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: `
        <h4>Personal Information</h4>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Account information (name, email, phone number)</li>
          <li>Profile information (age, fitness goals, health conditions)</li>
          <li>Payment information (processed securely through encrypted channels)</li>
          <li>Communication data (messages, support tickets)</li>
        </ul>

        <h4>Health & Fitness Data</h4>
        <p>For women's health features, we may collect:</p>
        <ul>
          <li>Menstrual cycle information</li>
          <li>Pregnancy and postpartum data</li>
          <li>Workout preferences and history</li>
          <li>Body measurements and progress photos (with explicit consent)</li>
        </ul>

        <h4>Gym Owner Data</h4>
        <p>For gym owners and trainers, we collect:</p>
        <ul>
          <li>Business information and certifications</li>
          <li>Client management data</li>
          <li>Training programs and content</li>
          <li>Revenue and analytics data</li>
        </ul>
      `
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: Eye,
      content: `
        <h4>Core Services</h4>
        <ul>
          <li>Provide personalized workout and nutrition plans</li>
          <li>Track your fitness progress and menstrual health</li>
          <li>Connect you with certified trainers and gym owners</li>
          <li>Process payments and manage subscriptions</li>
        </ul>

        <h4>Communication</h4>
        <ul>
          <li>Send service updates and important notifications</li>
          <li>Provide customer support and technical assistance</li>
          <li>Share educational content and health tips</li>
          <li>Notify you about new features and improvements</li>
        </ul>

        <h4>Analytics & Improvement</h4>
        <ul>
          <li>Analyze usage patterns to improve our platform</li>
          <li>Conduct research to enhance women's health features</li>
          <li>Develop new services based on user needs</li>
          <li>Ensure platform security and prevent fraud</li>
        </ul>
      `
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing & Disclosure',
      icon: Users,
      content: `
        <h4>We DO NOT sell your personal information.</h4>
        
        <h4>Authorized Sharing</h4>
        <p>We may share your information only in these circumstances:</p>
        <ul>
          <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
          <li><strong>Service Providers:</strong> Trusted partners who help operate our platform</li>
          <li><strong>Gym Owners/Trainers:</strong> Only data necessary for providing services</li>
          <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
        </ul>

        <h4>Health Data Protection</h4>
        <p>Your menstrual cycle, pregnancy, and health data receive special protection:</p>
        <ul>
          <li>Encrypted at rest and in transit</li>
          <li>Access limited to essential personnel only</li>
          <li>Never shared with third parties without explicit consent</li>
          <li>Anonymized for research purposes only</li>
        </ul>
      `
    },
    {
      id: 'data-security',
      title: 'Data Security & Protection',
      icon: Lock,
      content: `
        <h4>Security Measures</h4>
        <ul>
          <li><strong>Encryption:</strong> All data encrypted using industry-standard protocols</li>
          <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
          <li><strong>Regular Audits:</strong> Quarterly security assessments and penetration testing</li>
          <li><strong>Secure Hosting:</strong> Infrastructure hosted on SOC 2 compliant servers</li>
        </ul>

        <h4>Data Retention</h4>
        <ul>
          <li>Account data: Retained while your account is active</li>
          <li>Health data: Deleted within 30 days of account closure</li>
          <li>Payment data: Retained per legal requirements (typically 7 years)</li>
          <li>Analytics data: Anonymized and aggregated for research</li>
        </ul>

        <h4>Breach Notification</h4>
        <p>In the unlikely event of a data breach, we will:</p>
        <ul>
          <li>Notify affected users within 72 hours</li>
          <li>Report to relevant authorities as required</li>
          <li>Provide detailed information about the incident</li>
          <li>Offer credit monitoring if financial data is involved</li>
        </ul>
      `
    },
    {
      id: 'user-rights',
      title: 'Your Rights & Choices',
      icon: CheckCircle,
      content: `
        <h4>Data Rights</h4>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correct:</strong> Update inaccurate or incomplete information</li>
          <li><strong>Delete:</strong> Request deletion of your personal data</li>
          <li><strong>Port:</strong> Export your data in a readable format</li>
          <li><strong>Restrict:</strong> Limit how we process your data</li>
          <li><strong>Object:</strong> Opt out of certain data processing activities</li>
        </ul>

        <h4>Privacy Controls</h4>
        <ul>
          <li>Granular privacy settings in your account dashboard</li>
          <li>Opt-out options for marketing communications</li>
          <li>Visibility controls for community features</li>
          <li>Data sharing preferences with trainers and gym owners</li>
        </ul>

        <h4>Exercising Your Rights</h4>
        <p>To exercise any of these rights:</p>
        <ul>
          <li>Visit your account settings page</li>
          <li>Contact our privacy team at privacy@fitlife.com</li>
          <li>Call our privacy hotline: 1-800-FIT-LIFE</li>
          <li>Submit a request through our online form</li>
        </ul>
      `
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies & Tracking Technologies',
      icon: Globe,
      content: `
        <h4>Types of Cookies We Use</h4>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
          <li><strong>Performance Cookies:</strong> Help us improve our service</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences</li>
          <li><strong>Analytics Cookies:</strong> Understand how you use our platform</li>
        </ul>

        <h4>Third-Party Services</h4>
        <p>We use select third-party services that may collect data:</p>
        <ul>
          <li>Google Analytics (website usage analysis)</li>
          <li>Stripe (payment processing)</li>
          <li>Intercom (customer support chat)</li>
          <li>Mailchimp (email communications)</li>
        </ul>

        <h4>Managing Cookies</h4>
        <ul>
          <li>Use our cookie preference center</li>
          <li>Adjust your browser settings</li>
          <li>Opt out of analytics tracking</li>
          <li>Disable non-essential cookies</li>
        </ul>
      `
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: 'Your Privacy is Our Priority',
      description: 'We never sell your personal information and use bank-level encryption to protect your data.'
    },
    {
      icon: Lock,
      title: 'Secure Health Data',
      description: 'Your menstrual cycle and pregnancy data receive special protection with restricted access.'
    },
    {
      icon: CheckCircle,
      title: 'You\'re in Control',
      description: 'Comprehensive privacy controls let you decide what to share and with whom.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Your privacy and data security are fundamental to everything we do
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>Last updated: January 15, 2025</span>
              <span>•</span>
              <span>Effective: January 15, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            );
          })}
        </div>

        {/* Privacy Policy Sections */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Complete Privacy Policy</h2>
            <p className="text-gray-600 mt-2">
              Click on any section below to learn more about how we protect and handle your information.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {privacySections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <div key={section.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Icon className="w-6 h-6 text-pink-600" />
                      <span className="text-lg font-semibold text-gray-900">{section.title}</span>
                    </div>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div 
                        className="prose prose-pink max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-8 text-white">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-pink-200 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Questions About Your Privacy?</h3>
              <p className="text-pink-100 mb-4">
                Our privacy team is here to help. Contact us with any questions or concerns about how we handle your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:privacy@fitlife.com"
                  className="bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors text-center"
                >
                  Email Privacy Team
                </a>
                <a 
                  href="tel:1-800-348-5433"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-pink-600 transition-colors text-center"
                >
                  Call 1-800-FIT-LIFE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Legal Information */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">International Users</h4>
              <p>
                Users outside the United States: Your data may be transferred to and processed in the United States. 
                We ensure adequate protection through appropriate safeguards.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Children's Privacy</h4>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect personal information 
                from children under 13 years of age.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Changes to This Policy</h4>
              <p>
                We may update this policy from time to time. We will notify you of any material changes 
                via email or through our platform.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">California Privacy Rights</h4>
              <p>
                California residents have additional rights under CCPA. Contact us for more information 
                about your specific rights and how to exercise them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;