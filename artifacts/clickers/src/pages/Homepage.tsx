import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Play, ChevronLeft, ChevronRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { BookCard } from '@/components/BookCard';
import { WorldCard } from '@/components/WorldCard';
import { AuthorCard } from '@/components/AuthorCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useLanguage } from '@/i18n/LanguageContext';
import { getFeaturedBooks, getNewBooks, books } from '@/services/mock/books';
import { worlds } from '@/services/mock/worlds';
import { authors } from '@/services/mock/authors';
import { offers } from '@/services/mock/offers';

function HeroSection() {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredBook = getFeaturedBooks()[0];
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const featuredBooks = getFeaturedBooks();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedIndex((i) => (i + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBooks.length]);

  const currentBook = featuredBooks[currentFeaturedIndex];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={currentBook.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={currentBook.coverUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px] opacity-20"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240_15%_4%/0.6)] via-[hsl(240_15%_4%/0.7)] to-[hsl(240_15%_4%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_4%)] via-transparent to-transparent" />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(270 55% 48% / 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(45 85% 52% / 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[hsl(45_85%_52%/0.4)]"
            style={{
              left: `${10 + (i * 4.5)}%`,
              top: `${20 + (i * 3)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Text */}
          <motion.div
            className={isRTL ? 'order-2 text-right' : 'order-1 text-left'}
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(45_85%_52%/0.1)] border border-[hsl(45_85%_52%/0.25)] text-[hsl(45_85%_52%)] text-sm font-medium mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={14} />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 ${
                isRTL ? 'font-arabic' : 'font-cinematic'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-[hsl(45_20%_90%)]">{t.hero.title}</span>
              <br />
              <span className="text-gradient-gold">{t.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              className={`text-[hsl(240_5%_60%)] text-lg leading-relaxed mb-8 max-w-xl ${isRTL ? 'font-arabic' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/store">
                <motion.span
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-xl font-bold text-base cursor-pointer glow-gold"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px hsl(45 85% 52% / 0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="hero-cta"
                >
                  {isRTL ? <BookOpen size={18} /> : null}
                  {t.hero.cta}
                  {!isRTL ? <BookOpen size={18} /> : null}
                </motion.span>
              </Link>
              <motion.button
                className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[hsl(240_12%_22%)] text-[hsl(240_5%_80%)] font-medium text-base hover:border-[hsl(45_85%_52%/0.4)] hover:text-[hsl(45_85%_52%)] transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-trailer-cta"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[hsl(240_12%_12%)] border border-[hsl(240_12%_22%)]">
                  <Play size={14} fill="currentColor" className={isRTL ? '' : 'ml-0.5'} />
                </div>
                {t.hero.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className={`flex items-center gap-8 mt-10 pt-8 border-t border-[hsl(240_12%_14%)] ${isRTL ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { value: '500+', labelAr: 'كتاب', labelEn: 'Books' },
                { value: '1M+', labelAr: 'قارئ', labelEn: 'Readers' },
                { value: '50+', labelAr: 'كاتب', labelEn: 'Authors' },
              ].map((stat) => (
                <div key={stat.value} className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="text-2xl font-bold text-gradient-gold font-cinematic">{stat.value}</div>
                  <div className={`text-[hsl(240_5%_48%)] text-sm ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Featured Book Cover */}
          <motion.div
            className={`relative ${isRTL ? 'order-1' : 'order-2'}`}
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-xs mx-auto lg:max-w-sm">
              {/* Glowing backdrop */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(45 85% 52% / 0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  transform: 'scale(1.2)',
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBook.id}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.92, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.92, rotateY: -10 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={currentBook.coverUrl}
                    alt={currentBook.titleAr}
                    className="w-full aspect-[2/3] object-cover rounded-2xl shadow-[0_30px_80px_hsl(45_85%_52%/0.2)]"
                  />
                  {/* Book shine */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {featuredBooks.slice(0, 5).map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setCurrentFeaturedIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentFeaturedIndex
                        ? 'w-6 h-2 bg-[hsl(45_85%_52%)]'
                        : 'w-2 h-2 bg-[hsl(240_12%_22%)] hover:bg-[hsl(240_12%_32%)]'
                    }`}
                    data-testid={`hero-dot-${i}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-[hsl(45_85%_52%/0.6)] to-transparent" />
      </motion.div>
    </section>
  );
}

function CategoryBar() {
  const { t, isRTL, language } = useLanguage();
  const categories = [
    { id: 'fantasy', icon: '✨' },
    { id: 'scifi', icon: '🔮' },
    { id: 'mystery', icon: '🔍' },
    { id: 'romance', icon: '❤️' },
    { id: 'historical', icon: '📜' },
    { id: 'horror', icon: '🌑' },
    { id: 'adventure', icon: '⚔️' },
    { id: 'literary', icon: '📖' },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader title={t.sections.categories} />
      <div className={`flex gap-3 overflow-x-auto scrollbar-hide pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] hover:border-[hsl(45_85%_52%/0.4)] hover:bg-[hsl(45_85%_52%/0.05)] transition-all duration-200 group"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            data-testid={`category-${cat.id}`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className={`text-xs font-medium text-[hsl(240_5%_60%)] group-hover:text-[hsl(45_85%_52%)] transition-colors whitespace-nowrap ${isRTL ? 'font-arabic' : ''}`}>
              {t.categories[cat.id]}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function OffersBar() {
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.slice(0, 2).map((offer, i) => (
          <motion.div
            key={offer.id}
            className="relative rounded-2xl overflow-hidden border border-[hsl(240_12%_16%)] hover:border-[hsl(45_85%_52%/0.3)] transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.01 }}
            data-testid={`offer-card-${offer.id}`}
          >
            <img
              src={offer.bannerUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_4%/0.95)] to-[hsl(240_15%_4%/0.5)]" />
            <div className={`relative p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="inline-block px-2.5 py-1 bg-[hsl(45_85%_52%/0.15)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)] text-xs font-medium rounded-full mb-3">
                -{offer.discountPercent}% {language === 'ar' ? 'خصم' : t.store.off}
              </span>
              <h3 className={`text-base font-bold text-white mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {language === 'ar' ? offer.titleAr : offer.titleEn}
              </h3>
              <p className={`text-[hsl(240_5%_55%)] text-xs mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {language === 'ar' ? offer.descriptionAr : offer.descriptionEn}
              </p>
              {offer.code && (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="px-3 py-1 bg-[hsl(240_14%_10%)] border border-[hsl(240_12%_22%)] text-[hsl(45_85%_52%)] text-xs font-mono rounded-lg">
                    {offer.code}
                  </span>
                  <Link href="/offers">
                    <span className="text-[hsl(45_85%_52%)] text-xs font-medium cursor-pointer hover:underline">
                      {t.offers.claimOffer}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrailersSection() {
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title={t.sections.trailers}
        viewAllHref="/media"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {worlds.slice(0, 3).map((world, i) => (
          <motion.div
            key={world.id}
            className="relative rounded-2xl overflow-hidden aspect-video border border-[hsl(240_12%_16%)] hover:border-[hsl(45_85%_52%/0.3)] cursor-pointer group transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={world.bannerUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[hsl(240_15%_4%/0.6)] group-hover:bg-[hsl(240_15%_4%/0.5)] transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-[hsl(45_85%_52%/0.9)] flex items-center justify-center shadow-[0_0_30px_hsl(45_85%_52%/0.5)]"
                whileHover={{ scale: 1.1 }}
              >
                <Play size={20} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)] ml-1" />
              </motion.div>
            </div>
            <div className={`absolute bottom-3 ${isRTL ? 'right-3 text-right' : 'left-3 text-left'}`}>
              <p className={`text-white text-sm font-semibold ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
                {language === 'ar' ? world.nameAr : world.nameEn}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Homepage() {
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const featuredBooks = getFeaturedBooks();
  const newBooks = getNewBooks();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(240_15%_4%)]">
      <HeroSection />

      <CategoryBar />

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          title={t.sections.featuredBooks}
          viewAllHref="/store"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      {/* Worlds Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          title={t.sections.exploreWorlds}
          subtitle={isRTL
            ? 'ادخل إلى أكوان قصصية متكاملة تمتد عبر سلاسل من الكتب'
            : 'Enter complete narrative universes spanning multiple books'}
          viewAllHref="/worlds"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {worlds.map((world, i) => (
            <WorldCard key={world.id} world={world} index={i} />
          ))}
        </div>
      </section>

      <OffersBar />

      {/* Latest Releases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          title={t.sections.latestReleases}
          viewAllHref="/store"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {newBooks.slice(0, 5).map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      <TrailersSection />

      {/* Authors Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          title={t.sections.authorSpotlight}
          viewAllHref="/authors"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.slice(0, 6).map((author, i) => (
            <AuthorCard key={author.id} author={author} index={i} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="relative rounded-3xl overflow-hidden text-center py-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_50%_10%)] via-[hsl(240_14%_7%)] to-[hsl(240_15%_4%)]" />
          <div className="absolute inset-0 opacity-40">
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, hsl(45 85% 52% / 0.1) 0%, transparent 60%)' }}
            />
          </div>
          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(45_85%_52%/0.1)] border border-[hsl(45_85%_52%/0.25)] text-[hsl(45_85%_52%)] text-sm font-medium mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Globe size={14} />
              {isRTL ? 'انضم إلى مجتمع القرّاء' : 'Join the reading community'}
            </motion.div>
            <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
              {isRTL ? 'ابدأ رحلتك القصصية اليوم' : 'Begin Your Story Journey Today'}
            </h2>
            <p className={`text-[hsl(240_5%_60%)] text-lg mb-8 max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL
                ? 'انضم إلى أكثر من مليون قارئ ويكتشفون عوالم جديدة كل يوم'
                : 'Join over a million readers discovering new worlds every day'}
            </p>
            <Link href="/store">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-xl font-bold text-lg cursor-pointer glow-gold"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px hsl(45 85% 52% / 0.5)' }}
                whileTap={{ scale: 0.97 }}
                data-testid="footer-cta"
              >
                {isRTL ? 'اكتشف المكتبة' : 'Explore the Library'}
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
