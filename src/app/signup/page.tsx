'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default function SignupPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
       toast({
        title: 'Error',
        description: 'Authentication service is not available.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast({
        title: t('signUpFailed'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <form onSubmit={handleSignUp}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-headline text-2xl">{t('createAnAccount')}</CardTitle>
            <CardDescription>{t('createAnAccountPrompt')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input 
                id="name" 
                placeholder={t('fullNamePlaceholder')} 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('emailAddress')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">{t('whereDidYouHearAboutUs')}</Label>
              <Select onValueChange={setSource} value={source}>
                <SelectTrigger id="source">
                  <SelectValue placeholder={t('selectSource')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">{t('family')}</SelectItem>
                  <SelectItem value="friends">{t('friends')}</SelectItem>
                  <SelectItem value="social-media">{t('socialMedia')}</SelectItem>
                  <SelectItem value="other">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('creatingAccount') : t('createAccount')}
            </Button>
          </CardContent>
        </form>
        <CardContent className="mt-4 text-center text-sm">
          {t('hasAccountPrompt')}{' '}
          <Link href="/" className="underline">
            {t('signIn')}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

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
