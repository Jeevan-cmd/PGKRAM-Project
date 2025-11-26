'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/language-context';
import { counsellingSessions } from '@/lib/counselling-data';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import imageData from '@/lib/placeholder-images.json';

const { placeholderImages } = imageData;
const heroImage = placeholderImages.find((img) => img.id === 'hero-bg');

export default function CounsellingPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleInterestClick = (sessionTitle: string) => {
    toast({
      title: 'Your interest has been recorded!',
      description: `Thank you for your interest in the ${sessionTitle}. We will notify you with more details.`,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('counselling')} />
      <div className="flex-1 overflow-y-auto">
        <div className="relative bg-black py-12 text-white">
           {heroImage && (
             <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              data-ai-hint={heroImage.imageHint}
            />
           )}
          <div className="container relative mx-auto max-w-5xl px-4">
            <h1 className="font-headline text-3xl font-bold md:text-4xl">
              {t('counsellingSession')}
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Select>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={t('counsellingType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="career">{t('careerCounselling')}</SelectItem>
                  <SelectItem value="study">{t('studyAbroadCounselling')}</SelectItem>
                  <SelectItem value="skill">{t('skillGapCounselling')}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={t('mode')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">{t('inPerson')}</SelectItem>
                  <SelectItem value="online">{t('online')}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={t('level')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10th">{t('10thPass')}</SelectItem>
                  <SelectItem value="12th">{t('12thPass')}</SelectItem>
                  <SelectItem value="graduate">{t('graduate')}</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg">{t('search')}</Button>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-4 md:p-8">
          <h2 className="font-headline text-2xl font-bold">
            {t('upcomingCounsellingSessions')}
          </h2>
          <div className="space-y-4">
            {counsellingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="flex-1">
                    <h3 className="font-headline font-semibold">
                      {t(session.title)}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {session.startDate} - {session.endDate}
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="mt-1 inline-block text-sm text-primary hover:underline"
                    >
                      {t('viewDetails')}
                    </Link>
                  </div>
                  <Button onClick={() => handleInterestClick(t(session.title))}>
                    {t('interested')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
