import { PageHeader } from '@/components/layout/page-header';
import { ResumeAnalyzerForm } from './resume-analyzer-form';

export default function ResumeAnalyzerPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="AI Resume Analyzer" />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <ResumeAnalyzerForm />
      </div>
    </div>
  );
}
