import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function About() {
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
          <h1 className="text-4xl font-bold">لماذا تختار عالم السمك؟</h1>
          <p className="text-cyan-100 mt-2">وجهتك الأولى للأسماك الطازجة والمأكولات البحرية</p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <Card className="border-2 border-cyan-100 mb-12">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-cyan-700">من نحن</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                عالم السمك هو وجهتك الأولى للحصول على أطيب وأجود أنواع الأسماك والمأكولات البحرية. 
                نحن نفخر بتقديم خدمة متميزة لعملائنا منذ سنوات طويلة، ونلتزم بأعلى معايير الجودة والطزاجة.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                فريقنا من الخبراء يختار بعناية أفضل الأسماك يومياً من البحر مباشرة، لنضمن لك تجربة 
                تسوق مميزة ومنتجات عالية الجودة في كل مرة.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">ما يميزنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🐟</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">الطزاجة المضمونة</h3>
                <p className="text-gray-600">
                  نحن نفخر بتقديم أسماك طازجة يومياً. صيد يومي مباشر من البحر، لا نستخدم أسماك مجمدة، 
                  ونفحص كل سمكة قبل عرضها. نضمن الجودة بنسبة 100%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">تنوع كبير</h3>
                <p className="text-gray-600">
                  نوفر أكثر من 40 نوعاً من الأسماك والمأكولات البحرية. أسماك محلية طازجة، جمبري بجميع 
                  الأحجام، ومأكولات بحرية متنوعة. خيارات تناسب جميع الأذواق والميزانيات.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">أسعار منافسة</h3>
                <p className="text-gray-600">
                  نقدم أفضل الأسعار في السوق. أسعار عادلة ومباشرة بدون رسوم خفية، عروض خاصة منتظمة، 
                  وقيمة ممتازة مقابل المال.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">خدمة عملاء متميزة</h3>
                <p className="text-gray-600">
                  فريقنا جاهز لخدمتك. استشارات مجانية حول اختيار السمك، نصائح حول طرق الطهي، طلب سهل 
                  عبر الواتساب، وتوصيل سريع إلى باب منزلك.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">نظافة وجودة</h3>
                <p className="text-gray-600">
                  نلتزم بأعلى معايير النظافة. مرافق نظيفة ومعقمة، تخزين صحي وآمن، معدات حديثة، 
                  والتزام بمعايير السلامة الغذائية.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-100">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-700">الالتزام بالاستدامة</h3>
                <p className="text-gray-600">
                  نهتم بالبيئة البحرية. ندعم الصيد المسؤول، نتجنب الأنواع المهددة بالانقراض، 
                  ونشجع الممارسات المستدامة.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">هل أنت مستعد للطلب؟</h3>
              <p className="text-gray-600 mb-6 text-lg">
                اختر عالم السمك اليوم واستمتع بأفضل تجربة شراء أسماك على الإطلاق!
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg px-8 py-6">
                  تصفح المنتجات الآن
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
