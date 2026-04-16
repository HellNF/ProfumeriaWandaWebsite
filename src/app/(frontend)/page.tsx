import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { BrandsMarquee } from '@/components/home/BrandsMarquee'
import { Testimonials } from '@/components/home/Testimonials'
import { QualityCommitment } from '@/components/home/QualityCommitment'
import { WandaConsultancy } from '@/components/home/WandaConsultancy'
import { CategoryBento } from '@/components/home/CategoryBento'
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

  const categoriesMedia = {
    fragranze: {
      url: getMediaUrl(catImages.immagineFragranze, "https://lh3.googleusercontent.com/aida-public/AB6AXuDFVo2LdpY5AtJ0-3Z94wXt0Su_QWtsSC4VTVCBDFa5SdGuDkVb5SNVMgkmMBIp-suTk71fsy1rs02z8MHu6PLCrnbnR6B5GtamDXVvzNKW-4W0hGaJLwUvl0DBfL54Rp0uxDKZ7wu-SGnFjt3IVaCphtWVL215NTQNZlFNyQOk8DWV7g93RaRl4HRMo2KyK_d90-O7RpzsJ9wWeP3feTA9g9WO_KEEkvlQm6aBp-wQF8RyuKZXPq0uGlaokxyTwso3cpkJuni6vU0"),
      alt: getMediaAlt(catImages.immagineFragranze, "Fragranze artistiche e profumi di lusso")
    },
    skincare: {
      url: getMediaUrl(catImages.immagineSkincare, "https://lh3.googleusercontent.com/aida-public/AB6AXuAfnnwtEybtnAsZx58622d0qIAgSFWWgg7gYAxgEXl2oqjvPepjmMzm_PlO5jYAVDkygDYzRyAwET7l4oUsclGYv2sMiTs_1Bz34pKK2Y0U0EocEDldXK3LdDXNI6rwW0EDbla6XeqRWdY1aysYudBp-fwZeGp9doGH9vyv-rCBmB9isanGy-vZyoDZAFDdjJM7Fj8Qq-AfcFCcIOcE9YceaQuDef8Yh2f9RZtEeEAn4jBkc6B9TChIBBBM23ZRve80G3KEnjnNUww"),
      alt: getMediaAlt(catImages.immagineSkincare, "Prodotti per la cura della pelle e skincare")
    },
    makeup: {
      url: getMediaUrl(catImages.immagineMakeup, "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_5zzy6-YRwpybWTLoRNV82UD29s0VmskE6_RHv5Wplcj-YJk-Ef79hGKwWCVfEM6yXz-h2ri3L59ZsPznhEXrIM0he73914h7WD6haae_7rgKxHVMUQD0R3oQ7iRm5Zs2ou7ndoamV23mftSBC71C4u6i8gyn-4blmvAPuevFiv0G11vl_yDyOyM3V3I3CujoQgBxT-SvqlMTcEf4am7ppeJGCLhDrpV3SUWjtFRS9impbU9m2MWbzHpF4ksikIcWtWVeM5twQg"),
      alt: getMediaAlt(catImages.immagineMakeup, "Make-up e trucco professionale")
    },
    accessori: {
      url: getMediaUrl(catImages.immagineAccessori, "https://lh3.googleusercontent.com/aida-public/AB6AXuDsAQYC4BqxzIAGKpVXwhv90p5v7sKF0Vgbmzp3VpairgYDhDduvzLPisacA7cCXUausSp2kbcjipfWb0zxklDskm_M77VbYkah9nmj-GsZrejilww2kphjavMKP12Jlg0KtDVYcItrEAHT24ibxaHM2GtTcg00D7H7lw1jV9wbgbnroRXQ5mezpkIkycoL9O1uuJczdmO2KPKWsq0t3EUiV8WymVMTY-X1OwgvLlhu0v7HZ0r2Qdt6S3ksOmF-rwX16xWUcVMmEtE"),
      alt: getMediaAlt(catImages.immagineAccessori, "Borse e accessori di pelletteria di design")
    }
  }

  const imgQualita = getMediaUrl(settings.immagineQualitaTradizione, "https://lh3.googleusercontent.com/aida-public/AB6AXuABGlQR7VcJsq6HNL7FGaWiaHc6PQA3rhC6taMKt4og-STk8AHVQP2DVh3KuEZqKKRi-qzPR8Ac1RWbU4gOoiM5tcg3H1PtLGK8QPOnReivCUvcCaGTlIRah9Ii6NpF_lRLakuGhamWJayutZ4-PH-_Ij4t4nr2szH6I0S0wn_uEnDM5vZ55eJS7n4AUSe-BeU22BrXIrH0y_k7iFQauQHRJrjniFgf57xZZbZdPd78gVbW-k1L2DE-47nCFEI1O5OtJfUHR2cWlK0")
  const altQualita = getMediaAlt(settings.immagineQualitaTradizione, "Qualità Ethos")

  const imgConsulenza = getMediaUrl(settings.immagineConsulenzaWanda, "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ukCokQcWNYZeWe1P839o22ND7Anfgmd4lTY_AEkObfacToVwdFLxN1x1udJDjjmpxEBq4Q7kDuu8cnQop4MEfFXVNlThZ632sAbrcmNtx5UQBmIOIX7l2eWQ609iybIIUVUZQcnFmaOH1KGdBCyP9YNJokW9mPJBwA80z99Vi-NpXk5mEnfu_tkvArVSx6DLpRr0ZtnESv2-49PaLu-XwL6_OXnUf6EegluJHcn4JjMy9efATO5B67aOq1gdGie_JTgBjrHmfQc")
  const altConsulenza = getMediaAlt(settings.immagineConsulenzaWanda, "La Consulenza di Wanda")

  return (
    <main className="pb-28">
      <Hero
        testoHero={settings.testoHero}
        sottotitoloHero={settings.sottotitoloHero}
        immagineHero={settings.immagineHero}
        ctaHeroLabel={settings.ctaHeroLabel}
        ctaHeroUrl={settings.ctaHeroUrl}
      />

      {/* La nostra Selezione - Bento Archetype */}
      <CategoryBento images={categoriesMedia} />

      <FeaturedProducts
        prodotti={prodottiInEvidenza}
        title={settings.testoSezioneEvidenza}
      />

      <WandaConsultancy image={imgConsulenza} alt={altConsulenza} />

      {/* Visual Connector Line */}
      <div className="wanda-container relative h-24 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-wanda-fucsia/20 via-wanda-fucsia/10 to-transparent -translate-x-1/2" />
      </div>

      <BrandsMarquee marche={marche} />

      <div className="-mt-12 md:-mt-20">
        {recensioni && recensioni.length > 0 && <Testimonials reviews={recensioni} />}
      </div>

      <QualityCommitment image={imgQualita} alt={altQualita} />
    </main>
  )
}


