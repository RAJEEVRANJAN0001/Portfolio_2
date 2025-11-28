'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  category: string;
  link?: string;
}

const allCertificates: Certificate[] = [
  {
    title: 'AWS Innovate - Every Application Edition',
    issuer: 'Amazon Web Services',
    year: '2022',
    category: 'Cloud & AI',
    link: '/Certifcate/aws innovate.png'
  },
  {
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    year: '2024',
    category: 'Cloud & AI',
    link: '/Certifcate/aws-educate-machine-learning-foundations.png'
  },
  {
    title: 'Microsoft Learn Course - AI Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    category: 'AI & ML',
    link: '/Certifcate/Achievements - rajeevranjanpratapsingh-0607 _ Microsoft Learn.pdf'
  },
  {
    title: 'MATLAB Programming Course',
    issuer: 'MathWorks',
    year: '2024',
    category: 'Programming',
    link: '/Certifcate/-MATLAB-certificate.pdf'
  },
  {
    title: 'Artificial Intelligence Foundations - Neural Networks',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'AI & ML',
    link: '/Certifcate/CertificateOfCompletion_Artificial Intelligence Foundations Neural Networks.pdf'
  },
  {
    title: 'Game Development using PyGame',
    issuer: 'GUVI',
    year: '2023',
    category: 'Programming',
    link: '/Certifcate/GuviCertification - A0516nNCiw91901W76.png'
  },
  {
    title: 'Communication Foundations',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_Communication Foundations.pdf'
  },
  {
    title: 'Communication Foundations - Advanced',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_Communication Foundations-2.pdf'
  },
  {
    title: 'Microsoft Bot Framework Development - Part 1',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Development',
    link: '/Certifcate/CertificateOfCompletion_Creating Bots with the Microsoft Bot Framework Part 1.pdf'
  },
  {
    title: 'Time Management & Life Organization',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_How to Organize Your Time and Your Life.pdf'
  },
  {
    title: 'TCS Virtual Internship Program (on platform Forage)',
    issuer: 'Tata Consultancy Services',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/N8Muuhk6XsXgMTeu2_Tata Consultancy Services_fPXEHqCz5evS8ekFm_1690914604330_completion_certificate.pdf'
  },
  {
    title: 'KPMG Virtual Internship (on platform Forage)',
    issuer: 'KPMG Australia',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/m7W4GMqeT3bh9Nb2c_KPMG AU_fPXEHqCz5evS8ekFm_1690923504201_completion_certificate.pdf'
  },
  {
    title: 'Walmart USA Virtual Experience (on platform Forage)',
    issuer: 'Walmart',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/Walmart USA_completion_certificate.pdf'
  },
  {
    title: 'Crowdsource Learning Community Program',
    issuer: 'Google',
    year: '2023',
    category: 'Community Learning',
    link: '/Certifcate/Crowdsource Learning Community Program completion certificate.pdf'
  },
  {
    title: 'GITEX Global 2022 - Digital Universe Badge',
    issuer: 'GITEX',
    year: '2022',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/GITEX22DU_Badge_2295104532 (1).pdf'
  },
  {
    title: 'Programming Workshop Certificate',
    issuer: 'Workshop Provider',
    year: '2023',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/certificate.jpg'
  },
  {
    title: 'Specialized Course Certificate',
    issuer: 'Specialized Training Center',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/Rajeev.pdf'
  },
  {
    title: 'Workshop Participation Certificate',
    issuer: 'Workshop Organizer',
    year: '2022',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/Screenshot_2022-10-12-07-39-30-14_e307a3f9df9f380ebaf106e1dc980bb6.jpg'
  },
  {
    title: 'Technical Training Completion',
    issuer: 'Training Institute',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/Rajeev_singh_2858406.pdf'
  },
  {
    title: 'Online Course Completion - Technical Skills',
    issuer: 'Udemy',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/UC-3a78146d-5dcd-43d0-8ff4-c205412ac802.pdf'
  }
];

const categories = ['All', 'AI & ML', 'Programming', 'Cloud & AI', 'Soft Skills', 'Development', 'Industry Experience', 'Community Learning', 'Events & Workshops & Conference', 'Technical Skills'];

export default function CertificatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isDark } = useTheme();

  const filteredCertificates = selectedCategory === 'All' 
    ? allCertificates 
    : allCertificates.filter(cert => cert.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Learning Journey - Rajeev Ranjan Pratap Singh</title>
        <meta name="description" content="Complete collection of courses, workshops, and learning experiences" />
      </Head>
      
      <div className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Link href="/" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors mb-8 group">
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Journey</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Comprehensive collection of courses, workshops, internships, and learning experiences
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 h-full group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          cert.category === 'AI & ML' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' :
                          cert.category === 'Programming' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' :
                          cert.category === 'Cloud & AI' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                          cert.category === 'Soft Skills' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300' :
                          cert.category === 'Development' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' :
                          cert.category === 'Industry Experience' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300' :
                          cert.category === 'Community Learning' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300' :
                          cert.category === 'Events & Workshops & Conference' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300' :
                          cert.category === 'Technical Skills' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300' :
                          'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300'
                        }`}>
                          {cert.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{cert.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{cert.issuer}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                      <span>View Certificate</span>
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-1">{allCertificates.length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Certificates</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-1">{categories.length - 1}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Categories</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-1">2022-2024</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Time Period</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-1">Ongoing</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Learning Status</div>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
