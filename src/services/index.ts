import { Product, Order, PaymentSubmission, PaymentStatus } from '../types';
import { DEMO_PRODUCTS } from '../config/products';

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  searchProducts(query: string, gender?: string): Promise<Product[]>;
}

export interface IOrderService {
  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'trackingToken' | 'statusHistory'>): Promise<Order>;
  getOrderById(id: string, tokenOrPhone?: string): Promise<Order | null>;
  submitPaymentVerification(orderId: string, submission: PaymentSubmission): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export interface IUploadService {
  validateAndPrepareScreenshot(file: File): Promise<{
    previewUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }>;
}

const STORAGE_KEYS = {
  CART: 'vip_perfum_cart_v1',
  WISHLIST: 'vip_perfum_wishlist_v1',
  ORDERS: 'vip_perfum_orders_v1',
  LANGUAGE: 'vip_perfum_lang_v1',
};

// Client-side Product Service Implementation
export class MockProductService implements IProductService {
  async getProducts(): Promise<Product[]> {
    return [...DEMO_PRODUCTS];
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const found = DEMO_PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  }

  async searchProducts(query: string, gender?: string): Promise<Product[]> {
    const lower = query.trim().toLowerCase();
    return DEMO_PRODUCTS.filter((p) => {
      const matchGender = !gender || gender === 'all' || p.gender === gender;
      if (!matchGender) return false;
      if (!lower) return true;
      return (
        p.nameAr.toLowerCase().includes(lower) ||
        p.nameEn.toLowerCase().includes(lower) ||
        p.descriptionAr.toLowerCase().includes(lower) ||
        p.descriptionEn.toLowerCase().includes(lower) ||
        p.fragranceFamily.ar.toLowerCase().includes(lower) ||
        p.fragranceFamily.en.toLowerCase().includes(lower)
      );
    });
  }
}

// Client-side Order Service Implementation with LocalStorage persistence
export class MockOrderService implements IOrderService {
  private getStoredOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveStoredOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save demo orders to localStorage', e);
    }
  }

  async createOrder(
    orderData: Omit<Order, 'id' | 'createdAt' | 'trackingToken' | 'statusHistory'>
  ): Promise<Order> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `VIP-EG-${new Date().getFullYear()}-${randomSuffix}`;
    // Private tracking token prevents guessing sequential orders in production
    const trackingToken = Math.random().toString(36).substring(2, 10).toUpperCase();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      trackingToken,
      createdAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'order_created',
          timestamp: new Date().toISOString(),
          noteAr: 'تم استلام الطلب بنجاح وهو بانتظار تحويل الدفعة أو التحقق منها.',
          noteEn: 'Order placed successfully. Awaiting payment transfer or verification.',
        },
      ],
    };

    const orders = this.getStoredOrders();
    orders.unshift(newOrder);
    this.saveStoredOrders(orders);

    return newOrder;
  }

  async getOrderById(id: string, tokenOrPhone?: string): Promise<Order | null> {
    const orders = this.getStoredOrders();
    const cleanId = id.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === cleanId);
    if (!found) return null;

    if (tokenOrPhone) {
      const cleanVerify = tokenOrPhone.trim().toLowerCase();
      const matchToken = found.trackingToken.toLowerCase() === cleanVerify;
      const matchPhone = found.customer.phoneNumber.replace(/\s+/g, '') === cleanVerify.replace(/\s+/g, '');
      if (!matchToken && !matchPhone) {
        return null;
      }
    }

    return found;
  }

  async submitPaymentVerification(orderId: string, submission: PaymentSubmission): Promise<Order> {
    const orders = this.getStoredOrders();
    const index = orders.findIndex((o) => o.id.toUpperCase() === orderId.trim().toUpperCase());
    if (index === -1) {
      throw new Error(`Order ${orderId} not found`);
    }

    const order = orders[index];
    // Honest status: submission does NOT automatically mark payment verified!
    const updatedStatus: PaymentStatus = 'submitted_for_verification';

    const updatedOrder: Order = {
      ...order,
      paymentStatus: updatedStatus,
      paymentDetails: submission,
      statusHistory: [
        ...order.statusHistory,
        {
          status: 'payment_submitted',
          timestamp: new Date().toISOString(),
          noteAr: `تم تقديم بيانات الدفع عبر ${submission.method === 'instapay' ? 'إنستاباي' : 'المحفظة الذكية'} (مرجع: ${submission.transferReference}). بانتظار المراجعة والتدقيق اليدوي من الإدارة.`,
          noteEn: `Payment evidence submitted via ${submission.method === 'instapay' ? 'InstaPay' : 'Mobile Wallet'} (Ref: ${submission.transferReference}). Pending manual store audit.`,
        },
      ],
    };

    orders[index] = updatedOrder;
    this.saveStoredOrders(orders);
    return updatedOrder;
  }

  async getOrders(): Promise<Order[]> {
    return this.getStoredOrders();
  }
}

// Client-side Upload Service
export class MockUploadService implements IUploadService {
  async validateAndPrepareScreenshot(file: File): Promise<{
    previewUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }> {
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validMimeTypes.includes(file.type)) {
      throw new Error('نوع الملف غير مدعوم. يرجى إرفاق صورة بتنسيق JPG أو PNG أو WEBP.');
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      throw new Error('حجم الصورة كبير جداً. الحد الأقصى المسموح به هو 5 ميجابايت.');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          previewUrl: reader.result as string,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        });
      };
      reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة.'));
      reader.readAsDataURL(file);
    });
  }
}

// Default Service Instances
export const productService: IProductService = new MockProductService();
export const orderService: IOrderService = new MockOrderService();
export const uploadService: IUploadService = new MockUploadService();
