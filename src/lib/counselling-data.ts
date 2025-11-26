export type CounsellingSession = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'career' | 'study' | 'skill';
  mode: 'in-person' | 'online';
  level: '10th' | '12th' | 'graduate';
};

export const counsellingSessions: CounsellingSession[] = [
  {
    id: 'cs-1',
    title: 'careerCounselling',
    startDate: '10-11-2025',
    endDate: '28-11-2025',
    type: 'career',
    mode: 'in-person',
    level: 'graduate',
  },
  {
    id: 'cs-2',
    title: 'studyAbroadCounselling',
    startDate: '05-12-2025',
    endDate: '20-12-2025',
    type: 'study',
    mode: 'online',
    level: '12th',
  },
  {
    id: 'cs-3',
    title: 'skillGapCounselling',
    startDate: '15-01-2026',
    endDate: '30-01-2026',
    type: 'skill',
    mode: 'in-person',
    level: 'graduate',
  },
];
