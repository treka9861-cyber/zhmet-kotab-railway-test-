import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t, isRTL } = useLanguage();

  const platformLinks = [
    { href: '/store', label: t.nav.store },
    { href: '/worlds', label: t.nav.worlds },
    { href: '/authors', label: t.nav.authors },
    { href: '/offers', label: t.nav.offers },
    { href: '/media', label: t.nav.media },
  ];

  const companyLinks = [
    { href: '#', label: t.footer.about },
    { href: '#', label: t.footer.careers },
    { href: '#', label: t.footer.press },
    { href: '#', label: t.footer.contact },
  ];

  const legalLinks = [
    { href: '#', label: t.footer.privacy },
    { href: '#', label: t.footer.terms },
  ];

  return (
    <footer
      className="relative mt-24 border-t border-[hsl(240_12%_12%)]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(270 50% 8% / 0.6) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer w-fit">
                <div className="w-9 h-9 bg-gradient-to-br from-[hsl(45_85%_52%)] to-[hsl(35_90%_45%)] rounded-lg flex items-center justify-center">
                  <span className="text-[hsl(240_15%_4%)] font-cinematic font-bold text-sm">C</span>
                </div>
                <span className="font-cinematic font-bold text-xl tracking-widest text-gradient-gold">
                  CLICKERS
                </span>
              </div>
            </Link>
            <p className="text-[hsl(240_5%_55%)] text-sm leading-relaxed mb-6 max-w-sm">
              {t.footer.tagline}
            </p>
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-[hsl(240_5%_72%)] text-sm font-medium mb-3">{t.footer.newsletter}</p>
              <p className="text-[hsl(240_5%_48%)] text-xs mb-3">{t.footer.newsletterDesc}</p>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 bg-[hsl(240_12%_10%)] border border-[hsl(240_12%_18%)] rounded-lg px-3 py-2 text-sm text-[hsl(240_5%_80%)] placeholder:text-[hsl(240_5%_38%)] focus:outline-none focus:border-[hsl(45_85%_52%/0.6)] transition-colors"
                  data-testid="newsletter-email"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-lg text-sm font-semibold whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="newsletter-subscribe"
                >
                  {t.footer.subscribe}
                </motion.button>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaYoutube, href: '#', label: 'YouTube' },
                { icon: FaTiktok, href: '#', label: 'TikTok' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[hsl(240_12%_10%)] border border-[hsl(240_12%_18%)] text-[hsl(240_5%_55%)] hover:text-[hsl(45_85%_52%)] hover:border-[hsl(45_85%_52%/0.4)] transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-[hsl(240_5%_88%)] font-semibold text-sm mb-4 uppercase tracking-wider">
              {t.footer.platform}
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-[hsl(240_5%_50%)] hover:text-[hsl(45_85%_52%)] text-sm transition-colors duration-200 cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[hsl(240_5%_88%)] font-semibold text-sm mb-4 uppercase tracking-wider">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[hsl(240_5%_50%)] hover:text-[hsl(45_85%_52%)] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[hsl(240_5%_88%)] font-semibold text-sm mb-4 uppercase tracking-wider">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[hsl(240_5%_50%)] hover:text-[hsl(45_85%_52%)] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsl(240_12%_12%)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[hsl(240_5%_38%)] text-xs">{t.footer.copyright}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(120_55%_45%)] animate-pulse" />
            <span className="text-[hsl(240_5%_38%)] text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
