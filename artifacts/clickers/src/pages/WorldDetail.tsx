import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, BookOpen, Users } from 'lucide-react';
import { BookCard } from '@/components/BookCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { getWorldById } from '@/services/mock/worlds';
import { getBooksByWorld } from '@/services/mock/books';

export function WorldDetail() {
  const { t, isRTL, language } = useLanguage();
  const [, params] = useRoute('/worlds/:id');
  const world = getWorldById(params?.id || '');

  if (!world) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[hsl(240_5%_60%)] text-xl mb-4">{t.common.notFound}</h2>
          <Link href="/worlds">
            <span className="text-[hsl(45_85%_52%)] cursor-pointer hover:underline">{t.common.backToHome}</span>
          </Link>
        </div>
      </div>
    );
  }

  const name = language === 'ar' ? world.nameAr : world.nameEn;
  const tagline = language === 'ar' ? world.taglineAr : world.taglineEn;
  const description = language === 'ar' ? world.descriptionAr : world.descriptionEn;
  const lore = language === 'ar' ? world.loreAr : world.loreEn;
  const worldBooks = getBooksByWorld(world.id);

  return (
    <div className="min-h-screen">
      {/* Cinematic Banner */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src={world.bannerUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240_15%_4%/0.4)] via-[hsl(240_15%_4%/0.6)] to-[hsl(240_15%_4%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_15%_4%/0.8)] to-transparent" />

        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(ellipse at 60% 50%, ${world.primaryColor}/30 0%, transparent 60%)` }}
        />

        <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="max-w-7xl mx-auto">
            <Link href="/worlds">
              <motion.span
                className={`inline-flex items-center gap-2 text-[hsl(240_5%_60%)] hover:text-[hsl(45_85%_52%)] text-sm cursor-pointer transition-colors mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ x: isRTL ? 3 : -3 }}
              >
                {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                {t.worlds.title}
              </motion.span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-[hsl(45_85%_52%/0.15)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)] text-xs font-medium rounded-full mb-3 uppercase tracking-wide">
                {isRTL ? 'عالم' : 'WORLD'}
              </span>
              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-3 ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
                {name}
              </h1>
              <p className={`text-[hsl(240_5%_65%)] text-lg max-w-2xl ${isRTL ? 'font-arabic' : ''}`}>
                {tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* About This World */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-4 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.worlds.lore}
              </h2>
              <p className={`text-[hsl(240_5%_60%)] leading-relaxed mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {description}
              </p>
              <p className={`text-[hsl(240_5%_55%)] leading-relaxed text-sm italic border-l-2 border-[hsl(45_85%_52%/0.4)] pl-4 ${isRTL ? 'font-arabic text-right border-l-0 border-r-2 pr-4 pl-0' : ''}`}>
                {lore}
              </p>
            </motion.section>

            {/* Trailer Placeholder */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-4 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.worlds.trailer}
              </h2>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] cursor-pointer group">
                <img
                  src={world.bannerUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-[hsl(45_85%_52%/0.9)] flex items-center justify-center shadow-[0_0_40px_hsl(45_85%_52%/0.5)]"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={28} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)] ml-1" />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Characters */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.worlds.characters}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {world.characters.map((char, i) => (
                  <motion.div
                    key={char.id}
                    className={`flex gap-4 p-4 rounded-xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <img
                      src={char.imageUrl}
                      alt={language === 'ar' ? char.nameAr : char.nameEn}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-[hsl(45_85%_52%/0.2)]"
                    />
                    <div>
                      <h3 className={`font-bold text-[hsl(45_20%_88%)] text-sm mb-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? char.nameAr : char.nameEn}
                      </h3>
                      <p className="text-[hsl(45_85%_52%)] text-xs mb-1">
                        {language === 'ar' ? char.roleAr : char.roleEn}
                      </p>
                      <p className={`text-[hsl(240_5%_48%)] text-xs leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? char.descriptionAr : char.descriptionEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Reading Order Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.worlds.readingOrder}
              </h2>
              <div className="space-y-4">
                {worldBooks.map((book, i) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <motion.div
                      className={`flex gap-3 p-3 rounded-xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] hover:border-[hsl(45_85%_52%/0.3)] cursor-pointer transition-all duration-200 group ${isRTL ? 'flex-row-reverse' : ''}`}
                      whileHover={{ x: isRTL ? -3 : 3 }}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={book.coverUrl}
                          alt=""
                          className="w-12 h-16 object-cover rounded-lg"
                        />
                        <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[hsl(45_85%_52%)] flex items-center justify-center text-[hsl(240_15%_4%)] text-xs font-bold">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[hsl(240_5%_80%)] text-sm font-medium leading-tight group-hover:text-[hsl(45_85%_52%)] transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {language === 'ar' ? book.titleAr : book.titleEn}
                        </p>
                        <p className="text-[hsl(240_5%_45%)] text-xs mt-1">
                          {language === 'ar' ? book.authorNameAr : book.authorNameEn}
                        </p>
                        <p className="text-[hsl(45_85%_52%)] text-xs font-semibold mt-1">
                          {book.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Connected Books */}
        {worldBooks.length > 0 && (
          <section className="mt-8">
            <h2 className={`text-2xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
              {t.worlds.connectedBooks}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {worldBooks.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
