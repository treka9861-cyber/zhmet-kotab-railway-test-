import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music, Film, Clock } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useLanguage } from '@/i18n/LanguageContext';
import { mediaItems, MediaItem, getMediaByType } from '@/services/mock/media';

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const { isRTL, language } = useLanguage();
  const title = language === 'ar' ? item.titleAr : item.titleEn;
  const description = language === 'ar' ? item.descriptionAr : item.descriptionEn;

  const iconMap = {
    trailer: Film,
    music: Music,
    video: Film,
  };
  const Icon = iconMap[item.type];

  return (
    <motion.div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-[hsl(240_14%_7%)] border border-[hsl(240_12%_14%)] hover:border-[hsl(45_85%_52%/0.3)] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      data-testid={`media-card-${item.id}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[hsl(240_15%_4%/0.4)] group-hover:bg-[hsl(240_15%_4%/0.3)] transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full bg-[hsl(45_85%_52%/0.9)] flex items-center justify-center shadow-[0_0_20px_hsl(45_85%_52%/0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Play size={18} fill="hsl(240 15% 4%)" className="text-[hsl(240_15%_4%)] ml-0.5" />
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} flex items-center gap-1 px-2 py-1 bg-[hsl(240_15%_4%/0.8)] rounded-lg text-xs text-[hsl(240_5%_70%)]`}>
          <Clock size={10} />
          {item.duration}
        </div>

        {/* Type badge */}
        <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
          item.type === 'trailer' ? 'bg-[hsl(45_85%_52%/0.15)] border border-[hsl(45_85%_52%/0.3)] text-[hsl(45_85%_52%)]' :
          item.type === 'music' ? 'bg-[hsl(270_55%_48%/0.15)] border border-[hsl(270_55%_48%/0.3)] text-[hsl(270_55%_70%)]' :
          'bg-[hsl(200_70%_50%/0.15)] border border-[hsl(200_70%_50%/0.3)] text-[hsl(200_70%_65%)]'
        }`}>
          <Icon size={10} />
          {item.type === 'trailer' ? (language === 'ar' ? 'إعلان' : 'Trailer') :
           item.type === 'music' ? (language === 'ar' ? 'موسيقى' : 'Music') :
           (language === 'ar' ? 'فيديو' : 'Video')}
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-semibold text-[hsl(240_5%_85%)] text-sm mb-1 line-clamp-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {title}
        </h3>
        <p className={`text-[hsl(240_5%_48%)] text-xs line-clamp-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

type TabType = 'all' | 'trailer' | 'music' | 'video';

export function MediaPage() {
  const { t, isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs: { id: TabType; label: string; icon: typeof Film }[] = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All', icon: Film },
    { id: 'trailer', label: t.media.trailers, icon: Film },
    { id: 'music', label: t.media.music, icon: Music },
    { id: 'video', label: t.media.videos, icon: Film },
  ];

  const filteredItems = activeTab === 'all' ? mediaItems : getMediaByType(activeTab);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.media.title}
          subtitle={t.media.subtitle}
        />

        {/* Tabs */}
        <div className={`flex items-center gap-2 mb-8 border-b border-[hsl(240_12%_14%)] pb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-[hsl(45_85%_52%/0.1)] text-[hsl(45_85%_52%)] border border-[hsl(45_85%_52%/0.3)]'
                  : 'text-[hsl(240_5%_55%)] hover:text-[hsl(240_5%_80%)] border border-transparent'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              data-testid={`media-tab-${id}`}
            >
              <Icon size={14} />
              {label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.map((item, i) => (
              <MediaCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
