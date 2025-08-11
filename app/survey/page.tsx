"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Skull, Target, Calendar, DollarSign, Heart, ChevronRight, ChevronLeft } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({
    primaryGoal: "",
    secondaryGoals: [],
    ageGroup: "",
    timeCommitment: "",
    advancedComfort: "",
    budget: "",
    applications: "",
    healthNotes: []
  })

  // Refs for each question section
  const questionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]

  // Scroll progress for each question
  const scrollProgress = questionRefs.map(ref => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    })
    return scrollYProgress
  })

  // Transform for fade effects
  const opacities = scrollProgress.map(progress => 
    useTransform(progress, [0.15, 0.25, 0.65, 0.75], [0, 1, 1, 0])
  )

  const questions = [
    {
      id: "primaryGoal",
      title: "What's your primary goal?",
      subtitle: "Choose one",
      type: "radio",
      icon: <Target className="h-6 w-6" />,
      options: [
        { value: "growth", label: "🦴 Growth Enhancement Path", desc: "aimed at overall skeletal extension" },
        { value: "support", label: "🛡 Structural Support Path", desc: "aimed at strengthening and resilience" },
        { value: "cranial", label: "🪞 Cranial Optimization Path", desc: "aimed at balance and proportions" },
        { value: "wellness", label: "🌱 Wellness Maintenance Path", desc: "aimed at general upkeep and longevity" }
      ]
    },
    {
      id: "secondaryGoals",
      title: "Do you have any secondary goals?",
      subtitle: "Choose all that apply",
      type: "checkbox",
      options: [
        { value: "height", label: "Increase standing height" },
        { value: "cheekbone", label: "Enhance cheekbone prominence" },
        { value: "lowerJaw", label: "Increase forward projection of lower jaw" },
        { value: "upperJaw", label: "Improve upper jaw prominence" },
        { value: "ribcage", label: "Increase ribcage/upper body frame projection" },
        { value: "density", label: "Increase overall bone density/mass" },
        { value: "posture", label: "General posture and skeletal symmetry" },
        { value: "none", label: "None, just my primary goal" }
      ]
    },
    {
      id: "ageGroup",
      title: "What's your age group?",
      type: "radio",
      options: [
        { value: "under18", label: "Under 18", desc: "educational suggestions only" },
        { value: "18-25", label: "18-25" },
        { value: "26-35", label: "26-35" },
        { value: "36-45", label: "36-45" },
        { value: "46+", label: "46+" }
      ]
    },
    {
      id: "timeCommitment",
      title: "How much time and discipline can you commit?",
      type: "radio",
      icon: <Calendar className="h-6 w-6" />,
      options: [
        { value: "short", label: "🟢 Short-term boost", desc: "3-6 months" },
        { value: "medium", label: "🟡 Medium program", desc: "6-12 months" },
        { value: "long", label: "🔴 Long-term transformation", desc: "1 year+" }
      ]
    },
    {
      id: "advancedComfort",
      title: "How comfortable are you with advanced approaches?",
      type: "radio",
      options: [
        { value: "level1", label: "Level 1", desc: "Only basic, low-risk, proven methods" },
        { value: "level2", label: "Level 2", desc: "Some moderate, targeted interventions" },
        { value: "level3", label: "Level 3", desc: "Open to advanced and cutting-edge approaches" }
      ]
    },
    {
      id: "budget",
      title: "What's your preferred budget range?",
      type: "radio",
      icon: <DollarSign className="h-6 w-6" />,
      options: [
        { value: "0", label: "$0/month" },
        { value: "1-100", label: "💵 $1-100/month" },
        { value: "100-300", label: "💵💵 $100-300/month" },
        { value: "300+", label: "💵💵💵 $300+/month" }
      ]
    },
    {
      id: "applications",
      title: "What kind of applications are you most comfortable with?",
      type: "radio",
      options: [
        { value: "oral", label: "Oral or nutritional-based" },
        { value: "wearable", label: "Wearable/mechanical support" },
        { value: "external", label: "External/treatment-based", desc: "e.g., non-invasive tech" },
        { value: "none", label: "No preference" }
      ]
    },
    {
      id: "healthNotes",
      title: "Any important health notes?",
      subtitle: "Select all that apply",
      type: "checkbox",
      icon: <Heart className="h-6 w-6" />,
      options: [
        { value: "cardiovascular", label: "Cardiovascular condition" },
        { value: "bone", label: "Bone-related disorder" },
        { value: "hormonal", label: "Hormonal/endocrine condition" },
        { value: "pregnancy", label: "Currently pregnant or planning pregnancy" },
        { value: "none", label: "None of the above" }
      ]
    }
  ]

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    setAnswers(prev => {
      const currentValues = prev[questionId] as string[]
      if (checked) {
        return { ...prev, [questionId]: [...currentValues, value] }
      } else {
        return { ...prev, [questionId]: currentValues.filter(v => v !== value) }
      }
    })
  }

  const scrollToQuestion = (index: number) => {
    questionRefs[index].current?.scrollIntoView({ behavior: 'smooth' })
    setCurrentQuestion(index)
  }

  const handleSubmit = () => {
    console.log("Survey submitted:", answers)
    // Handle submission logic here
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skull className="h-5 w-5" />
              <span className="font-medium">BoneStack Survey</span>
            </div>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Questions */}
      {questions.map((question, index) => (
        <section 
          key={question.id}
          ref={questionRefs[index]}
          className="min-h-screen flex items-center justify-center py-20"
        >
          <motion.div
            style={{ opacity: opacities[index] }}
            className="container mx-auto px-6 max-w-3xl"
          >
            <div className="text-center mb-12">
              {question.icon && (
                <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  {question.icon}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-light mb-2">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-gray-600">{question.subtitle}</p>
              )}
            </div>

            <div className="space-y-4">
              {question.type === "radio" ? (
                <RadioGroup
                  value={answers[question.id] as string}
                  onValueChange={(value) => handleRadioChange(question.id, value)}
                >
                  {question.options.map(option => (
                    <Card 
                      key={option.value}
                      className="p-6 cursor-pointer transition-all hover:shadow-md border-gray-200 rounded-2xl"
                      onClick={() => handleRadioChange(question.id, option.value)}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={option.value} className="mt-1" />
                        <div className="flex-1">
                          <Label className="text-base font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          {option.desc && (
                            <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  {question.options.map(option => (
                    <Card 
                      key={option.value}
                      className="p-6 cursor-pointer transition-all hover:shadow-md border-gray-200 rounded-2xl"
                      onClick={() => {
                        const isChecked = (answers[question.id] as string[]).includes(option.value)
                        handleCheckboxChange(question.id, option.value, !isChecked)
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={option.value}
                          checked={(answers[question.id] as string[]).includes(option.value)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(question.id, option.value, checked as boolean)
                          }
                          className="mt-1"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1" onClick={(e) => {
                          e.stopPropagation()
                          const isChecked = (answers[question.id] as string[]).includes(option.value)
                          handleCheckboxChange(question.id, option.value, !isChecked)
                        }}>
                          <Label 
                            htmlFor={option.value}
                            className="text-base font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                          {option.desc && (
                            <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              {index > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => scrollToQuestion(index - 1)}
                  className="rounded-full px-6"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {index < questions.length - 1 ? (
                <Button
                  onClick={() => scrollToQuestion(index + 1)}
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
                  disabled={
                    question.type === "radio" 
                      ? !answers[question.id] 
                      : (answers[question.id] as string[]).length === 0
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
                  disabled={
                    question.type === "radio" 
                      ? !answers[question.id] 
                      : (answers[question.id] as string[]).length === 0
                  }
                >
                  Submit Survey
                </Button>
              )}
            </div>
          </motion.div>
        </section>
      ))}
    </div>
  )
}