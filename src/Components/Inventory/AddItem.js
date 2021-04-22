import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Slide,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { AddSharp, RemoveSharp } from "@material-ui/icons";
import React from "react";
import theme from "../../theme";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2, 2, 2),
  },
  qtyroot: {
    margin: theme.spacing(1, 0, 1),
  },
  form: {
    margin: theme.spacing(2, 0, 0),
  },
  btn: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  span: {
    textAlign: "center",
    margin: theme.spacing(0, 2, 0),
  },
  paper: {
    borderRadius: 10,
    width: "100%",
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(2, 2, 2),
  },
  container: {
    maxHeight: "70vh",
  },
  dialog: {
    minWidth: "400px",
    padding: theme.spacing(3, 3, 3),
  },
  dialogTitle: {
    letterSpacing: 1,
    fontWeight: 600,
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  dialogSubtitle: {
    margin: theme.spacing(1, 0, 1),
  },
  unitText: {
    margin: theme.spacing(0, 2, 0),
  },
});
const columns = [
  { id: "name", label: "Name", minWidth: 120 },
  { id: "brand", label: "Brand", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "center",
  },

  {
    // id: "url",
    align: "center",
  },
];

// const rows = [
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
//   {
//     name: "Lifeboy Soap",
//     brand: "Lifeboy",
//     unit: "1 unit",
//     category: "Personal Care",
//   },
//   { name: "Banana", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Apple", brand: "NA", unit: "1 unit", category: "Fruits" },
//   { name: "Amul Milk", brand: "Amul", unit: "0.5lr", category: "Dairy" },
//   {
//     name: "Kurkure Masala Munch",
//     brand: "Kurkure",
//     unit: "100gm",
//     category: "Snacks and Beverages",
//   },
// ];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddItem = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState();
  const token = localStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  //const username = localStorage.getItem("username");

  const getDefaultProducts = () => {
    var config = {
      method: "get",
      url: serverUrl + "/default_products/",
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRows(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setQuantity(1);
    setPrice("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleItemAdd = (index) => {
    setDialogOpen(true);
    setSelectedItem(index);
  };
  React.useEffect(() => {
    try {
      getDefaultProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="h5">Add Items to Inventory</Typography>
        <Paper className={classes.paper}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index_item) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column, index) => {
                          //   console.log(column.id);
                          //console.log(row);
                          const value =
                            index === 1 || index === 2
                              ? row[column.id].name
                              : row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {index === 3 && (
                                <Button
                                  onClick={() => handleItemAdd(index_item)}
                                  variant="outlined"
                                  color="secondary"
                                >
                                  AddItem
                                </Button>
                              )}
                              {index !== 3 &&
                              column.format &&
                              typeof value === "number"
                                ? column.format(value)
                                : value}
                              {/* {index === 1 && column.format && typeof value === "number" ? column.format(value) : value}
                              {index === 2 && column.format && typeof value === "number" ? column.format(value) : value} */}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      {/* <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid container direction="column" className={classes.dialog}>
          <Typography variant="h5" className={classes.dialogTitle}>
            {rows[selectedItem].name}
          </Typography>
          <Typography className={classes.dialogSubtitle}>
            {rows[selectedItem].category}
          </Typography>
          <DialogContent>
            <Grid container direction="column">
              <Typography>Quantity:</Typography>
              <Grid
                className={classes.qtyroot}
                container
                direction="row"
                alignItems="center"
              >
                <Button
                  xs={4}
                  className={classes.btn}
                  onClick={handleQuantityDecrease}
                  variant="outlined"
                >
                  <RemoveSharp></RemoveSharp>
                </Button>
                <span xs={4} className={classes.span}>
                  {quantity}
                </span>
                <Button
                  xs={4}
                  className={classes.btn}
                  onClick={handleQuantityIncrease}
                  variant="outlined"
                >
                  <AddSharp></AddSharp>
                </Button>
                <Typography className={classes.unitText}>
                  X {rows[selectedItem].unit}
                </Typography>
              </Grid>
              <FormControl
                className={classes.form}
                fullWidth
                variant="outlined"
              >
                <InputLabel
                  style={{ fontSize: 18, color: theme.palette.text.primary }}
                  htmlFor="outlined-adornment-amount"
                >
                  Wholesale Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  onChange={handlePriceChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <div style={{ color: theme.palette.text.primary }}>₹</div>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment
                      className={classes.inputAdorement}
                      position="end"
                    >
                      <div style={{ color: theme.palette.text.primary }}>
                        {"/ " + rows[selectedItem].unit}
                      </div>
                    </InputAdornment>
                  }
                  labelWidth={140}
                />
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Grid>
      </Dialog> */}
    </React.Fragment>
  );
};

export default AddItem;
