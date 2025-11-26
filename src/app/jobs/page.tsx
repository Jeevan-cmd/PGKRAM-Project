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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/firebase';
import { jobs } from '@/lib/data';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Job = (typeof jobs)[0];

export default function JobsPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send the application to your backend.
    toast({
      title: "Application Sent!",
      description: `Your application for the ${selectedJob?.title} position has been submitted.`,
    });
    setIsApplying(false);
    setSelectedJob(null);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('jobListings')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative sm:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder={t('searchBy')} className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('filterByLocation')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mohali">Mohali</SelectItem>
                  <SelectItem value="ludhiana">Ludhiana</SelectItem>
                  <SelectItem value="amritsar">Amritsar</SelectItem>
                  <SelectItem value="jalandhar">Jalandhar</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('filterByType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">{t('fullTime')}</SelectItem>
                  <SelectItem value="part-time">{t('partTime')}</SelectItem>
                  <SelectItem value="contract">{t('contract')}</SelectItem>
                  <SelectItem value="internship">{t('internship')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
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
                <div>
                  <Badge variant="secondary">{t(job.type)}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" onClick={() => { setIsApplying(true); setSelectedJob(job); }}>{t('applyNow')}</Button>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedJob(job)}>
                  {t('viewDetails')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob && !isApplying} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.company} - {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-h-[60vh] overflow-y-auto py-4 text-sm text-muted-foreground">
            <p>{selectedJob?.description}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
            <Button onClick={() => setIsApplying(true)}>{t('applyNow')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Application Form Dialog */}
      <Dialog open={isApplying} onOpenChange={() => { setIsApplying(false); setSelectedJob(null); }}>
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
              <Button type="button" variant="ghost" onClick={() => { setIsApplying(false); setSelectedJob(null); }}>Cancel</Button>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
