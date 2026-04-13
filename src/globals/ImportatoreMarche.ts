import type { GlobalConfig } from 'payload'

export const ImportatoreMarche: GlobalConfig = {
  slug: 'importatore-marche',
  label: 'Importatore Marche',
  admin: {
    group: 'Amministrazione',
    description: 'Inserisci qui sotto tutte le marche che vuoi creare. Una volta salvato, verranno trasferite nel catalogo.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'marcheDaImportare',
      type: 'array',
      label: 'Lista Marche da creare',
      labels: {
        singular: 'Marca',
        plural: 'Marche',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nome',
              type: 'text',
              required: true,
              label: 'Nome Brand',
              admin: { width: '30%' },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: { width: '30%' },
            },
            {
              name: 'descrizione',
              type: 'textarea',
              label: 'Breve Descrizione',
              admin: { width: '40%', rows: 2 },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc.marcheDaImportare || doc.marcheDaImportare.length === 0) return

        const { payload } = req

        for (const item of doc.marcheDaImportare) {
          // Controlla se la marca esiste già per nome
          const esistente = await payload.find({
            collection: 'marche',
            where: {
              nome: { equals: item.nome },
            },
          })

          if (esistente.totalDocs === 0) {
            try {
              await payload.create({
                collection: 'marche',
                data: {
                  nome: item.nome,
                  logo: item.logo,
                  descrizione: item.descrizione,
                },
              })
            } catch (e) {
              console.error(`Errore importazione ${item.nome}:`, e)
            }
          }
        }

        // Nota: In un sistema ideale svuoteremmo il campo qui, 
        // ma per semplicità e controllo lasciamo che l'utente veda cosa ha fatto.
        // Se si desidera lo svuotamento automatico, serve una logica di delete post-import.
      },
    ],
  },
}
