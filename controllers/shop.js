const pool = require("../util/dbUtils");
const Cart = require("../models/Cart");
const Product = require("../models/product");;
const CartItem = require("../models/CartItem")

exports.getProducts = (req, res, next) => {

  Product.findAll().then((result) => {
    console.log(result);
    // res.render('shop/product-list', {
    //   prods: products,
    //   pageTitle: 'All Products',
    //   path: '/products'
    // });
  }).catch((err) => {

  })
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    console.log(products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch((err) => {

  })
   
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
};

exports.getCart = (req, res, next) => {
 req.user.getCart()
 .then((cart) => {
  console.log(cart);
  return cart.getProducts()
 })
 .then((prods) => {
  res.render("../views/shop/cart", {
    prods: prods,
    path: '/cart',
    pageTitle: 'Checkout'
  })
 })
 .catch((err) => {
  console.log(err);
 })
  
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    console.log(orders[0].products[0].OrderItem);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then((cart) => {
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then((products) => {
    req.user.createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.OrderItem = { quantity : product.CartItem.quantity};
        return product;
      }))
    })
    .then(() => {
      fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
};

exports.addToCart = (req, res, next) => {
  let prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then((cart) => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: prodId}})
  })
  .then((prods) => {
    let product;
    if(prods.length > 0)
    {
      product = prods[0];
    }
    if(product)
    {
      const oldQty = product.CartItem.quantity;
      return fetchedCart.addProduct(product, {through : {quantity: oldQty + 1}});
    }
    else{
      return Product.findByPk(prodId)
    .then((prod) => {
      return fetchedCart.addProduct(prod, {through : {quantity: 1}})
    });
    }
  })
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  })
  
}

exports.getProduct = (req, res, next) => {
  pool.query("SELECT * FROM Products WHERE id=$1",[req.params.productId])
  .then(({rows}) =>
  {
    p = rows[0];
    res.render("shop/product-detail",{product:p, pageTitle:p.title,
      path:"/products"}); 
    })
    .catch((err) => {
    console.log(err);
    })
}

exports.deleteCartItem = (req, res, next) => {
  req.user.getCart()
  .then((cart) => {
   return CartItem.findOne({where: {CartId: cart.id, productId: req.params.productId}})
  })
  .then((cartItem) => {
    return cartItem.destroy();
  }).
  then(() => {
    res.redirect("/cart");
  })
  .catch((err) => {
    console.log(err);
  })
} 
