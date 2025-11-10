import { getPayload } from 'payload'
import config from '@payload-config'
import type { Payload } from 'payload'

let cachedPayload: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload
  }

  const payload = await getPayload({ config })
  cachedPayload = payload

  return payload
}
