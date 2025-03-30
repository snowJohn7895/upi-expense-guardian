
import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart3, 
  Wallet, 
  Banknote, 
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  LogOut 
} from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

interface LayoutProps {
  onLogout: () => void;
}

const Layout = ({ onLogout }: LayoutProps) => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const navItems: NavItem[] = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/transactions", label: "Transactions", icon: <Receipt size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/wallets", label: "Wallets", icon: <Wallet size={20} /> },
    { path: "/budgets", label: "Budgets", icon: <Banknote size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/auth');
  };

  React.useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      {isMobile && (
        <header className="sticky top-0 z-40 border-b bg-background p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h1 className="text-xl font-bold">UPI Expense Guardian</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </header>
      )}

      {/* Sidebar / Mobile Menu */}
      <aside 
        className={`${
          isMobile ? 
            `fixed inset-0 z-30 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out` 
            : 'relative'
        } md:block w-full md:w-64 bg-sidebar border-r border-sidebar-border shrink-0`}
      >
        {isMobile && isMenuOpen && (
          <div 
            className="absolute inset-0 bg-black/50 -z-10"
            onClick={toggleMenu}
          ></div>
        )}
        
        <div className={`${isMobile ? 'w-3/4 h-full bg-sidebar border-r' : 'w-full'} p-4 flex flex-col h-full`}>
          {!isMobile && (
            <div className="flex items-center justify-between mb-8 mt-2">
              <h1 className="text-xl font-bold">UPI Expense Guardian</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </div>
          )}
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }
                `}
                onClick={() => isMobile && setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-4 border-t space-y-2">
            <Button 
              variant="default" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "UPI wallet sync feature is under development.",
                });
                navigate("/wallets");
                if (isMobile) setIsMenuOpen(false);
              }}
            >
              Connect UPI Wallet
            </Button>
            
            {/* Add logout button */}
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="mx-auto max-w-7xl animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
