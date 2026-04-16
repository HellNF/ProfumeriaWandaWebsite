import type { Metadata } from 'next'
import Image from 'next/image'
import { MapEmbed } from '@/components/negozio/MapEmbed'
import { StructuredData } from '@/components/negozio/StructuredData'
import { HeroImageContainer } from '@/components/negozio/HeroImageContainer'
import { ServiceBento } from '@/components/negozio/ServiceBento'
import { ContactSection } from '@/components/negozio/ContactSection'
import { getStoreSettings } from '@/lib/cms'
import { getMediaUrl, getMediaAlt } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Il Negozio',
  description: 'Un luogo dove la cortesia è di casa e ogni profumo racconta una storia. Scopri la nostra boutique a Torino.',
}

const dayLabels: Record<string, string> = {
  Mo: 'Lun', Tu: 'Mar', We: 'Mer', Th: 'Gio', Fr: 'Ven', Sa: 'Sab', Su: 'Dom',
}

export default async function NegozioPage() {
  const settings = await getStoreSettings()

  const servImages = settings.serviziNegozio || {}

  const imgHero = getMediaUrl(settings.immagineHeroNegozio, "https://lh3.googleusercontent.com/aida-public/AB6AXuDP6917KZk53AwGAHObhtqi6rieq38KAREqkOXnegkERH9VLzSXfHaf9KtCUscNyldtHBUmQy3AziUVOxhW6guHvkOg5LIIhCmxvHubUpdgmiJtULZBPhdbmSrU-T1p4RlbXmZU1CgmZogHuderLAL6PMCW0o2SYoKHPJvJktgbCpucbXlzLBFSG3p8SLzT3NOYp7m6mUG9UtEj3Cr8Rv5kdEtQxkLPjqQARgKV6dXc9JrgDIiAZiird-3bjQeyOY_1zSPMaDRNYwc")
  const altHero = getMediaAlt(settings.immagineHeroNegozio, "Interno Boutique")

  const imgStoria = getMediaUrl(settings.immagineStoria, "https://lh3.googleusercontent.com/aida-public/AB6AXuA29C17qyhf-rklGL5NnCGi7_ydGjXakQi3JBN06y53LUeXC8HMZn7t-uNmby1wQXSV7Luzt5KRplVLdLw6nf8QBNjTqipi5Z3AMV61nW18Y7I_ZmX5KEwDqdpTGyLNBV7u4j7_0BtSsN2gTxTd2tPhJFvgaGTx6r54lQx5KqXuqIZG9BeyVct0aq_wiTpoBquvZWIBR0YxhQrFhZBJq7ILhVXZQ67Om52O4ETMTGIvzirknW4IXNSUjHnGY-JT7E-eOwYJmIdVdY8")
  const altStoria = getMediaAlt(settings.immagineStoria, "Storia Profumeria Wanda")

  const imgConsulenza = getMediaUrl(servImages.immagineConsulenzaOlfattiva, "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnANPd8QygHqU_OAdg8o25aoMXPkGSOGkDfvGhEM3EBAZXdzjhQC-dECifw4v-EVDhBaUE5FFbmyOmgAzc2XK8dyiLLQEBPBXCTltej64YeGlPYPl7F2FTatPusRNFiAjRoQizFrp315t768xRuilBogGCUeqz8-HVFif9pXvHKeBRcaD9-Qh0-LjBShzJvejZJDolCpL_gk4pK0aD3kNJH3ndu2TTBiFt0QQ02rZb1peF5jrxNrvqCHfk03X3MD7rOBM3eJOeqM")
  const altConsulenza = getMediaAlt(servImages.immagineConsulenzaOlfattiva, "Consulenza Olfattiva")

  const imgCaffe = getMediaUrl(servImages.immagineCaffeChiacchiere, "https://lh3.googleusercontent.com/aida-public/AB6AXuBHRvkLfjLvUmXs45JXFtMRyrkZmLSw_LxUpOJlaybHikB6bkvT8p4ix3hsp6a9YnFFlMTukjE9vCcUo7e86cDxd2Nc0IFLLbImUcSk_YNyIrAEcnsafLJHWdboFPOTAGZnF58SxsfbMmBxvgY8FG_Q8RYZC3Bz3ORQCWG9ZW34R0dG6dgYKyV0XPB25BI7mI9lwyaOgNBwNdLGDI-goy5w2KBrYDv7fmTWYaPHeanXuABusXzDIBUU_7cGW795na7HT9hF75VaBBo")
  const altCaffe = getMediaAlt(servImages.immagineCaffeChiacchiere, "Un caffè e due chiacchiere")

  return (
    <main className="pb-32 overflow-x-hidden">
      <StructuredData settings={settings} />

      {/* Hero Section — Asymmetric & Dynamic */}
      <section className="relative min-h-[85dvh] flex items-center pt-32 pb-20 lg:pt-40">
        <div className="wanda-container grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="lg:col-span-5 space-y-10 z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-wanda-fucsia/5 text-wanda-fucsia rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-wanda-fucsia animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Il nostro Atelier</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-wanda-nero">
                Benvenuti a<br />
                <span className="italic font-headline text-wanda-fucsia">casa nostra.</span>
              </h1>
              <p className="text-lg md:text-xl text-wanda-text-soft max-w-md leading-relaxed">
                Dal 1960, un luogo dove la cortesia è di casa e ogni fragranza racconta una storia di passione familiare.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="#contatti" className="btn-primary group !px-8 !py-4 active:scale-95">
                Passa a trovarci
                <span className="ml-3 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
              <a href="#storia" className="flex items-center gap-3 text-wanda-nero font-bold group">
                La nostra storia
                <div className="w-10 h-[1px] bg-wanda-nero group-hover:w-16 transition-all duration-500" />
              </a>
            </div>
          </div>

          {/* Desktop Image with Parallax & Tilt */}
          <div className="lg:col-span-7 hidden lg:block">
            <HeroImageContainer 
              src={imgHero} 
              alt={altHero} 
              badgeText="Dal 1960,"
              badgeSubtext="con passione"
            />
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={imgHero}
              alt={altHero}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="storia" className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-wanda-fucsia/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-white rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="wanda-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1 relative group">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-8 border-white group-hover:-rotate-2 transition-transform duration-700">
              <Image 
                src={imgStoria}
                alt={altStoria}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Liquid Glass Badge */}
            <div className="absolute -bottom-10 -right-10 bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 hidden md:block">
              <p className="font-headline italic text-4xl text-wanda-fucsia">Est. 1960</p>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mt-2 text-wanda-text-soft">Torino, Italia</p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter">
                Una storia di<br />
                <span className="italic font-headline text-wanda-fucsia">famiglia.</span>
              </h2>
              <div className="w-20 h-1.5 bg-wanda-fucsia rounded-full" />
            </div>
            
            <div className="space-y-6 text-wanda-text-soft text-lg leading-relaxed font-medium">
              <p>Fondata nel cuore di Torino nel 1960, Profumeria Wanda è nata dal desiderio di portare bellezza e raffinatezza nella vita quotidiana dei nostri concittadini.</p>
              <p>Quello che è iniziato come un piccolo atelier si è evoluto in un punto di riferimento per chi cerca non solo un prodotto, ma un&apos;esperienza autentica. Abbiamo mantenuto intatto il calore umano di un tempo, unendo la competenza professionale alla gentilezza che ci ha sempre contraddistinto.</p>
              <p className="italic border-l-4 border-wanda-fucsia/20 pl-6 py-2">
                &quot;Ogni scaffale, ogni fragranza e ogni accessorio viene scelto con cura certosina per garantirvi solo l&apos;eccellenza.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Layout */}
      <section className="py-32 wanda-container">
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Molto più di un acquisto.</h2>
          <p className="text-xl text-wanda-text-soft max-w-xl">
            Il nostro atelier è uno spazio di condivisione dove il tempo si ferma per lasciare spazio ai sensi.
          </p>
        </div>
        
        <ServiceBento 
          imgConsulenza={imgConsulenza} 
          altConsulenza={altConsulenza}
          imgCaffe={imgCaffe}
          altCaffe={altCaffe}
        />
      </section>

      {/* Visit Us & Map */}
      <section className="py-32 wanda-container" id="contatti">
        <ContactSection settings={settings} dayLabels={dayLabels} />
      </section>
    </main>
  )
}
