import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import logoPath from "@assets/logo_1753228482637.png";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const isActive = (path: string) => location === path;

  const navigationItems = [
    { path: "/", label: "Home", labelCn: "首页" },
    { path: "/about", label: "About the Project", labelCn: "关于项目" },
    { path: "/chat", label: "Amber AI", labelCn: "琥珀AI" },
    { path: "/explore", label: "Explore Dunhuang", labelCn: "探索敦煌" },
  ];

  const getLabel = (item: any) => language === "zh" ? item.labelCn : item.label;

  return (
    <header className="border-b border-neutral-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src={logoPath} 
              alt="Amber AI Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-seal-red-700">
                {language === "zh" ? "琥珀AI" : "Amber AI"}
              </h1>
              <p className="text-xs text-neutral-600">
                {language === "zh" ? "敦煌文化探索平台" : "Dunhuang Cultural Explorer"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-seal-red-700 bg-seal-red-50"
                    : "text-neutral-700 hover:text-seal-red-600 hover:bg-neutral-50"
                }`}
              >
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="flex items-center space-x-2 border-neutral-300 hover:border-seal-red-400"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "中" : "EN"}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={logoPath} 
                        alt="Amber AI Logo" 
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-seal-red-700">
                          {language === "zh" ? "琥珀AI" : "Amber AI"}
                        </h2>
                        <p className="text-xs text-neutral-600">
                          {language === "zh" ? "敦煌文化探索平台" : "Dunhuang Cultural Explorer"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive(item.path)
                            ? "text-seal-red-700 bg-seal-red-50"
                            : "text-neutral-700 hover:text-seal-red-600 hover:bg-neutral-50"
                        }`}
                      >
                        {getLabel(item)}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
