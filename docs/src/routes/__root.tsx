import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  Link,
  useLocation,
} from '@tanstack/react-router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getRegisteredCss } from 'typestyles';
import { allDocs } from 'content-collections';
import { layout, sidebar, mobileBar } from '../styles';
import { darkTheme } from '../tokens';
import { docNavigation } from '../navigation';
import '../codeTheme';

function getSlug(metaPath: string): string {
  return metaPath.replace(/\.md$/, '').replace(/^docs\/?/, '');
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem('typestyles-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved === 'dark' || (!saved && prefersDark);
  } catch {
    return false;
  }
}

function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(darkTheme);
    } else {
      document.documentElement.classList.remove(darkTheme);
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('typestyles-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return { isDark, toggle };
}

function MobileBar({
  isDark,
  onToggleTheme,
  sidebarOpen,
  onToggleSidebar,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <div className={mobileBar('root')}>
      <button
        className={mobileBar('menuBtn')}
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <Link to="/" className={mobileBar('logo')}>
        type<span className={mobileBar('logoAccent')}>styles</span>
      </Link>
      <div className={mobileBar('actions')}>
        <button className={mobileBar('themeBtn')} onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
}

function SidebarPanel({
  open,
  onClose,
  isDark,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const location = useLocation();
  const currentSlug = location.pathname.startsWith('/docs/')
    ? location.pathname.replace('/docs/', '')
    : '';

  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  return (
    <>
      <div
        className={
          open ? `${sidebar('backdrop')} ${sidebar('backdropVisible')}` : sidebar('backdrop')
        }
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={open ? `${sidebar('root')} ${sidebar('rootOpen')}` : sidebar('root')}>
        <div className={sidebar('header')}>
          <Link to="/" className={sidebar('logo')}>
            type<span className={sidebar('logoAccent')}>styles</span>
          </Link>
        </div>

        <div className={sidebar('searchWrapper')}>
          <span className={sidebar('searchIcon')}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input type="search" placeholder="Search docs..." className={sidebar('searchInput')} />
          <span className={sidebar('searchKbd')}>⌘K</span>
        </div>

        <nav className={sidebar('nav')}>
          {docNavigation.categories.map((category) => (
            <div key={category.slug} className={sidebar('section')}>
              <div className={sidebar('sectionTitle')}>{category.title}</div>
              {category.items.map((item) => {
                const docItem = allDocs.find((d) => getSlug(d._meta.path) === item.slug);
                if (!docItem) return null;

                const isActive = item.slug === currentSlug;
                return (
                  <Link
                    key={item.slug}
                    to="/docs/$slug"
                    params={{ slug: item.slug }}
                    className={
                      isActive ? `${sidebar('link')} ${sidebar('linkActive')}` : sidebar('link')
                    }
                  >
                    {docItem.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={sidebar('footer')}>
          <button
            className={sidebar('themeToggle')}
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>
    </>
  );
}

function RootComponent() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* This is to prevent theme flashing on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('typestyles-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&p)){document.documentElement.classList.add('${darkTheme}')}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <MobileBar
          isDark={isDark}
          onToggleTheme={toggleTheme}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        <div className={layout('root')}>
          <SidebarPanel
            open={sidebarOpen}
            onClose={closeSidebar}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
          <div className={layout('content')}>
            <div className={layout('main')}>
              <Outlet />
            </div>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => {
    if (typeof document !== 'undefined') return {};

    const css = getRegisteredCss();
    if (!css) return {};

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'typestyles — CSS-in-TypeScript' },
      ],
      links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        },
      ],
      styles: [
        {
          tag: 'style',
          attrs: { id: 'global-reset' },
          children: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; scroll-behavior: smooth; } body { margin: 0; } a { color: inherit; text-decoration: none; } input, button { font: inherit; }`,
        },
        {
          tag: 'style',
          attrs: { id: 'typestyles' },
          children: css,
        },
      ],
    };
  },
  component: RootComponent,
});
