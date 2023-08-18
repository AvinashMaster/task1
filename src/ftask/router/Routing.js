import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography,  Button, Dialog, DialogTitle, DialogContent,  TextField,  DialogActions,  
  CardContent, CardMedia,  Grid,  IconButton,  Table,  TableBody,  TableCell,   FormControl,  RadioGroup,  
  InputLabel,  Card, Radio, TableHead,  TableRow,  Paper,FormControlLabel,  Box} from "@mui/material";

const CartApp = () => {
  const [cart, setCart] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setProductName("");
    setProductPrice("");
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage && selectedImage.size > 100 * 1024) {
      alert("Image size should be less than 100KB");
      return;
    }

    setImage(selectedImage);
  };

  const handleAddProduct = () => {
    if (!productName || !productPrice || !image) {
      alert("Please fill in all fields");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: productName,
      price: parseFloat(productPrice),
      image: URL.createObjectURL(image),
      quantity: 0,
    };

    setProducts([...products, newProduct]);
    handleClose();
  };

  const handleAddToCart = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: 0 } : product
    );
    setProducts(updatedProducts);
  };

  const handlePaymentOptionOpen = () => {
    setOpenPaymentDialog(true);
  };

  const handlePaymentOptionClose = () => {
    setOpenPaymentDialog(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (selectedPaymentMethod === "cashOnDelivery") {
      alert("Cash on Delivery selected");
    } else if (selectedPaymentMethod === "bank") {
      alert("Bank payment selected");
    }

    setCart([]);
    setSelectedPaymentMethod(null);
    setOpenPaymentDialog(false);
  };

  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const fakeProductData = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99,
      image:"https://i.pinimg.com/736x/f7/75/7d/f7757d5977c6ade5ba352ec583fe8e40.jpg ",
      quantity: 0,
    },
    {
      id: 2,
      name: "Product 2",
      image:"https://i.pinimg.com/736x/f7/75/7d/f7757d5977c6ade5ba352ec583fe8e40.jpg ",
      price: 19.99,
      quantity: 0,
    },
    {
      id: 3,
      name: "Product 3",
      image:"https://i.pinimg.com/736x/f7/75/7d/f7757d5977c6ade5ba352ec583fe8e40.jpg ",
      price: 7.49,
      quantity: 0,
    },
    {
      id: 4,
      name: "Product 4",
      image:"https://i.pinimg.com/736x/f7/75/7d/f7757d5977c6ade5ba352ec583fe8e40.jpg ",
      price: 14.99,
      quantity: 0,
    },
  ];

  useEffect(() => {
    setProducts(fakeProductData);
  }, []);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Online Store
          </Typography>
          <Button color="inherit" onClick={handleOpen}>
           By Now
          </Button>
          <IconButton color="inherit">
            {/* <ShoppingCart /> */}
            <Typography variant="body1" style={{ marginLeft: "5px" }}>
              {products.quantity}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <InputLabel htmlFor="product-image">Product Image</InputLabel>
          <input
            type="file"
            accept="image/*"
            id="product-image"
            onChange={handleImageChange}
          />
          <TextField
            label="Product Name"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Product Price"
            fullWidth
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={2}
        style={{ padding: "20px", marginTop: "50px" }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border:"1px solid grey",
              }}
            >
              <CardMedia
                component="img" image={product.image} alt={product.name}
                style={{ flex: 1,  objectFit: "contain", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", minHeight: "300px", }}/>
               <CardContent style={{flex: 1,textAlign: "center",justifyContent: "center",justifyItems: "center",}}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2"> ${product.price.toFixed(2)} </Typography>
                  
                <div style={{ display: "flex", textAlign: "center", justifyContent: "center", justifyItems: "center", alignItems: "center",
                    margin: " 20px 10px",
                    padding: " 20px 20px",  }}> 
                
                  <Button sx={{ marginRight: "5px" }} variant="contained" color="primary" onClick={() => handleDecrease(product.id)}
                    disabled={product.quantity <= 0}>
                  </Button>

                  <Typography variant="body1">{product.quantity}</Typography>

                  <Button sx={{ marginLeft: "5px" }}  variant="contained" color="info" onClick={() => handleAddToCart(product.id)}>
                  </Button>

                </div>
                <Button variant="contained"color="success" onClick={() => handleAddToCart(product.id)}> Add to cart </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ textAlign: "left",padding: "20px"}} fullWidth xs={12} sm={12}>
        <Button fullWidth variant="contained" color="secondary"
        onClick={() => setCart([ ...cart,...products.filter((product) => product.quantity > 0),])} >
         My Cart 
        </Button>
      </Grid>



      <Paper elevation={3} style={{ margin: "20px", padding: "10px" ,border:"1px solid black"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(
              (product) =>
                product.quantity > 0 && (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${(product.price * product.quantity).toFixed(2)} </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(product.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
        <div style={{ textAlign: "right", marginTop: "20px" ,}}>
          <Typography variant="h4"> Total Amount: ${totalAmount.toFixed(2)} </Typography>
          <Button variant="contained" color="primary" onClick={() => handlePaymentOptionOpen()}>
          Buy Now
          </Button>
        </div>
      </Paper>
    
      <Dialog open={openPaymentDialog} onClose={handlePaymentOptionClose}>
        <DialogTitle>Select Payment Method</DialogTitle>

        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup  aria-label="payment-method" name="payment-method" value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}>

              <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash on Delivery"/>
              <FormControlLabel value="bank" control={<Radio />} label="Bank Transfer" />
              <FormControlLabel value="upi" control={<Radio />} label="UPi" />
              <FormControlLabel  value="PhonePay" control={<Radio />} label="PhonePay" />
          
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentOptionClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartApp;
