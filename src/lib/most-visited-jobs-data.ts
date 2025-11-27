export type MostVisitedJob = {
  id: string;
  text?: string;
  link?: string;
  linkText?: string;
  postedOn?: string;
};

export const mostVisitedJobs: MostVisitedJob[] = [
  {
    id: 'mvj-1',
    link: '#',
    linkText: 'clickHereToReadPdf',
    postedOn: '31-10-2025 04:14:33 PM',
  },
  {
    id: 'mvj-2',
    text: 'Iti,driver,helper,technicians Etc',
    link: '#',
    linkText: 'clickHereToReadPdf',
    postedOn: '06-11-2025 12:28:08 PM',
  },
  {
    id: 'mvj-3',
    text: 'Security Guard',
    link: '#',
    linkText: 'clickHereToReadPdf',
    postedOn: '05-11-2025 10:10:10 AM',
  },
];
