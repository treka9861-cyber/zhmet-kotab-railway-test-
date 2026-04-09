import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Star, BookOpen, Users, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { AuthorCard } from '@/components/AuthorCard';
import { BookCard } from '@/components/BookCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useLanguage } from '@/i18n/LanguageContext';
import { authors, getAuthorById } from '@/services/mock/authors';
import { getBooksByAuthor } from '@/services/mock/books';

export function AuthorsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.authors.title}
          subtitle={t.authors.subtitle}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author, i) => (
            <AuthorCard key={author.id} author={author} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuthorDetail() {
  const { t, isRTL, language } = useLanguage();
  const [, params] = useRoute('/authors/:id');
  const author = getAuthorById(params?.id || '');

  if (!author) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[hsl(240_5%_60%)] text-xl mb-4">{t.common.notFound}</h2>
          <Link href="/authors">
            <span className="text-[hsl(45_85%_52%)] cursor-pointer hover:underline">{t.common.backToHome}</span>
          </Link>
        </div>
      </div>
    );
  }

  const name = language === 'ar' ? author.nameAr : author.nameEn;
  const bio = language === 'ar' ? author.bioAr : author.bioEn;
  const authorBooks = getBooksByAuthor(author.id);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at top, hsl(270 50% 20%) 0%, hsl(240 15% 4%) 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <Link href="/authors">
            <motion.span
              className={`inline-flex items-center gap-2 text-[hsl(240_5%_55%)] hover:text-[hsl(45_85%_52%)] text-sm cursor-pointer transition-colors mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ x: isRTL ? 3 : -3 }}
            >
              {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {t.authors.title}
            </motion.span>
          </Link>

          <div className={`flex flex-col sm:flex-row gap-6 items-start ${isRTL ? 'sm:flex-row-reverse text-right' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img
                  src={author.imageUrl}
                  alt={name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-[hsl(45_85%_52%/0.3)] shadow-[0_0_30px_hsl(45_85%_52%/0.2)]"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[hsl(45_85%_52%)] rounded-full flex items-center justify-center">
                  <Star size={14} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className={`text-3xl font-bold text-[hsl(45_20%_92%)] mb-1 ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
                {name}
              </h1>
              <p className="text-[hsl(240_5%_50%)] text-sm mb-3">{author.nationality}</p>

              <div className={`flex items-center gap-4 mb-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { icon: BookOpen, value: author.bookCount, label: t.authors.books, color: 'text-[hsl(45_85%_52%)]' },
                  { icon: Users, value: `${(author.readerCount / 1000).toFixed(0)}k`, label: t.authors.readers, color: 'text-[hsl(270_55%_65%)]' },
                  { icon: Star, value: author.rating, label: t.authors.rating, color: 'text-[hsl(45_85%_52%)]', fill: true },
                ].map(({ icon: Icon, value, label, color, fill }) => (
                  <div key={label} className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon size={15} className={color} {...(fill ? { fill: 'currentColor' } : {})} />
                    <span className={`text-[hsl(240_5%_80%)] font-semibold`}>{value}</span>
                    <span className="text-[hsl(240_5%_48%)] text-sm">{label}</span>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {author.genres.map((g) => (
                  <span key={g} className="px-2.5 py-1 bg-[hsl(270_45%_12%)] text-[hsl(270_55%_70%)] text-xs rounded-lg">
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Bio */}
          <div className="lg:col-span-2">
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-4 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {t.authors.biography}
              </h2>
              <p className={`text-[hsl(240_5%_60%)] leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {bio}
              </p>
            </motion.section>

            {/* Books */}
            <section>
              <h2 className={`text-xl font-bold text-[hsl(45_20%_90%)] mb-6 ${isRTL ? 'font-arabic text-right' : 'font-cinematic'}`}>
                {language === 'ar' ? 'مؤلفات الكاتب' : 'Author\'s Works'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {authorBooks.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <div className="p-5 rounded-2xl bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] space-y-4">
                <h3 className={`text-sm font-semibold text-[hsl(240_5%_70%)] uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' ? 'التواصل مع الكاتب' : 'Connect'}
                </h3>
                {author.socialLinks.twitter && (
                  <a
                    href={`https://twitter.com/${author.socialLinks.twitter}`}
                    className={`flex items-center gap-3 text-[hsl(240_5%_60%)] hover:text-[hsl(45_85%_52%)] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <FaTwitter size={16} />
                    <span className="text-sm">{author.socialLinks.twitter}</span>
                  </a>
                )}
                {author.socialLinks.instagram && (
                  <a
                    href={`https://instagram.com/${author.socialLinks.instagram}`}
                    className={`flex items-center gap-3 text-[hsl(240_5%_60%)] hover:text-[hsl(45_85%_52%)] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <FaInstagram size={16} />
                    <span className="text-sm">{author.socialLinks.instagram}</span>
                  </a>
                )}
                {author.socialLinks.website && (
                  <a
                    href={`https://${author.socialLinks.website}`}
                    className={`flex items-center gap-3 text-[hsl(240_5%_60%)] hover:text-[hsl(45_85%_52%)] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Globe size={16} />
                    <span className="text-sm">{author.socialLinks.website}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
