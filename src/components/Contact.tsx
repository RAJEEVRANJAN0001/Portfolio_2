import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      emailjs.init(emailjsConfig.PUBLIC_KEY);
      await emailjs.send(emailjsConfig.SERVICE_ID, emailjsConfig.TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[40%] left-[10%] w-72 h-72 bg-purple-400/8 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-cyan-400/8 dark:bg-cyan-500/5 rounded-full blur-3xl" />
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
            Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Together</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's discuss how we can build something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/95 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-gray-200/25 dark:shadow-black/10 hover:shadow-xl transition-all"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block mb-2">Name</label>
                <input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  className="w-full rounded-xl border border-gray-200/80 dark:border-gray-600/50 bg-slate-50/80 dark:bg-gray-700/40 px-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                  className="w-full rounded-xl border border-gray-200/80 dark:border-gray-600/50 bg-slate-50/80 dark:bg-gray-700/40 px-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block mb-2">Message</label>
                <textarea 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  required 
                  rows={5} 
                  className="w-full rounded-xl border border-gray-200/80 dark:border-gray-600/50 bg-slate-50/80 dark:bg-gray-700/40 px-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none resize-none placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting} 
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30' 
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-cyan-500/30'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Message Sent!
                  </span>
                ) : submitStatus === 'error' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Failed to Send
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/95 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-gray-200/25 dark:shadow-black/10 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a href="mailto:microsoftrajeevranjan@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    rajeevranjanpratapsinghj94@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/95 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-gray-200/25 dark:shadow-black/10 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dehri, Bihar, India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 shadow-xl shadow-cyan-500/20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Availability Status</h3>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
                <span className="font-medium">Open to Opportunities</span>
              </div>
              <p className="text-white/90 text-sm relative z-10">
                I'm currently available for freelance projects and full-time roles. Usually responds within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
