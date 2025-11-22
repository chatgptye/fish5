import { drizzle } from "drizzle-orm/mysql2";
import { products, articles } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const productsData = [
  { nameAr: "سمك ديرك", price: 5000, available: true, category: "fish", displayOrder: 1 },
  { nameAr: "سمك جحش", price: 2500, available: true, category: "fish", displayOrder: 2 },
  { nameAr: "سمك فارس", price: 2500, available: true, category: "fish", displayOrder: 3 },
  { nameAr: "سمك سلمون", price: 3500, available: true, category: "fish", displayOrder: 4 },
  { nameAr: "سمك مرجان", price: 3500, available: true, category: "fish", displayOrder: 5 },
  { nameAr: "سمك هامور", price: 3500, available: true, category: "fish", displayOrder: 6 },
  { nameAr: "سمك غنا", price: 0, available: false, category: "fish", displayOrder: 7 },
  { nameAr: "سمك حفار", price: 0, available: false, category: "fish", displayOrder: 8 },
  { nameAr: "سمك قرض", price: 3000, available: true, category: "fish", displayOrder: 9 },
  { nameAr: "سمك صولفيش", price: 2500, available: true, category: "fish", displayOrder: 10 },
  { nameAr: "سمك ببغاء", price: 2500, available: true, category: "fish", displayOrder: 11 },
  { nameAr: "سمك سخله", price: 3000, available: true, category: "fish", displayOrder: 12 },
  { nameAr: "سمك عربي", price: 2500, available: true, category: "fish", displayOrder: 13 },
  { nameAr: "سمك قد", price: 2000, available: true, category: "fish", displayOrder: 14 },
  { nameAr: "سمك قد أصفر", price: 0, available: false, category: "fish", displayOrder: 15 },
  { nameAr: "سمك حمام", price: 2500, available: true, category: "fish", displayOrder: 16 },
  { nameAr: "سمك دجاج", price: 0, available: false, category: "fish", displayOrder: 17 },
  { nameAr: "سمك ولد", price: 2000, available: true, category: "fish", displayOrder: 18 },
  { nameAr: "سمك بهار", price: 0, available: false, category: "fish", displayOrder: 19 },
  { nameAr: "سمك سمان", price: 0, available: false, category: "fish", displayOrder: 20 },
  { nameAr: "سمك ظبي", price: 2500, available: true, category: "fish", displayOrder: 21 },
  { nameAr: "سمك عنتق", price: 2500, available: true, category: "fish", displayOrder: 22 },
  { nameAr: "سمك هداس", price: 0, available: false, category: "fish", displayOrder: 23 },
  { nameAr: "سمك سلطان", price: 2500, available: true, category: "fish", displayOrder: 24 },
  { nameAr: "سمك بياض", price: 2000, available: true, category: "fish", displayOrder: 25 },
  { nameAr: "سمك ضمكري", price: 2500, available: true, category: "fish", displayOrder: 26 },
  { nameAr: "سمك ابوعين", price: 3000, available: true, category: "fish", displayOrder: 27 },
  { nameAr: "سمك بكاس", price: 0, available: false, category: "fish", displayOrder: 28 },
  { nameAr: "سمك جلاعف", price: 0, available: false, category: "fish", displayOrder: 29 },
  { nameAr: "سمك منقم", price: 0, available: false, category: "fish", displayOrder: 30 },
  { nameAr: "سمك ناقم", price: 0, available: false, category: "fish", displayOrder: 31 },
  { nameAr: "سمك بعرور", price: 2500, available: true, category: "fish", displayOrder: 32 },
  { nameAr: "سمك حدر", price: 0, available: false, category: "fish", displayOrder: 33 },
  { nameAr: "سمك جرم", price: 2500, available: true, category: "fish", displayOrder: 34 },
  { nameAr: "سمك لسن", price: 2000, available: true, category: "fish", displayOrder: 35 },
  { nameAr: "سمك عنفلوص", price: 0, available: false, category: "fish", displayOrder: 36 },
  { nameAr: "سمك باغه", price: 1000, available: true, category: "fish", displayOrder: 37 },
  { nameAr: "جمبري كبير", price: 5000, available: true, category: "seafood", displayOrder: 38 },
  { nameAr: "جمبري مخلوط", price: 4000, available: true, category: "seafood", displayOrder: 39 },
  { nameAr: "جمبري صغير (حميره)", price: 2500, available: true, category: "seafood", displayOrder: 40 },
  { nameAr: "شروخ", price: 5000, available: true, category: "seafood", displayOrder: 41 },
  { nameAr: "حبار كبير", price: 0, available: false, category: "seafood", displayOrder: 42 },
  { nameAr: "حبار صغير", price: 0, available: false, category: "seafood", displayOrder: 43 },
  { nameAr: "ابو مقص", price: 1500, available: true, category: "seafood", displayOrder: 44 },
];

const articlesData = [
  {
    titleAr: "كيف تميز السمك الطازج",
    slug: "how-to-identify-fresh-fish",
    contentAr: `# كيف تميز السمك الطازج

السمك الطازج هو أساس وجبة صحية ولذيذة. إليك أهم العلامات التي تساعدك على التمييز بين السمك الطازج والسمك القديم:

## العيون
العيون هي المؤشر الأول للطزاجة. يجب أن تكون العيون صافية ولامعة وبارزة قليلاً. إذا كانت العيون غائمة أو غارقة في الرأس، فهذا يدل على أن السمك ليس طازجاً.

## الخياشيم
الخياشيم يجب أن تكون حمراء زاهية أو وردية اللون. إذا كانت الخياشيم بنية أو رمادية، فهذا يعني أن السمك قديم.

## الرائحة
السمك الطازج له رائحة بحرية خفيفة ونظيفة. إذا كانت الرائحة قوية أو كريهة، فتجنب شراء هذا السمك.

## الملمس
عند الضغط على جسم السمك، يجب أن يعود اللحم إلى شكله الأصلي بسرعة. إذا بقي الضغط ظاهراً، فهذا يدل على أن السمك ليس طازجاً.

## القشور
القشور يجب أن تكون لامعة ومتماسكة على الجلد. إذا كانت القشور جافة أو تتساقط بسهولة، فهذا مؤشر على عدم الطزاجة.

## نصائح إضافية
- اشترِ السمك من مصادر موثوقة
- تحقق من تاريخ الصيد إن أمكن
- احفظ السمك في الثلاجة فوراً بعد الشراء
- استهلك السمك في أقرب وقت ممكن

في عالم السمك، نضمن لك الحصول على أطزج الأسماك يومياً من البحر مباشرة إلى مطبخك.`,
    excerpt: "تعلم كيف تميز السمك الطازج من خلال فحص العيون والخياشيم والرائحة والملمس",
    category: "نصائح",
    published: true,
  },
  {
    titleAr: "فوائد السمك الطازج",
    slug: "benefits-of-fresh-fish",
    contentAr: `# فوائد السمك الطازج

السمك الطازج ليس فقط لذيذاً، بل هو أيضاً من أكثر الأطعمة فائدة لصحتك. إليك أهم الفوائد الصحية للسمك الطازج:

## غني بالأوميغا 3
السمك مصدر ممتاز لأحماض أوميغا 3 الدهنية التي تساعد في:
- تحسين صحة القلب والأوعية الدموية
- تقليل الالتهابات في الجسم
- دعم صحة الدماغ والذاكرة
- تحسين المزاج والحد من الاكتئاب

## بروتين عالي الجودة
السمك يحتوي على بروتين كامل سهل الهضم يساعد في:
- بناء وإصلاح العضلات
- تعزيز الشعور بالشبع
- دعم نمو الأطفال والمراهقين
- الحفاظ على وزن صحي

## فيتامينات ومعادن أساسية
السمك غني بالعديد من العناصر الغذائية المهمة:
- فيتامين D: لصحة العظام والمناعة
- فيتامين B12: لصحة الأعصاب وإنتاج الطاقة
- اليود: لصحة الغدة الدرقية
- السيلينيوم: مضاد أكسدة قوي

## فوائد للقلب
الدراسات أثبتت أن تناول السمك بانتظام يساعد في:
- خفض ضغط الدم
- تقليل مستوى الكوليسترول الضار
- تقليل خطر الإصابة بالنوبات القلبية والسكتات الدماغية

## فوائد للدماغ
السمك يدعم صحة الدماغ من خلال:
- تحسين الذاكرة والتركيز
- الحماية من التدهور المعرفي المرتبط بالعمر
- دعم نمو دماغ الجنين عند الحوامل

## نصائح للاستفادة القصوى
- تناول السمك 2-3 مرات أسبوعياً
- نوّع بين أنواع السمك المختلفة
- اختر طرق طهي صحية (شوي، بخار، فرن)
- تجنب القلي العميق للحفاظ على الفوائد

في عالم السمك، نوفر لك أفضل أنواع الأسماك الطازجة لتستمتع بطعم لذيذ وفوائد صحية عظيمة.`,
    excerpt: "اكتشف الفوائد الصحية العديدة للسمك الطازج من أوميغا 3 والبروتين والفيتامينات",
    category: "صحة",
    published: true,
  },
  {
    titleAr: "معلومات عن سمك الهامور",
    slug: "about-hamour-fish",
    contentAr: `# معلومات عن سمك الهامور

سمك الهامور من أشهر وأفضل أنواع الأسماك في منطقة الخليج العربي والبحر الأحمر. يتميز بطعمه اللذيذ ولحمه الأبيض الطري.

## الوصف
الهامور سمكة كبيرة الحجم يمكن أن يصل وزنها إلى عشرات الكيلوغرامات. لها جسم ممتلئ وفم واسع، ولونها يتراوح بين البني والرمادي مع بقع داكنة.

## الموطن
يعيش الهامور في المياه الدافئة قرب الشعاب المرجانية والصخور. يتواجد بكثرة في:
- الخليج العربي
- البحر الأحمر
- بحر العرب
- المحيط الهندي

## القيمة الغذائية
الهامور غني بالعناصر الغذائية المفيدة:
- بروتين عالي الجودة
- أوميغا 3
- فيتامين D وB12
- السيلينيوم والفوسفور
- منخفض الدهون والسعرات الحرارية

## طرق الطهي المفضلة
الهامور سمكة متعددة الاستخدامات يمكن طهيها بطرق مختلفة:
- **مشوي**: الطريقة الأكثر شعبية، يعطي نكهة رائعة
- **مقلي**: لحمه يبقى طرياً وعصارياً
- **مطبوخ مع الأرز**: طبق تقليدي شهير
- **في الفرن**: مع الخضار والتوابل
- **سيخ**: قطع الهامور على الفحم

## نصائح الشراء
عند شراء الهامور، تأكد من:
- العيون صافية ولامعة
- الخياشيم حمراء زاهية
- اللحم متماسك ومرن
- الرائحة بحرية منعشة

## الأهمية الاقتصادية
الهامور من الأسماك المهمة اقتصادياً في المنطقة، حيث:
- يعتبر من الأسماك الفاخرة
- مطلوب بشدة في الأسواق والمطاعم
- يدعم صناعة الصيد المحلية

في عالم السمك، نوفر لك هامور طازج يومياً بأفضل الأسعار وأعلى جودة.`,
    excerpt: "تعرف على سمك الهامور، أحد أشهر الأسماك في الخليج العربي، وفوائده وطرق طهيه",
    category: "معلومات",
    published: true,
  },
  {
    titleAr: "لماذا نختار عالم السمك",
    slug: "why-choose-fish-world",
    contentAr: `# لماذا نختار عالم السمك

عالم السمك هو وجهتك الأولى للحصول على أطزج وأجود أنواع الأسماك والمأكولات البحرية. إليك الأسباب التي تجعلنا الخيار الأمثل:

## الطزاجة المضمونة
نحن نفخر بتقديم أسماك طازجة يومياً:
- صيد يومي مباشر من البحر
- لا نستخدم أسماك مجمدة
- نفحص كل سمكة قبل عرضها
- نضمن الجودة بنسبة 100%

## تنوع كبير
نوفر أكثر من 40 نوعاً من الأسماك والمأكولات البحرية:
- أسماك محلية طازجة
- جمبري بجميع الأحجام
- مأكولات بحرية متنوعة
- خيارات تناسب جميع الأذواق والميزانيات

## أسعار منافسة
نقدم أفضل الأسعار في السوق:
- أسعار عادلة ومباشرة
- لا توجد رسوم خفية
- عروض خاصة منتظمة
- قيمة ممتازة مقابل المال

## خدمة عملاء متميزة
فريقنا جاهز لخدمتك:
- استشارات مجانية حول اختيار السمك
- نصائح حول طرق الطهي
- طلب سهل عبر الواتساب
- توصيل سريع إلى باب منزلك

## نظافة وجودة
نلتزم بأعلى معايير النظافة:
- مرافق نظيفة ومعقمة
- تخزين صحي وآمن
- معدات حديثة
- التزام بمعايير السلامة الغذائية

## معرفة وخبرة
لدينا خبرة طويلة في مجال الأسماك:
- نعرف كيف نختار أفضل الأسماك
- نفهم احتياجات عملائنا
- نقدم نصائح موثوقة
- نبني علاقات طويلة الأمد مع عملائنا

## الراحة والسهولة
نجعل تجربة الشراء سهلة:
- طلب عبر الإنترنت
- توصيل إلى المنزل
- دفع مرن
- خدمة سريعة

## الالتزام بالاستدامة
نهتم بالبيئة البحرية:
- ندعم الصيد المسؤول
- نتجنب الأنواع المهددة بالانقراض
- نشجع الممارسات المستدامة

## ثقة العملاء
عملاؤنا يثقون بنا:
- تقييمات إيجابية
- عملاء دائمون
- توصيات من العائلة والأصدقاء
- سمعة ممتازة في السوق

اختر عالم السمك اليوم واستمتع بأفضل تجربة شراء أسماك على الإطلاق!`,
    excerpt: "اكتشف لماذا عالم السمك هو خيارك الأفضل للأسماك الطازجة والمأكولات البحرية",
    category: "عن الشركة",
    published: true,
  },
];

async function seed() {
  try {
    console.log("Starting seed...");
    
    // Insert products
    console.log("Inserting products...");
    for (const product of productsData) {
      await db.insert(products).values(product);
    }
    console.log(`Inserted ${productsData.length} products`);
    
    // Insert articles
    console.log("Inserting articles...");
    for (const article of articlesData) {
      await db.insert(articles).values(article);
    }
    console.log(`Inserted ${articlesData.length} articles`);
    
    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
