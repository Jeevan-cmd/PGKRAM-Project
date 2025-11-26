'use client';
import {
  BriefcaseBusiness,
  Building2,
  HeartHandshake,
  Lightbulb,
  Shield,
  User,
  Wrench,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { jobs } from '@/lib/data';
import imageData from '@/lib/placeholder-images.json';

const { placeholderImages } = imageData;

const heroImage = placeholderImages.find((img) => img.id === 'hero-bg');

const services = [
  {
    title: 'jobs',
    icon: <BriefcaseBusiness className="size-8" />,
    href: '/jobs',
  },
  {
    title: 'skillTraining',
    icon: <Wrench className="size-8" />,
    href: '/skills',
  },
  {
    title: 'selfEmployment',
    icon: <Lightbulb className="size-8" />,
    href: '/business-support',
  },
  {
    title: 'jobsForWomen',
    icon: <User className="size-8" />,
    href: '/jobs-for-women',
  },
  {
    title: 'jobsForPersonsWithDisability',
    icon: <HeartHandshake className="size-8" />,
    href: '/jobs',
  },
  {
    title: 'inductionIntoArmedForces',
    icon: <Shield className="size-8" />,
    href: '/jobs',
  },
  {
    title: 'counselling',
    icon: <GraduationCap className="size-8" />,
    href: '#',
  },
  {
    title: 'pmVikasScheme',
    icon: <Sparkles className="size-8" />,
    href: '#',
  },
];

export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('dashboard')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8">
            <h1 className="font-headline text-3xl font-bold text-white md:text-5xl">
              {t('punjabOpportunitiesHub')}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-primary-foreground/90">
              {t('hubTagline')}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-headline mb-4 text-center text-2xl font-bold">
            {t('ourServices')}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="flex h-full flex-col items-center justify-center p-4 text-center transition-all hover:shadow-lg">
                  <div
                    className="mb-3 flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary"
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-headline text-sm font-semibold">
                    {t(service.title)}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <BriefcaseBusiness className="text-primary" />
                {t('findYourNextJob')}
              </CardTitle>
              <CardDescription>{t('findYourNextJobDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{t('findYourNextJobPara')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/jobs">{t('browseJobs')}</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Wrench className="text-primary" />
                {t('developYourSkills')}
              </CardTitle>
              <CardDescription>{t('developYourSkillsDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{t('developYourSkillsPara')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/skills">{t('exploreResources')}</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Building2 className="text-primary" />
                {t('growYourBusiness')}
              </CardTitle>
              <CardDescription>{t('growYourBusinessDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{t('growYourBusinessPara')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/business-support">{t('businessDirectory')}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="border-accent bg-accent/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
              <Lightbulb className="text-accent" />
              {t('aiPoweredResumeAnalysis')}
            </CardTitle>
            <CardDescription>
              {t('aiPoweredResumeAnalysisDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-semibold text-foreground">
                {t('aiResumeAnalyzer')}
              </h3>
              <p className="text-muted-foreground">
                {t('aiResumeAnalyzerDesc')}
              </p>
              <Button asChild variant="link" className="px-0">
                <Link href="/resume-analyzer">
                  {t('analyzeYourResume')} &rarr;
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline mb-4 text-2xl font-bold">
            {t('featuredJobOpenings')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <Card key={job.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline flex items-start justify-between gap-4">
                    <span>{t(job.title)}</span>
                    <Badge variant="secondary">{t(job.type)}</Badge>
                  </CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {job.location}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {t('viewDetails')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
