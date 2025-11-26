'use client';
import { PageHeader } from '@/components/layout/page-header';
import { useLanguage } from '@/context/language-context';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('aboutUs')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="font-headline mb-4 text-3xl font-bold">
              {t('aboutUs')}
            </h1>
            <p className="text-muted-foreground">
              Punjab Cabinet Committee in its meeting dated 3.10.18 decided to
              establish Punjab Rozgar Department as well as get it registered
              as Society as per the Memorandum of Association (MoA) placed
              before the Cabinet Committee. Punjab Rozgar Department was
              registered as Society on 25.10.18 under Societies Registration
              Act, 1860.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-headline mb-6 text-2xl font-bold">
              Aims and Objectives of Punjab Rozgar Department Society
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  A. The main aims of the Society are:
                </h3>
                <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
                  <li>
                    To create necessary framework to facilitate Wage and
                    Self-employment for the unemployed people of the State of
                    Punjab.
                  </li>
                  <li>
                    To improve employability through skill training/ skill
                    up-gradation.
                  </li>
                  <li>
                    To identify areas having potential for employment generation
                    and to harness that potential with government intervention.
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  B. The main objectives to be pursued by Punjab Rozgar
                  Department Society are:
                </h3>
                <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
                  <li>
                    To create an exhaustive data base of Unemployed Household in
                    the State of Punjab.
                  </li>
                  <li>
                    To develop and promote an eco-system amongst all
                    stakeholders, which is conducive to employment Generation.
                  </li>
                  <li>
                    To enable the establishment of flexible delivery mechanisms
                    that respond to the characteristics of a wide range of needs
                    of all stakeholders.
                  </li>
                  <li>
                    To promote public-private partnership models (Including
                    CSR) to encourage private sector initiatives in the field of
                    Employment Generation.
                  </li>
                  <li>
                    To Plan and set targets including preparation of State
                    Employment Plan and District Employment Plan.
                  </li>
                  <li>
                    To develop and oversee the functionalities of Ghar Ghar
                    Rozgar portal which will facilitate the registration of all
                    eligible job seekers registration of job providers and
                    organizing job fairs etc online either in-house or through
                    professional firm via project Management Consultant(s).
                  </li>
                  <li>
                    To facilitate the job seekers for placement in Govt/ Private
                    Jobs/ Overseas Employment and Skill training as per the
                    aptitude and skills of the Job seeker.
                  </li>
                  <li>
                    To facilitate Punjab Youth in Overseas Study and to undertake
                    such ancillary activities may lead to fulfilment of this
                    object.
                  </li>
                  <li>
                    To do social mobilization of the Job seekers with focus on
                    Unemployed Household.
                  </li>
                  <li>
                    To conduct and support Research and Development in the
                    Employment Generation Sector(s) to learn from innovative and
                    emerging trends globally for improving rate of employment.
                  </li>
                  <li>
                    Establishing call centers and keeping consultants for culling
                    out and managing data regarding unemployment/ employment
                    for pushing employment generation program with vigor.
                  </li>
                  <li>
                    To co-ordinate and monitor the 22 District Bureaus of
                    Employment and Enterprises (DBEE's) formed in the
                    districts.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-headline mb-4 text-2xl font-bold">
              Projects under Punjab Rozgar Department
            </h2>
            <p className="mb-4 text-muted-foreground">
              Following projects are being undertaken by Punjab Rozgar
              Department at present:
            </p>
            <ul className="list-inside list-roman space-y-2 text-muted-foreground">
              <li>
                Punjab Job Helpline to reach out to every household and provide
                employment facilitation.
              </li>
              <li>
                Online Coaching & training for providing free of cost training/
                coaching to candidates looking for jobs in government sector.
              </li>
              <li>
                Full-fledged digital platform to provide online platform for all
                stakeholders of the department to interact.
              </li>
              <li>
                Social media platform utilization for maximum outreach to make
                public aware of the activities, initiatives and services of the
                department.
              </li>
              <li>
                Foreign Study and Placement Cell (FS&PC) to facilitate youth of
                Punjab in going abroad for foreign study and placement in a fair
                and transparent manner.
              </li>
            </ul>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-headline text-xl font-bold">
                  Office of Punjab Rozgar Department
                </h3>
                <address className="mt-2 not-italic text-muted-foreground">
                  <p>Punjab Ghar Ghar Rozgar Mission</p>
                  <p className="flex items-start">
                    <MapPin className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                    SCO 149-152, 2nd Floor, Sector 17C, Chandigarh
                  </p>
                  <p className="mt-1 flex items-center">
                    <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                    0172-5011184-186
                  </p>
                </address>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold">
                  Contact details
                </h3>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                    pgrkam.degt@gmail.com
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                    01725011186
                  </p>
                  <p className="ml-6">01725011185</p>
                  <p className="ml-6">01725011184</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold">
                Officers of Punjab Rozgar Department
              </h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                <li>
                  Mission Director, Punjab Rozgar Department-cum-Director,
                  Employment Generation & Training, Punjab
                </li>
                <li>Additional Mission Director</li>
                <li>General Manager</li>
                <li>District Employment Generation & Training Officer</li>
                <li>Deputy General Manager (Finance)</li>
                <li>Additional Mission Director (Research)</li>
                <li>Deputy Mission Director (Research)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
