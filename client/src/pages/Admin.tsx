import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link } from "wouter";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: products, isLoading, refetch } = trpc.products.getAll.useQuery();
  const updateProductMutation = trpc.products.update.useMutation();
  const [editingPrices, setEditingPrices] = useState<{[key: number]: number}>({});
  const [editingAvailability, setEditingAvailability] = useState<{[key: number]: boolean}>({});

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-6">يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة</p>
            <Link href="/">
              <Button>العودة للرئيسية</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePriceChange = (productId: number, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setEditingPrices(prev => ({ ...prev, [productId]: price }));
  };

  const handleAvailabilityChange = (productId: number, available: boolean) => {
    setEditingAvailability(prev => ({ ...prev, [productId]: available }));
  };

  const handleSave = async (productId: number) => {
    try {
      const updates: { price?: number; available?: boolean } = {};
      
      if (editingPrices[productId] !== undefined) {
        updates.price = editingPrices[productId];
      }
      
      if (editingAvailability[productId] !== undefined) {
        updates.available = editingAvailability[productId];
      }

      if (Object.keys(updates).length > 0) {
        await updateProductMutation.mutateAsync({
          id: productId,
          ...updates
        });
        
        toast.success("تم تحديث المنتج بنجاح");
        
        // Clear editing states
        setEditingPrices(prev => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });
        setEditingAvailability(prev => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });
        
        // Refetch products
        refetch();
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-8">
        <div className="container">
          <Link href="/">
            <Button variant="secondary" className="mb-4">
              <ArrowRight className="ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">لوحة التحكم - إدارة المنتجات</h1>
          <p className="text-cyan-100 mt-2">تحديث الأسعار والتوفر</p>
        </div>
      </header>

      {/* Products Management */}
      <section className="py-12">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products?.map((product) => {
              const currentPrice = editingPrices[product.id] !== undefined 
                ? editingPrices[product.id] 
                : product.price;
              const currentAvailability = editingAvailability[product.id] !== undefined 
                ? editingAvailability[product.id] 
                : product.available;
              const hasChanges = editingPrices[product.id] !== undefined || 
                                editingAvailability[product.id] !== undefined;

              return (
                <Card key={product.id} className="border-2 border-cyan-100">
                  <CardHeader className="bg-gradient-to-b from-cyan-50 to-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.nameAr}</span>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        currentAvailability 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {currentAvailability ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor={`price-${product.id}`}>السعر (ريال/كيلو)</Label>
                      <Input
                        id={`price-${product.id}`}
                        type="number"
                        value={currentPrice}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor={`available-${product.id}`}>التوفر</Label>
                      <Switch
                        id={`available-${product.id}`}
                        checked={currentAvailability}
                        onCheckedChange={(checked) => handleAvailabilityChange(product.id, checked)}
                      />
                    </div>

                    {hasChanges && (
                      <Button 
                        onClick={() => handleSave(product.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        disabled={updateProductMutation.isPending}
                      >
                        <Save className="ml-2 h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
