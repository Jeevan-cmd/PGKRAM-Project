'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function PMVikasSchemePage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    fullName: '',
    fatherSpouseName: '',
    district: '',
    courseTrade: '',
    qualification: '',
    age: '',
    mobileNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted', formState);
    toast({
      title: t('formSubmitted'),
      description: t('formSubmittedDesc'),
    });
    // Reset form
    setFormState({
        fullName: '',
        fatherSpouseName: '',
        district: '',
        courseTrade: '',
        qualification: '',
        age: '',
        mobileNumber: ''
    })
  };
  
  const handleChange = (name: string, value: string) => {
      setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const districts = ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Mohali'];
  const trades = ['Electrician', 'Plumber', 'Carpenter', 'Welder', 'Mechanic'];
  const qualifications = ['10th Pass', '12th Pass', 'Graduate'];
  const ages = Array.from({ length: 33 }, (_, i) => i + 18);

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('pmVikasScheme')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">
                {t('pmVikasScheme')}
              </CardTitle>
               <Link href="#" className="text-sm text-primary hover:underline">
                  {t('viewEligibilityDetails')}
                </Link>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')} *</Label>
                  <Input 
                    id="fullName" 
                    placeholder={t('enterFullName')}
                    value={formState.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required 
                   />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="fatherSpouseName">{t('fatherSpouseName')} *</Label>
                  <Input 
                    id="fatherSpouseName" 
                    placeholder={t('enterFatherSpouseName')} 
                    value={formState.fatherSpouseName}
                    onChange={(e) => handleChange('fatherSpouseName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">{t('district')} *</Label>
                  <Select required onValueChange={(value) => handleChange('district', value)} value={formState.district}>
                    <SelectTrigger id="district">
                      <SelectValue placeholder={t('selectDistrict')} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseTrade">{t('courseTrade')} *</Label>
                  <Select required onValueChange={(value) => handleChange('courseTrade', value)} value={formState.courseTrade}>
                    <SelectTrigger id="courseTrade">
                      <SelectValue placeholder={t('selectTrade')} />
                    </SelectTrigger>
                    <SelectContent>
                      {trades.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="qualification">{t('qualification')} *</Label>
                  <Select required onValueChange={(value) => handleChange('qualification', value)} value={formState.qualification}>
                    <SelectTrigger id="qualification">
                      <SelectValue placeholder={t('selectQualification')} />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map(q => <SelectItem key={q} value={q}>{t(q)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="age">{t('age')} *</Label>
                  <Select required onValueChange={(value) => handleChange('age', value)} value={formState.age}>
                    <SelectTrigger id="age">
                      <SelectValue placeholder={t('selectAge')} />
                    </SelectTrigger>
                    <SelectContent>
                        {ages.map(a => <SelectItem key={a} value={String(a)}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="mobileNumber">{t('mobileNumber')} *</Label>
                  <Input 
                    id="mobileNumber" 
                    type="tel"
                    placeholder={t('mobileNumberPlaceholder')} 
                    value={formState.mobileNumber}
                    onChange={(e) => handleChange('mobileNumber', e.target.value)}
                    required
                    pattern="[0-9]{10}"
                   />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit">{t('submit')}</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
