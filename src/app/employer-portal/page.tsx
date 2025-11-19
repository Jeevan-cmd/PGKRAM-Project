'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { jobs } from '@/lib/data';

export default function EmployerPortalPage() {
  const { t } = useLanguage();
  const postedJobs = jobs.slice(0, 4);

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('employerPortal')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{t('postNewJob')}</CardTitle>
                <CardDescription>
                  {t('postNewJobDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">{t('jobTitle')}</Label>
                  <Input id="job-title" placeholder={t('jobTitlePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('location')}</Label>
                  <Input id="location" placeholder={t('locationPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-type">{t('jobType')}</Label>
                  <Select>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder={t('selectJobType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">{t('fullTime')}</SelectItem>
                      <SelectItem value="part-time">{t('partTime')}</SelectItem>
                      <SelectItem value="contract">{t('contract')}</SelectItem>
                      <SelectItem value="internship">{t('internship')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('jobDescription')}</Label>
                  <Textarea
                    id="description"
                    placeholder={t('jobDescriptionPlaceholder')}
                  />
                </div>
                <Button className="w-full">{t('postJobOpening')}</Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  {t('manageJobOpenings')}
                </CardTitle>
                <CardDescription>
                  {t('manageJobOpeningsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('jobTitle')}</TableHead>
                      <TableHead>{t('location')}</TableHead>
                      <TableHead>{t('applicants')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {postedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {t(job.title)}
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 50)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            {t('view')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
