'use client'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-orange-400">Features</a></li>
              <li><a href="#pricing" className="hover:text-orange-400">Pricing</a></li>
              <li><a href="#" className="hover:text-orange-400">API</a></li>
              <li><a href="#" className="hover:text-orange-400">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-400">Documentation</a></li>
              <li><a href="#" className="hover:text-orange-400">Guides</a></li>
              <li><a href="#" className="hover:text-orange-400">Blog</a></li>
              <li><a href="#" className="hover:text-orange-400">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-400">About</a></li>
              <li><a href="#" className="hover:text-orange-400">Careers</a></li>
              <li><a href="#" className="hover:text-orange-400">Press</a></li>
              <li><a href="#" className="hover:text-orange-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-400">Privacy</a></li>
              <li><a href="#" className="hover:text-orange-400">Terms</a></li>
              <li><a href="#" className="hover:text-orange-400">Security</a></li>
              <li><a href="#" className="hover:text-orange-400">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-800 text-center text-sm text-gray-500">
          <p>&copy; 2026 SubtitleGenie. All rights reserved. Made with <span className="text-orange-500">❤️</span> for Indian creators</p>
        </div>
      </div>
    </footer>
  )
}