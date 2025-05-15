import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="h-8 w-8 border-4 border-primary-200 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
