'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
} from 'date-fns';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { events, CalendarEvent } from '@/lib/events-data';
import { cn } from '@/lib/utils';

const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export function EventsCalendar() {
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth);
  const days = eachDayOfInterval({
    start: firstDayOfCalendar,
    end: lastDayOfCalendar,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const today = () => setCurrentMonth(new Date());

  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      isWithinInterval(day, { start: event.start, end: event.end })
    );
  };
  
  const getRenderableEvents = (day: Date) => {
    const dailyEvents = getEventsForDay(day);
    const dayOfWeek = day.getDay();

    const renderable = dailyEvents.map(event => {
      const isStart = isSameDay(event.start, day) || dayOfWeek === 0;
      const isEnd = isSameDay(event.end, day) || dayOfWeek === 6;
      
      return {
        event,
        isStart,
        isEnd,
        span: isStart ? Math.min(7 - dayOfWeek, (event.end.getDate() - day.getDate()) + 1) : 0,
      };
    }).filter(e => e.isStart);

    return renderable;
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={today}>{t('today')}</Button>
          <Button variant="outline" size="icon" onClick={prevMonth}>&lt;</Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>&gt;</Button>
          <h2 className="text-xl font-bold ml-4">{format(currentMonth, 'MMMM yyyy')}</h2>
        </div>
        <div className="flex items-center gap-1 rounded-md border p-1">
          <Button variant="ghost" className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground" data-active={true}>{t('month')}</Button>
          <Button variant="ghost">{t('week')}</Button>
          <Button variant="ghost">{t('day')}</Button>
          <Button variant="ghost">{t('agenda')}</Button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-t border-l">
        {dayNames.map(day => (
          <div key={day} className="text-center font-bold p-2 border-r border-b bg-primary/10">{t(day)}</div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={cn(
              "p-1 h-32 border-r border-b relative",
              !isSameMonth(day, currentMonth) && "bg-muted/30 text-muted-foreground"
            )}
          >
            <span className={cn(
              "absolute top-1 right-1 text-sm",
              isSameDay(day, new Date()) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center"
            )}>
              {format(day, 'd')}
            </span>
             <div className="mt-6 space-y-0.5">
              {getRenderableEvents(day).map(({ event, span }, index) => (
                <div key={index} 
                     className="bg-blue-600 text-white text-xs rounded-sm px-1 truncate"
                     style={{ width: `calc(${span * 100}% + ${span-1}px)`}}
                >
                  {t(event.title)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
