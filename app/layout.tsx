import "./globals.css";
import AuthConext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";
import { ToasterContext } from "./context/ToasterContext";

export const metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthConext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthConext>
      </body>
    </html>
  );
}
