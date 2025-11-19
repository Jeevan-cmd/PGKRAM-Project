'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Recommendations } from './recommendations';
import { useLanguage } from '@/context/language-context';

export default function RecommendationsPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('personalizedRecommendations')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <Recommendations />
      </div>
    </div>
  );
}
