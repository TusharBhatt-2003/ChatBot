// components/LoadingSpinner.jsx
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["5%", "-15%"] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0 }}
      />
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["5%", "-15%"] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
      />
      <motion.div
        className="w-3 h-3 bg-white rounded-full"
        animate={{ y: ["5%", "-15%"] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
      />
    </div>
  );
};

export default LoadingSpinner;
