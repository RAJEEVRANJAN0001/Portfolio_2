'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

const certificates: Certificate[] = [
  {
    title: 'AWS Innovate - Every Application Edition',
    issuer: 'Amazon Web Services',
    year: '2022',
    link: '/Certifcate/aws innovate.png'
  },
  {
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    year: '2024',
    link: '/Certifcate/aws-educate-machine-learning-foundations.png'
  },
  {
    title: 'MATLAB Course',
    issuer: 'MathWorks',
    year: '2024',
    link: '/Certifcate/-MATLAB-certificate.pdf'
  }
];

export default function CertificatesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Continuous learning through workshops, courses, and events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-white/90 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl shadow-gray-200/10 dark:shadow-black/10 hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{cert.issuer}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">{cert.year}</p>
                  </div>
                  
                  <div className="mt-6 flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
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
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/certificates">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View All Certificates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
          
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-sm mt-6 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            20+ certificates and learning experiences available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
