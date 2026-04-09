import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { World } from '@/services/mock/worlds';
import { useLanguage } from '@/i18n/LanguageContext';

interface WorldCardProps {
  world: World;
  index?: number;
}

export function WorldCard({ world, index = 0 }: WorldCardProps) {
  const { t, isRTL, language } = useLanguage();

  const name = language === 'ar' ? world.nameAr : world.nameEn;
  const tagline = language === 'ar' ? world.taglineAr : world.taglineEn;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`card-world-${world.id}`}
    >
      <Link href={`/worlds/${world.id}`}>
        <div className="cursor-pointer relative rounded-2xl overflow-hidden aspect-[16/9] border border-[hsl(240_12%_14%)] group-hover:border-[hsl(45_85%_52%/0.4)] transition-all duration-400">
          {/* Background Image */}
          <img
            src={world.bannerUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240_15%_4%)] via-[hsl(240_15%_4%/0.5)] to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at center, ${world.primaryColor}/20 0%, transparent 70%)` }}
          />

          {/* Content */}
          <div className={`absolute inset-0 flex flex-col justify-end p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <span className="px-2.5 py-1 bg-[hsl(45_85%_52%/0.15)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)] text-xs font-medium rounded-full backdrop-blur-sm">
                {isRTL ? 'عالم' : 'WORLD'}
              </span>
              <div className="flex items-center gap-1 text-[hsl(240_5%_60%)] text-xs">
                <BookOpen size={12} />
                <span>{world.bookCount} {t.worlds.books}</span>
              </div>
            </div>

            <h3 className={`font-bold text-xl text-white mb-2 ${isRTL ? 'font-arabic' : 'font-cinematic'} transition-all duration-300`}>
              {name}
            </h3>
            <p className="text-[hsl(240_5%_65%)] text-sm line-clamp-2 mb-4">{tagline}</p>

            <motion.div
              className={`flex items-center gap-2 text-[hsl(45_85%_52%)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{t.worlds.explore}</span>
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
