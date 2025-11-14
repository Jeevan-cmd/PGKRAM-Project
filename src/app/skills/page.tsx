import Image from 'next/image';
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
import { skills } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function SkillsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Skill Development" />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <p className="text-center text-lg text-muted-foreground">
          Browse our curated collection of skill development programs to enhance
          your career prospects in Punjab.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => {
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
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 p-4">
                  <Badge variant="secondary">{skill.provider}</Badge>
                  <CardTitle className="font-headline text-lg">
                    {skill.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {skill.duration}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Enroll Now</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
