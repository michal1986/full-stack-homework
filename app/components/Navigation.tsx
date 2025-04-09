'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, AppBar, Toolbar, Button } from '@mui/material';

export function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        <Button
            color="inherit"
            component={Link}
            href="/numbers"
            sx={{
              backgroundColor: (pathname === '/numbers' || pathname === '/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Numbers
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/grades"
            sx={{
              backgroundColor: pathname === '/grades' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Grades
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 