import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Icon with Glow */}
          <div className="relative p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Title & Subtitle */}
          <div>
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              InstaBot Powered By Zaptoz
            </motion.h1>
            <p className="text-sm text-gray-600">
              Ask anything, get intelligent answers
            </p>
          </div>
        </motion.div>

        {/* Right Section - Logo */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="cursor-pointer"
        >
          <img
            src="/Zaptoz-logo.png"
            alt="Zaptoz Logo"
            className="h-10 w-auto rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
