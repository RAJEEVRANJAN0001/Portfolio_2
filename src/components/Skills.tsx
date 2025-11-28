import skills from '../data/skills';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Skills() {
  const skillCategories = {
    'Programming': ['Python', 'Java', 'JavaScript'],
    'AI/ML & Data': ['TensorFlow', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas'],
    'CV & DL': ['OpenCV', 'ResNet', 'DenseNet', 'CNNs'],
    'Tools & Cloud': ['Git', 'Docker', 'AWS', 'GCP']
  };

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
          <p className="text-gray-600 dark:text-gray-400">My technical toolkit for building intelligent systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([category, items], idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-6 text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                {category}
              </h3>
              <div className="space-y-5">
                {items.map((it, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{it}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.min(95, 60 + (items.length - i) * 5 + Math.random() * 10).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
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
            Continuously learning — currently focused on transformers, MLOps, and production ML pipelines.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
