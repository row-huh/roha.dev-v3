"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function NavBar() {
  const pathname = usePathname();
  const isHome = true; // village/cottagecore theme is now site-wide
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/writing", label: "Writing" },
    { href: "/contact", label: "Contact" },
    //{ href: "/assistant", label: "Ask Pethia" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? isHome
          ? "bg-[var(--v-surface)]/80 backdrop-blur-xl border-b border-[var(--v-border)]/60 shadow-lg shadow-[var(--v-bark)]/10"
          : "bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 shadow-lg shadow-black/20"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/" className={`text-lg sm:text-xl font-semibold transition-colors ${
              isHome
                ? "font-pixel text-[var(--v-ink)] hover:text-[var(--v-clay)]"
                : "text-white hover:text-gray-200"
            }`}>
              roha.dev
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className={`flex gap-1 rounded-full p-1 border backdrop-blur-sm ${
              isHome
                ? "bg-[var(--v-panel)]/70 border-[var(--v-border)]/70"
                : "bg-gray-800/50 border-gray-700/50"
            }`}>
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.05, backgroundColor: isHome ? "rgba(168,106,69,0.18)" : "rgba(55, 65, 81, 0.7)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full"
                >
                  <Link
                    href={link.href}
                    className={`px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                      isHome
                        ? pathname === link.href
                          ? "bg-[var(--v-clay)]/20 text-[var(--v-ink)]"
                          : "text-[var(--v-ink-soft)] hover:bg-[var(--v-clay)]/15 hover:text-[var(--v-ink)]"
                        : pathname === link.href
                          ? "bg-gray-700/50 text-white"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isHome
                ? "text-[var(--v-ink-soft)] hover:text-[var(--v-ink)] hover:bg-[var(--v-clay)]/15"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden mt-4 backdrop-blur-sm rounded-xl border overflow-hidden ${
              isHome
                ? "bg-[var(--v-surface)]/95 border-[var(--v-border)]/70"
                : "bg-gray-800/90 border-gray-700/50"
            }`}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors border-b last:border-b-0 ${
                    isHome
                      ? pathname === link.href
                        ? "bg-[var(--v-clay)]/20 text-[var(--v-ink)] border-[var(--v-border)]/40"
                        : "text-[var(--v-ink-soft)] hover:bg-[var(--v-clay)]/15 hover:text-[var(--v-ink)] border-[var(--v-border)]/40"
                      : pathname === link.href
                        ? "bg-gray-700/50 text-white border-gray-700/30"
                        : "text-gray-300 hover:bg-gray-700/30 hover:text-white border-gray-700/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}