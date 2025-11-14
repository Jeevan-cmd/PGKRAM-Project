import { PageHeader } from '@/components/layout/page-header';
import { JobMatcherForm } from './job-matcher-form';

export default function JobMatcherPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Intelligent Job Matching" />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <JobMatcherForm />
      </div>
    </div>
  );
}
