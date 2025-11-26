'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactUsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('contactUs')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  {t('howToReachUs')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-headline text-xl font-semibold">
                    {t('punjabGharGharRozgar')}
                  </h3>
                  <address className="mt-4 space-y-2 not-italic text-muted-foreground">
                    <p className="flex items-start">
                      <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        SCO 149-152, 2nd Floor, Sector 17C, Chandigarh
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>0172-5011184-186</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <a
                        href="mailto:pgrkam.degt@gmail.com"
                        className="hover:text-primary"
                      >
                        pgrkam.degt@gmail.com
                      </a>
                    </p>
                  </address>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('reachDistrictBureau')}{' '}
                    <Link href="#" className="font-semibold text-primary">
                      {t('clickHere')}
                    </Link>{' '}
                    {t('forContactDetails')}
                  </p>
                </div>

                <div className="border-t pt-8">
                  <h3 className="font-headline text-xl font-semibold">
                    {t('punjabSkillDevelopment')}
                  </h3>
                  <address className="mt-4 space-y-2 not-italic text-muted-foreground">
                    <p className="flex items-start">
                      <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        SCO 149-152, 2nd Floor, Sector-17C, Chandigarh
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>0172-2720152</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <a
                        href="mailto:secy.skill@psdm.gov.in"
                        className="hover:text-primary"
                      >
                        secy.skill@psdm.gov.in
                      </a>
                    </p>
                  </address>
                   <p className="mt-4 text-sm text-muted-foreground">
                    {t('reachDistrictProgramme')}{' '}
                    <Link href="#" className="font-semibold text-primary">
                      {t('clickHere')}
                    </Link>{' '}
                    {t('forContactDetails')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.223620921028!2d76.77978801511003!3d30.71211308164472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed937495a82b%3A0x45053535928b577!2sSector%2017%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1678886478901!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
