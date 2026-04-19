import { S3ClientUploadHandler as S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24 } from '@payloadcms/storage-s3/client'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { ImportazioneJSON } from '../../components/admin/ImportazioneJSON'
import { ImportazioneProdottiJSON } from '../../components/admin/ImportazioneProdottiJSON'
import { MediaUploadCompressor } from '../../components/admin/MediaUploadCompressor'

export const importMap = {
  '@payloadcms/storage-s3/client#S3ClientUploadHandler': S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24,
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  '/components/admin/ImportazioneJSON#ImportazioneJSON': ImportazioneJSON,
  '/components/admin/ImportazioneProdottiJSON#ImportazioneProdottiJSON': ImportazioneProdottiJSON,
  '/components/admin/MediaUploadCompressor#MediaUploadCompressor': MediaUploadCompressor,
}
