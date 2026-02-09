import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    {
      title: 'Applied Machine Learning in Python',
      issuer: 'Coursera',
      year: '2023',
      description: 'Course on ML algorithms, data preprocessing, and model evaluation using Python.',
      skills: ['Python', 'Scikit-learn', 'Data Analysis'],
    },
    {
      title: 'Blockchain Developer',
      issuer: 'IBM Cognitive Class',
      year: '2025',
      description: 'Blockchain development, DLT and smart contracts.',
      skills: ['Blockchain', 'Smart Contracts'],
    },
    {
      title: 'Generative AI using IBM Watsonx',
      issuer: 'IBM Cognitive Class',
      year: '2025',
      description: 'Generative AI models and enterprise solutions.',
      skills: ['Generative AI', 'Prompt Engineering'],
    },
    {
      title: '2nd Place - Robotics and Coding Workshop',
      issuer: 'VIT Bhopal',
      year: '2024',
      description: 'Secured 2nd place in competitive robotics and coding workshop.',
      skills: ['Robotics', 'Programming'],
    },
  ];

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Achievements</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Verified certifications and notable achievements in AI, ML and software engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/95 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-gray-200/20 dark:shadow-black/10 hover:shadow-xl hover:shadow-cyan-100/20 dark:hover:shadow-black/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/20 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-cyan-100/30 dark:shadow-none">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{cert.issuer}</span>
                    <span>•</span>
                    <span>{cert.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((s) => (
                      <span key={s} className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-gray-700/60 text-gray-600 dark:text-gray-200 rounded-lg font-medium border border-gray-200/60 dark:border-gray-600/40 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a 
            href="/resume.pdf" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
