import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

// Update the restaurants table
export const restaurants = pgTable('restaurants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  imageUrl: text('image_url'),
  category: text('category'), // <--- ADD THIS LINE
});

// ... keep menuItems the same ...
export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id').references(() => restaurants.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
});

// db/schema.ts

// ... keep restaurants and menuItems ...

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id').notNull(),
  totalAmount: text('total_amount').notNull(),
  status: text('status').notNull().default('preparing'), // preparing, ready, delivered
  address: text('address').notNull(),
  createdAt: text('created_at').notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  menuItemId: integer('menu_item_id').notNull(),
  quantity: integer('quantity').notNull(),
});