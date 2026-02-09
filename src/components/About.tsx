import { motion } from 'framer-motion';

export default function About() {
  const timeline = [
    {
      year: '2025',
      title: 'Advanced AI Certifications',
      desc: 'Completed Generative AI using IBM Watsonx and Blockchain Developer certifications.',
    },
    {
      year: '2024',
      title: 'Brain Tumor Detection Project',
      desc: 'Built DL pipeline using ResNet & DenseNet achieving very high accuracy.',
    },
    {
      year: '2023',
      title: 'Emotion Detection System',
      desc: 'Real-time emotion recognition with CNNs and optimized latency.',
    },
    {
      year: '2022',
      title: 'VIT Bhopal University',
      desc: 'B.Tech in Computer Science & Engineering (AI&ML).',
    },
  ];

  const skills = [
    { name: 'Python', level: 95 },
    { name: 'TensorFlow', level: 92 },
    { name: 'Keras', level: 90 },
    { name: 'Deep Learning', level: 88 },
    { name: 'Computer Vision', level: 85 },
    { name: 'OpenCV', level: 83 },
    { name: 'ResNet/DenseNet', level: 82 },
    { name: 'CNNs', level: 85 },
    { name: 'NumPy', level: 90 },
    { name: 'Pandas', level: 88 },
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 65 },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-400/8 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-cyan-400/8 dark:bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Passionate about leveraging AI to solve real-world problems
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/40 bg-white/90 dark:bg-gray-800/40 backdrop-blur-xl shadow-xl shadow-gray-300/15 dark:shadow-black/20 relative overflow-hidden group hover:border-cyan-500/40 dark:hover:border-cyan-500/30 hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                AI & ML Developer
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                I'm a Machine Learning Engineer from Dehri, Bihar, specializing in Computer Vision and Deep Learning.
                With expertise in building production-grade AI systems, I focus on deploying robust models that solve real-world challenges.
                My work bridges cutting-edge research with practical applications, delivering scalable solutions with measurable impact.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-50/60 to-blue-50/40 dark:from-gray-700/30 dark:to-gray-800/30 backdrop-blur-sm border border-cyan-100/40 dark:border-gray-600/30 hover:border-cyan-400/50 dark:hover:border-cyan-500/30 transition-all hover:shadow-md">
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">8.55</div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">CGPA</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-50/60 to-blue-50/40 dark:from-gray-700/30 dark:to-gray-800/30 backdrop-blur-sm border border-cyan-100/40 dark:border-gray-600/30 hover:border-cyan-400/50 dark:hover:border-cyan-500/30 transition-all hover:shadow-md">
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">16+</div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-50/60 to-blue-50/40 dark:from-gray-700/30 dark:to-gray-800/30 backdrop-blur-sm border border-cyan-100/40 dark:border-gray-600/30 hover:border-cyan-400/50 dark:hover:border-cyan-500/30 transition-all hover:shadow-md">
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">5+</div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Certs</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s.name} className="px-3.5 py-2 rounded-lg text-sm font-medium bg-slate-50 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 border border-gray-200/70 dark:border-gray-600/50 hover:border-cyan-400 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 cursor-default">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              Journey Timeline
            </h3>

            <div className="space-y-8 relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700" />

              {timeline.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-12 group"
                >
                  {/* Dot */}
                  <div className="absolute left-[19px] top-2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600 group-hover:bg-cyan-500 transition-colors z-10" />

                  <div className="p-5 rounded-xl bg-white/90 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/30 shadow-md hover:shadow-xl transition-all group-hover:border-cyan-400/40 dark:group-hover:border-cyan-500/30">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 mb-2">
                      {t.year}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {t.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
