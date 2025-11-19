'use client';
import { PageHeader } from '@/components/layout/page-header';
import { ResumeAnalyzerForm } from './resume-analyzer-form';
import { useLanguage } from '@/context/language-context';

export default function ResumeAnalyzerPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('aiResumeAnalyzer')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <ResumeAnalyzerForm />
      </div>
    </div>
  );
}
