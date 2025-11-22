import { Link } from "wouter";
import { APP_LOGO, APP_TITLE, WHATSAPP_NUMBER } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Loading from "@/components/Loading";

// Enhanced SVG Fish Icon Component
const FishIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fish body */}
    <ellipse cx="55" cy="40" rx="35" ry="20" fill="currentColor" opacity="0.9"/>
    
    {/* Fish tail */}
    <path d="M20 40 L5 30 L10 40 L5 50 Z" fill="currentColor" opacity="0.8"/>
    
    {/* Top fin */}
    <path d="M50 20 L55 10 L60 20 Z" fill="currentColor" opacity="0.7"/>
    
    {/* Bottom fin */}
    <path d="M45 60 L50 68 L55 60 Z" fill="currentColor" opacity="0.7"/>
    
    {/* Side fin */}
    <path d="M60 45 L70 50 L60 55 Z" fill="currentColor" opacity="0.6"/>
    
    {/* Fish eye */}
    <circle cx="75" cy="38" r="4" fill="white"/>
    <circle cx="75" cy="38" r="2" fill="#003080"/>
    
    {/* Fish scales pattern */}
    <path d="M40 35 Q45 33 50 35" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M40 40 Q45 38 50 40" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M40 45 Q45 43 50 45" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M52 35 Q57 33 62 35" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M52 40 Q57 38 62 40" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M52 45 Q57 43 62 45" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    
    {/* Mouth */}
    <path d="M88 40 Q92 38 95 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
  </svg>
);

export default function Home() {
  const { data: products, isLoading } = trpc.products.getAvailable.useQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003080] to-[#0047b3] text-white py-16">
        <div className="container text-center">
          <div className="inline-block mb-6">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-28 w-auto drop-shadow-2xl mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            مرحباً بك في عالم السمك
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium leading-relaxed opacity-95">
            نوفر لك أفضل أنواع الأسماك والمأكولات البحرية الطازجة بأسعار منافسة
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
              <span className="font-bold">✓ طازج يومياً</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
              <span className="font-bold">✓ توصيل سريع</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
              <span className="font-bold">✓ أسعار منافسة</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/articles">
              <a className="text-white/90 hover:text-white transition-colors font-bold underline">المقالات</a>
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/about">
              <a className="text-white/90 hover:text-white transition-colors font-bold underline">من نحن</a>
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/admin">
              <a className="text-white/90 hover:text-white transition-colors font-bold underline">لوحة التحكم</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#003080]">
              منتجاتنا المتوفرة
            </h2>
            <div className="w-20 h-1 bg-[#003080] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <Card 
                key={product.id} 
                className="group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-[#003080] rounded-2xl"
              >
                {/* Content */}
                <div className="relative p-6">
                  {/* Fish SVG Icon */}
                  <div className="relative mb-5">
                    <div className="relative bg-gray-100 group-hover:bg-[#003080]/10 rounded-full p-5 mx-auto w-32 h-32 flex items-center justify-center transition-colors duration-300">
                      <FishIcon className="w-24 h-24 text-[#003080]" />
                    </div>
                  </div>

                  {/* Product name */}
                  <h3 className="text-lg font-bold text-center mb-4 text-gray-800 group-hover:text-[#003080] transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
                    {product.nameAr}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-5">
                    <div className="inline-block bg-[#003080] text-white px-5 py-2 rounded-xl shadow-lg">
                      <span className="text-2xl font-black">{product.price.toLocaleString('ar-YE')}</span>
                      <span className="text-sm font-medium mr-1">ريال/كيلو</span>
                    </div>
                  </div>

                  {/* Order button */}
                  <Link href={`/order/${product.id}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      اطلب الآن
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#003080]">
              لماذا تختار عالم السمك؟
            </h2>
            <div className="w-20 h-1 bg-[#003080] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#003080]">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🐟</div>
              <h3 className="text-xl font-bold mb-2 text-[#003080]">طزاجة مضمونة</h3>
              <p className="text-gray-600 leading-relaxed text-sm">صيد يومي مباشر من البحر بدون تجميد. نضمن الجودة بنسبة 100%</p>
            </div>
            
            <div className="group bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#003080]">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-xl font-bold mb-2 text-[#003080]">أسعار منافسة</h3>
              <p className="text-gray-600 leading-relaxed text-sm">أفضل الأسعار في السوق بدون رسوم خفية. قيمة ممتازة مقابل المال</p>
            </div>
            
            <div className="group bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#003080]">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-[#003080]">توصيل مجاني</h3>
              <p className="text-gray-600 leading-relaxed text-sm">نوصل طلبك إلى باب منزلك مجاناً للأماكن القريبة في نفس اليوم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="تواصل عبر واتساب"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </div>
      </a>

      {/* Footer */}
      <footer className="bg-[#003080] text-white py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-auto drop-shadow-lg" />
                <h3 className="text-xl font-bold">عالم السمك</h3>
              </div>
              <p className="text-white/80 leading-relaxed text-sm">وجهتك الأولى للحصول على أطيب وأجود أنواع الأسماك والمأكولات البحرية</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-3">روابط سريعة</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/"><a className="text-white/80 hover:text-white transition-colors">الرئيسية</a></Link></li>
                <li><Link href="/articles"><a className="text-white/80 hover:text-white transition-colors">المقالات</a></Link></li>
                <li><Link href="/about"><a className="text-white/80 hover:text-white transition-colors">من نحن</a></Link></li>
                <li><Link href="/admin"><a className="text-white/80 hover:text-white transition-colors">لوحة التحكم</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-3">تواصل معنا</h3>
              <p className="text-white/80 mb-2 font-medium text-sm">📱 واتساب: {WHATSAPP_NUMBER}</p>
              <p className="text-white/80 text-sm">نستقبل طلباتكم يومياً</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-6 pt-6 text-center">
            <p className="text-white/80 text-sm">&copy; 2024 عالم السمك. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
