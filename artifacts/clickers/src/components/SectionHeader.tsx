import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  align?: 'start' | 'center';
}

export function SectionHeader({ title, subtitle, viewAllHref, align = 'start' }: SectionHeaderProps) {
  const { t, isRTL } = useLanguage();

  return (
    <motion.div
      className={`flex items-end justify-between mb-8 gap-4 ${align === 'center' ? 'flex-col items-center text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className={`text-2xl md:text-3xl font-bold text-[hsl(45_20%_90%)] mb-2 ${isRTL ? 'font-arabic' : 'font-cinematic'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[hsl(240_5%_50%)] text-sm md:text-base max-w-lg">{subtitle}</p>
        )}
      </div>
      {viewAllHref && align !== 'center' && (
        <Link href={viewAllHref}>
          <motion.span
            className={`flex items-center gap-1.5 text-[hsl(45_85%_52%)] text-sm font-medium whitespace-nowrap cursor-pointer hover:gap-2.5 transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            whileHover={{ x: isRTL ? -3 : 3 }}
          >
            {t.common.viewAll}
            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </motion.span>
        </Link>
      )}
    </motion.div>
  );
}
