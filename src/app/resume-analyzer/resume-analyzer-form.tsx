'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Sparkles, Upload } from 'lucide-react';
import * as React from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  analyzeResume,
  ResumeAnalyzerInput,
} from '@/ai/flows/resume-analyzer';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  resumeText: z
    .string()
    .min(100, 'Please paste or upload your full resume content for an accurate analysis.')
    .describe('Full text of the resume'),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  atsScore: null,
  analysis: null,
  suggestedImprovements: [],
};

export function ResumeAnalyzerForm() {
  const [state, formAction] = useFormState(
    async (_prevState: any, data: ResumeAnalyzerInput) => {
      const result = await analyzeResume(data);
      if (!result.atsScore) {
        toast({
          title: 'Analysis Failed',
          description:
            "We couldn't analyze your resume. Please try again.",
          variant: 'destructive',
        });
        return initialState;
      }
      toast({
        title: 'Analysis Complete!',
        description: 'Check out your resume score and feedback below.',
      });
      return result;
    },
    initialState
  );

  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 30 * 1024 * 1024) { // 30MB limit
        toast({
            title: 'File too large',
            description: 'Please upload a file smaller than 30MB.',
            variant: 'destructive',
        });
        return;
    }
    
    // For simplicity, we'll handle .txt files.
    // For .docx or .pdf, a library like mammoth.js or pdf.js would be needed.
    if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            form.setValue('resumeText', text, { shouldValidate: true });
            toast({
                title: 'File loaded',
                description: `${file.name} has been loaded into the text area.`,
            });
        };
        reader.readAsText(file);
    } else {
        toast({
            title: 'Unsupported file type',
            description: 'Please upload a plain text (.txt) file.',
            variant: 'destructive',
        });
    }

    // Reset file input
    event.target.value = '';
  };


  const { isSubmitting } = form.formState;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formAction)}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                <Sparkles className="text-primary" />
                AI Resume Analyzer
              </CardTitle>
              <CardDescription>
                Paste your resume below or upload a file to get an instant ATS score and
                actionable feedback for improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="resumeText"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Your Resume Content</FormLabel>
                       <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full text of your resume here, or upload a .txt file..."
                        {...field}
                        rows={15}
                      />
                    </FormControl>
                    <FormDescription>
                      Ensure you copy all text from your resume document or upload it.
                    </FormDescription>
                    <FormMessage />
                     <Input 
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".txt"
                      />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze My Resume'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.atsScore !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analysis Results</CardTitle>
            <CardDescription>
              Here's how your resume stacks up against applicant tracking systems.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between">
                <h3 className="font-semibold">ATS Compatibility Score</h3>
                <p className="font-bold text-primary">{state.atsScore} / 100</p>
              </div>
              <Progress value={state.atsScore} className="h-3" />
            </div>

            <div>
              <h3 className="font-semibold">Overall Analysis</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {state.analysis}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Suggested Improvements</h3>
              <ul className="mt-2 space-y-2">
                {state.suggestedImprovements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
