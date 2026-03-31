'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Zap, Download } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            See it in{' '}
            <span className="text-gradient">action</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Watch how SubtitleGenie transforms your videos with perfect Hinglish subtitles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-0 overflow-hidden border-zinc-800">
              <div className="relative aspect-video bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center cursor-pointer group">
                {!isPlaying ? (
                  <div 
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-all">
                      <Play className="text-orange-500 fill-orange-500" size={40} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <p className="text-gray-500">Video Player Demo</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="text-sm text-white font-medium">Sample Video with Hinglish Subtitles</div>
                  <div className="text-sm text-orange-400 mt-1 font-mono italic">"Bhai, ye scene kamaal ka hai! 🔥"</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Zap className="text-orange-500" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Generation</h3>
              </div>
              <p className="text-gray-400 lg:pl-13">
                Watch as our AI generates subtitles in real-time with 98% accuracy for Hinglish content.
                Perfect for YouTube creators, filmmakers, and social media managers.
              </p>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Live Preview</span>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Hinglish Mode</span>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <p className="text-gray-400">🎬 [00:05] <span className="text-white">"Arey yaar, ye toh bohot hard hai!"</span></p>
                <p className="text-gray-400">🎬 [00:12] <span className="text-white">"Chal be, karte hai subscribe button pe click"</span></p>
                <p className="text-gray-400">🎬 [00:18] <span className="text-white">"Full entertainment guaranteed, no bakwas"</span></p>
              </div>
            </div>

            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <Download size={20} />
              Try Demo Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}