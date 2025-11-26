
'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';
import { selfEmploymentSchemes, type SelfEmploymentScheme } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function BusinessSupportPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] =
    useState<SelfEmploymentScheme | null>(null);

  const handleInterestClick = (schemeName: string) => {
    toast({
      title: 'Your interest has been recorded!',
      description: `Thank you for your interest in ${t(
        schemeName
      )}. One of our executives will contact you shortly.`,
    });
  };

  const handleViewDetailsClick = (scheme: SelfEmploymentScheme) => {
    setSelectedScheme(scheme);
  };

  const closeModal = () => {
    setSelectedScheme(null);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('businessSupport')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-lg text-muted-foreground">
            {t('selfEmploymentDesc')}
          </p>

          <div className="space-y-4">
            {selfEmploymentSchemes.map((scheme) => (
              <Card key={scheme.id} className="overflow-hidden">
                <CardHeader className="bg-primary/10">
                  <CardTitle className="font-headline text-lg text-primary">
                    {t(scheme.name)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold">
                            {t('marginMoney')}:
                          </span>{' '}
                          {scheme.marginMoney}
                        </div>
                        <div>
                          <span className="font-semibold">
                            {t('loanAmount')}:
                          </span>{' '}
                          {scheme.loanAmount}
                        </div>
                        <div>
                          <span className="font-semibold">
                            {t('subsidyComponent')}:
                          </span>{' '}
                          {scheme.subsidyComponent}
                        </div>
                        <div>
                          <span className="font-semibold">
                            {t('collateralFreeLoan')}:
                          </span>{' '}
                          {scheme.collateralFree ? t('Yes') : t('No')}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <Link href="#" className="text-primary hover:underline">
                          {t('checklist')}
                        </Link>
                        <Link href="#" className="text-primary hover:underline">
                          {t('applicationLink')}
                        </Link>
                        <Link href="#" className="text-primary hover:underline">
                          {t('applicationForm')}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 md:items-end">
                      <Button
                        className="w-full md:w-auto"
                        onClick={() => handleInterestClick(scheme.name)}
                      >
                        {t('interested')}
                      </Button>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-muted-foreground"
                        onClick={() => handleViewDetailsClick(scheme)}
                      >
                        {t('viewDetails')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/80 px-4 py-2 text-primary-foreground">
                  <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm font-semibold">
                    <span>{t('forMoreDetails')}:</span>
                    <span>
                      DBEE: {scheme.dbee}
                    </span>
                    <span>
                      CONTACT: {scheme.contact}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedScheme} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className="sm:max-w-3xl">
          {selectedScheme && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  {t(selectedScheme.name)}
                </DialogTitle>
                <DialogDescription>
                  {t('schemeDetails')}
                </DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm max-h-[60vh] overflow-y-auto py-4 text-sm text-muted-foreground">
                <h3 className='font-semibold text-foreground'>{t('schemeObjective')}</h3>
                <p>{t(selectedScheme.details.objective)}</p>
                <h3 className='font-semibold text-foreground'>{t('eligibility')}</h3>
                <p>{t(selectedScheme.details.eligibility)}</p>
                <h3 className='font-semibold text-foreground'>{t('benefits')}</h3>
                <p>{t(selectedScheme.details.benefits)}</p>
                 <h3 className='font-semibold text-foreground'>{t('howToApply')}</h3>
                <p>{t(selectedScheme.details.applicationProcess)}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>
                  {t('close')}
                </Button>
                 <Button onClick={() => {
                    handleInterestClick(selectedScheme.name);
                    closeModal();
                }}>
                  {t('interested')}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
