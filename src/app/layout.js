import "./globals.css";
import { StoreProvider } from "@/components/store/StoreProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import SiteFrame from "@/components/SiteFrame";
export const metadata = {
  title: "12-imt",
  description: "Shop your favorite products",
};
export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <ReduxProvider>
          <StoreProvider>
            <SiteFrame>
              {children}
            </SiteFrame>
          </StoreProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
