
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { skills } from '@/lib/data';
import imageData from '@/lib/placeholder-images.json';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';

const { placeholderImages } = imageData;
const INITIAL_VISIBLE_COURSES = 6;

export default function SkillsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useUser();
  const [visibleCourses, setVisibleCourses] = useState(
    INITIAL_VISIBLE_COURSES
  );

  const showMoreCourses = () => {
    setVisibleCourses(skills.length);
  };

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: 'Successfully Enrolled!',
      description: `A confirmation for '${courseTitle}' with a course link will be sent to your email: ${user?.email}`,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('skillDevelopment')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <p className="text-center text-lg text-muted-foreground">
          {t('skillDevelopmentDesc')}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.slice(0, visibleCourses).map((skill) => {
            const image = placeholderImages.find(
              (img) => img.id === skill.imageId
            );
            return (
              <Card
                key={skill.id}
                className="flex flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <CardHeader className="p-0">
                  <div className="relative h-40 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 p-4">
                  <Badge variant="secondary">{skill.provider}</Badge>
                  <CardTitle className="font-headline text-lg">
                    {t(skill.title)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t(skill.duration, {
                      duration: skill.durationValue,
                      unit: t(skill.durationUnit),
                    })}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleEnroll(t(skill.title))}
                  >
                    {t('enrollNow')}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {visibleCourses < skills.length && (
          <div className="mt-8 flex justify-center">
            <Button onClick={showMoreCourses} size="lg">
              {t('browseMoreCourses')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
