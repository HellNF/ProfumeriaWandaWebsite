import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { BrandsMarquee } from '@/components/home/BrandsMarquee'
import { Testimonials } from '@/components/home/Testimonials'
import { getFeaturedProducts, getBrands, getStoreSettings, getReviews } from '@/lib/cms'
import { getMediaUrl, getMediaAlt } from '@/lib/utils'

export default async function HomePage() {
  const [settings, prodottiInEvidenza, recensioni, marche] = await Promise.all([
    getStoreSettings().catch(() => ({}) as Awaited<ReturnType<typeof getStoreSettings>>),
    getFeaturedProducts().catch(() => []),
    getReviews().catch(() => []),
    getBrands().catch(() => []),
  ])

  const catImages = settings.categorieHome || {}

  const imgFragranze = getMediaUrl(catImages.immagineFragranze, "https://lh3.googleusercontent.com/aida-public/AB6AXuDFVo2LdpY5AtJ0-3Z94wXt0Su_QWtsSC4VTVCBDFa5SdGuDkVb5SNVMgkmMBIp-suTk71fsy1rs02z8MHu6PLCrnbnR6B5GtamDXVvzNKW-4W0hGaJLwUvl0DBfL54Rp0uxDKZ7wu-SGnFjt3IVaCphtWVL215NTQNZlFNyQOk8DWV7g93RaRl4HRMo2KyK_d90-O7RpzsJ9wWeP3feTA9g9WO_KEEkvlQm6aBp-wQF8RyuKZXPq0uGlaokxyTwso3cpkJuni6vU0")
  const altFragranze = getMediaAlt(catImages.immagineFragranze, "Fragranze artistiche e profumi di lusso")

  const imgSkincare = getMediaUrl(catImages.immagineSkincare, "https://lh3.googleusercontent.com/aida-public/AB6AXuAfnnwtEybtnAsZx58622d0qIAgSFWWgg7gYAxgEXl2oqjvPepjmMzm_PlO5jYAVDkygDYzRyAwET7l4oUsclGYv2sMiTs_1Bz34pKK2Y0U0EocEDldXK3LdDXNI6rwW0EDbla6XeqRWdY1aysYudBp-fwZeGp9doGH9vyv-rCBmB9isanGy-vZyoDZAFDdjJM7Fj8Qq-AfcFCcIOcE9YceaQuDef8Yh2f9RZtEeEAn4jBkc6B9TChIBBBM23ZRve80G3KEnjnNUww")
  const altSkincare = getMediaAlt(catImages.immagineSkincare, "Prodotti per la cura della pelle e skincare")

  const imgMakeup = getMediaUrl(catImages.immagineMakeup, "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_5zzy6-YRwpybWTLoRNV82UD29s0VmskE6_RHv5Wplcj-YJk-Ef79hGKwWCVfEM6yXz-h2ri3L59ZsPznhEXrIM0he73914h7WD6haae_7rgKxHVMUQD0R3oQ7iRm5Zs2ou7ndoamV23mftSBC71C4u6i8gyn-4blmvAPuevFiv0G11vl_yDyOyM3V3I3CujoQgBxT-SvqlMTcEf4am7ppeJGCLhDrpV3SUWjtFRS9impbU9m2MWbzHpF4ksikIcWtWVeM5twQg")
  const altMakeup = getMediaAlt(catImages.immagineMakeup, "Make-up e trucco professionale")

  const imgAccessori = getMediaUrl(catImages.immagineAccessori, "https://lh3.googleusercontent.com/aida-public/AB6AXuDsAQYC4BqxzIAGKpVXwhv90p5v7sKF0Vgbmzp3VpairgYDhDduvzLPisacA7cCXUausSp2kbcjipfWb0zxklDskm_M77VbYkah9nmj-GsZrejilww2kphjavMKP12Jlg0KtDVYcItrEAHT24ibxaHM2GtTcg00D7H7lw1jV9wbgbnroRXQ5mezpkIkycoL9O1uuJczdmO2KPKWsq0t3EUiV8WymVMTY-X1OwgvLlhu0v7HZ0r2Qdt6S3ksOmF-rwX16xWUcVMmEtE")
  const altAccessori = getMediaAlt(catImages.immagineAccessori, "Borse e accessori di pelletteria di design")

  const imgQualita = getMediaUrl(settings.immagineQualitaTradizione, "https://lh3.googleusercontent.com/aida-public/AB6AXuABGlQR7VcJsq6HNL7FGaWiaHc6PQA3rhC6taMKt4og-STk8AHVQP2DVh3KuEZqKKRi-qzPR8Ac1RWbU4gOoiM5tcg3H1PtLGK8QPOnReivCUvcCaGTlIRah9Ii6NpF_lRLakuGhamWJayutZ4-PH-_Ij4t4nr2szH6I0S0wn_uEnDM5vZ55eJS7n4AUSe-BeU22BrXIrH0y_k7iFQauQHRJrjniFgf57xZZbZdPd78gVbW-k1L2DE-47nCFEI1O5OtJfUHR2cWlK0")
  const altQualita = getMediaAlt(settings.immagineQualitaTradizione, "Qualità Ethos")

  return (
    <main className="space-y-24 pb-20">
      <Hero
        testoHero={settings.testoHero}
        sottotitoloHero={settings.sottotitoloHero}
        immagineHero={settings.immagineHero}
        ctaHeroLabel={settings.ctaHeroLabel}
        ctaHeroUrl={settings.ctaHeroUrl}
      />

      {/* Central Zone — Selezione + FeaturedProducts */}
      <div className="central-zone relative space-y-24 py-2">

      {/* Bento Grid: Curated Categories */}
      <section className="wanda-container">
        <div className="text-center mb-16 space-y-4 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold">La nostra Selezione</h2>
          <p className="text-wanda-text-soft max-w-2xl mx-auto text-lg">Qualità accessibile, scelta con cura per ogni tua esigenza quotidiana.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
          {/* Fragranze Large Card */}
          <Link
            href="/catalogo?categoria=profumeria"
            className="md:col-span-2 lg:col-span-8 group relative overflow-hidden rounded-xl bg-wanda-surface-low transition-all duration-500 hover:shadow-2xl active:scale-[0.99] reveal-on-scroll min-h-[300px] md:min-h-[350px] lg:min-h-0"
            aria-label="Esplora la nostra collezione di fragranze e profumeria"
          >
            <Image 
              src={imgFragranze}
              alt={altFragranze}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-12 space-y-4">
              <h3 className="text-white text-5xl font-bold italic">Fragranze</h3>
              <p className="text-white/80 text-lg max-w-sm">Essenze ricercate che raccontano la tua storia senza bisogno di parole.</p>
              <span className="inline-block bg-white text-wanda-fucsia px-8 py-3 rounded-full font-bold hover:bg-wanda-fucsia-light hover:text-white transition-colors" aria-hidden="true">Esplora ora</span>
            </div>
          </Link>

          {/* Skincare Card */}
          <Link 
            href="/catalogo?categoria=cosmetici" 
            className="md:col-span-1 lg:col-span-4 group relative overflow-hidden rounded-xl bg-wanda-surface-mid transition-all duration-500 hover:shadow-2xl active:scale-[0.99] reveal-on-scroll reveal-delay-100 min-h-[280px] lg:min-h-0"
            aria-label="Scopri i prodotti per la skincare e i cosmetici"
          >
            <Image 
              src={imgSkincare}
              alt={altSkincare}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-wanda-fucsia/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-wanda-violetto/80 to-transparent">
              <h3 className="text-white text-3xl font-bold mb-2">Skincare</h3>
              <p className="text-white/80 text-sm">Trattamenti gentili per una pelle che risplende di luce propria.</p>
            </div>
          </Link>

          {/* Make-up Card */}
          <Link 
            href="/catalogo?categoria=trucco" 
            className="md:col-span-1 lg:col-span-4 group relative overflow-hidden rounded-xl bg-wanda-surface-mid transition-all duration-500 hover:shadow-2xl active:scale-[0.99] reveal-on-scroll reveal-delay-200 min-h-[280px] lg:min-h-0"
            aria-label="Esplora la nostra selezione di Make-up"
          >
            <Image 
              src={imgMakeup}
              alt={altMakeup}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wanda-nero/80 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white text-3xl font-bold mb-2">Make-up</h3>
              <p className="text-white/80 text-sm">Dettagli di colore per esaltare la tua bellezza naturale.</p>
            </div>
          </Link>

          {/* Bags & Accessories */}
          <Link 
            href="/catalogo?categoria=pelletteria" 
            className="md:col-span-2 lg:col-span-8 group relative overflow-hidden rounded-xl bg-wanda-surface-low transition-all duration-500 hover:shadow-2xl active:scale-[0.99] reveal-on-scroll reveal-delay-300 min-h-[300px] md:min-h-[350px] lg:min-h-0"
            aria-label="Scopri borse e accessori di pelletteria"
          >
            <Image 
              src={imgAccessori}
              alt={altAccessori}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-start p-12">
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl max-w-xs shadow-lg">
                <h3 className="text-wanda-fucsia text-3xl font-bold mb-2">Accessori</h3>
                <p className="text-wanda-text-soft mb-4 italic font-medium">Borse e piccoli tesori di design per completare il tuo stile.</p>
                
              </div>
            </div>
          </Link>
        </div>
      </section>

      <div>
        <FeaturedProducts
          prodotti={prodottiInEvidenza}
          title={settings.testoSezioneEvidenza}
          immagineConsulenza={settings.immagineConsulenzaWanda}
        />
      </div>

      </div>{/* /central-zone */}

      <BrandsMarquee marche={marche} />

      {recensioni && recensioni.length > 0 && <Testimonials reviews={recensioni} />}

      {/* New Quality & Tradition Section (Replacing WhatsApp) */}
      <section className="dot-accent-r py-24 relative overflow-hidden reveal-on-scroll">
        <div className="wanda-container relative z-10">
          <div className="panel-glass rounded-[2rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1 bg-wanda-fucsia text-white text-[10px] font-bold tracking-[0.2em] rounded uppercase">
                Ethos Partner
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight font-headline">Qualità garantita, <br/><span className="text-wanda-fucsia italic font-light">da oltre 60 anni.</span></h2>
              <p className="text-lg text-wanda-text-soft max-w-md leading-relaxed">
                Essere partner <strong>ETHOS Profumerie</strong> ci permette di offrirti i migliori marchi internazionali con la sicurezza di prodotti originali e consulenze certificate.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/negozio" className="btn-primary group flex items-center gap-3">
                  Scopri i nostri servizi
                  <span
                    className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-px"
                    style={{ transition: 'transform 400ms cubic-bezier(0.32,0.72,0,1)' }}
                  >→</span>
                </Link>
                <Link href="/catalogo" className="btn-outline">
                  Vedi il catalogo
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-square md:aspect-auto h-[400px]">
              <Image 
                src={imgQualita}
                alt={altQualita}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-wanda-fucsia/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
