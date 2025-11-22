import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_NUMBER } from "@/const";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Order() {
  const [, params] = useRoute("/order/:id");
  const [, setLocation] = useLocation();
  const productId = params?.id ? parseInt(params.id) : 0;

  const [quantity, setQuantity] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [preparationType, setPreparationType] = useState("raw"); // raw, sanona, broast, mofa, oil
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: allProducts } = trpc.products.getAvailable.useQuery();
  const createOrderMutation = trpc.orders.create.useMutation();

  const product = allProducts?.find(p => p.id === productId);

  useEffect(() => {
    if (!productId || (allProducts && !product)) {
      setLocation("/");
    }
  }, [productId, allProducts, product, setLocation]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#003080] border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const preparationOptions = [
    { value: "raw", label: "نيئ", price: 0 },
    { value: "sanona", label: "صانونة", price: 1000 },
    { value: "broast", label: "بروست", price: 800 },
    { value: "mofa", label: "موفى", price: 500 },
    { value: "oil", label: "زيت", price: 500 },
  ];

  const getPreparationPrice = () => {
    const option = preparationOptions.find(opt => opt.value === preparationType);
    return option ? option.price : 0;
  };

  const getTotalAmount = () => {
    const basePrice = product.price * quantity;
    const prepPrice = getPreparationPrice() * quantity;
    return basePrice + prepPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity === 0) {
      toast.error("يرجى تحديد الكمية المطلوبة");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !street.trim() || !landmark.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      const prepOption = preparationOptions.find(opt => opt.value === preparationType);
      const orderDetails = JSON.stringify({
        productId: product.id,
        productName: product.nameAr,
        quantity,
        preparationType: prepOption?.label,
        preparationPrice: prepOption?.price || 0,
      });

      await createOrderMutation.mutateAsync({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        location: `${street.trim()} - ${landmark.trim()}`,
        street: street.trim(),
        landmark: landmark.trim(),
        orderDetails,
        totalAmount: getTotalAmount(),
      });

      const prepOptionForMessage = preparationOptions.find(opt => opt.value === preparationType);
      const totalAmount = getTotalAmount();
      
      const message = `*طلب جديد من عالم السمك* 🐟

*المنتج:* ${product.nameAr}
*السعر:* ${product.price.toLocaleString('ar-YE')} ريال/كيلو
*الكمية:* ${quantity} كيلو
*نوع التحضير:* ${prepOptionForMessage?.label}${prepOptionForMessage?.price ? ` (+${prepOptionForMessage.price.toLocaleString('ar-YE')} ريال/كيلو)` : ''}

*معلومات العميل:*
الاسم: ${customerName}
رقم الهاتف: ${customerPhone}
الموقع: ${location}
${street ? `الشارع: ${street}` : ''}
${landmark ? `معلم قريب: ${landmark}` : ''}

*الإجمالي:* ${totalAmount.toLocaleString('ar-YE')} ريال
*رسوم التوصيل:* مجاناً للأماكن القريبة`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success("تم إرسال طلبك بنجاح!");
      
      setTimeout(() => {
        setLocation("/");
      }, 1500);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowRight className="ml-2 h-5 w-5" />
          العودة للرئيسية
        </Button>

        <Card className="shadow-xl border-2 border-gray-200">
          <CardContent className="p-8">
            <h1 className="text-3xl md:text-4xl font-black mb-8 text-[#003080] text-center">
              إتمام الطلب
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#003080] mb-4">{product.nameAr}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-600">السعر الأساسي:</span>
                  <span className="text-xl font-bold text-[#003080]">
                    {product.price.toLocaleString('ar-YE')} ريال/كيلو
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-lg font-bold text-gray-700">
                  الكمية (كيلو) *
                </Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(0, quantity - 0.5))}
                    className="w-12 h-12 rounded-full text-xl font-bold border-2 border-[#003080] hover:bg-gray-50"
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.5"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="text-center text-2xl font-bold border-2 border-gray-300 rounded-xl h-12"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 0.5)}
                    className="w-12 h-12 rounded-full text-xl font-bold border-2 border-[#003080] hover:bg-gray-50"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Preparation Type */}
              <div className="space-y-2">
                <Label className="text-lg font-bold text-gray-700">
                  نوع التحضير *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {preparationOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPreparationType(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        preparationType === option.value
                          ? 'border-[#003080] bg-[#003080] text-white shadow-lg'
                          : 'border-gray-300 bg-white hover:border-[#003080]'
                      }`}
                    >
                      <div className="font-bold text-lg">{option.label}</div>
                      {option.price > 0 && (
                        <div className="text-sm mt-1">
                          +{option.price.toLocaleString('ar-YE')} ريال/كيلو
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              {quantity > 0 && (
                <div className="bg-[#003080] text-white p-6 rounded-xl shadow-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>السعر الأساسي:</span>
                      <span>{(product.price * quantity).toLocaleString('ar-YE')} ريال</span>
                    </div>
                    {getPreparationPrice() > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>تكلفة التحضير:</span>
                        <span>{(getPreparationPrice() * quantity).toLocaleString('ar-YE')} ريال</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm border-t border-white/30 pt-2">
                      <span>رسوم التوصيل:</span>
                      <span className="text-green-300 font-bold">مجاناً</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-black border-t-2 border-white/50 pt-3 mt-2">
                      <span>الإجمالي:</span>
                      <span>{getTotalAmount().toLocaleString('ar-YE')} ريال</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-4 bg-white p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-[#003080] mb-4">معلومات العميل</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-base font-bold text-gray-700">
                    الاسم *
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك"
                    required
                    className="h-12 text-lg border-2 border-gray-300 focus:border-[#003080] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-base font-bold text-gray-700">
                    رقم الواتساب أو الاتصال *
                  </Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="مثال: 967771234567"
                    required
                    className="h-12 text-lg border-2 border-gray-300 focus:border-[#003080] rounded-xl"
                  />
                </div>



                <div className="space-y-2">
                  <Label htmlFor="street" className="text-base font-bold text-gray-700">
                    اسم الشارع *
                  </Label>
                  <Input
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="اسم الشارع"
                    required
                    className="h-12 text-lg border-2 border-gray-300 focus:border-[#003080] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark" className="text-base font-bold text-gray-700">
                    معلم قريب *
                  </Label>
                  <Textarea
                    id="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="مثال: بجانب مسجد..."
                    required
                    rows={3}
                    className="text-lg border-2 border-gray-300 focus:border-[#003080] rounded-xl"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || quantity === 0}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-xl py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري الإرسال..." : quantity === 0 ? "يرجى تحديد الكمية" : "إرسال الطلب عبر واتساب"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
