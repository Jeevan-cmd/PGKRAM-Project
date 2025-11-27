'use client';
import { PageHeader } from '@/components/layout/page-header';
import { useLanguage } from '@/context/language-context';
import { EventsCalendar } from './calendar';

export default function EventsCalendarPage() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('eventsCalendar')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
            <h1 className="font-headline text-2xl font-bold mb-4">{t('otherEventsAndSessions')}</h1>
            <EventsCalendar />
        </div>
      </div>
    </div>
  );
}
