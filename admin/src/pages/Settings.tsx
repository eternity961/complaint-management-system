import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { useTheme } from "@/components/ui/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditProfileForm from "@/components/EditProfileForm";
import ChangePassword from "@/components/ChangePassword";
import useLogout from "@/hooks/useLogout";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const { isLoading, logoutUser } = useLogout();
  const { handleSubmit } = useForm();

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const handlePreferencesChange = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSavePreferences = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="lg:mx-auto mt-8 lg:p-6 md:w-[95%]">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      <Tabs defaultValue="profile" className="cursor-pointer">
        <TabsList className="w-full md:w-96">
          <TabsTrigger className="cursor-pointer" value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="preferences">
            Preferences
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="security">
            Security
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="account">
            Account
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="mt-4 dark:bg-dark">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <EditProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="mt-4  dark:bg-dark">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Enable Notifications</span>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={() =>
                    handlePreferencesChange("notifications")
                  }
                />
              </div>
              <Button
                onClick={handleSavePreferences}
                className="cursor-pointer dark:text-white"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="mt-4  dark:bg-dark">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChangePassword />
            </CardContent>
          </Card>
        </TabsContent>

        {/* accounts tab */}
        <TabsContent value="account">
          <Card className="dark:bg-dark">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(logoutUser)}>
                <Button
                  variant="secondary"
                  className="w-full text-white  cursor-pointer"
                >
                  {isLoading ? "Logging Out" : "Log Out"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
