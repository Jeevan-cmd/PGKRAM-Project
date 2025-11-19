'use client';
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
import { useLanguage } from '@/context/language-context';
import { jobs } from '@/lib/data';
import { Search } from 'lucide-react';

export default function JobsPage() {
  const { t } = useLanguage();

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
                <Button className="flex-1">{t('applyNow')}</Button>
                <Button variant="outline" className="flex-1">
                  {t('viewDetails')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
