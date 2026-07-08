export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  customerId: number | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface Category {
  id?: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number | null;
  /** Only populated when fetched via CategoryService.getTopLevel(). */
  subCategories?: Category[];
}

export interface Product {
  id?: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  description?: string;
  price: number;
  gstPercent: number;
  stockQty?: number;
  imageUrl?: string;
  active?: boolean;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  deliveryAddress: string;
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  gstAmount: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  status: string;
  totalAmount: number;
  gstAmount: number;
  grandTotal: number;
  orderDate: string;
  items: OrderItemResponse[];
}

export interface CustomerIssue {
  id?: number;
  subject: string;
  description: string;
  status?: string;
  createdAt?: string;
  customer?: any;
}

export interface IssueReply {
  id?: number;
  repliedBy: string;
  message: string;
  createdAt?: string;
}

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Delivery {
  id?: number;
  address: string;
  status: string;
  deliveryDate?: string;
  trackingNotes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
