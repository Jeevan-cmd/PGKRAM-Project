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
} from "lucide-react";
import { user } from "@/lib/data";

const menuItems = [
  { href: "/", label: "Dashboard", icon: <LayoutDashboard /> },
  { href: "/jobs", label: "Job Listings", icon: <BriefcaseBusiness /> },
  { href: "/skills", label: "Skill Development", icon: <Wrench /> },
  { href: "/business-support", label: "Business Support", icon: <Building2 /> },
  { href: "/employer-portal", label: "Employer Portal", icon: <Shield /> },
];

const aiMenuItems = [
    { href: "/resume-analyzer", label: "AI Resume Analyzer", icon: <BotMessageSquare /> },
]

export function MainSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

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
              tooltip={{ children: item.label }}
            >
              {item.icon}
              <span>{item.label}</span>
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
              tooltip={{ children: item.label }}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as={Link} href="/profile" isActive={isActive("/profile")} tooltip={{ children: "Profile" }}>
                <User />
                <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Settings" }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Logout" }}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2">
           <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden whitespace-nowrap">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
