import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Articles() {
  const { data: articles, isLoading } = trpc.articles.getAll.useQuery();

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
          <h1 className="text-4xl font-bold">المقالات والنصائح</h1>
          <p className="text-cyan-100 mt-2">تعرف على المزيد عن الأسماك والمأكولات البحرية</p>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
              <p className="mt-4 text-gray-600">جاري التحميل...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles?.map((article) => (
                <Card key={article.id} className="hover:shadow-xl transition-shadow duration-300 border-2 border-cyan-100">
                  <CardHeader className="bg-gradient-to-b from-cyan-50 to-white">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-6 h-6 text-cyan-600" />
                      <span className="text-sm text-cyan-600 font-medium">{article.category}</span>
                    </div>
                    <CardTitle className="text-2xl">{article.titleAr}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-6 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link href={`/article/${article.slug}`}>
                        <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                          اقرأ المزيد
                        </Button>
                      </Link>
                      <span className="text-sm text-gray-500">
                        {article.viewCount} مشاهدة
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
