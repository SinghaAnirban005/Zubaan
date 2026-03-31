'use client'

import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { UploadCloud, Sparkles, Pencil, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    step: '01',
    title: 'Upload Your Video',
    description: 'Drag & drop your video file or paste a YouTube link. Supports MP4, MOV, AVI, and more.',
    icon: UploadCloud
  },
  {
    step: '02',
    title: 'AI Generates Subtitles',
    description: 'Our AI transcribes and translates your content into natural Hinglish in seconds.',
    icon: Sparkles
  },
  {
    step: '03',
    title: 'Review & Edit',
    description: 'Fine-tune timings, correct any words, and style your subtitles with our editor.',
    icon: Pencil
  },
  {
    step: '04',
    title: 'Export & Share',
    description: 'Download in your preferred format and add to your video with one click.',
    icon: Download
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-transparent to-orange-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How it{' '}
            <span className="text-gradient">works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Generate professional Hinglish subtitles in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500/20 mb-4">{step.step}</div>
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="text-orange-500 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="text-gray-700 w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}