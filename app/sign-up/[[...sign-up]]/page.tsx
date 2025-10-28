"use client";
import { SignUp } from '@clerk/nextjs'
import { motion } from "framer-motion";

export default function Page() {
  return(
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 'bg-white text-black hover:bg-gray-200',
              card: 'bg-black border border-white/10',
              headerTitle: 'text-white',
              headerSubtitle: 'text-white/60',
              formFieldLabel: 'text-white/60',
              formFieldInput: 'bg-black border-white/20 text-white',
              footerActionLink: 'text-purple-400 hover:text-purple-300',
              dividerLine: 'bg-transparent',
              dividerText: 'text-white/40',
              socialButtonsBlockButton: 'bg-white/5 border-white/20 hover:bg-white/10',
              socialButtonsBlockButtonText: 'text-white',
              formFieldInputShowPasswordButton: 'text-white/60',
              alert: 'bg-red-500/10 border-red-500/20 text-red-400',
              alertText: 'text-red-400',
            },
          }}
        />
      </motion.div>
    </main>
  )
}
