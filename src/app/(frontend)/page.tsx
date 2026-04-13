import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Testimonials } from '@/components/home/Testimonials'
import { getFeaturedProducts, getStoreSettings, getReviews } from '@/lib/cms'

export default async function HomePage() {
  const [settings, prodottiInEvidenza, recensioni] = await Promise.all([
    getStoreSettings(),
    getFeaturedProducts(),
    getReviews(),
  ])

  const immagineHero =
    typeof settings.immagineHero === 'object' ? settings.immagineHero : null

  return (
    <main className="space-y-24 pb-20">
      <Hero
        testoHero={settings.testoHero}
        sottotitoloHero={settings.sottotitoloHero}
        immagineHero={immagineHero}
        ctaHeroLabel={settings.ctaHeroLabel}
        ctaHeroUrl={settings.ctaHeroUrl}
      />

      {/* Bento Grid: Curated Categories */}
      <section className="px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">La nostra Selezione</h2>
          <p className="text-wanda-text-soft max-w-2xl mx-auto text-lg">Qualità accessibile, scelta con cura per ogni tua esigenza quotidiana.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Fragranze Large Card */}
          <Link href="/catalogo?categoria=profumeria" className="md:col-span-8 group relative overflow-hidden rounded-xl bg-wanda-surface-low transition-all duration-500 hover:shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFVo2LdpY5AtJ0-3Z94wXt0Su_QWtsSC4VTVCBDFa5SdGuDkVb5SNVMgkmMBIp-suTk71fsy1rs02z8MHu6PLCrnbnR6B5GtamDXVvzNKW-4W0hGaJLwUvl0DBfL54Rp0uxDKZ7wu-SGnFjt3IVaCphtWVL215NTQNZlFNyQOk8DWV7g93RaRl4HRMo2KyK_d90-O7RpzsJ9wWeP3feTA9g9WO_KEEkvlQm6aBp-wQF8RyuKZXPq0uGlaokxyTwso3cpkJuni6vU0"
              alt="Fragranze"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-12 space-y-4">
              <h3 className="text-white text-5xl font-bold italic">Fragranze</h3>
              <p className="text-white/80 text-lg max-w-sm">Essenze ricercate che raccontano la tua storia senza bisogno di parole.</p>
              <button className="bg-white text-wanda-fucsia px-8 py-3 rounded-full font-bold hover:bg-wanda-fucsia-light hover:text-white transition-colors">Esplora ora</button>
            </div>
          </Link>

          {/* Skincare Card */}
          <Link href="/catalogo?categoria=cosmetici" className="md:col-span-4 group relative overflow-hidden rounded-xl bg-wanda-surface-mid transition-all duration-500 hover:shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfnnwtEybtnAsZx58622d0qIAgSFWWgg7gYAxgEXl2oqjvPepjmMzm_PlO5jYAVDkygDYzRyAwET7l4oUsclGYv2sMiTs_1Bz34pKK2Y0U0EocEDldXK3LdDXNI6rwW0EDbla6XeqRWdY1aysYudBp-fwZeGp9doGH9vyv-rCBmB9isanGy-vZyoDZAFDdjJM7Fj8Qq-AfcFCcIOcE9YceaQuDef8Yh2f9RZtEeEAn4jBkc6B9TChIBBBM23ZRve80G3KEnjnNUww"
              alt="Skincare"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-wanda-fucsia/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-wanda-violetto/80 to-transparent">
              <h3 className="text-white text-3xl font-bold mb-2">Skincare</h3>
              <p className="text-white/80 text-sm">Trattamenti gentili per una pelle che risplende di luce propria.</p>
            </div>
          </Link>

          {/* Make-up Card */}
          <Link href="/catalogo?categoria=trucco" className="md:col-span-4 group relative overflow-hidden rounded-xl bg-wanda-surface-mid transition-all duration-500 hover:shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS_5zzy6-YRwpybWTLoRNV82UD29s0VmskE6_RHv5Wplcj-YJk-Ef79hGKwWCVfEM6yXz-h2ri3L59ZsPznhEXrIM0he73914h7WD6haae_7rgKxHVMUQD0R3oQ7iRm5Zs2ou7ndoamV23mftSBC71C4u6i8gyn-4blmvAPuevFiv0G11vl_yDyOyM3V3I3CujoQgBxT-SvqlMTcEf4am7ppeJGCLhDrpV3SUWjtFRS9impbU9m2MWbzHpF4ksikIcWtWVeM5twQg"
              alt="Make-up"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wanda-nero/80 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white text-3xl font-bold mb-2">Make-up</h3>
              <p className="text-white/80 text-sm">Dettagli di colore per esaltare la tua bellezza naturale.</p>
            </div>
          </Link>

          {/* Bags & Accessories */}
          <Link href="/catalogo?categoria=pelletteria" className="md:col-span-8 group relative overflow-hidden rounded-xl bg-wanda-surface-low transition-all duration-500 hover:shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsAQYC4BqxzIAGKpVXwhv90p5v7sKF0Vgbmzp3VpairgYDhDduvzLPisacA7cCXUausSp2kbcjipfWb0zxklDskm_M77VbYkah9nmj-GsZrejilww2kphjavMKP12Jlg0KtDVYcItrEAHT24ibxaHM2GtTcg00D7H7lw1jV9wbgbnroRXQ5mezpkIkycoL9O1uuJczdmO2KPKWsq0t3EUiV8WymVMTY-X1OwgvLlhu0v7HZ0r2Qdt6S3ksOmF-rwX16xWUcVMmEtE"
              alt="Accessori"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-start p-12">
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl max-w-xs shadow-lg">
                <h3 className="text-wanda-fucsia text-3xl font-bold mb-2">Accessori</h3>
                <p className="text-wanda-text-soft mb-4 italic font-medium">Borse e piccoli tesori di design per completare il tuo stile.</p>
                <span className="text-wanda-fucsia text-3xl">👜</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <FeaturedProducts 
        prodotti={prodottiInEvidenza} 
        title={settings.testoSezioneEvidenza}
      />

      {recensioni && recensioni.length > 0 && <Testimonials reviews={recensioni} />}

      {/* New Quality & Tradition Section (Replacing WhatsApp) */}
      <section className="py-24 bg-wanda-surface-low relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 relative z-10">
          <div className="bg-white rounded-xl p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(180,0,93,0.05)] flex flex-col md:flex-row items-center gap-16 border border-white/40">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1 bg-wanda-fucsia text-white text-[10px] font-bold tracking-[0.2em] rounded uppercase">
                Ethos Partner
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight font-headline">Qualità garantita, <br/><span className="text-wanda-fucsia italic">da oltre 60 anni.</span></h2>
              <p className="text-lg text-wanda-text-soft max-w-md leading-relaxed">
                Essere partner **ETHOS Profumerie** ci permette di offrirti i migliori marchi internazionali con la sicurezza di prodotti originali e consulenze certificate. 
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/negozio" className="btn-primary">
                  Scopri i nostri servizi
                </Link>
                <Link href="/catalogo" className="btn-outline">
                  Vedi il catalogo
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-square md:aspect-auto h-[400px]">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABGlQR7VcJsq6HNL7FGaWiaHc6PQA3rhC6taMKt4og-STk8AHVQP2DVh3KuEZqKKRi-qzPR8Ac1RWbU4gOoiM5tcg3H1PtLGK8QPOnReivCUvcCaGTlIRah9Ii6NpF_lRLakuGhamWJayutZ4-PH-_Ij4t4nr2szH6I0S0wn_uEnDM5vZ55eJS7n4AUSe-BeU22BrXIrH0y_k7iFQauQHRJrjniFgf57xZZbZdPd78gVbW-k1L2DE-47nCFEI1O5OtJfUHR2cWlK0"
                alt="Qualità Ethos"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-wanda-fucsia/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
