import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { BookCard } from '@/components/BookCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useLanguage } from '@/i18n/LanguageContext';
import { books, Book } from '@/services/mock/books';

type SortOption = 'newest' | 'popular' | 'priceAsc' | 'priceDesc';
type GenreFilter = 'all' | 'Fantasy' | 'Sci-Fi' | 'Historical' | 'Horror' | 'Romance' | 'Adventure' | 'Literary' | 'Mystery';
type FormatFilter = 'all' | 'digital' | 'physical';

export function Store() {
  const { t, isRTL, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>('all');
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const genres: GenreFilter[] = ['all', 'Fantasy', 'Sci-Fi', 'Historical', 'Horror', 'Romance', 'Adventure', 'Literary', 'Mystery'];
  const genreLabels: Record<GenreFilter, string> = {
    all: language === 'ar' ? 'الكل' : 'All',
    Fantasy: language === 'ar' ? 'الخيال' : 'Fantasy',
    'Sci-Fi': language === 'ar' ? 'الخيال العلمي' : 'Sci-Fi',
    Historical: language === 'ar' ? 'التاريخي' : 'Historical',
    Horror: language === 'ar' ? 'الرعب' : 'Horror',
    Romance: language === 'ar' ? 'الرومانسية' : 'Romance',
    Adventure: language === 'ar' ? 'المغامرة' : 'Adventure',
    Literary: language === 'ar' ? 'الأدبي' : 'Literary',
    Mystery: language === 'ar' ? 'الغموض' : 'Mystery',
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) =>
        b.titleAr.includes(q) ||
        b.titleEn.toLowerCase().includes(q) ||
        b.authorNameAr.includes(q) ||
        b.authorNameEn.toLowerCase().includes(q)
      );
    }

    if (selectedGenre !== 'all') {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    if (selectedFormat !== 'all') {
      result = result.filter((b) => b.format === selectedFormat || b.format === 'both');
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [search, selectedGenre, selectedFormat, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.store.title}
          subtitle={t.store.subtitle}
        />

        {/* Search and Filter Bar */}
        <motion.div
          className={`flex flex-col sm:flex-row gap-3 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-[hsl(240_5%_42%)] ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.nav.search}
              className={`w-full bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_16%)] rounded-xl py-2.5 text-sm text-[hsl(240_5%_80%)] placeholder:text-[hsl(240_5%_38%)] focus:outline-none focus:border-[hsl(45_85%_52%/0.5)] transition-colors ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
              data-testid="store-search"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_16%)] rounded-xl px-4 py-2.5 text-sm text-[hsl(240_5%_80%)] focus:outline-none focus:border-[hsl(45_85%_52%/0.5)] transition-colors cursor-pointer"
            data-testid="store-sort"
          >
            <option value="popular">{t.store.popular}</option>
            <option value="newest">{t.store.newest}</option>
            <option value="priceAsc">{t.store.priceAsc}</option>
            <option value="priceDesc">{t.store.priceDesc}</option>
          </select>

          {/* Filter toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm font-medium ${
              showFilters
                ? 'bg-[hsl(45_85%_52%/0.1)] border-[hsl(45_85%_52%/0.5)] text-[hsl(45_85%_52%)]'
                : 'bg-[hsl(240_14%_7%)] border-[hsl(240_12%_16%)] text-[hsl(240_5%_70%)] hover:border-[hsl(45_85%_52%/0.3)]'
            } ${isRTL ? 'flex-row-reverse' : ''}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            data-testid="filter-toggle"
          >
            <SlidersHorizontal size={15} />
            {t.store.filters}
          </motion.button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mb-6 p-4 bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_16%)] rounded-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`flex flex-col sm:flex-row gap-6 ${isRTL ? 'sm:flex-row-reverse text-right' : ''}`}>
                {/* Genre filter */}
                <div className="flex-1">
                  <p className="text-[hsl(240_5%_70%)] text-xs font-medium mb-3 uppercase tracking-wide">
                    {t.store.allGenres}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGenre(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedGenre === g
                            ? 'bg-[hsl(45_85%_52%)] text-[hsl(240_15%_4%)]'
                            : 'bg-[hsl(240_12%_10%)] text-[hsl(240_5%_60%)] hover:bg-[hsl(240_12%_14%)]'
                        }`}
                        data-testid={`genre-filter-${g}`}
                      >
                        {genreLabels[g]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format filter */}
                <div>
                  <p className="text-[hsl(240_5%_70%)] text-xs font-medium mb-3 uppercase tracking-wide">
                    {t.store.format}
                  </p>
                  <div className="flex gap-2">
                    {(['all', 'digital', 'physical'] as FormatFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFormat(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedFormat === f
                            ? 'bg-[hsl(45_85%_52%)] text-[hsl(240_15%_4%)]'
                            : 'bg-[hsl(240_12%_10%)] text-[hsl(240_5%_60%)] hover:bg-[hsl(240_12%_14%)]'
                        }`}
                        data-testid={`format-filter-${f}`}
                      >
                        {f === 'all' ? (language === 'ar' ? 'الكل' : 'All') : f === 'digital' ? t.store.digital : t.store.physical}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {(selectedGenre !== 'all' || selectedFormat !== 'all' || search) && (
          <div className={`flex items-center gap-2 mb-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-[hsl(240_5%_48%)] text-xs">{language === 'ar' ? 'الفلاتر:' : 'Filters:'}</span>
            {selectedGenre !== 'all' && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-[hsl(45_85%_52%/0.1)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)] text-xs rounded-full">
                {genreLabels[selectedGenre]}
                <button onClick={() => setSelectedGenre('all')}><X size={10} /></button>
              </span>
            )}
            {selectedFormat !== 'all' && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-[hsl(45_85%_52%/0.1)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)] text-xs rounded-full">
                {selectedFormat}
                <button onClick={() => setSelectedFormat('all')}><X size={10} /></button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className={`text-[hsl(240_5%_48%)] text-sm mb-6 ${isRTL ? 'text-right' : ''}`}>
          {filteredBooks.length} {language === 'ar' ? 'كتاب' : 'books'}
        </p>

        {/* Books Grid */}
        <AnimatePresence mode="wait">
          {filteredBooks.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredBooks.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-[hsl(240_14%_10%)] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-[hsl(240_5%_38%)]" />
              </div>
              <h3 className={`text-[hsl(240_5%_60%)] font-semibold text-lg mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {t.store.noResults}
              </h3>
              <button
                onClick={() => { setSearch(''); setSelectedGenre('all'); setSelectedFormat('all'); }}
                className="text-[hsl(45_85%_52%)] text-sm hover:underline"
              >
                {language === 'ar' ? 'مسح الفلاتر' : 'Clear filters'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
