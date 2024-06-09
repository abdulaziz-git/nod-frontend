import React, {useContext, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Badge, Box, Button, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerMenu from "../components/DrawerMenu";
import {styled} from "@mui/material/styles";
import {QuantityContext} from "../CartProvider";
import Logo from "../Logo";
import { useNavDrawer } from "../NavDrawerProvider";
import NavMenu from "../components/NavMenu";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, .2, 0, 1),
    justifyContent: 'space-between',
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const location = useLocation();
    const { navDrawerWidth, setNavDrawerWidth,  isMounted } = useNavDrawer();


    const handleDrawerOpen = () => {
        setNavDrawerWidth(240);
    };

    const handleDrawerClose = () => {
        setNavDrawerWidth(0);
    };


    const price = useContext(QuantityContext).cartPrice;

    const appBar = <AppBar position="fixed" color={'transparent'}>
        <Grid container justifyContent={'space-between'} alignItems={'center'} padding={1}
              spacing={2}>
            {location.pathname.length > 1 &&
                <Grid item>
                    <Logo height={90}/>
                </Grid>
            }
            <Grid item style={{flexGrow: 1}}></Grid>
            {price > 0 && <Grid item><Link
                to={'/checkout'}>
                <Badge color={'secondary'} max={999} badgeContent={price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}><Button size={'small'} variant={'outlined'}>View
                    Cart</Button></Badge></Link>
            </Grid>
            }
            <Grid item>
                <IconButton
                    size={'large'}
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon/>
                </IconButton>
            </Grid>
        </Grid>
    </AppBar>

    return (
        <React.Fragment>
            <Grid container justifyContent={'space-around'} flexWrap={'nowrap'}>
                {isMounted === true &&
                    <Grid item >
                        <Box sx={{padding:1}}>
                        <Logo height={80} />
                        </Box>
                        <NavMenu />
                    </Grid>
                }
                <Grid item flexGrow={1}>
                    {isMounted === false && appBar}
                    <Box style={{width: '100%', margin:`${isMounted ? 0 : '100px'} auto 0 auto`, padding: '1%', maxWidth: 1024}}>
                        {children}
                    </Box>
                </Grid>
            </Grid>

            <Drawer
                anchor="right"
                variant="temporary"
                open={!isMounted && navDrawerWidth > 0}
                ModalProps={{
                    keepMounted: isMounted
                }}
                onClose={handleDrawerClose}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: navDrawerWidth },
                }}
            >
                <DrawerHeader>
                    <Logo height={80} />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon/>
                    </IconButton>
                </DrawerHeader>
                <DrawerMenu />
            </Drawer>
        </React.Fragment>
    );
};

export default Layout;
