
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Sparkles, Upload, X } from 'lucide-react';
import * as React from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

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

// Set up the worker for pdf.js
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

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
  const [state, formAction, isSubmitting] = useActionState(
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
  const [fileName, setFileName] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 30 * 1024 * 1024) {
      // 30MB limit
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 30MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer) {
          throw new Error('Could not read file buffer.');
        }

        let text = '';
        const fileType = file.type;

        if (fileType === 'application/pdf') {
          const pdf = await pdfjs.getDocument({ data: arrayBuffer as ArrayBuffer }).promise;
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(' ');
          }
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer as ArrayBuffer });
          text = result.value;
        } else if (fileType === 'text/plain' || fileType === 'text/markdown') {
          text = arrayBuffer as string;
        } else {
          toast({
            title: 'Unsupported file type',
            description: 'Please upload a .pdf, .docx, .txt or .md file.',
            variant: 'destructive',
          });
          return;
        }

        form.setValue('resumeText', text, { shouldValidate: true });
        setFileName(file.name);
        toast({
          title: 'File loaded',
          description: `${file.name} has been loaded into the text area.`,
        });
      } catch (error) {
        console.error('Error processing file:', error);
        toast({
          title: 'File Processing Error',
          description: 'Could not read the content of the uploaded file. Please check if the file is corrupted.',
          variant: 'destructive',
        });
        setFileName(null);
      }
    };

    reader.onerror = () => {
      console.error('File reading error');
      toast({
        title: 'File Reading Error',
        description: 'There was an issue reading the file.',
        variant: 'destructive',
      });
      setFileName(null);
    };

    const fileType = file.type;
    if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      reader.readAsArrayBuffer(file);
    } else if (fileType === 'text/plain' || fileType === 'text/markdown') {
      reader.readAsText(file);
    } else {
      toast({
        title: 'Unsupported file type',
        description: 'Please upload a .pdf, .docx, .txt or .md file.',
        variant: 'destructive',
      });
      setFileName(null);
    }

    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };


  const clearFile = () => {
    setFileName(null);
    form.setValue('resumeText', '');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Card>
        <Form {...form}>
          <form action={formAction} onSubmit={form.handleSubmit(() => formAction(form.getValues()))}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                <Sparkles className="text-primary" />
                AI Resume Analyzer
              </CardTitle>
              <CardDescription>
                Paste your resume below or upload a file to get an instant ATS score and actionable feedback for improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="resumeText"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
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
                    {fileName && (
                      <div className="flex items-center justify-between rounded-md border bg-muted/50 p-2 text-sm text-muted-foreground">
                        <span>{fileName}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={clearFile}
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full text of your resume here, or upload a file..."
                        {...field}
                        rows={10}
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
                      accept=".txt,.pdf,.docx,.md"
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
        <div>
          <h2 className="font-headline mb-4 text-center text-2xl font-bold">Analysis Dashboard</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col items-center justify-center text-center lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-headline">ATS Score</CardTitle>
                <CardDescription>Your resume's compatibility with applicant tracking systems.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="relative size-40">
                  <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/50" strokeWidth="2"></circle>
                    <g className="origin-center -rotate-90 transform">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-primary" strokeWidth="2" strokeDasharray={`${state.atsScore}, 100`}></circle>
                    </g>
                  </svg>
                  <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <span className="text-center text-4xl font-bold text-primary">{state.atsScore}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
               <CardHeader>
                <CardTitle className="font-headline">Overall Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.analysis}</p>
              </CardContent>
            </Card>
          </div>
           <Card className="mt-6">
            <CardHeader>
              <CardTitle className="font-headline">Suggested Improvements</CardTitle>
              <CardDescription>Actionable steps to improve your resume's score and impact.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                  {state.suggestedImprovements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 size-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
            </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}

    