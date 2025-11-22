'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function SignupPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-headline text-2xl">{t('createAnAccount')}</CardTitle>
          <CardDescription>{t('createAnAccountPrompt')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('fullName')}</Label>
            <Input id="name" placeholder={t('fullNamePlaceholder')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('emailAddress')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {t('createAccount')}
          </Button>
        </CardContent>
        <CardContent className="mt-4 text-center text-sm">
          {t('hasAccountPrompt')}{' '}
          <Link href="/login" className="underline">
            {t('signIn')}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
