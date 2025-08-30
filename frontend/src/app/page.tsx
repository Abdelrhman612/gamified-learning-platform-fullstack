import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-10">
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          ابدأ التحدي وارتقِ في لوحة الصدارة 🚀
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          منصة Gamified: حل تحديات، اجمع نقاط، نافس أصحابك، وتعلّم بطريقة ممتعة.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/challenges"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            استكشف التحديات
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800"
          >
            تسجيل / دخول
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">تحديات متنوعة</h3>
          <p className="text-sm text-gray-400">مستويات مختلفة تناسب الجميع.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">نقاط وشارات</h3>
          <p className="text-sm text-gray-400">اجمع نقاط وافتح شارات مميزة.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-2">لوحة صدارة</h3>
          <p className="text-sm text-gray-400">نافس وتابع ترتيبك لحظيًا.</p>
        </div>
      </div>
    </section>
  );
}
