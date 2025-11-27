export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

export const events: CalendarEvent[] = [
  {
    title: 'vocationalGuidance',
    start: new Date(2025, 10, 7), // Note: Month is 0-indexed (10 is November)
    end: new Date(2025, 10, 7),
  },
  {
    title: 'vocationalGuidance',
    start: new Date(2025, 10, 9),
    end: new Date(2025, 10, 15),
  },
   {
    title: 'careerCounselling',
    start: new Date(2025, 10, 16),
    end: new Date(2025, 10, 16),
  },
  {
    title: 'vocationalGuidance',
    start: new Date(2025, 10, 16),
    end: new Date(2025, 10, 22),
  },
  {
    title: 'vocationalGuidance',
    start: new Date(2025, 10, 23),
    end: new Date(2025, 10, 29),
  },
   {
    title: 'vocationalGuidance',
    start: new Date(2025, 10, 30),
    end: new Date(2025, 11, 4),
  },
];
