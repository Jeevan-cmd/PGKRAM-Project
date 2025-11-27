"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
  Wrench,
  BotMessageSquare,
  LineChart,
  Sparkles,
  Heart,
  GraduationCap,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useUser } from "@/firebase";

const menuItems = [
  { href: "/dashboard", labelKey: "dashboard", icon: <LayoutDashboard /> },
  { href: "/jobs", labelKey: "jobListings", icon: <BriefcaseBusiness /> },
  { href: "/skills", labelKey: "skillDevelopment", icon: <Wrench /> },
  { href: "/business-support", labelKey: "businessSupport", icon: <Building2 /> },
  { href: "/employer-portal", labelKey: "employerPortal", icon: <Shield /> },
  { href: "/counselling", labelKey: "counselling", icon: <GraduationCap /> },
  { href: "/jobs-for-disabled", labelKey: "jobsForPersonsWithDisability", icon: <HeartHandshake /> },
  { href: "/armed-forces", labelKey: "inductionIntoArmedForces", icon: <Shield /> },
  { href: "/pm-vikas-scheme", labelKey: "pmVikasScheme", icon: <Sparkles /> },
];

const aiMenuItems = [
    { href: "/job-matcher", labelKey: "intelligentJobMatching", icon: <Sparkles /> },
    { href: "/recommendations", labelKey: "personalizedRecommendations", icon: <Heart /> },
    { href: "/resume-analyzer", labelKey: "aiResumeAnalyzer", icon: <BotMessageSquare /> },
    { href: "/analysis-dashboard", labelKey: "analysisDashboard", icon: <LineChart /> },
    { href: "/events-calendar", labelKey: "eventsCalendar", icon: <CalendarDays /> },
]

export function MainSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { t } = useLanguage();
  const { user } = useUser();

  const getInitials = (name?: string | null) => {
    if (!name) return "";
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              as={Link}
              href={item.href}
              isActive={isActive(item.href)}
              tooltip={{ children: t(item.labelKey) }}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarSeparator />
        {aiMenuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              as={Link}
              href={item.href}
              isActive={isActive(item.href)}
              tooltip={{ children: t(item.labelKey) }}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as={Link} href="/profile" isActive={isActive("/profile")} tooltip={{ children: t('profile') }}>
                <User />
                <span>{t('profile')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: t('settings') }}>
              <Settings />
              <span>{t('settings')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton as={Link} href="/" tooltip={{ children: t('logout') }}>
              <LogOut />
              <span>{t('logout')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {user && (
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} />
                <AvatarFallback>
                  {getInitials(user.displayName || user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden whitespace-nowrap">
                <p className="text-sm font-semibold">{user.displayName || 'User'}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
              </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
