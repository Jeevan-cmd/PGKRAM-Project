import { PageHeader } from '@/components/layout/page-header';
import { Recommendations } from './recommendations';

export default function RecommendationsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Personalized Recommendations" />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <Recommendations />
      </div>
    </div>
  );
}
