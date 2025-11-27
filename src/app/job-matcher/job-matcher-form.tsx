
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

const formSchema = z.object({
  category: z.string().min(1, "Please select a job category."),
  experienceLevel: z.string().min(1, "Please select an experience level."),
  jobType: z.string().min(1, "Please select a job type."),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  jobRecommendations: [],
};

const jobCategories = [
  "IT/Software",
  "Marketing",
  "Finance/Accounting",
  "Healthcare",
  "Engineering",
  "Education",
  "Government",
];

const experienceLevels = ["Entry-level", "Mid-level", "Senior-level"];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export function JobMatcherForm() {
  const { t } = useLanguage();
  const { toast } = useToast();

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
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      experienceLevel: "",
      jobType: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    formAction({ ...data, jobs: allJobs });
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('jobCategory')}</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectJobCategory')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{t(cat)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    <FormDescription>
                      {t('jobCategoryDesc')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('experienceLevel')}</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectExperienceLevel')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {experienceLevels.map(level => (
                            <SelectItem key={level} value={level}>{t(level)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                     <FormDescription>
                      {t('experienceLevelDesc')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('jobType')}</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectJobType')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {jobTypes.map(type => (
                            <SelectItem key={type} value={type}>{t(type)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
