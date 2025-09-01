import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ابدأ <span className="text-blue-400">التحدي</span> وارتقِ في لوحة
            الصدارة
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            منصة Gamified تقدم تجربة تعلم فريدة من خلال حل التحديات، جمع النقاط،
            والمنافسة مع الأصدقاء بطريقة ممتعة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/challenges"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2"
            >
              ابدأ الآن
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors"
            >
              تعرف أكثر
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الميزات */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          ماذا نقدم؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">تحديات متنوعة</h3>
            <p className="text-gray-400 text-sm">
              مستويات مختلفة تناسب الجميع من المبتدئين إلى المحترفين.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">نقاط وشارات</h3>
            <p className="text-gray-400 text-sm">
              اجمع النقاط واكسب شارات تظهر مهاراتك وإنجازاتك.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">لوحة صدارة</h3>
            <p className="text-gray-400 text-sm">
              تابع ترتيبك وتنافس مع الآخرين للوصول إلى القمة.
            </p>
          </div>
        </div>
      </section>

      {/* دعوة للعمل */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">جاهز للتحدي؟</h2>
          <p className="text-gray-300 mb-6">
            انضم إلى آلاف المستخدمين الذين يطورون مهاراتهم بطريقة ممتة
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            سجل حسابك الآن
          </Link>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm border-t border-gray-800 mt-8">
        <p>© 2023 Gamified. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
