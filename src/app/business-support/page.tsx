'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';
import { businessResources, BusinessResource } from '@/lib/data';
import { Building, Factory, HandCoins, Users } from 'lucide-react';

export default function BusinessSupportPage() {
  const { t } = useLanguage();
  const [selectedResource, setSelectedResource] = useState<BusinessResource | null>(null);

  const categories = [
    {
      name: t('financialSupport'),
      icon: <HandCoins className="size-5 text-primary" />,
      items: businessResources.filter((r) => r.category === 'Financial'),
    },
    {
      name: t('mentorshipNetworking'),
      icon: <Users className="size-5 text-primary" />,
      items: businessResources.filter((r) => r.category === 'Mentorship'),
    },
    {
      name: t('infrastructure'),
      icon: <Factory className="size-5 text-primary" />,
      items: businessResources.filter((r) => r.category === 'Infrastructure'),
    },
    {
      name: t('startupSchemes'),
      icon: <Building className="size-5 text-primary" />,
      items: businessResources.filter((r) => r.category === 'Startup'),
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('businessSupport')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-center text-lg text-muted-foreground">
            {t('businessSupportDesc')}
          </p>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {categories.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pt-4 md:grid-cols-2">
                    {category.items.map((item) => (
                      <Card
                        key={item.id}
                        className="flex flex-col transition-all hover:shadow-md"
                      >
                        <CardHeader>
                          <CardTitle className="font-headline text-lg">
                            {t(item.name)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <CardDescription>
                            {t(item.description)}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setSelectedResource(item)}
                          >
                            {t('viewMore')}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Dialog
        open={!!selectedResource}
        onOpenChange={(isOpen) => !isOpen && setSelectedResource(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  {t(selectedResource.name)}
                </DialogTitle>
                <DialogDescription>
                  {t(selectedResource.description)}
                </DialogDescription>
              </DialogHeader>
              <div className="prose prose-sm max-h-[60vh] overflow-y-auto py-4 text-sm">
                <h3 className="font-semibold">{t('eligibility')}</h3>
                <p className="text-muted-foreground">
                  {t(selectedResource.details.eligibility)}
                </p>

                <h3 className="mt-4 font-semibold">{t('benefits')}</h3>
                <p className="text-muted-foreground">
                  {t(selectedResource.details.benefits)}
                </p>

                <h3 className="mt-4 font-semibold">{t('howToApply')}</h3>
                <p className="text-muted-foreground">
                  {t(selectedResource.details.howToApply)}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
