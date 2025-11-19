
'use client';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useLanguage } from '@/context/language-context';
import { Briefcase, Building, UserCheck, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts';

const jobsByLocationData = [
  { location: 'Mohali', jobs: 275, fill: 'hsl(var(--chart-1))' },
  { location: 'Ludhiana', jobs: 200, fill: 'hsl(var(--chart-2))' },
  { location: 'Amritsar', jobs: 187, fill: 'hsl(var(--chart-3))' },
  { location: 'Jalandhar', jobs: 173, fill: 'hsl(var(--chart-4))' },
  { location: 'Other', jobs: 90, fill: 'hsl(var(--chart-5))' },
];

const jobsBySectorData = [
  { name: 'Private', value: 3200, fill: 'hsl(var(--chart-1))' },
  { name: 'Government', value: 850, fill: 'hsl(var(--chart-2))' },
];

const chartConfig: ChartConfig = {
  jobs: {
    label: 'Jobs',
  },
  mohali: {
    label: 'Mohali',
    color: 'hsl(var(--chart-1))',
  },
  ludhiana: {
    label: 'Ludhiana',
    color: 'hsl(var(--chart-2))',
  },
  amritsar: {
    label: 'Amritsar',
    color: 'hsl(var(--chart-3))',
  },
  jalandhar: {
    label: 'Jalandhar',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
};

export default function AnalysisDashboardPage() {
  const { t } = useLanguage();
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('analysisDashboard')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('totalJobs')}</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,050</div>
              <p className="text-xs text-muted-foreground">
                {t('fromLastMonth', { value: '+15%' })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('registeredJobSeekers')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23,480</div>
              <p className="text-xs text-muted-foreground">
                 {t('fromLastMonth', { value: '+180.1%' })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('registeredEmployers')}
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,250</div>
              <p className="text-xs text-muted-foreground">
                {t('fromLastMonth', { value: '+32' })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('successfulPlacements')}
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                {t('sinceLastMonth', { value: '+201' })}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {t('jobDistributionBySector')}
              </CardTitle>
              <CardDescription>
                {t('jobDistributionBySectorDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={jobsBySectorData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                {t('jobOpeningsByTopLocations')}
              </CardTitle>
              <CardDescription>
                {t('jobOpeningsByTopLocationsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
                <BarChart
                  accessibilityLayer
                  data={jobsByLocationData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="location"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="jobs" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
