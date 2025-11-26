
'use client';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/firebase';
import { jobs } from '@/lib/data';
import { MapPin, Search, Frown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Job = (typeof jobs)[0];

export default function JobsPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');
  const [qualification, setQualification] = useState('all');
  const [experience, setExperience] = useState('all');
  const [category, setCategory] = useState('all');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    toast({
      title: 'Application Sent!',
      description: `Your application for the ${t(
        selectedJob.title
      )} position has been submitted.`,
    });
    setIsApplying(false);
    setSelectedJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const translatedTitle = t(job.title).toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();

      const matchesSearch =
        lowerSearchTerm === '' ||
        translatedTitle.includes(lowerSearchTerm) ||
        job.company.toLowerCase().includes(lowerSearchTerm);

      const matchesLocation = location === 'all' || job.location === location;
      const matchesType = type === 'all' || job.type === type;
      const matchesQualification = qualification === 'all' || job.qualification === qualification;
      const matchesExperience = experience === 'all' || job.experience <= parseInt(experience);
      const matchesCategory = category === 'all' || job.category === category;

      return matchesSearch && matchesLocation && matchesType && matchesQualification && matchesExperience && matchesCategory;
    });
  }, [searchTerm, location, type, qualification, experience, category, t]);

  const locations = useMemo(() => [...new Set(jobs.map((j) => j.location))], []);
  const jobTypes = useMemo(() => [...new Set(jobs.map((j) => j.type))], []);
  const qualifications = useMemo(() => [...new Set(jobs.map((j) => j.qualification))], []);
  const categories = useMemo(() => [...new Set(jobs.map(j => j.category).filter(Boolean))] as string[], []);


  const openDetailsModal = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(false);
  };

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsApplying(false);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('jobListings')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              {t('searchJobsFormTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectJobType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allJobTypes')}</SelectItem>
                  {jobTypes.map((jobType) => (
                    <SelectItem key={jobType} value={jobType}>
                      {t(jobType)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={qualification} onValueChange={setQualification}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectQualification')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allQualifications')}</SelectItem>
                  {qualifications.map(q => <SelectItem key={q} value={q}>{t(q)}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectExperience')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('anyExperience')}</SelectItem>
                  <SelectItem value="1">Up to 1 year</SelectItem>
                  <SelectItem value="3">Up to 3 years</SelectItem>
                  <SelectItem value="5">Up to 5 years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeOfPosting')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allLocations')}</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {t(cat)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <hr className="flex-grow" />
              <span className="text-sm text-muted-foreground">OR</span>
              <hr className="flex-grow" />
            </div>
            <div className="relative">
              <Input
                placeholder={t('searchBy')}
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1" size="lg">
                <Search className="mr-2 h-4 w-4" />
                {t('searchJobs')}
              </Button>
              <Button className="flex-1" size="lg" variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                {t('searchJobsNearMe')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-3xl font-bold'>22628</CardTitle>
            </CardHeader>
            <CardFooter className='bg-primary/90 text-primary-foreground p-2 rounded-b-lg'>
              <p className='w-full text-sm'>{t('availableGovtJobs')}</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-3xl font-bold'>1187</CardTitle>
            </CardHeader>
            <CardFooter className='bg-primary/90 text-primary-foreground p-2 rounded-b-lg'>
              <p className='w-full text-sm'>{t('availablePrivateJobs')}</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-3xl font-bold'>2231191</CardTitle>
            </CardHeader>
            <CardFooter className='bg-primary/90 text-primary-foreground p-2 rounded-b-lg'>
              <p className='w-full text-sm'>{t('registeredJobSeekers')}</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='p-4'>
              <CardTitle className='text-3xl font-bold'>20535</CardTitle>
            </CardHeader>
            <CardFooter className='bg-primary/90 text-primary-foreground p-2 rounded-b-lg'>
              <p className='w-full text-sm'>{t('registeredEmployers')}</p>
            </CardFooter>
          </Card>
        </div>

        {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
                <Card
                key={job.id}
                className="flex flex-col transition-all hover:shadow-lg"
                >
                <CardHeader>
                    <CardTitle className="font-headline">{t(job.title)}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{job.location}</span>
                    </div>
                    <div className="space-x-2">
                    <Badge variant="secondary">{t(job.type)}</Badge>
                    <Badge
                        variant={
                        job.sector === 'Government' ? 'default' : 'outline'
                        }
                    >
                        {job.sector}
                    </Badge>
                    {job.category && <Badge variant="destructive">{t(job.category)}</Badge>}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1" onClick={() => openApplyModal(job)}>
                    {t('applyNow')}
                    </Button>
                    <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openDetailsModal(job)}
                    >
                    {t('viewDetails')}
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        ) : (
            <Alert variant="destructive">
                <Frown className="h-4 w-4" />
                <AlertTitle>{t('noJobsFound')}</AlertTitle>
                <AlertDescription>
                    {t('noJobsFoundDesc')}
                </AlertDescription>
            </Alert>
        )}
      </div>

      <Dialog
        open={!!selectedJob}
        onOpenChange={(isOpen) => !isOpen && closeModal()}
      >
        {isApplying ? (
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleApply}>
              <DialogHeader>
                <DialogTitle className="font-headline">
                  Apply for {t(selectedJob?.title ?? '')}
                </DialogTitle>
                <DialogDescription>
                  Submit your application to {selectedJob?.company}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={user?.displayName ?? ''}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email ?? ''}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="cover-letter" className="text-right pt-2">
                    Message
                  </Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Why are you a good fit for this role?"
                    className="col-span-3"
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">Submit Application</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                {t(selectedJob?.title ?? '')}
              </DialogTitle>
              <DialogDescription>
                {selectedJob?.company} - {selectedJob?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm max-h-[60vh] overflow-y-auto py-4 text-sm text-muted-foreground">
              <p>{t(selectedJob?.description ?? '')}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button onClick={() => selectedJob && openApplyModal(selectedJob)}>
                {t('applyNow')}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
