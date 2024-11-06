// components/LoadingSpinner.jsx
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex py-5 px-1 justify-center items-center">
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["0%", "0%"], scale: 0.8}}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
      />
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["0%", "0%"], scale: 1.5 }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
      />
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["0%", "0%"], scale: 2 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
      />
        <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["0%", "0%"], scale: 1.5 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.8 }}
      />
        <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["0%", "0%"], scale: 0.9 }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
    </div>
  );
};

export default LoadingSpinner;
