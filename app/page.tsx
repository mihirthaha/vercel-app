"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skull, ArrowDown, Brain, Shield, Search } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function LandingPage() {
  // Refs for each section
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const surveyRef = useRef(null)
  const contactRef = useRef(null)

  // Scroll progress for hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Scroll progress for about section
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  // Scroll progress for survey section
  const { scrollYProgress: surveyProgress } = useScroll({
    target: surveyRef,
    offset: ["start end", "end start"],
  })

  // Scroll progress for contact section
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"],
  })

  // Transform values for hero - completely fade out before about section appears
  const heroOpacity = useTransform(heroProgress, [0, 0.3, 0.4], [1, 1, 0])
  
  // About section - only fade in after hero is completely gone, NO Y movement
  const aboutTitleOpacity = useTransform(aboutProgress, [0.15, 0.25, 0.65, 0.75], [0, 1, 1, 0])
  const aboutTextOpacity = useTransform(aboutProgress, [0.18, 0.28, 0.62, 0.72], [0, 1, 1, 0])
  const aboutCardsOpacity = useTransform(aboutProgress, [0.21, 0.31, 0.59, 0.69], [0, 1, 1, 0])
  
  // Survey section animations - only after about is completely gone, NO Y movement
  const surveyTitleOpacity = useTransform(surveyProgress, [0.15, 0.25, 0.65, 0.75], [0, 1, 1, 0])
  const surveyTextOpacity = useTransform(surveyProgress, [0.18, 0.28, 0.62, 0.72], [0, 1, 1, 0])
  const surveyButtonOpacity = useTransform(surveyProgress, [0.21, 0.31, 0.59, 0.69], [0, 1, 1, 0])
  
  // Contact section animations - only after survey is completely gone, NO Y movement
  const contactTitleOpacity = useTransform(contactProgress, [0.15, 0.25, 0.8, 1], [0, 1, 1, 1])
  const contactTextOpacity = useTransform(contactProgress, [0.18, 0.28, 0.8, 1], [0, 1, 1, 1])
  const contactButtonOpacity = useTransform(contactProgress, [0.21, 0.31, 0.8, 1], [0, 1, 1, 1])

  // Navbar scroll visibility
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 300], [0, 1])

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Fixed Navigation Bar */}
      <motion.nav 
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skull className="h-5 w-5" />
              <span className="font-medium">BoneStack</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, '#about')}
                className="text-sm hover:text-gray-600 transition-colors"
              >
                About
              </a>
              <a 
                href="#survey" 
                onClick={(e) => scrollToSection(e, '#survey')}
                className="text-sm hover:text-gray-600 transition-colors"
              >
                Survey
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="text-sm hover:text-gray-600 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Fixed Position */}
      <section ref={heroRef} className="h-screen fixed inset-0 flex flex-col items-center justify-center">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Skull className="h-32 w-32 mx-auto mb-8 stroke-[0.5]" />
          </motion.div>
          
          <motion.h1 
            className="text-2xl md:text-3xl font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Transform Your Skull
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="h-5 w-5 animate-bounce text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Spacer for hero */}
      <div className="h-screen"></div>

      {/* About Section - Fixed Position */}
      <section id="about" ref={aboutRef} className="h-screen relative">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                style={{ opacity: aboutTitleOpacity }}
                className="text-4xl md:text-5xl font-light mb-8 text-center"
              >
                About BoneStack
              </motion.h2>
              <motion.p 
                style={{ opacity: aboutTextOpacity }}
                className="text-lg md:text-xl text-gray-600 text-center mb-16 leading-relaxed"
              >
                A comprehensive educational platform providing customized stacks to morph into your dream self.
              </motion.p>
              
              <motion.div 
                style={{ opacity: aboutCardsOpacity }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-50 rounded-3xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Educational</h3>
                  <p className="text-gray-600 text-sm">Detailed anatomical models and expert insights</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-50 rounded-3xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Customized</h3>
                  <p className="text-gray-600 text-sm">Fully customized towards YOU and your needs</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-50 rounded-3xl p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Research-Based</h3>
                  <p className="text-gray-600 text-sm">Latest findings in cranial morphology studies</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Section - Fixed Position */}
      <section id="survey" ref={surveyRef} className="h-screen relative">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <motion.h2 
                style={{ opacity: surveyTitleOpacity }}
                className="text-4xl md:text-5xl font-light mb-8"
              >
                Start Your Journey
              </motion.h2>
              <motion.p 
                style={{ opacity: surveyTextOpacity }}
                className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed"
              >
                Ready to change your bones?
              </motion.p>
              <motion.div
                style={{ opacity: surveyButtonOpacity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-12 py-6 text-lg rounded-full"
                >
                  Start Survey
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Footer */}
      <section id="contact" ref={contactRef} className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <motion.h2 
                style={{ opacity: contactTitleOpacity }}
                className="text-4xl md:text-5xl font-light mb-8"
              >
                Contact
              </motion.h2>
              <motion.p 
                style={{ opacity: contactTextOpacity }}
                className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed"
              >
                Interested in learning more about BoneStack or contributing to our research? 
                We'd love to hear from you.
              </motion.p>
              <motion.div
                style={{ opacity: contactButtonOpacity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 px-12 py-6 text-lg rounded-full"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="container mx-auto px-6 pb-12">
          <Alert className="bg-gray-50 border-gray-200 rounded-2xl max-w-3xl mx-auto">
            <AlertDescription className="text-center text-gray-600 py-2">
              📚 Educational content only. Not a substitute for professional medical advice. 
              Always consult with qualified healthcare providers for health-related concerns.
            </AlertDescription>
          </Alert>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Skull className="h-4 w-4" />
                <span className="text-sm text-gray-600">© {new Date().getFullYear()} BoneStack</span>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Research Ethics
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}