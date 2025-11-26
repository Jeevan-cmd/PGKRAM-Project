
'use client';
import { useLanguage } from '@/context/language-context';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '../logo';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary/90 text-primary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-4">
          <Logo />
          <div className="mt-4">
            <h4 className="font-semibold">{t('updatedOn')}</h4>
            <p className="mt-2 rounded-md bg-background/20 px-3 py-1.5 text-center font-mono text-lg tracking-widest">
              26 / 11 / 2025
            </p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">{t('websiteVisitCount')}</h4>
            <p className="mt-2 rounded-md bg-background/20 px-3 py-1.5 text-center font-mono text-lg tracking-widest">
              1 3 9 7 9 5 8 0
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-headline text-xl font-bold">
            {t('contactUs')}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">
                {t('punjabGharGharRozgar')}
              </h4>
              <address className="mt-2 not-italic">
                <p className="flex items-start">
                  <MapPin className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                  SCO 149-152, 2nd Floor, Sector 17C, Chandigarh
                </p>
                <p className="mt-1 flex items-center">
                  <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                  pgrkam.degt@gmail.com
                </p>
                <p className="mt-1 flex items-center">
                  <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                  0172-5011184-186
                </p>
              </address>
            </div>
            <div>
              <h4 className="font-semibold">
                {t('punjabSkillDevelopment')}
              </h4>
              <address className="mt-2 not-italic">
                <p className="flex items-start">
                  <MapPin className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                  SCO 149-152, 2nd Floor, Sector-17C, Chandigarh
                </p>
                <p className="mt-1 flex items-center">
                  <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                  secy.skill@psdm.gov.in
                </p>
                <p className="mt-1 flex items-center">
                  <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                  0172-2720152
                </p>
              </address>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">{t('followUsOn')}</h4>
            <div className="mt-2 flex space-x-2">
              <Link
                href="#"
                className="rounded-full bg-background/20 p-2 hover:bg-background/30"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-background/20 p-2 hover:bg-background/30"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-background/20 p-2 hover:bg-background/30"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-background/20 p-2 hover:bg-background/30"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-background/20 p-2 hover:bg-background/30"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2 md:pl-8">
          <h3 className="font-headline text-xl font-bold">
            {t('aboutPolicies')}
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {[
              'copyright',
              'privacyPolicy',
              'termsAndConditions',
              'websitePolicy',
              'archival',
              'faqs',
              'sitemap',
              'help',
              'giveFeedback',
              'feedbackGrievances',
              'aiToolsUnicef',
              'careerInformation',
              'contactUs',
              'webInformationManager',
            ].map((key) => (
              <li key={key}>
                <Link href="#" className="hover:underline">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
