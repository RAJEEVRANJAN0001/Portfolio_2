import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute -bottom-[20%] -left-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -top-[20%] -right-[10%] w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Rajeev Ranjan Pratap Singh
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Building reliable AI & web systems for production. Passionate about creating seamless user experiences and robust backend architectures.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Row */}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Quick Links</h4>
            <div className="space-y-3">
              {['About', 'Projects', 'Skills', 'Achievements', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h4>
            <div className="space-y-4">
              {[
                { name: 'GitHub', href: 'https://github.com/RAJEEVRANJAN0001' },
                { name: 'LinkedIn', href: 'https://linkedin.com/in/rajeev-ranjan-pratap-singh/' },
                { name: 'Email', href: 'mailto:rajeevranjanpratapsingh@gmail.com' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300 text-cyan-500">
                    {/* Simple SVG icons (no emoji) */}
                    {social.name === 'GitHub' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.69.41.36.77 1.08.77 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.2.67.79.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                      </svg>
                    )}
                    {social.name === 'LinkedIn' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98c1.1 0 1.98-.88 1.98-1.98S6.08 3.5 4.98 3.5zM3.5 8.5h3v11h-3v-11zM9.5 8.5h2.8v1.5h.04c.39-.74 1.35-1.5 2.77-1.5 2.96 0 3.5 1.95 3.5 4.48v6.52h-3v-5.77c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.05v5.88h-3v-11z" />
                      </svg>
                    )}
                    {social.name === 'Email' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 4h16v16H4z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                    )}
                  </span>
                  <span className="font-medium">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Rajeev Ranjan Pratap Singh. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
