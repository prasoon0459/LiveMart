import React from 'react';
import theme from "../../theme";
import {
    Box,
    Card,
    Grid,
    IconButton,
    makeStyles,
    Typography,
    DialogTitle,
    DialogContent,
    Dialog,
    Button,
    DialogActions,
    Menu,
  MenuItem,
  } from "@material-ui/core";
  import Imgix from "react-imgix";
  import Item from "../../Data/Item";
  import { AddShoppingCartOutlined, LinearScale } from "@material-ui/icons";
  const useStyles = makeStyles({
    root: {
        flex:1
    },
    itemImage:{
        margin: theme.spacing(1,1,1)
    },
    card: {
      flexDirection: "column",
      padding:theme.spacing(1,1,1),
    },
    item: {
        padding: theme.spacing(1, 1, 1),
      },
      price:{
        marginLeft: theme.spacing(1),
    },
    itemName:{
        fontWeight: 700,
    },
})

export default  function DialogShop(props){
    const [scroll, setScroll] = React.useState('paper');
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
    const handleDialog=()=>{
        props.handleDialog();
    }
    let a = new Item("Lays and Nachos", "snacks", "", 128, 10);
    const items = [a, a, a, a, a, a, a, a, a, a];

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      const menuId = "shop-filter-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Nearest</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );
    return (
        <div>
            <Dialog
        open={true}
        onClose={handleDialog}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
            <Grid container spacing={1} justify="space-between" alignItems='center'>
                <Grid item xs={3} container justify='flex-start'>
                    Available Shops
                </Grid>
                <Grid item container xs={6} justify='flex-end'>
                <Button
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    Filter
                  </Button>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        {items.map((item) => (
              <Grid item key={item} className={classes.item}>
                <Card variant="outlined" className={classes.card}>
                  <Grid
                    container
                    justify="center"
                    direction="column"
                    alignItems="flex-start"
                  >
                      <Box className={classes.itemImage}>
                        <Imgix
                            src='https://www.supermarketdisplayracks.com/assets/img/gallery-page/2.jpg'
                            width='30%'
                            imgixParams={{
                            fit: "fit",
                            fm: "jpg",
                            }}
                        />
                      </Box>
                      <Grid container direction='row' >
                        <Box display='flex' width='100%' alignItems='center'>
                            <Box flexGrow={1}>
                                <Grid container direction='column' >
                                    <Typography align='left' variant='subtitle1' className={classes.itemName}>Satyam Store </Typography>
                                    <Typography align='left' variant='body2' className={classes.price}>Shahdol </Typography>
                                </Grid>
                            </Box>
                            <Box >
                                <IconButton onClick={handleDialog}><AddShoppingCartOutlined  color='secondary'></AddShoppingCartOutlined></IconButton>
                            </Box>
                        </Box>
                      </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {renderMenu}
        </div>
    )
}