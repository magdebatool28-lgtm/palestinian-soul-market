import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, Sparkles, Star, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/palestine-hero.jpg";
import ceramicImage from "@/assets/product-ceramic.jpg";
import tatreezImage from "@/assets/product-tatreez.jpg";
import oliveOilImage from "@/assets/product-olive-oil.jpg";
import keffiyehImage from "@/assets/product-keffiyeh.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "متجر فلسطين | منتجات فلسطينية أصيلة" },
      { name: "description", content: "اكتشف منتجات فلسطينية يدوية وغذائية أصيلة، مختارة من الحرفيين والمشاريع المحلية." },
      { property: "og:title", content: "متجر فلسطين | منتجات فلسطينية أصيلة" },
      { property: "og:description", content: "من تراثنا إلى بيتك — منتجات أصيلة تدعم الحرفيين والمشاريع المحلية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { id: 1, name: "طبق زيتون خزفي يدوي", category: "الخزف والفخار", price: 145, image: ceramicImage, rating: 4.9 },
  { id: 2, name: "وسادة تطريز فلسطيني", category: "التطريز والمنسوجات", price: 190, image: tatreezImage, rating: 5 },
  { id: 3, name: "زيت زيتون بكر ممتاز", category: "خيرات الأرض", price: 75, image: oliveOilImage, rating: 4.8 },
  { id: 4, name: "كوفية فلسطينية أصلية", category: "الأزياء التراثية", price: 95, image: keffiyehImage, rating: 4.9 },
];

const navItems = ["الرئيسية", "المنتجات", "الأقسام", "من نحن", "تواصل معنا"];
const features = [
  { icon: Truck, title: "توصيل موثوق", text: "تغليف آمن حتى باب بيتك" },
  { icon: Heart, title: "دعم مباشر", text: "للحرفيين والمشاريع المحلية" },
  { icon: Star, title: "جودة مختارة", text: "منتجات أصيلة بعناية" },
];

function Index() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const visibleProducts = useMemo(
    () => products.filter((product) => `${product.name} ${product.category}`.includes(search.trim())),
    [search],
  );

  const addToCart = (name: string) => {
    setCartCount((count) => count + 1);
    setNotice(`تمت إضافة «${name}» إلى السلة`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative z-30 bg-card">
        <div className="bg-primary px-4 py-2 text-center text-xs text-primary-foreground sm:text-sm">
          <span className="ml-1 text-red-300">♥</span> دعمًا للمنتج الفلسطيني .. كل طلب يساهم في دعم أصحاب الحرف والمشاريع المحلية
        </div>
        <div className="container-store flex min-h-24 items-center justify-between gap-4 py-4">
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="متجر فلسطين - الرئيسية">
            <span className="relative grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <svg viewBox="0 0 48 48" className="size-8" aria-hidden="true"><path d="M24 41V17m0 11C16 27 12 22 12 15c8 1 12 6 12 13Zm0 7c8-1 12-6 12-13-8 1-12 6-12 13Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path d="m7 7 9 6-9 6Z" fill="var(--flag-red)"/></svg>
            </span>
            <span><strong className="block font-display text-lg text-primary sm:text-xl">متجر فلسطين</strong><small className="text-xs text-muted-foreground">منتجات أصيلة .. من أرضنا</small></span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="التنقل الرئيسي">
            {navItems.map((item, index) => <a key={item} href={index === 0 ? "#top" : index === 1 ? "#products" : index === 2 ? "#categories" : index === 3 ? "#story" : "#footer"} className="text-sm font-semibold transition-colors hover:text-primary">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <label className="relative hidden xl:block">
              <Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن منتج، فئة أو كلمة مفتاحية..." className="h-11 w-72 rounded-lg border border-input bg-background pr-11 pl-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20" />
            </label>
            <Button variant="icon" size="icon" aria-label={`سلة التسوق، ${cartCount} منتجات`} className="relative">
              <ShoppingBag className="size-5" /><span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-flag-red text-[10px] text-primary-foreground">{cartCount}</span>
            </Button>
            <Button variant="icon" size="icon" className="lg:hidden" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
          </div>
        </div>
        <div className="container-store pb-4 xl:hidden">
          <label className="relative block"><Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن منتج، فئة أو كلمة مفتاحية..." className="h-11 w-full rounded-lg border border-input bg-background pr-11 pl-4 text-sm outline-none focus:border-primary" /></label>
        </div>
        {menuOpen && <nav className="absolute inset-x-0 top-full border-t border-border bg-card p-5 shadow-lg lg:hidden">{navItems.map((item, index) => <a key={item} href={index === 0 ? "#top" : index === 1 ? "#products" : index === 2 ? "#categories" : index === 3 ? "#story" : "#footer"} onClick={() => setMenuOpen(false)} className="block border-b border-border/60 py-3 font-semibold last:border-0">{item}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative isolate min-h-[520px] overflow-hidden sm:min-h-[600px]">
          <img src={heroImage} width={1920} height={1008} alt="إطلالة على القدس مزينة بأغصان الزيتون والكوفية والتطريز الفلسطيني" className="absolute inset-0 -z-20 size-full object-cover object-center" />
          <div className="hero-shade absolute inset-0 -z-10" />
          <div className="container-store flex min-h-[520px] items-center py-16 sm:min-h-[600px]">
            <div className="max-w-2xl text-hero-foreground">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-hero-foreground/30 bg-primary/50 px-4 py-2 text-sm backdrop-blur-sm"><Sparkles className="size-4"/> من قلب فلسطين</span>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">منتجات فلسطينية أصيلة</h1>
              <p className="mt-4 font-display text-xl font-semibold sm:text-2xl">من تراثنا .. إلى بيتك</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-hero-foreground/90 sm:text-lg">اكتشف مجموعة مختارة من المنتجات الفلسطينية اليدوية والغذائية التي تعكس أصالة أرضنا، وتحكي حكاية كل صانع وحرفي.</p>
              <Button variant="hero" size="lg" className="mt-8" onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}>تسوّق المنتجات <span aria-hidden="true">←</span></Button>
            </div>
          </div>
        </section>

        <section id="categories" className="border-b border-border bg-card py-14">
          <div className="container-store">
            <div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-sm font-bold text-flag-red">اختيارات من أرضنا</p><h2 className="text-2xl font-bold sm:text-3xl">تسوّق حسب القسم</h2></div><a href="#products" className="hidden text-sm font-bold text-primary sm:block">عرض الكل ←</a></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {products.map((product) => <a key={product.id} href="#products" className="group relative aspect-[4/3] overflow-hidden rounded-lg"><img src={product.image} width={912} height={912} loading="lazy" alt={product.category} className="size-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent px-4 pb-4 pt-12 font-display text-sm font-bold text-primary-foreground sm:text-base">{product.category}</span></a>)}
            </div>
          </div>
        </section>

        <section id="products" className="py-16 sm:py-20">
          <div className="container-store">
            <div className="mb-9 text-center"><p className="mb-2 text-sm font-bold text-flag-red">مختارة بعناية</p><h2 className="text-3xl font-bold">منتجاتنا المميزة</h2><p className="mt-3 text-muted-foreground">جودة أصيلة، وصناعة تحمل قصة المكان والإنسان</p></div>
            {visibleProducts.length > 0 ? <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{visibleProducts.map((product) => <article key={product.id} className="group overflow-hidden rounded-lg border border-border bg-card soft-shadow transition duration-300 hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden"><img src={product.image} width={912} height={912} loading="lazy" alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-105"/><Button variant="icon" size="icon" aria-label={`أضف ${product.name} للمفضلة`} className="absolute left-3 top-3 size-9 border-0 bg-card/90"><Heart className="size-4" /></Button></div>
              <div className="p-4 sm:p-5"><p className="text-xs text-muted-foreground">{product.category}</p><h3 className="mt-2 min-h-12 text-sm font-bold leading-6 sm:text-base">{product.name}</h3><div className="mt-2 flex items-center gap-1 text-sm"><Star className="size-4 fill-amber-500 text-amber-500"/><span>{product.rating}</span></div><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><strong className="text-lg text-primary">{product.price} ₪</strong><Button size="default" onClick={() => addToCart(product.name)} className="w-full px-3 sm:w-auto"><ShoppingBag className="size-4"/> أضف للسلة</Button></div></div>
            </article>)}</div> : <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center"><Search className="mx-auto mb-3 size-7 text-muted-foreground"/><p className="font-bold">لم نجد منتجًا مطابقًا لبحثك</p><button onClick={() => setSearch("")} className="mt-2 text-sm font-bold text-primary">مسح البحث</button></div>}
          </div>
        </section>

        <section id="story" className="keffiyeh-line bg-card py-16 sm:py-20"><div className="container-store grid items-center gap-10 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3"><img src={tatreezImage} width={912} height={912} loading="lazy" alt="تطريز فلسطيني يدوي" className="aspect-[4/5] w-full rounded-lg object-cover"/><img src={ceramicImage} width={912} height={912} loading="lazy" alt="فخار فلسطيني مزخرف بالزيتون" className="mt-8 aspect-[4/5] w-full rounded-lg object-cover"/></div><div className="max-w-xl"><p className="text-sm font-bold text-flag-red">أكثر من متجر</p><h2 className="mt-3 text-3xl font-bold leading-snug sm:text-4xl">كل قطعة تحمل حكاية فلسطينية</h2><p className="mt-5 leading-8 text-muted-foreground">نجمع لك منتجات صُنعت بشغف على أيدي حرفيين ومشاريع عائلية محلية. باختيارك من متجر فلسطين، تحافظ على حرفة وتساند بيتًا وتُبقي الحكاية حيّة.</p><Button variant="outline" className="mt-7">تعرّف على قصتنا <span aria-hidden="true">←</span></Button></div></div></section>

        <section className="bg-primary py-10 text-primary-foreground"><div className="container-store grid gap-7 sm:grid-cols-3">{features.map(({ icon: FeatureIcon, title, text }) => <div key={title} className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary-foreground/10"><FeatureIcon className="size-5"/></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-primary-foreground/75">{text}</p></div></div>)}</div></section>
      </main>

      <footer id="footer" className="bg-foreground py-12 text-background"><div className="container-store grid gap-10 border-b border-background/15 pb-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><h2 className="font-display text-2xl font-bold">متجر فلسطين</h2><p className="mt-3 max-w-md text-sm leading-7 text-background/70">منصة تجمع أصالة المنتج الفلسطيني وتقرّبه إلى كل بيت، بمحبة ومسؤولية.</p></div><div><h3 className="font-bold">روابط سريعة</h3><div className="mt-4 grid gap-2 text-sm text-background/70"><a href="#products">المنتجات</a><a href="#categories">الأقسام</a><a href="#story">من نحن</a></div></div><div><h3 className="font-bold">ابقَ قريبًا</h3><p className="mt-3 text-sm text-background/70">اشترك لتصلك الحكايات والمنتجات الجديدة.</p><form className="mt-4 flex" onSubmit={(event) => {event.preventDefault(); setNotice("شكرًا لاشتراكك في نشرتنا");}}><input type="email" required aria-label="البريد الإلكتروني" placeholder="بريدك الإلكتروني" className="min-w-0 flex-1 rounded-r-lg border border-background/20 bg-background/10 px-3 text-sm outline-none placeholder:text-background/50"/><Button type="submit" className="rounded-r-none">اشتراك</Button></form></div></div><div className="container-store pt-6 text-center text-xs text-background/55">© 2026 متجر فلسطين — بكل حب من أرضنا</div></footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-lg bg-foreground px-5 py-3 text-sm font-bold text-background shadow-xl">{notice}</div>}
    </div>
  );
}
