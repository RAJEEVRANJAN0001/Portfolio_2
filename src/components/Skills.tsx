import skills from '../data/skills';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Skills() {
  const skillCategories = {
    'Core ML/DL': ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas'],
    'Computer Vision': ['OpenCV', 'ResNet', 'DenseNet', 'CNNs', 'Image Processing'],
    'Programming': ['Python', 'Java', 'JavaScript', 'TypeScript'],
    'MLOps & Cloud': ['Docker', 'AWS', 'GCP', 'Git', 'CI/CD']
  };

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">My technical toolkit for building intelligent systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([category, items], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 dark:bg-gray-800/30 backdrop-blur-2xl border border-gray-200/60 dark:border-gray-700/40 rounded-2xl p-8 shadow-lg shadow-gray-200/20 dark:shadow-black/10 hover:shadow-2xl hover:shadow-cyan-100/30 dark:hover:shadow-black/20 transition-all duration-500 hover:border-cyan-400/40 dark:hover:border-cyan-500/30"
            >
              <h3 className="text-xl font-bold mb-6 text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                {category}
              </h3>
              <div className="space-y-5">
                {items.map((it, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{it}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.min(95, 60 + (items.length - i) * 5 + Math.random() * 10).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100/80 dark:bg-gray-700/60 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(95, 60 + (items.length - i) * 5)}%` }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
            Continuously expanding expertise in Transformers, Large Language Models, MLOps best practices, and production ML deployment pipelines.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
