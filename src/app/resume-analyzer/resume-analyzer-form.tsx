
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';

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
  const { t } = useLanguage();
  const [state, formAction, isSubmitting] = useActionState(
    async (_prevState: any, data: ResumeAnalyzerInput) => {
      const result = await analyzeResume(data);
      if (!result.atsScore) {
        toast({
          title: t('analysisFailed'),
          description:
            t('analysisFailedDesc'),
          variant: 'destructive',
        });
        return initialState;
      }
      toast({
        title: t('analysisComplete'),
        description: t('analysisCompleteDesc'),
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
        title: t('fileTooLarge'),
        description: t('fileTooLargeDesc'),
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
          text = new TextDecoder().decode(arrayBuffer as ArrayBuffer);
        }

        form.setValue('resumeText', text, { shouldValidate: true });
        setFileName(file.name);
        toast({
          title: t('fileLoaded'),
          description: t('fileLoadedDesc', { fileName: file.name }),
        });
      } catch (error) {
        console.error('Error processing file:', error);
        toast({
          title: t('fileProcessingError'),
          description: t('fileProcessingErrorDesc'),
          variant: 'destructive',
        });
        setFileName(null);
      }
    };
    
    reader.onerror = () => {
      console.error('File reading error');
      toast({
        title: t('fileReadingError'),
        description: t('fileReadingErrorDesc'),
        variant: 'destructive',
      });
      setFileName(null);
    };

    const fileType = file.type;
    if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'text/plain' || fileType === 'text/markdown') {
        reader.readAsArrayBuffer(file);
    } else {
        toast({
            title: t('unsupportedFileType'),
            description: t('unsupportedFileTypeDesc'),
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
          <form action={form.handleSubmit(() => formAction(form.getValues()))}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                <Sparkles className="text-primary" />
                {t('aiResumeAnalyzer')}
              </CardTitle>
              <CardDescription>
                {t('aiResumeAnalyzerFormDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="resumeText"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('yourResumeContent')}</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {t('uploadFile')}
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
                        placeholder={t('resumePlaceholder')}
                        {...field}
                        rows={10}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('resumeDesc')}
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
                    {t('analyzing')}...
                  </>
                ) : (
                  t('analyzeMyResume')
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.atsScore !== null && (
        <div>
          <h2 className="font-headline mb-4 text-center text-2xl font-bold">{t('analysisDashboard')}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col items-center justify-center text-center lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-headline">{t('atsScore')}</CardTitle>
                <CardDescription>{t('atsScoreDesc')}</CardDescription>
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
                <CardTitle className="font-headline">{t('overallAnalysis')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.analysis}</p>
              </CardContent>
            </Card>
          </div>
           <Card className="mt-6">
            <CardHeader>
              <CardTitle className="font-headline">{t('suggestedImprovements')}</CardTitle>
              <CardDescription>{t('suggestedImprovementsDesc')}</CardDescription>
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
    