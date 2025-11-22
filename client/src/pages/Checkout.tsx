import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_NUMBER } from "@/const";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [location, setLocationValue] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: products } = trpc.products.getAvailable.useQuery();
  const createOrderMutation = trpc.orders.create.useMutation();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("fishWorldCart");
    if (savedCart && products) {
      const cartData = JSON.parse(savedCart);
      const cartItems: CartItem[] = [];
      
      for (const [productId, quantity] of Object.entries(cartData)) {
        const product = products.find(p => p.id === Number(productId));
        if (product && typeof quantity === 'number') {
          cartItems.push({
            productId: product.id,
            name: product.nameAr,
            price: product.price,
            quantity: quantity
          });
        }
      }
      
      setCart(cartItems);
    }
  }, [products]);

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev => prev.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    if (!customerName || !customerPhone || !location) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order in database
      const orderDetails = JSON.stringify(cart);
      await createOrderMutation.mutateAsync({
        customerName,
        customerPhone,
        location,
        street,
        landmark,
        orderDetails,
        totalAmount: getTotalAmount(),
      });

      // Prepare WhatsApp message
      let message = `*طلب جديد من عالم السمك*\n\n`;
      message += `*الاسم:* ${customerName}\n`;
      message += `*رقم الهاتف:* ${customerPhone}\n`;
      message += `*الموقع:* ${location}\n`;
      if (street) message += `*الشارع:* ${street}\n`;
      if (landmark) message += `*معلم قريب:* ${landmark}\n\n`;
      message += `*تفاصيل الطلب:*\n`;
      
      cart.forEach(item => {
        message += `• ${item.name}: ${item.quantity} كيلو × ${item.price.toLocaleString('ar-YE')} = ${(item.quantity * item.price).toLocaleString('ar-YE')} ريال\n`;
      });
      
      message += `\n*المجموع الكلي:* ${getTotalAmount().toLocaleString('ar-YE')} ريال`;

      // Send to WhatsApp
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Clear cart
      localStorage.removeItem("fishWorldCart");
      toast.success("تم إرسال الطلب بنجاح!");
      
      // Redirect to home after a delay
      setTimeout(() => {
        setLocation("/");
      }, 2000);

    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && products) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">السلة فارغة</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
            <Button onClick={() => setLocation("/")} className="w-full">
              العودة للتسوق
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8">
      <div className="container max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mb-6"
        >
          <ArrowRight className="ml-2" />
          العودة للرئيسية
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between border-b pb-3">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.price.toLocaleString('ar-YE')} ريال/كيلو</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity} كيلو</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-left mr-4 min-w-[100px]">
                      <p className="font-bold text-cyan-600">
                        {(item.quantity * item.price).toLocaleString('ar-YE')} ريال
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t-2">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-cyan-600">{getTotalAmount().toLocaleString('ar-YE')} ريال</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الواتساب أو الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="مثال: 967771234567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">الموقع *</Label>
                  <Textarea
                    id="location"
                    value={location}
                    onChange={(e) => setLocationValue(e.target.value)}
                    placeholder="المدينة والحي"
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="street">اسم الشارع</Label>
                  <Input
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="اسم الشارع (اختياري)"
                  />
                </div>

                <div>
                  <Label htmlFor="landmark">معلم قريب</Label>
                  <Input
                    id="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="مثال: بجانب مسجد النور (اختياري)"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب عبر واتساب"}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  سيتم فتح واتساب تلقائياً لإرسال الطلب
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
