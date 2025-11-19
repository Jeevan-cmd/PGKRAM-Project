import {
  BriefcaseBusiness,
  Building2,
  Lightbulb,
  Wrench,
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
import { jobs } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';

const heroImage = placeholderImages.find((img) => img.id === 'hero-bg');

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Dashboard" />
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
              Punjab Opportunities Hub
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-primary-foreground/90">
              Your gateway to jobs, skills, and business growth in Punjab.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <BriefcaseBusiness className="text-primary" />
                Find Your Next Job
              </CardTitle>
              <CardDescription>
                Explore thousands of job openings across Punjab.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Search and filter through a comprehensive list of public and
                private sector jobs.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Wrench className="text-primary" />
                Develop Your Skills
              </CardTitle>
              <CardDescription>
                Access curated skill development programs and resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Upskill and reskill with courses relevant to the Punjab job
                market.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/skills">Explore Resources</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Building2 className="text-primary" />
                Grow Your Business
              </CardTitle>
              <CardDescription>
                Find support and resources to start or expand your business.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Our directory connects you with grants, mentorship, and other
                services.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/business-support">Business Directory</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="bg-accent/50 border-accent">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
              <Lightbulb className="text-accent" />
              AI-Powered Resume Analysis
            </CardTitle>
            <CardDescription>
              Let our AI help you optimize your resume for success.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-semibold text-foreground">
                AI Resume Analyzer
              </h3>
              <p className="text-muted-foreground">
                Get an instant analysis of your resume, including an ATS score and
                actionable feedback to improve your chances.
              </p>
              <Button asChild variant="link" className="px-0">
                <Link href="/resume-analyzer">Analyze Your Resume &rarr;</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline mb-4 text-2xl font-bold">
            Featured Job Openings
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <Card key={job.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline flex items-start justify-between gap-4">
                    <span>{job.title}</span>
                    <Badge variant="secondary">{job.type}</Badge>
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
                    View Details
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
