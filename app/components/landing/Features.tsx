'use client'

import { 
  Languages, 
  Zap, 
  FileText, 
  UploadCloud, 
  Users, 
  ShieldCheck 
} from 'lucide-react'
import { Card } from '../ui/Card'

const features = [
  {
    icon: Languages,
    title: 'Hinglish Native AI',
    description: 'Trained on 10K+ hours of Indian content — understands "timepass", "achha", "fir se" like a local.',
    color: 'orange'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Upload video/audio, get SRT/VTT subtitles in under 30 seconds. Real-time preview with timeline.',
    color: 'orange'
  },
  {
    icon: FileText,
    title: 'Smart Editor',
    description: 'Drag, merge, and edit timestamps with our intuitive editor. Auto-sync and correction tools included.',
    color: 'orange'
  },
  {
    icon: UploadCloud,
    title: 'Multiple Formats',
    description: 'Export to SRT, VTT, TXT, or ASS. Works with YouTube, Instagram, and all major platforms.',
    color: 'orange'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, review subtitles together, and maintain version history.',
    color: 'orange'
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your data is encrypted. Auto-delete option after 30 days. GDPR compliant.',
    color: 'orange'
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for{' '}
            <span className="text-gradient">Indian creators</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Everything you need to generate, edit, and export Hinglish subtitles in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <Card key={index} hover>
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Icon className="text-orange-500" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}