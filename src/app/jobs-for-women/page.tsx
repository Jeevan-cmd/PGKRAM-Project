'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { ClipboardCheck, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function JobsForWomenPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('jobsForWomen')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-amber-200 to-yellow-300 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <ClipboardCheck className="mb-4 h-16 w-16 text-slate-800" />
              <h3 className="mb-4 font-headline text-2xl font-bold text-slate-900">
                {t('privateJobsForWomen')}
              </h3>
              <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/jobs?sector=Private">{t('clickHere')}</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-200 to-yellow-300 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <ClipboardList className="mb-4 h-16 w-16 text-slate-800" />
              <h3 className="mb-4 font-headline text-2xl font-bold text-slate-900">
                {t('governmentJobsForWomen')}
              </h3>
              <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                <Link href="/jobs?sector=Government">{t('clickHere')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
