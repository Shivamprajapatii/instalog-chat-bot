import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-gray-900 text-white mt-auto"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <motion.div
            whileHover={{ y: -5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Global Translation</h3>
            </div>
            <p className="text-gray-400">
              Break language barriers with AI-powered translation in real-time.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">Powered by AWS</h3>
            </div>
            <p className="text-gray-400">
              Utilizing Amazon Bedrock, Translate, and Polly for superior AI capabilities.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Heart className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold">Made with Love</h3>
            </div>
            <p className="text-gray-400">
              Crafted for seamless communication across cultures and languages.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-6 text-center"
          initial={{ borderColor: "transparent" }}
          animate={{ borderColor: "rgba(75, 85, 99, 1)" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-gray-400">
            © 2025 AI Translator. Empowering global communication.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

