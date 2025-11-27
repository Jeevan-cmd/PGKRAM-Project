export type Notification = {
  id: string;
  text?: string;
  link?: string;
  linkText?: string;
  postedOn?: string;
  validity?: string;
};

export const notifications: Notification[] = [
  {
    id: 'n1',
    validity: '31-03-2026',
  },
  {
    id: 'n2',
    text: 'startupPunjabInnovation',
    link: '#', // In a real app, this would be a link to a PDF
    linkText: 'clickHereToReadPdf',
    postedOn: '27-06-2022',
    validity: '31-03-2026',
  },
  {
    id: 'n3',
    text: 'Another notification text can go here to show the scrolling functionality.',
    postedOn: '15-08-2023',
    validity: '31-12-2024',
  },
  {
    id: 'n4',
    text: 'This is a third notification example. It could contain important updates or links.',
    link: '#',
    linkText: 'learnMore',
    postedOn: '01-01-2024',
    validity: '01-01-2025',
  },
];
