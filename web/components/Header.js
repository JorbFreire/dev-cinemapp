import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { MenuRounded } from '@material-ui/icons';

import styles from '../styles/Header.module.css'

export default function Home() {
  const [ openNavBar, setOpenNavBar ] = useState(false)

  return (
    <header className={styles.header}>
      <h1>CinemAPP</h1>
      <IconButton
        onClick={() => setOpenNavBar(true)}
        className={styles.openMobileNav}
      >
        <MenuRounded />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={openNavBar}
        onClose={() => setOpenNavBar(false)}
        onOpen={() => setOpenNavBar(true)}
        PaperProps={{component: 'nav'}}
        className={styles.navBox}
      >
        <a>Login</a>
        <a>Criar conta</a>
        <a>Descobrir filmes</a>
        <a>Favoritos</a>
      </SwipeableDrawer>
    </header>
  )
}