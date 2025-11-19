'use client';
import { PageHeader } from '@/components/layout/page-header';
import { JobMatcherForm } from './job-matcher-form';
import { useLanguage } from '@/context/language-context';

export default function JobMatcherPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('intelligentJobMatching')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <JobMatcherForm />
      </div>
    </div>
  );
}
