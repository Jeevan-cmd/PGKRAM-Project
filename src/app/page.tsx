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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
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
          <Button asChild type="submit" className="w-full">
            <Link href="/dashboard">{t('signIn')}</Link>
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

function LanguageSwitcher() {
  const { setLanguage, t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLanguage('hi')}>हिन्दी</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLanguage('pa')}>ਪੰਜਾਬੀ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
