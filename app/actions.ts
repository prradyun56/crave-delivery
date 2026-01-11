'use server';

import { db } from '../db';
import { restaurants, menuItems, orders, orderItems } from '../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- Function 1: Create a Restaurant ---
export async function createRestaurant(formData: FormData) {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;

  await db.insert(restaurants).values({
    name,
    address,
    imageUrl,
    category,
  });

  revalidatePath('/');
}

// --- Function 2: Add a Menu Item ---
export async function createMenuItem(formData: FormData) {
  const restaurantId = parseInt(formData.get('restaurantId') as string);
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;

  await db.insert(menuItems).values({
    restaurantId,
    name,
    description,
    price,
  });

  revalidatePath(`/restaurant/${restaurantId}`);
}

// --- Function 3: Place a New Order ---
export async function placeOrder(cartItems: any[], total: number, address: string) {
  if (cartItems.length === 0) return { success: false };

  const restaurantId = cartItems[0].restaurantId;

  // 1. Create the Order
  const [newOrder] = await db.insert(orders).values({
    restaurantId,
    totalAmount: total.toFixed(2),
    status: 'preparing',
    address,
    createdAt: new Date().toISOString(),
  }).returning({ id: orders.id });

  // 2. Save the Items
  for (const item of cartItems) {
    await db.insert(orderItems).values({
      orderId: newOrder.id,
      menuItemId: item.id,
      quantity: item.quantity,
    });
  }

  return { success: true, orderId: newOrder.id };
}

// --- Function 4: Update Order Status (Kitchen) ---
export async function updateOrderStatus(orderId: number, newStatus: string) {
  await db.update(orders)
    .set({ status: newStatus })
    .where(eq(orders.id, orderId));
  
  revalidatePath('/dashboard/orders');
  revalidatePath(`/order-status/${orderId}`);
}

export async function updateRestaurant(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const name = formData.get('name') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;

  await db.update(restaurants)
    .set({ name, imageUrl, category })
    .where(eq(restaurants.id, id));

  revalidatePath(`/dashboard/${id}`);
  revalidatePath('/dashboard');
}

// --- Function 6: Delete Restaurant ---
export async function deleteRestaurant(formData: FormData) {
  const id = parseInt(formData.get('id') as string);

  // Delete all related data first (Foreign Key constraints)
  // 1. Delete Order Items linked to this restaurant's orders
  // (In a real production app, you might want to archive these instead of hard deleting)
  // For this MVP, we will just delete the restaurant row, assuming cascade delete isn't set up manually.
  
  await db.delete(restaurants).where(eq(restaurants.id, id));

  revalidatePath('/dashboard');
  redirect('/dashboard'); // Send user back to the main list
}