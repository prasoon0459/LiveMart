/* eslint-disable */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import theme from "../../theme";
import { Divider, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import serverUrl from "../../serverURL";

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
    id: "quantity",
    label: "Qty Avalilable",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-IN"),
  },

  {
    id: "wholesale_price",
    label: "Price",
    minWidth: 120,
    align: "center",
    format: (value) => "Rs. " + value.toLocaleString("en-IN"),
  },
];

const rows = [
  {
    name: "Lifeboy Soap",
    brand: "Lifeboy",
    category: "Personal Care",
    quantity_available: 6,
    price: 2.47,
  },
  {
    name: "Banana",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 9.62,
  },
  {
    name: "Apple",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 8.46,
  },
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    quantity_available: 6,
    price: 3.85,
  },
  {
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks and Beverages",
    quantity_available: 6,
    price: 4.84,
  },
  {
    name: "Lifeboy Soap",
    brand: "Lifeboy",
    category: "Personal Care",
    quantity_available: 6,
    price: 2.47,
  },
  {
    name: "Banana",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 9.62,
  },
  {
    name: "Apple",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 8.46,
  },
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    quantity_available: 6,
    price: 3.85,
  },
  {
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks and Beverages",
    quantity_available: 6,
    price: 4.84,
  },
  {
    name: "Lifeboy Soap",
    brand: "Lifeboy",
    category: "Personal Care",
    quantity_available: 6,
    price: 2.47,
  },
  {
    name: "Banana",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 9.62,
  },
  {
    name: "Apple",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 8.46,
  },
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    quantity_available: 6,
    price: 3.85,
  },
  {
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks and Beverages",
    quantity_available: 6,
    price: 4.84,
  },
  {
    name: "Lifeboy Soap",
    brand: "Lifeboy",
    category: "Personal Care",
    quantity_available: 6,
    price: 2.47,
  },
  {
    name: "Banana",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 9.62,
  },
  {
    name: "Apple",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 8.46,
  },
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    quantity_available: 6,
    price: 3.85,
  },
  {
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks and Beverages",
    quantity_available: 6,
    price: 4.84,
  },
  {
    name: "Lifeboy Soap",
    brand: "Lifeboy",
    category: "Personal Care",
    quantity_available: 6,
    price: 2.47,
  },
  {
    name: "Banana",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 9.62,
  },
  {
    name: "Apple",
    brand: "NA",
    category: "Fruits",
    quantity_available: 6,
    price: 8.46,
  },
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    quantity_available: 6,
    price: 3.85,
  },
  {
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks and Beverages",
    quantity_available: 6,
    price: 4.84,
  },
];

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
  },
  paper: {
    width: "100%",
    borderRadius: 10,
    padding: theme.spacing(1, 2, 1),
    margin: theme.spacing(2, 0, 2),
  },
  container: {
    maxHeight: 800,
  },
  title: {
    margin: theme.spacing(0, 0, 2),
  },
  tableHead: {
    fontWeight: 600,
    backgroundColor: theme.palette.background.paper,
  },
});

export default function Inventory() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserProducts = () => {
    var config = {
      method: "get",
      url: serverUrl + "/account/users/?u=" + username,
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var result = [];
        if (user_type === "2") {
          result = response.data[0].products;
        } else if (user_type === "1") {
          result = response.data[0].retailProducts;
          columns[0].id = "productName";
          columns[4].id = "retail_price";
        }
        setProducts(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    try {
      getUserProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid container direction="column">
        <Typography variant="h5" align="center" className={classes.title}>
          My Inventory
        </Typography>
        <Divider></Divider>
      </Grid>
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    classes={{ head: classes.tableHead }}
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column, index) => {
                        const value =
                          index === 1 || index === 2
                            ? row[column.id].name
                            : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
  );
}
