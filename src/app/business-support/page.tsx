'use client';
import { PageHeader } from '@/components/layout/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { businessResources } from '@/lib/data';
import { Building, Factory, HandCoins, Users } from 'lucide-react';

export default function BusinessSupportPage() {
  const { t } = useLanguage();

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
                        className="transition-all hover:shadow-md"
                      >
                        <CardHeader>
                          <CardTitle className="font-headline text-lg">
                            {t(item.name)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t(item.description)}</CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
