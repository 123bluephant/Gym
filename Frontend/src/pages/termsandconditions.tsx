import React, { useState } from 'react';
import { FileText, Shield, CreditCard, Users, Gavel, AlertCircle, CheckCircle, Scale } from 'lucide-react';

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const termsSections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `
        <p>Welcome to FitLife! These Terms of Service ("Terms") govern your access to and use of our fitness platform, including our website, mobile applications, and related services (collectively, the "Service").</p>
        
        <h4>Agreement to Terms</h4>
        <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.</p>
        
        <h4>Eligibility</h4>
        <ul>
          <li>You must be at least 18 years old to use the Service</li>
          <li>You must provide accurate and complete information when creating your account</li>
          <li>You must have the legal capacity to enter into these Terms</li>
          <li>You represent that you are not prohibited from using the Service under applicable law</li>
        </ul>

        <h4>Medical Disclaimer</h4>
        <p><strong>Important:</strong> FitLife is not a medical service. Our content is for informational purposes only. Always consult with healthcare professionals before starting any fitness program, especially if you have medical conditions, are pregnant, or postpartum.</p>
      `
    },
    {
      id: 'user-accounts',
      title: 'User Accounts & Responsibilities',
      icon: Users,
      content: `
        <h4>Account Creation</h4>
        <ul>
          <li>You must create an account to access most features of our Service</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials</li>
          <li>You must notify us immediately of any unauthorized use of your account</li>
          <li>You may only create one account per person</li>
        </ul>

        <h4>User Responsibilities</h4>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your information to keep it accurate</li>
          <li>Use the Service in compliance with all applicable laws and regulations</li>
          <li>Respect other users and maintain appropriate conduct</li>
          <li>Not share your account with others</li>
        </ul>

        <h4>Prohibited Activities</h4>
        <p>You may not:</p>
        <ul>
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Share inappropriate content or spam</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Violate any intellectual property rights</li>
          <li>Impersonate others or provide false information</li>
        </ul>

        <h4>Account Termination</h4>
        <p>We reserve the right to suspend or terminate your account if you violate these Terms or engage in harmful behavior.</p>
      `
    },
    {
      id: 'gym-owner-terms',
      title: 'Gym Owners & Trainers',
      icon: Shield,
      content: `
        <h4>Professional Requirements</h4>
        <p>Gym owners and trainers using our platform must:</p>
        <ul>
          <li>Maintain current and valid certifications</li>
          <li>Provide proof of liability insurance</li>
          <li>Comply with local health and safety regulations</li>
          <li>Maintain professional standards in all client interactions</li>
        </ul>

        <h4>Client Relationships</h4>
        <ul>
          <li>You are solely responsible for the safety and well-being of your clients</li>
          <li>You must obtain proper consent before creating programs for clients</li>
          <li>You must respect client privacy and confidentiality</li>
          <li>You may not discriminate against clients based on protected characteristics</li>
        </ul>

        <h4>Content & Programs</h4>
        <ul>
          <li>You retain ownership of your original content</li>
          <li>You grant us a license to display your content on our platform</li>
          <li>All content must be original or properly licensed</li>
          <li>Content must meet our quality and safety standards</li>
        </ul>

        <h4>Revenue Sharing</h4>
        <p>Our platform fee structure:</p>
        <ul>
          <li>Standard subscription: 15% platform fee on client payments</li>
          <li>Premium subscription: 10% platform fee on client payments</li>
          <li>Enterprise plans: Custom fee structures available</li>
          <li>Payments are processed monthly after client payment confirmation</li>
        </ul>
      `
    },
    {
      id: 'health-data',
      title: 'Health Data & Privacy',
      icon: FileText,
      content: `
        <h4>Health Information Collection</h4>
        <p>We collect health-related information to provide personalized services, including:</p>
        <ul>
          <li>Menstrual cycle and reproductive health data</li>
          <li>Pregnancy and postpartum information</li>
          <li>Fitness goals and medical conditions</li>
          <li>Progress measurements and photos</li>
        </ul>

        <h4>Data Usage & Sharing</h4>
        <ul>
          <li>Health data is used only to provide and improve our services</li>
          <li>We never sell your health information</li>
          <li>Data is shared with your chosen trainers only with explicit consent</li>
          <li>Anonymized data may be used for research and service improvement</li>
        </ul>

        <h4>Data Security</h4>
        <ul>
          <li>All health data is encrypted at rest and in transit</li>
          <li>Access is limited to authorized personnel only</li>
          <li>Regular security audits and updates are performed</li>
          <li>Data breaches are reported immediately to affected users</li>
        </ul>

        <h4>Your Rights</h4>
        <p>You have the right to:</p>
        <ul>
          <li>Access and download your health data</li>
          <li>Correct inaccurate information</li>
          <li>Delete your health data</li>
          <li>Restrict data processing</li>
          <li>Withdraw consent at any time</li>
        </ul>
      `
    },
    {
      id: 'payments',
      title: 'Payments & Subscriptions',
      icon: CreditCard,
      content: `
        <h4>Subscription Plans</h4>
        <p>We offer various subscription plans:</p>
        <ul>
          <li><strong>Basic Plan:</strong> $9.99/month - Essential fitness tracking</li>
          <li><strong>Premium Plan:</strong> $19.99/month - Full access with trainer connections</li>
          <li><strong>Family Plan:</strong> $29.99/month - Up to 4 family members</li>
          <li><strong>Gym Owner Pro:</strong> $49.99/month - Business management tools</li>
        </ul>

        <h4>Payment Terms</h4>
        <ul>
          <li>Subscriptions are billed monthly or annually in advance</li>
          <li>Payment is due on the same day each billing cycle</li>
          <li>We accept major credit cards and PayPal</li>
          <li>Failed payments may result in service suspension</li>
        </ul>

        <h4>Refund Policy</h4>
        <ul>
          <li>30-day money-back guarantee for new subscribers</li>
          <li>Refunds are processed within 5-7 business days</li>
          <li>No refunds for partially used subscription periods</li>
          <li>Special circumstances may be considered on a case-by-case basis</li>
        </ul>

        <h4>Price Changes</h4>
        <p>We may change our pricing with 30 days notice to existing subscribers. You can cancel your subscription if you don't agree to the new pricing.</p>

        <h4>Cancellation</h4>
        <ul>
          <li>You can cancel your subscription at any time</li>
          <li>Cancellation takes effect at the end of your current billing period</li>
          <li>You retain access to paid features until the end of your billing period</li>
          <li>Account data is retained for 90 days after cancellation</li>
        </ul>
      `
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: Scale,
      content: `
        <h4>Our Content</h4>
        <p>The Service and its original content, features, and functionality are owned by FitLife and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

        <h4>User Content</h4>
        <ul>
          <li>You retain ownership of content you create and upload</li>
          <li>You grant us a worldwide, royalty-free license to use your content on our platform</li>
          <li>You represent that you have the right to grant this license</li>
          <li>You are responsible for ensuring your content doesn't infringe on others' rights</li>
        </ul>

        <h4>Trainer & Gym Owner Content</h4>
        <ul>
          <li>Workout programs and educational content remain your intellectual property</li>
          <li>We may feature your content in marketing materials with your permission</li>
          <li>You may remove your content at any time</li>
          <li>Content must be original or properly licensed</li>
        </ul>

        <h4>Prohibited Uses</h4>
        <p>You may not:</p>
        <ul>
          <li>Copy, modify, or distribute our content without permission</li>
          <li>Use our trademarks without authorization</li>
          <li>Reverse engineer or attempt to extract our source code</li>
          <li>Create derivative works based on our Service</li>
        </ul>

        <h4>DMCA Policy</h4>
        <p>We respond to valid DMCA takedown notices. If you believe your copyrighted work has been infringed, please contact our designated DMCA agent at dmca@fitlife.com.</p>
      `
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers & Limitations',
      icon: AlertCircle,
      content: `
        <h4>Service Availability</h4>
        <ul>
          <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
          <li>Scheduled maintenance may temporarily affect service availability</li>
          <li>We are not liable for service interruptions beyond our control</li>
        </ul>

        <h4>Health & Fitness Disclaimers</h4>
        <ul>
          <li>Our Service is not a substitute for professional medical advice</li>
          <li>Always consult healthcare providers before starting new fitness programs</li>
          <li>Exercise carries inherent risks - participate at your own risk</li>
          <li>Results may vary and are not guaranteed</li>
          <li>Stop exercising and consult a doctor if you experience pain or discomfort</li>
        </ul>

        <h4>Third-Party Services</h4>
        <ul>
          <li>We integrate with third-party services for enhanced functionality</li>
          <li>We are not responsible for third-party service failures or data breaches</li>
          <li>Third-party terms and privacy policies apply to their services</li>
        </ul>

        <h4>Limitation of Liability</h4>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, FITLIFE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>

        <h4>Indemnification</h4>
        <p>You agree to defend, indemnify, and hold harmless FitLife from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.</p>
      `
    },
    {
      id: 'termination',
      title: 'Termination & Governing Law',
      icon: Gavel,
      content: `
        <h4>Termination by You</h4>
        <ul>
          <li>You may terminate your account at any time through your account settings</li>
          <li>Termination is effective immediately</li>
          <li>You remain liable for all charges incurred prior to termination</li>
          <li>Some provisions of these Terms survive termination</li>
        </ul>

        <h4>Termination by Us</h4>
        <p>We may terminate or suspend your account immediately if you:</p>
        <ul>
          <li>Violate these Terms of Service</li>
          <li>Engage in harmful or illegal activities</li>
          <li>Fail to pay subscription fees</li>
          <li>Create multiple accounts to evade restrictions</li>
        </ul>

        <h4>Effect of Termination</h4>
        <ul>
          <li>Your right to use the Service ends immediately</li>
          <li>We may delete your account and data</li>
          <li>Outstanding obligations remain in effect</li>
          <li>You may request data export before termination</li>
        </ul>

        <h4>Governing Law</h4>
        <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>

        <h4>Dispute Resolution</h4>
        <ul>
          <li>Most disputes can be resolved through our customer service team</li>
          <li>For legal disputes, we prefer binding arbitration</li>
          <li>You may opt out of arbitration by notifying us within 30 days</li>
          <li>California residents have additional rights under state law</li>
        </ul>

        <h4>Changes to Terms</h4>
        <p>We may modify these Terms at any time. We will notify users of material changes via email or platform notification. Continued use after changes constitutes acceptance of new terms.</p>
      `
    }
  ];

  const quickSummary = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your health data is protected with bank-level security and never sold to third parties.'
    },
    {
      icon: Users,
      title: 'Professional Standards',
      description: 'All trainers must maintain certifications and follow strict professional guidelines.'
    },
    {
      icon: CreditCard,
      title: 'Fair Pricing',
      description: '30-day money-back guarantee and transparent pricing with no hidden fees.'
    },
    {
      icon: Scale,
      title: 'Your Rights Protected',
      description: 'You own your content and data, with full control over privacy settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">
              Clear, fair terms that protect both you and our community
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
        {/* Quick Summary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickSummary.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Complete Terms of Service</h2>
            <p className="text-gray-600 mt-2">
              Click on any section below to read the full terms. We've written them in plain English to make them easy to understand.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {termsSections.map((section) => {
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
            <Scale className="w-8 h-8 text-pink-200 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Questions About These Terms?</h3>
              <p className="text-pink-100 mb-4">
                Our legal team is available to clarify any questions you may have about these terms or your rights and obligations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:legal@fitlife.com"
                  className="bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors text-center"
                >
                  Contact Legal Team
                </a>
                <a 
                  href="/help-center"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-pink-600 transition-colors text-center"
                >
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Legal Notice</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                By using FitLife's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                These terms constitute a legally binding agreement between you and FitLife. If you do not agree to these terms, 
                please do not use our services. For questions about specific legal requirements in your jurisdiction, 
                please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;