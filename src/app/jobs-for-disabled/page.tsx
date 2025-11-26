'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function JobsForDisabledPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('jobsForPersonsWithDisability')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline flex items-center gap-2'>
                        <HeartHandshake className='text-primary'/>
                        {t('shellBunkJobsTitle')}
                    </CardTitle>
                    <CardDescription>
                        {t('shellBunkJobsDesc')}
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 text-muted-foreground'>
                    <p>
                        {t('shellBunkJobsPara1')}
                    </p>
                     <p>
                        {t('shellBunkJobsPara2')}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/jobs?category=PWD">{t('viewAvailableRoles')}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
