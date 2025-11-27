'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  Globe,
  LogOut,
  User as UserIcon,
  Bell,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/firebase';
import { notifications, Notification } from '@/lib/notifications-data';
import {
  mostVisitedJobs,
  MostVisitedJob,
} from '@/lib/most-visited-jobs-data';

type InfoCardProps = {
  item: Notification | MostVisitedJob;
};

function InfoCard({ item }: InfoCardProps) {
  const { t } = useLanguage();
  return (
    <div className="border-b p-4 text-sm last:border-b-0">
      {item.text && <p className="mb-2 font-semibold">{t(item.text)}</p>}
      {'validity' in item && item.validity && (
        <p className="mb-2">
          {t('validityUpto')}: {item.validity}
        </p>
      )}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:underline"
        >
          <FileText className="mr-2 h-4 w-4" />
          {t(item.linkText || 'clickHereToReadPdf')}
        </a>
      )}
      {item.postedOn && (
        <p className="mt-2 text-xs text-muted-foreground">
          {t('postedOn')}: {item.postedOn}
        </p>
      )}
    </div>
  );
}

export function PageHeader({ title }: PageHeaderProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const { setLanguage, t } = useLanguage();
  const { user } = useUser();

  const getInitials = (name?: string | null) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Home
        </Link>
        {pathSegments.map((segment, index) => (
          <span key={segment} className="flex items-center gap-2">
            <ChevronRight className="size-4" />
            <span
              className={
                index === pathSegments.length - 1
                  ? 'text-foreground font-medium'
                  : ''
              }
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')}
            </span>
          </span>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <nav className="hidden md:flex gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Contact Us
          </Link>
        </nav>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <TrendingUp className="h-5 w-5" />
              <span className="sr-only">{t('mostVisitedJobs')}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="bg-primary p-2 text-center font-bold text-primary-foreground">
              {t('mostVisitedJobs').toUpperCase()}
            </div>
            <ScrollArea className="h-[400px]">
              {mostVisitedJobs.map((job) => (
                <InfoCard key={job.id} item={job} />
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
              <span className="sr-only">{t('notifications')}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="bg-primary p-2 text-center font-bold text-primary-foreground">
              {t('notifications').toUpperCase()}
            </div>
            <ScrollArea className="h-[400px]">
              {notifications.map((notification) => (
                <InfoCard key={notification.id} item={notification} />
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>

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

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.photoURL ?? undefined}
                    alt={user.displayName ?? ''}
                  />
                  <AvatarFallback>
                    {getInitials(user.displayName || user.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {t('profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
