import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Book } from '@/services/mock/books';
import { useLanguage } from '@/i18n/LanguageContext';

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

export function BookCard({ book, variant = 'default', index = 0 }: BookCardProps) {
  const { t, isRTL, language } = useLanguage();

  const title = language === 'ar' ? book.titleAr : book.titleEn;
  const authorName = language === 'ar' ? book.authorNameAr : book.authorNameEn;
  const discount = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : null;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      data-testid={`card-book-${book.id}`}
    >
      <Link href={`/book/${book.id}`}>
        <div className="cursor-pointer rounded-2xl overflow-hidden bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] transition-all duration-400 hover:border-[hsl(45_85%_52%/0.3)] hover:-translate-y-2 hover:shadow-[0_20px_50px_hsl(45_85%_52%/0.15)]">
          {/* Cover Image */}
          <div className={`relative overflow-hidden shimmer-overlay ${
            variant === 'compact' ? 'aspect-[2/3] h-48' : 'aspect-[2/3]'
          }`}>
            <img
              src={book.coverUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240_14%_7%)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} flex flex-col gap-1.5`}>
              {book.isNew && (
                <span className="px-2 py-0.5 bg-[hsl(45_85%_52%)] text-[hsl(240_15%_4%)] text-xs font-bold rounded-md">
                  {isRTL ? 'جديد' : 'NEW'}
                </span>
              )}
              {discount && (
                <span className="px-2 py-0.5 bg-[hsl(0_72%_51%)] text-white text-xs font-bold rounded-md">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="flex gap-2">
                <motion.button
                  className="flex items-center gap-1.5 px-3 py-2 bg-[hsl(45_85%_52%)] text-[hsl(240_15%_4%)] rounded-lg text-xs font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.preventDefault()}
                  data-testid={`button-add-to-cart-${book.id}`}
                >
                  <ShoppingCart size={12} />
                  {t.book.addToCart}
                </motion.button>
                <motion.button
                  className="flex items-center gap-1.5 px-3 py-2 bg-[hsl(240_12%_15%)] border border-[hsl(240_12%_22%)] text-[hsl(240_5%_85%)] rounded-lg text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.preventDefault()}
                  data-testid={`button-preview-${book.id}`}
                >
                  <Eye size={12} />
                  {t.book.preview}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-[hsl(45_20%_90%)] leading-tight line-clamp-2 ${
                  isRTL ? 'font-arabic text-sm' : 'text-sm'
                }`}>
                  {title}
                </h3>
                <p className="text-[hsl(240_5%_50%)] text-xs mt-1">{authorName}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={10}
                    className={star <= Math.round(book.rating) ? 'fill-[hsl(45_85%_52%)] text-[hsl(45_85%_52%)]' : 'text-[hsl(240_12%_25%)]'}
                  />
                ))}
              </div>
              <span className="text-[hsl(240_5%_48%)] text-xs">{book.rating}</span>
              <span className="text-[hsl(240_5%_35%)] text-xs">({book.reviewCount.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[hsl(45_85%_52%)] font-bold text-base">
                {book.price} {t.common.currency}
              </span>
              {book.originalPrice && (
                <span className="text-[hsl(240_5%_38%)] text-sm line-through">
                  {book.originalPrice} {t.common.currency}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
