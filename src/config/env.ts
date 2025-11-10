interface EnvConfig {
  secret: string
  dbUri: string
  nodeEnv: 'development' | 'production' | 'test'
  jwtExpIn: string
  port?: number
}

const getEnv = (key: string, required = true): string => {
  const value = process.env[key]
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value || ''
}

export const env: EnvConfig = {
  secret: getEnv('PAYLOAD_SECRET'),
  dbUri: getEnv('DATABASE_URI'),
  jwtExpIn: getEnv('TOKEN_EXPIRES_IN', false) || '7d',
  nodeEnv: (process.env.NODE_ENV as EnvConfig['nodeEnv']) || 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
}
