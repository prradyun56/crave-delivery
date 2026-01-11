import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import Toast from '../components/Toast';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import 'leaflet/dist/leaflet.css'; // Ensure map styles are loaded

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]"> {/* Apple's signature light gray */}
      <CartProvider>
        <Toast />

        {/* GLASS NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Logo: Simple & Dark */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-black font-semibold text-2xl tracking-tight hover:opacity-70 transition">
                crave.
              </Link>
            </div>

            {/* Auth Buttons: Minimal Pills */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition shadow-lg">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-6">
                  <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black transition">
                    Kitchen
                  </Link>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </nav>

        <main className="pb-32 animate-in fade-in duration-700">
          {children}
        </main>
        
        <CartSummary />
      </CartProvider>
    </div>
  );
}