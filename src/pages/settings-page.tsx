import {ClientLayout} from "../components/layout/client-layout.tsx";
import {PageTitle} from "../components/layout/page-title.tsx";
import {SettingsForm} from "../components/forms/settings-form.tsx";

export const SettingsPage = () => {
  return (
    <ClientLayout>
      <PageTitle title="Settings" subtitle="Edit profile" />

      <SettingsForm />
    </ClientLayout>
  );
};