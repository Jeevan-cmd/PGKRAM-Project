
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { jobs as allJobs } from "@/lib/data";

import {
  IntelligentJobMatchingInput,
  intelligentJobMatching,
} from "@/ai/flows/intelligent-job-matching";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

const formSchema = z.object({
  skills: z
    .string()
    .min(1, "Please enter at least one skill.")
    .describe("Comma-separated list of skills"),
  experience: z
    .string()
    .min(10, "Please describe your experience in at least 10 characters.")
    .describe("Description of work experience"),
  preferences: z
    .string()
    .min(5, "Please describe your preferences in at least 5 characters.")
    .describe("Job preferences"),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  jobRecommendations: [],
};

export function JobMatcherForm() {
  const { t } = useLanguage();
  const [state, formAction, isSubmitting] = useActionState(
    async (_prevState: any, data: IntelligentJobMatchingInput) => {
      const result = await intelligentJobMatching(data);
      if (!result.jobRecommendations || result.jobRecommendations.length === 0) {
        toast({
          title: t('noMatchesFound'),
          description: t('noMatchesFoundDesc'),
          variant: "destructive",
        })
        return { jobRecommendations: [] };
      }
      return result;
    },
    initialState
  );
  
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      experience: "",
      preferences: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const skillsArray = data.skills.split(",").map((s) => s.trim());
    
    // Pass the full list of jobs to the AI flow without translating them
    formAction({ ...data, skills: skillsArray, jobs: allJobs });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-primary" />
                {t('aiPoweredJobMatcher')}
              </CardTitle>
              <CardDescription>
                {t('aiPoweredJobMatcherDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('yourSkills')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('yourSkillsPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('yourSkillsDesc')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('yourExperience')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('yourExperiencePlaceholder')}
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('jobPreferences')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('jobPreferencesPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('jobPreferencesDesc')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('findingMatches')}...
                  </>
                ) : (
                  t('findMyPerfectJob')
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.jobRecommendations && state.jobRecommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="font-headline mb-4 text-2xl font-bold">
            {t('yourPersonalizedJobRecommendations')}
          </h2>
          <div className="space-y-4">
            {state.jobRecommendations.map((rec, index) => (
              <Card key={index} className="bg-background">
                <CardHeader>
                  <CardTitle className="font-headline">{rec}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('positionRecommended')}
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button>{t('applyNow')}</Button>
                  <Button variant="ghost">{t('viewDetails')}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
