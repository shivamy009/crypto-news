import { Providers } from './providers';
import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster /> {/* Add Toaster here to enable toast notifications */}
        </Providers>
      </body>
    </html>
  );
}