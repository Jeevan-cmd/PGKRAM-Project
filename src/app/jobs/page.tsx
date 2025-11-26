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
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMemo } from 'react';

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
  const [sector, setSector] = useState('all');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Application Sent!',
      description: `Your application for the ${selectedJob?.title} position has been submitted.`,
    });
    setIsApplying(false);
    setSelectedJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const translatedTitle = t(job.title).toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();

      const matchesSearch =
        translatedTitle.includes(lowerSearchTerm) ||
        job.company.toLowerCase().includes(lowerSearchTerm);

      const matchesLocation = location === 'all' || job.location === location;
      const matchesType = type === 'all' || job.type === type;
      const matchesSector = sector === 'all' || job.sector === sector;

      return matchesSearch && matchesLocation && matchesType && matchesSector;
    });
  }, [searchTerm, location, type, sector, t]);
  
  const locations = useMemo(() => [...new Set(jobs.map(j => j.location))], []);
  const jobTypes = useMemo(() => [...new Set(jobs.map(j => j.type))], []);

  const openDetailsModal = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(false);
  }

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(true);
  }

  const closeModal = () => {
    setSelectedJob(null);
    setIsApplying(false);
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('jobListings')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('searchBy')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t('filterByLocation')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('filterByType')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {jobTypes.map(jobType => <SelectItem key={jobType} value={jobType}>{t(jobType)}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

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
                <div className='space-x-2'>
                  <Badge variant="secondary">{t(job.type)}</Badge>
                  <Badge variant={job.sector === 'Government' ? 'default' : 'outline'}>{job.sector}</Badge>
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
      </div>

      <Dialog
        open={!!selectedJob}
        onOpenChange={(isOpen) => !isOpen && closeModal()}
      >
        {isApplying ? (
           <DialogContent className="sm:max-w-[425px]">
           <form onSubmit={handleApply}>
            <DialogHeader>
              <DialogTitle className="font-headline">Apply for {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                Submit your application to {selectedJob?.company}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={user?.displayName ?? ''} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue={user?.email ?? ''} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="cover-letter" className="text-right pt-2">
                  Message
                </Label>
                <Textarea id="cover-letter" placeholder="Why are you a good fit for this role?" className="col-span-3" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button>
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
            <Button onClick={() => selectedJob && openApplyModal(selectedJob)}>{t('applyNow')}</Button>
          </DialogFooter>
        </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
