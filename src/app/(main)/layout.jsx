import MainLayout from "@/container/Layouts/MainLayout";

import { TranslationProvider } from "@/hooks/use-translation";

const Layout = ({ children }) => {
  return (
    <TranslationProvider>
      <MainLayout>{children}</MainLayout>
    </TranslationProvider>
  );
};

export default Layout;
