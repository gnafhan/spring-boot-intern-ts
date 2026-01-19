// Main app layout with header and navigation
import { Link, useLocation } from 'react-router-dom';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground text-xl font-bold">
                👨‍🎓
              </div>
              <div>
                <h1 className="text-xl font-bold">Student Management</h1>
                <p className="text-xs text-muted-foreground">Student Management System</p>
              </div>
            </Link>
            
            {!isHomePage && (
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to List
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Student Management System. Built with React + TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}
