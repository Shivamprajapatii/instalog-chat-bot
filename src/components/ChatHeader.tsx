import React from "react";
import { Trash2 } from "lucide-react";

interface Props {
  hasConversation: boolean;
  onDelete: () => void;
}

const ChatHeader: React.FC<Props> = ({ hasConversation, onDelete }) => {
  if (!hasConversation) return null;

  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 border-b border-gray-200/70">
      <div className="max-w-5xl mx-auto flex items-center justify-end px-4 py-2">
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete conversation
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

