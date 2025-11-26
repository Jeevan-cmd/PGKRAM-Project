'use client';
import { PageHeader } from '@/components/layout/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/firebase';

export default function ProfilePage() {
  const { t } = useLanguage();
  const { user } = useUser();

  const getInitials = (name?: string | null) => {
    if (!name) return "";
    return name.split(' ').map((n) => n[0]).join('');
  };

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('myProfile')} />
      <div className="flex-1 space-y-8 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
              <AvatarFallback>
                {getInitials(user.displayName || user.email)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-headline text-3xl font-bold">{user.displayName || 'User'}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Tabs defaultValue="profile" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">{t('profileDetails')}</TabsTrigger>
              <TabsTrigger value="skills">{t('skillsExperience')}</TabsTrigger>
              <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    {t('personalInformation')}
                  </CardTitle>
                  <CardDescription>
                    {t('updatePersonalDetails')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('fullName')}</Label>
                      <Input id="name" defaultValue={user.displayName ?? ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('emailAddress')}</Label>
                      <Input id="email" type="email" defaultValue={user.email ?? ''} readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headline">{t('professionalHeadline')}</Label>
                    <Input
                      id="headline"
                      defaultValue={''}
                      placeholder={t('professionalHeadlinePlaceholder')}
                    />
                  </div>
                  <Button>{t('saveChanges')}</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    {t('skillsExperience')}
                  </CardTitle>
                  <CardDescription>
                    {t('showcaseProfessionalBackground')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">{t('skills')}</Label>
                    <Input
                      id="skills"
                      defaultValue={''}
                      placeholder={t('addSkillsPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">{t('workExperience')}</Label>
                    <Textarea
                      id="experience"
                      defaultValue={''}
                      rows={8}
                      placeholder={t('describeWorkExperience')}
                    />
                  </div>
                  <Button>{t('saveChanges')}</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    {t('notificationsPrivacy')}
                  </CardTitle>
                  <CardDescription>
                    {t('manageAccountSettings')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{t('emailNotifications')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('emailNotificationsDesc')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{t('publicProfile')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('publicProfileDesc')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="destructive">{t('deleteAccount')}</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
