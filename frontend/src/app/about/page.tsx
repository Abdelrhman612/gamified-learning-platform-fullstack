"use client";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            حول منصة <span className="text-blue-400">Gamified</span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            منصة تعليمية مبتكرة تجمع بين التعلم والمتعة من خلال تحويل عملية
            التعلم إلى تجربة تفاعلية تنافسية مليئة بالتحديات والإنجازات.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-wrap border-b border-gray-700 mb-10">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "mission"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("mission")}
          >
            رسالتنا
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "how-it-works"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("how-it-works")}
          >
            كيف تعمل؟
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "features"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("features")}
          ></button>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === "mission" && (
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                رسالتنا ورؤيتنا
              </h2>
              <p className="text-gray-300 leading-relaxed">
                في عالم يتسارع فيه التطور التقني، أصبح تعلم المهارات الرقمية
                ضرورة لا غنى عنها. لكن الطرق التقليدية للتعلم قد تكون مملة
                أحياناً وتفقد المتعلم حماسه مع الوقت.
              </p>
              <p className="text-gray-300 leading-relaxed">
                هنا تأتي مهمة منصة{" "}
                <span className="text-blue-400">Gamified</span>، حيث نقدم تجربة
                تعلم فريدة تجمع بين الفائدة والمتعة من خلال تحويل عملية التعلم
                إلى لعبة ممتعة مليئة بالتحديات والمكافآت.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
                <h3 className="text-xl font-bold mb-4 text-blue-400">رؤيتنا</h3>
                <p className="text-gray-300">
                  أن نكون المنصة الرائدة في تعزيز شغف التعلم through تجارب
                  gamified تحفز الإبداع والمنافسة الصحية بين المتعلمين.
                </p>
              </div>
            </div>
          )}

          {activeTab === "how-it-works" && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                كيف تعمل المنصة؟
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    اختر التحدي المناسب
                  </h3>
                  <p className="text-gray-300">
                    تصفح التحديات المتاحة واختر ما يناسب مستواك واهتماماتك.
                    تتراوح التحديات من المستوى المبتدئ إلى المتقدم.
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">اطلع على المتطلبات</h3>
                  <p className="text-gray-300">
                    كل تحدي يحتوي على متطلبات واضحة وأهداف تعليمية محددة. اقرأها
                    بعناية قبل البدء.
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <span className="text-amber-400 font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">قدم حلك</h3>
                  <p className="text-gray-300">
                    بعد إكمال التحدي، قدم حلك ليتم تقييمه. يمكنك الحصول على
                    ملاحظات من المجتمع والمشرفين.
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <span className="text-green-400 font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">اكسب النقاط وارتقِ</h3>
                  <p className="text-gray-300">
                    مع كل تحدي تكتمله، تكسب نقاطًا وشارات. تابع تقدمك على لوحة
                    الصدارة وتنافس مع الآخرين.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                مميزات المنصة
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">
                    تحديات متنوعة
                  </h3>
                  <p className="text-gray-300 mb-4">
                    نوفر مجموعة واسعة من التحديات في مختلف المجالات التقنية، من
                    تطوير الويب إلى تحليل البيانات والتصميم.
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>تحديات للمبتدئين والمحترفين</li>
                    <li>مجالات متعددة تناسب مختلف الاهتمامات</li>
                    <li>تحديات أسبوعية وشهرية للحفاظ على حماسك</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">
                    نظام المكافآت
                  </h3>
                  <p className="text-gray-300 mb-4">
                    نظام متكامل للمكافآت يحفزك على الاستمرار في التعلم وتحسين
                    مهاراتك.
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>اكتسب النقاط مع كل تحدي تكتمله</li>
                    <li>احصل على شارات تميز إنجازاتك</li>
                    <li>مكانة خاصة للمتعلمين المتميزين</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-amber-400">
                    مجتمع تفاعلي
                  </h3>
                  <p className="text-gray-300 mb-4">
                    انضم إلى مجتمع من المتعلمين المتحمسين وشارك المعرفة
                    والخبرات.
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>شارك حلولك واحصل على تعليقات</li>
                    <li>تعلم من حلول الآخرين</li>
                    <li>ناقش الأفكار واطلب المساعدة</li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-green-400">
                    تتبع التقدم
                  </h3>
                  <p className="text-gray-300 mb-4">
                    تابع تقدمك التعليمي وتطور مهاراتك مع أدوات متابعة متقدمة.
                  </p>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>إحصائيات مفصلة عن أدائك</li>
                    <li>مخططات بيانية لتطور مهاراتك</li>
                    <li>مقارنة أدائك مع المتوسط العام</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center bg-gray-800/30 rounded-xl max-w-4xl mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          جاهز للانضمام إلى رحلتنا؟
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف المتعلمين الذين يطورون مهاراتهم بطريقة ممتعة وفعالة مع
          منصة Gamified.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            أنشئ حسابك الآن
          </Link>
          <Link
            href="/challenges"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
          >
            استعرض التحديات
          </Link>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm border-t border-gray-800">
        <p>© Gamified. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
