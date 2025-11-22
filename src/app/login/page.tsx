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

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-headline text-2xl">{t('signIn')}</CardTitle>
          <CardDescription>{t('signInPrompt')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            {t('signIn')}
          </Button>
        </CardContent>
        <CardContent className="mt-4 text-center text-sm">
          {t('noAccountPrompt')}{' '}
          <Link href="/signup" className="underline">
            {t('signUp')}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
