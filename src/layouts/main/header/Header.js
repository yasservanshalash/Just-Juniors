import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
import Link from 'next/link';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// routes
import { paths } from 'src/routes/paths';
// config
import { HEADER } from 'src/config-global';
// components
import Logo from 'src/components/logo';
import Label from 'src/components/label';
import SettingsDrawer from 'src/components/settings/drawer';
//
import { NavMobile, navConfig } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

import Typography from 'src/theme/overrides/Typography';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const isOffset = useOffSetTop();

  return (
    <AppBar color="inherit" sx={{ boxShadow: 'none' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />

            <Link href="https://zone-docs.vercel.app/changelog" target="_blank" rel="noopener">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.0
              </Label>
            </Link>
          </Box>


          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >


            {isMdUp && (
              <Button
                variant="outlined"
                color="inherit"
                rel="noopener"
              >
                <Link href="/auth/login-background" style={{color: "inherit", textDecoration: "none"}}>
                Log in
                </Link>
              </Button>
            )}

{isMdUp && (
              <Button
                variant="contained"
                color="inherit"
                href={paths.zoneStore}
                target="_blank"
                rel="noopener"
              >
                <Link href="/auth/register-background" style={{color: "inherit", textDecoration: "none"}}>
                Sign up
                </Link>              </Button>
            )}

<Stack spacing={1} direction="row" alignItems="center">

<SettingsDrawer />
</Stack>
          </Stack>

          {!isMdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
