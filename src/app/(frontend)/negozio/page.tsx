import type { Metadata } from 'next'
import Image from 'next/image'
import { Wind, Coffee, MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { MapEmbed } from '@/components/negozio/MapEmbed'
import { StructuredData } from '@/components/negozio/StructuredData'
import { getStoreSettings } from '@/lib/cms'
import type { Media } from '@/types/cms'

export const metadata: Metadata = {
  title: 'Il Negozio',
  description: 'Un luogo dove la cortesia è di casa e ogni profumo racconta una storia. Scopri la nostra boutique a Torino.',
}

const dayLabels: Record<string, string> = {
  Mo: 'Lun', Tu: 'Mar', We: 'Mer', Th: 'Gio', Fr: 'Ven', Sa: 'Sab', Su: 'Dom',
}

export default async function NegozioPage() {
  const settings = await getStoreSettings()

  // Helper per estrarre URL dalle immagini e correggere URL locali
  const getImgUrl = (img: Media | string | null | undefined, fallback: string) => {
    if (typeof img === 'object' && img?.url) {
      if (img.url.startsWith('http://localhost:3000')) {
        return img.url.replace('http://localhost:3000', '')
      }
      return img.url
    }
    return fallback
  }
  const getImgAlt = (img: Media | string | null | undefined, fallback: string) => 
    (typeof img === 'object' && img?.alt ? img.alt : fallback)

  const servImages = settings.serviziNegozio || {}

  const imgHero = getImgUrl(settings.immagineHeroNegozio, "https://lh3.googleusercontent.com/aida-public/AB6AXuDP6917KZk53AwGAHObhtqi6rieq38KAREqkOXnegkERH9VLzSXfHaf9KtCUscNyldtHBUmQy3AziUVOxhW6guHvkOg5LIIhCmxvHubUpdgmiJtULZBPhdbmSrU-T1p4RlbXmZU1CgmZogHuderLAL6PMCW0o2SYoKHPJvJktgbCpucbXlzLBFSG3p8SLzT3NOYp7m6mUG9UtEj3Cr8Rv5kdEtQxkLPjqQARgKV6dXc9JrgDIiAZiird-3bjQeyOY_1zSPMaDRNYwc")
  const altHero = getImgAlt(settings.immagineHeroNegozio, "Interno Boutique")

  const imgStoria = getImgUrl(settings.immagineStoria, "https://lh3.googleusercontent.com/aida-public/AB6AXuA29C17qyhf-rklGL5NnCGi7_ydGjXakQi3JBN06y53LUeXC8HMZn7t-uNmby1wQXSV7Luzt5KRplVLdLw6nf8QBNjTqipi5Z3AMV61nW18Y7I_ZmX5KEwDqdpTGyLNBV7u4j7_0BtSsN2gTxTd2tPhJFvgaGTx6r54lQx5KqXuqIZG9BeyVct0aq_wiTpoBquvZWIBR0YxhQrFhZBJq7ILhVXZQ67Om52O4ETMTGIvzirknW4IXNSUjHnGY-JT7E-eOwYJmIdVdY8")
  const altStoria = getImgAlt(settings.immagineStoria, "Storia Profumeria Wanda")

  const imgConsulenza = getImgUrl(servImages.immagineConsulenzaOlfattiva, "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnANPd8QygHqU_OAdg8o25aoMXPkGSOGkDfvGhEM3EBAZXdzjhQC-dECifw4v-EVDhBaUE5FFbmyOmgAzc2XK8dyiLLQEBPBXCTltej64YeGlPYPl7F2FTatPusRNFiAjRoQizFrp315t768xRuilBogGCUeqz8-HVFif9pXvHKeBRcaD9-Qh0-LjBShzJvejZJDolCpL_gk4pK0aD3kNJH3ndu2TTBiFt0QQ02rZb1peF5jrxNrvqCHfk03X3MD7rOBM3eJOeqM")
  const altConsulenza = getImgAlt(servImages.immagineConsulenzaOlfattiva, "Consulenza Olfattiva")

  const imgCaffe = getImgUrl(servImages.immagineCaffeChiacchiere, "https://lh3.googleusercontent.com/aida-public/AB6AXuBHRvkLfjLvUmXs45JXFtMRyrkZmLSw_LxUpOJlaybHikB6bkvT8p4ix3hsp6a9YnFFlMTukjE9vCcUo7e86cDxd2Nc0IFLLbImUcSk_YNyIrAEcnsafLJHWdboFPOTAGZnF58SxsfbMmBxvgY8FG_Q8RYZC3Bz3ORQCWG9ZW34R0dG6dgYKyV0XPB25BI7mI9lwyaOgNBwNdLGDI-goy5w2KBrYDv7fmTWYaPHeanXuABusXzDIBUU_7cGW795na7HT9hF75VaBBo")
  const altCaffe = getImgAlt(servImages.immagineCaffeChiacchiere, "Un caffè e due chiacchiere")

  return (
    <main className="space-y-24 pb-20">
      <StructuredData settings={settings} />

      {/* Hero Section from Stitch */}
      <section className="wanda-container pt-12">
        <div className="relative w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden shadow-xl reveal-on-scroll">
          <Image 
            src={imgHero}
            alt={altHero}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex flex-col justify-center px-8 md:px-24">
            <span className="text-white bg-wanda-fucsia/80 backdrop-blur-md px-4 py-1 rounded-full w-fit mb-6 text-[10px] font-bold tracking-widest uppercase">
              IL NOSTRO NEGOZIO
            </span>
            <h1 className="text-4xl md:text-7xl text-white italic font-headline mb-6 leading-tight max-w-2xl">
              Benvenuti a casa nostra.
            </h1>
            <p className="text-white/90 text-base md:text-xl max-w-lg font-light leading-relaxed">
              Un luogo dove la cortesia è di casa e ogni profumo racconta una story. Dal 1960, accogliamo ogni cliente come un ospite di riguardo.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Heritage */}
      <section className="py-20 bg-wanda-surface-low overflow-hidden">
        <div className="wanda-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative reveal-on-scroll">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-wanda-fucsia/10 rounded-full blur-3xl"></div>
            <div className="relative aspect-[4/5] md:aspect-square rounded-xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src={imgStoria}
                alt={altStoria}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-lg shadow-lg z-20">
              <p className="font-headline italic text-wanda-fucsia text-xl">Est. 1960</p>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8 reveal-on-scroll reveal-delay-200">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Una storia di famiglia e passione.</h2>
            <div className="space-y-6 text-wanda-text-soft text-lg leading-relaxed font-body">
              <p>Fondata nel cuore dell&apos;Italia nel 1960, Profumeria Wanda è nata dal desiderio di portare bellezza e raffinatezza nella vita quotidiana.</p>
              <p>Quello che è iniziato come un piccolo atelier si è evoluto in un punto di riferimento per chi cerca non solo un prodotto, ma un&apos;esperienza. Abbiamo mantenuto intatto il calore umano di un tempo, unendo la competenza professionale alla gentilezza che ci ha sempre contraddistinto.</p>
              <p>Ogni scaffale, ogni fragranza e ogni accessorio in pelle viene scelto con cura certosina per garantirvi solo l&apos;eccellenza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Layout */}
      <section className="wanda-container py-24">
        <div className="mb-16 text-center space-y-4 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold">Molto più di un acquisto.</h2>
          <p className="text-wanda-text-soft text-lg">Il nostro atelier è uno spazio di condivisione e consulenza.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fragrance Consulting */}
          <div className="md:col-span-2 bg-white p-8 md:p-10 rounded-xl shadow-sm border border-wanda-outline/10 flex flex-col md:flex-row gap-8 items-center reveal-on-scroll">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-wanda-fucsia/5 rounded-lg flex items-center justify-center text-wanda-fucsia mb-2">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline italic">Consulenza Olfattiva</h3>
              <p className="text-wanda-text-soft leading-relaxed">Ti aiutiamo a trovare la tua firma olfattiva. Attraverso un percorso sensoriale, scopriremo insieme le note che meglio esprimono la tua personalità.</p>
            </div>
            <div className="flex-1 w-full h-48 md:h-full rounded-lg overflow-hidden relative min-h-[200px]">
              <Image 
                src={imgConsulenza}
                alt={altConsulenza}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Coffee and Chat */}
          <div className="bg-wanda-fucsia/5 p-8 md:p-10 rounded-xl flex flex-col justify-between space-y-6 reveal-on-scroll reveal-delay-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center text-wanda-fucsia mb-2">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline italic">Un caffè e due chiacchiere</h3>
              <p className="text-wanda-text-soft">Non abbiamo mai fretta. Il tempo speso con i nostri clienti è il nostro valore più prezioso.</p>
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden relative">
              <Image 
                src={imgCaffe}
                alt={altCaffe}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us & Map */}
      <section className="wanda-container py-24" id="contatti">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12 reveal-on-scroll">
            <h2 className="text-3xl md:text-5xl italic font-headline">Passa a trovarci.</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-wanda-fucsia/10 rounded-full flex items-center justify-center text-wanda-fucsia shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Indirizzo</h4>
                  <p className="text-wanda-text-soft italic">{settings.indirizzo}, {settings.cap} {settings.citta} ({settings.provincia})</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-wanda-fucsia/10 rounded-full flex items-center justify-center text-wanda-fucsia shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Orari di Apertura</h4>
                  <ul className="text-wanda-text-soft space-y-1">
                    {settings.orariStrutturati?.map((item, idx) => (
                      <li key={idx} className="flex justify-between w-full sm:w-64">
                        <span className="font-medium">{item.giorni.map(d => dayLabels[d]).join(', ')}</span>
                        <span className="text-right ml-4">
                          {item.chiuso ? 'Chiuso' : (
                            item.pausaPranzo 
                              ? `${item.oraApertura}-${item.oraChiusuraPranzo} / ${item.oraRiaperturaPranzo}-${item.oraChiusura}`
                              : `${item.oraApertura}-${item.oraChiusura}`
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-wanda-fucsia/10 rounded-full flex items-center justify-center text-wanda-fucsia shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-4">Contatti e Consulenza</h4>
                  <div className="flex flex-wrap gap-4">
                    <a href={`tel:${settings.telefono?.replace(/\s/g, '')}`} className="btn-primary !px-6 !py-3 text-sm active:scale-95">
                      Chiama in negozio
                    </a>
                    <a 
                      href={settings.linkWhatsApp ? `https://wa.me/${settings.linkWhatsApp.replace(/\D/g, '')}` : "#"}
                      className="btn-outline !py-3 !px-6 text-sm active:scale-95"
                    >
                      Messaggio WhatsApp
                    </a>
                  </div>
                  <p className="text-xs text-wanda-text-soft mt-4 italic">
                    Siamo disponibili telefonicamente durante gli orari di apertura per ordini o consigli rapidi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] relative reveal-on-scroll reveal-delay-200">
            {settings.googleMapsEmbedUrl ? (
              <MapEmbed src={settings.googleMapsEmbedUrl} />
            ) : (
              <div className="w-full h-full bg-wanda-surface-low flex items-center justify-center text-wanda-text-soft italic">
                Mappa in arrivo
              </div>
            )}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-sm md:text-base">Siamo nel cuore della città</p>
                <p className="text-xs md:text-sm text-wanda-text-soft">Parcheggio riservato disponibile</p>
              </div>
              <div className="bg-wanda-fucsia text-white p-3 rounded-full shadow-lg">
                <Navigation className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
