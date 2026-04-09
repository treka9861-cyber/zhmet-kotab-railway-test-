import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Navbar() {
  const { t, isRTL, toggleLanguage, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', labelKey: 'home' as const },
    { href: '/store', labelKey: 'store' as const },
    { href: '/worlds', labelKey: 'worlds' as const },
    { href: '/authors', labelKey: 'authors' as const },
    { href: '/offers', labelKey: 'offers' as const },
    { href: '/media', labelKey: 'media' as const },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[hsl(240_15%_4%/0.95)] backdrop-blur-xl border-b border-[hsl(240_12%_16%)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                data-testid="nav-logo"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[hsl(45_85%_52%)] to-[hsl(35_90%_45%)] rounded-lg flex items-center justify-center glow-gold">
                  <span className="text-[hsl(240_15%_4%)] font-cinematic font-bold text-sm">C</span>
                </div>
                <span className="font-cinematic font-bold text-xl tracking-widest text-gradient-gold">
                  CLICKERS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1" dir={isRTL ? 'rtl' : 'ltr'}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      location === link.href
                        ? 'text-[hsl(45_85%_52%)] bg-[hsl(45_85%_52%/0.1)]'
                        : 'text-[hsl(240_5%_72%)] hover:text-[hsl(45_85%_52%)] hover:bg-[hsl(45_85%_52%/0.05)]'
                    }`}
                    whileHover={{ y: -1 }}
                    data-testid={`nav-link-${link.labelKey}`}
                  >
                    {t.nav[link.labelKey]}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[hsl(240_12%_20%)] text-[hsl(240_5%_65%)] hover:text-[hsl(45_85%_52%)] hover:border-[hsl(45_85%_52%/0.4)] transition-all duration-200 text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="language-toggle"
              >
                <Globe size={14} />
                <span className="hidden sm:block">{t.common.switchLanguage}</span>
              </motion.button>

              {/* Search */}
              <motion.button
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[hsl(240_5%_65%)] hover:text-[hsl(45_85%_52%)] hover:bg-[hsl(45_85%_52%/0.08)] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="search-button"
              >
                <Search size={18} />
              </motion.button>

              {/* Cart */}
              <motion.button
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[hsl(240_5%_65%)] hover:text-[hsl(45_85%_52%)] hover:bg-[hsl(45_85%_52%/0.08)] transition-all duration-200 hidden sm:flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="cart-button"
              >
                <ShoppingCart size={18} />
              </motion.button>

              {/* CTA */}
              <Link href="/store">
                <motion.span
                  className="hidden sm:block px-4 py-2 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-lg text-sm font-semibold cursor-pointer glow-gold transition-all duration-200"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px hsl(45 85% 52% / 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="nav-cta"
                >
                  {t.nav.signUp}
                </motion.span>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[hsl(240_5%_65%)] hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[hsl(240_15%_4%/0.9)] backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-[hsl(240_14%_7%)] border-b border-[hsl(240_12%_16%)] p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={link.href}>
                      <span
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                          location === link.href
                            ? 'text-[hsl(45_85%_52%)] bg-[hsl(45_85%_52%/0.1)]'
                            : 'text-[hsl(240_5%_80%)] hover:text-[hsl(45_85%_52%)]'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-testid={`mobile-nav-link-${link.labelKey}`}
                      >
                        {t.nav[link.labelKey]}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-[hsl(240_12%_16%)] mt-2 pt-4 flex gap-3">
                  <Link href="/store">
                    <span
                      className="flex-1 block text-center px-4 py-2.5 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-xl text-sm font-semibold cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t.nav.signUp}
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
