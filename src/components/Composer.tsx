import React from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

interface Props {
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
  onSend: () => void;
  onEnter?: () => void;
}

const Composer: React.FC<Props> = ({ value, disabled, onChange, onSend, onEnter }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-6 bg-white border-t border-gray-200 shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onEnter ? onEnter() : onSend();
                }
              }}
              placeholder="Ask me anything... I'll respond and help you translate it!"
              className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[50px] max-h-32"
              rows={1}
              disabled={disabled}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {disabled ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </motion.div>
  );
};

export default Composer;

