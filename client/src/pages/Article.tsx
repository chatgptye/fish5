import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Eye } from "lucide-react";
import { Streamdown } from "streamdown";

export default function Article() {
  const [, params] = useRoute("/article/:slug");
  const slug = params?.slug || "";

  const { data: article, isLoading, error } = trpc.articles.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-6">المقال غير موجود</p>
            <Link href="/articles">
              <Button>العودة للمقالات</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-8">
        <div className="container">
          <Link href="/articles">
            <Button variant="secondary" className="mb-4">
              <ArrowRight className="ml-2" />
              العودة للمقالات
            </Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12">
        <div className="container max-w-4xl">
          <Card className="border-2 border-cyan-100">
            <CardContent className="p-8 md:p-12">
              {/* Article Header */}
              <div className="mb-8 pb-8 border-b-2 border-cyan-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    <Eye className="w-4 h-4" />
                    {article.viewCount} مشاهدة
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.titleAr}</h1>
                {article.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>
                )}
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <Streamdown>{article.contentAr}</Streamdown>
              </div>

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t-2 border-cyan-100 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">هل أنت مستعد للطلب؟</h3>
                <p className="text-gray-600 mb-6">تصفح منتجاتنا الطازجة واطلب الآن</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg px-8 py-6">
                    تصفح المنتجات
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}
