import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, BookOpen, Play, Music, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { BookCard } from '@/components/BookCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { getBookById, getRecommendedBooks } from '@/services/mock/books';

export function BookDetail() {
  const { t, isRTL, language } = useLanguage();
  const [, params] = useRoute('/book/:id');
  const book = getBookById(params?.id || '');

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[hsl(240_5%_60%)] text-xl mb-4">{t.common.notFound}</h2>
          <Link href="/store">
            <span className="text-[hsl(45_85%_52%)] cursor-pointer hover:underline">{t.common.backToHome}</span>
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'ar' ? book.titleAr : book.titleEn;
  const authorName = language === 'ar' ? book.authorNameAr : book.authorNameEn;
  const description = language === 'ar' ? book.descriptionAr : book.descriptionEn;
  const recommended = getRecommendedBooks(book.id, 4);
  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : null;

  const mockReviews = [
    {
      id: 1,
      nameAr: 'محمد العلي',
      nameEn: 'Mohammed Al-Ali',
      rating: 5,
      textAr: 'رواية استثنائية أخذتني إلى عالم آخر تماماً. من أفضل ما قرأت هذا العام!',
      textEn: 'An exceptional novel that took me to a completely different world. One of the best I\'ve read this year!',
      date: '2024-10-15',
    },
    {
      id: 2,
      nameAr: 'فاطمة الزهراء',
      nameEn: 'Fatima Al-Zahra',
      rating: 5,
      textAr: 'الأسلوب رائع والحبكة تشدك من أول صفحة. لا أستطيع إنزاله قبل إكماله.',
      textEn: 'Brilliant style and the plot grips you from the first page. I couldn\'t put it down until I finished it.',
      date: '2024-09-28',
    },
    {
      id: 3,
      nameAr: 'عبدالله النمر',
      nameEn: 'Abdullah Al-Namir',
      rating: 4,
      textAr: 'قصة رائعة مع شخصيات مبنية بعمق. أنصح به بشدة لمحبي الخيال.',
      textEn: 'Wonderful story with deeply built characters. Highly recommended for fantasy lovers.',
      date: '2024-09-10',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={book.coverUrl} alt="" className="w-full h-full object-cover opacity-10 blur-xl scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240_15%_4%/0.8)] to-[hsl(240_15%_4%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <Link href="/store">
            <motion.span
              className={`inline-flex items-center gap-2 text-[hsl(240_5%_55%)] hover:text-[hsl(45_85%_52%)] text-sm cursor-pointer transition-colors mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ x: isRTL ? 3 : -3 }}
            >
              {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {t.nav.store}
            </motion.span>
          </Link>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Cover */}
            <motion.div
              className={`${isRTL ? 'order-2' : 'order-1'} max-w-xs mx-auto lg:max-w-sm`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse, hsl(45 85% 52% / 0.15) 0%, transparent 70%)', filter: 'blur(20px)', transform: 'scale(1.1)' }}
                />
                <img
                  src={book.coverUrl}
                  alt={title}
                  className="relative w-full aspect-[2/3] object-cover rounded-2xl shadow-[0_20px_60px_hsl(240_15%_4%/0.8)]"
                />
                {book.isNew && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-[hsl(45_85%_52%)] text-[hsl(240_15%_4%)] text-xs font-bold rounded-lg">
                    {language === 'ar' ? 'جديد' : 'NEW'}
                  </div>
                )}
                {discount && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-[hsl(0_72%_51%)] text-white text-xs font-bold rounded-lg">
                    -{discount}%
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              className={`${isRTL ? 'order-1 text-right' : 'order-2 text-left'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 bg-[hsl(270_45%_15%)] text-[hsl(270_55%_70%)] text-xs font-medium rounded-full mb-4">
                {language === 'ar' ? book.genreAr : book.genre}
              </span>

              <h1 className={`text-3xl sm:text-4xl font-bold text-[hsl(45_20%_92%)] mb-3 ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
                {title}
              </h1>

              <Link href={`/authors/${book.authorId}`}>
                <p className={`text-[hsl(45_85%_52%)] font-medium text-base mb-4 cursor-pointer hover:underline ${isRTL ? 'font-arabic' : ''}`}>
                  {authorName}
                </p>
              </Link>

              {/* Rating */}
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(book.rating) ? 'fill-[hsl(45_85%_52%)] text-[hsl(45_85%_52%)]' : 'text-[hsl(240_12%_25%)]'}
                    />
                  ))}
                </div>
                <span className="text-[hsl(45_85%_52%)] font-semibold">{book.rating}</span>
                <span className="text-[hsl(240_5%_45%)] text-sm">({book.reviewCount.toLocaleString()} {t.book.reviews})</span>
              </div>

              <p className={`text-[hsl(240_5%_60%)] leading-relaxed mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {description}
              </p>

              {/* Meta info */}
              <div className={`grid grid-cols-2 gap-3 mb-6 text-sm ${isRTL ? 'text-right' : ''}`}>
                {[
                  { label: t.book.pages, value: `${book.pages} ${language === 'ar' ? 'صفحة' : 'pages'}` },
                  { label: t.book.format, value: book.format === 'both' ? (language === 'ar' ? 'رقمي + مادي' : 'Digital + Physical') : book.format },
                  { label: t.book.publishedDate, value: new Date(book.publishedDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long' }) },
                  { label: t.book.language, value: book.language === 'ar' ? t.common.arabic : book.language === 'en' ? t.common.english : `${t.common.arabic} / ${t.common.english}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[hsl(240_14%_7%)] rounded-xl p-3 border border-[hsl(240_12%_14%)]">
                    <p className="text-[hsl(240_5%_45%)] text-xs mb-1">{label}</p>
                    <p className="text-[hsl(240_5%_80%)] font-medium text-xs">{value}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className={`flex items-baseline gap-3 mb-6 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span className="text-3xl font-bold text-gradient-gold font-cinematic">
                  {book.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                </span>
                {book.originalPrice && (
                  <span className="text-[hsl(240_5%_40%)] text-lg line-through">
                    {book.originalPrice} {language === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                )}
              </div>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.button
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-xl font-bold glow-gold ${isRTL ? 'flex-row-reverse' : ''}`}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px hsl(45 85% 52% / 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="button-buy-now"
                >
                  <ShoppingCart size={18} />
                  {t.book.buyNow}
                </motion.button>
                <motion.button
                  className={`flex items-center gap-2 px-6 py-3 bg-[hsl(240_14%_10%)] border border-[hsl(240_12%_22%)] text-[hsl(240_5%_80%)] rounded-xl font-medium hover:border-[hsl(45_85%_52%/0.4)] hover:text-[hsl(45_85%_52%)] transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="button-read-sample"
                >
                  <BookOpen size={18} />
                  {t.book.readSample}
                </motion.button>
              </div>

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {book.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-[hsl(240_12%_10%)] border border-[hsl(240_12%_18%)] text-[hsl(240_5%_50%)] text-xs rounded-full">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Trailer */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-4 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.book.trailer}
              </h2>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] cursor-pointer group">
                <img src={book.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[hsl(45_85%_52%/0.9)] flex items-center justify-center shadow-[0_0_30px_hsl(45_85%_52%/0.5)]"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={22} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)] ml-1" />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Ambient Music */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-4 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.book.ambientMusic}
              </h2>
              <div className={`flex items-center gap-4 p-4 rounded-xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[hsl(270_50%_15%)] flex items-center justify-center flex-shrink-0">
                  <Music size={20} className="text-[hsl(270_55%_65%)]" />
                </div>
                <div className="flex-1">
                  <p className={`text-[hsl(240_5%_80%)] text-sm font-medium ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {language === 'ar' ? `موسيقى ${title}` : `${title} Ambient Score`}
                  </p>
                  <div className="mt-2 h-1 bg-[hsl(240_12%_14%)] rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-[hsl(270_55%_48%)] to-[hsl(45_85%_52%)] rounded-full" />
                  </div>
                </div>
                <motion.button
                  className="w-10 h-10 rounded-full bg-[hsl(45_85%_52%)] flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-play-ambient"
                >
                  <Play size={14} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)] ml-0.5" />
                </motion.button>
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {language === 'ar' ? 'المراجعات' : 'Reviews'}
              </h2>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className={`p-4 rounded-xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(45_85%_52%)] to-[hsl(270_55%_48%)] flex items-center justify-center">
                          <span className="text-xs font-bold text-[hsl(240_15%_4%)]">
                            {(language === 'ar' ? review.nameAr : review.nameEn).charAt(0)}
                          </span>
                        </div>
                        <span className={`text-[hsl(240_5%_75%)] text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'ar' ? review.nameAr : review.nameEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= review.rating ? 'fill-[hsl(45_85%_52%)] text-[hsl(45_85%_52%)]' : 'text-[hsl(240_12%_22%)]'} />
                        ))}
                      </div>
                    </div>
                    <p className={`text-[hsl(240_5%_55%)] text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? review.textAr : review.textEn}
                    </p>
                  </div>
                ))}
              </div>
              <motion.button
                className="mt-4 w-full py-3 rounded-xl border border-[hsl(240_12%_18%)] text-[hsl(240_5%_60%)] text-sm hover:border-[hsl(45_85%_52%/0.3)] hover:text-[hsl(45_85%_52%)] transition-all duration-200"
                whileHover={{ scale: 1.01 }}
                data-testid="button-write-review"
              >
                {t.book.writeReview}
              </motion.button>
            </motion.section>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="p-5 rounded-2xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)]">
                <div className={`text-2xl font-bold text-gradient-gold font-cinematic mb-1 ${isRTL ? 'text-right' : ''}`}>
                  {book.price} {language === 'ar' ? 'ر.س' : 'SAR'}
                </div>
                {book.originalPrice && (
                  <div className={`text-[hsl(240_5%_40%)] text-sm line-through mb-3 ${isRTL ? 'text-right' : ''}`}>
                    {book.originalPrice} {language === 'ar' ? 'ر.س' : 'SAR'}
                  </div>
                )}
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(40_90%_48%)] text-[hsl(240_15%_4%)] rounded-xl font-bold mb-3 glow-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="sidebar-buy-now"
                >
                  {t.book.buyNow}
                </motion.button>
                <motion.button
                  className="w-full py-3 border border-[hsl(240_12%_22%)] text-[hsl(240_5%_70%)] rounded-xl font-medium hover:border-[hsl(45_85%_52%/0.4)] hover:text-[hsl(45_85%_52%)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  data-testid="sidebar-read-sample"
                >
                  {t.book.readSample}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <section className="mt-16">
            <h2 className={`text-2xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
              {t.book.recommendedBooks}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommended.map((b, i) => (
                <BookCard key={b.id} book={b} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
