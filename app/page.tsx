import Link from 'next/link';
import Logo from '@/components/Logo';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import ExampleGallery from '@/components/ExampleGallery';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-primary-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <Link href="/library" className="text-primary-700 hover:text-primary-900 font-semibold transition-colors">
              Game Library
            </Link>
            <a href="#examples" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Examples
            </a>
            <a href="#pricing" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Pricing
            </a>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <ValueProps />
        <ExampleGallery />
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">DreamWeaver</h4>
              <p className="text-primary-200 text-sm">
                AI-powered learning games for K-5 teachers and students.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Teacher Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8 text-center text-sm text-primary-300">
            <p>&copy; 2024 DreamWeaver. Making learning magical for elementary students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
