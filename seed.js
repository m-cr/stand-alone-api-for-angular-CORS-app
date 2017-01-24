'use strict';
const db = require('./db').db;
const models = require('./db').models;
const User = models.User;
const Product = models.Product;
const Order = models.Order;
const Review = models.Review;
const LineItem = models.LineItem;
const Category = models.Category;
const Promise = require('sequelize').Promise;

const seed = () => {
	
  const user1 = User.create({
    email: 'demo@demo.com',
    password: 'demo',
    isAdmin: true
  });

  const category1 = Category.create({name: 'Beverage'});
  const category2 = Category.create({name: 'Condiment'});
  const category3 = Category.create({name: 'Meat'});

  const product1 = Product.create({
    title: 'Soda Pop',
    description: 'A fizzy, sugary drink.',
    price: 2.00,
    inventory_qty: 10,
    photos: 'http://www.webweaver.nu/clipart/img/misc/food/drinks/soda-pop.jpg',
    brand: 'Generic'
  });

  const product2 = Product.create({
    title: 'Ketchup',
    description: 'Tomato-based condiment, often seen on hot dogs and hamburgers.',
    price: .25,
    inventory_qty: 100,
    photos: 'https://img.clipartfest.com/4ce3c7ecfb3b6692ab4d6a56821be424_ketchup-on-pinterest-heinz-ketchup-clipart_1500-1500.jpeg',
    brand: 'Heinz'
  });

  const product3 = Product.create({
    title: 'Steak',
    description: 'Beef, cooked with care.',
    price: 25.00,
    inventory_qty: 10,
    photos: 'http://cdn-image.foodandwine.com/sites/default/files/styles/550x550/public/hd-201204-ss-steak-cities-las-vegas-charlie-palmer-steak.jpg?itok=uV9BL1zK',
    brand: 'Boar\'s Head'
  });

  const order1 = Order.create({ status: 'cart' });	
  const order2 = Order.create({ status: 'order' });	
  const order3 = Order.create({ status: 'pending' });	

  const review1 = Review.create({
    content: 'No idea what they were thinking with this one!',
    rate: ['*']
  });
  const review2 = Review.create({
    content: 'Not great :(',
    rate: ['*','*']
  });
  const review3 = Review.create({
    content: 'Decent.',
    rate: ['*','*','*']
  });

  const review4 = Review.create({
    content: 'Room for improvement with this one!',
    rate: ['*','*',]
  });
  const review5 = Review.create({
    content: 'Pretty good.',
    rate: ['*','*','*',]
  });
  const review6 = Review.create({
    content: 'Amazing!',
    rate: ['*','*','*','*','*']
  });

  const lineItem1 = LineItem.create({
    quantity: 1,
    price: 1.00
  });
  const lineItem2 = LineItem.create({
    quantity: 2,
    price: 2.00
  });
  const lineItem3 = LineItem.create({
    quantity: 3,
    price: 3.00
  });

  return Promise.all([user1, category1, category2, category3, product1, product2, product3, order1, order2, order3, review1, review2, review3, review4, review5, review6, lineItem1, lineItem2, lineItem3])
    .spread( (user, category1, category2, category3, product1, product2, product3, order1, order2, order3, review1, review2, review3, review4, review5, review6, lineItem1, lineItem2, lineItem3) => {
      return Promise.all([
        user.setOrders(order1),
        user.setOrders(order2),
        user.setOrders(order3),
        lineItem1.setProduct(product1),
        lineItem2.setProduct(product2),
        lineItem3.setProduct(product3),
        lineItem1.setOrder(order1),
        lineItem2.setOrder(order2),
        lineItem3.setOrder(order3),
        review1.setUser(user),
        review1.setProduct(product1),
        review2.setUser(user),
        review2.setProduct(product2),
        review3.setUser(user),
        review3.setProduct(product3),
        review4.setUser(user),
        review4.setProduct(product1),
        review5.setUser(user),
        review5.setProduct(product2),
        review6.setUser(user),
        review6.setProduct(product3),
        category1.addProduct(product1),
        category2.addProduct(product2),
        category3.addProduct(product3)
      ]);
    });
}

db.sync({
  force: true
})
.then( ()=> {
  return seed();
})
.then( ()=> {
  console.log('seeded users!');
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});
