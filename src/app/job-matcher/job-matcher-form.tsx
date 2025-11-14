"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  IntelligentJobMatchingInput,
  intelligentJobMatching,
} from "@/ai/flows/intelligent-job-matching";
import { Badge } from "@/components/ui/badge";
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
import { useEffect } from "react";

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
  const [state, formAction] = useFormState(
    async (_prevState: any, data: IntelligentJobMatchingInput) => {
      const result = await intelligentJobMatching(data);
      if (!result.jobRecommendations || result.jobRecommendations.length === 0) {
        toast({
          title: "No matches found",
          description: "We couldn't find any job recommendations. Try adjusting your criteria.",
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
    formAction({ ...data, skills: skillsArray });
  };
  
  const { isSubmitting } = form.formState;

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="text-primary" />
                AI-Powered Job Matcher
              </CardTitle>
              <CardDescription>
                Describe your profile, and our AI will find the best job
                opportunities for you in Punjab.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., React, Node.js, Project Management"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your skills, separated by commas.
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
                    <FormLabel>Your Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your past roles, responsibilities, and achievements. e.g., '5 years as a Senior Developer at a tech startup...'"
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
                    <FormLabel>Job Preferences</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Full-time remote role in the IT sector'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What are you looking for in a job?
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
                    Finding Matches...
                  </>
                ) : (
                  "Find My Perfect Job"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.jobRecommendations && state.jobRecommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="font-headline mb-4 text-2xl font-bold">
            Your Personalized Job Recommendations
          </h2>
          <div className="space-y-4">
            {state.jobRecommendations.map((rec, index) => (
              <Card key={index} className="bg-background">
                <CardHeader>
                  <CardTitle className="font-headline">{rec}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This position is recommended based on your profile.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button>Apply Now</Button>
                  <Button variant="ghost">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
