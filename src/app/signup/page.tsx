
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
import Image from 'next/image';
import imageData from '@/lib/placeholder-images.json';

const { placeholderImages } = imageData;
const bgImage = placeholderImages.find((img) => img.id === 'hero-bg');

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
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
    <div className="relative min-h-screen w-full">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="absolute inset-0 h-full w-full object-cover"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
       <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between p-10 text-white lg:flex">
          <div className="font-headline text-2xl font-bold">Punjab Opportunities Hub</div>
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">{t('createAnAccount')}</h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              {t('hubTagline')}
            </p>
          </div>
          <div className="text-sm">&copy; 2024 Punjab Government. All rights reserved.</div>
        </div>
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
            <div className="absolute top-4 right-4">
              <LanguageSwitcher />
            </div>
            <form onSubmit={handleSignUp}>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-headline text-2xl">
                  {t('createAnAccount')}
                </CardTitle>
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
                      <SelectItem value="social-media">
                        {t('socialMedia')}
                      </SelectItem>
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
              <Link href="/" className="font-semibold text-primary hover:underline">
                {t('signIn')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
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
        <DropdownMenuItem onSelect={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLanguage('hi')}>
          हिन्दी
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLanguage('pa')}>
          ਪੰਜਾਬੀ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
