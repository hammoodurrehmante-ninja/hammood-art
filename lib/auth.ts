import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE = 'admin_token'
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hammood-admin-secret-key-2025-very-long-secure'
)

export async function signAdminToken() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value
  if (!token) return null
  return verifyAdminToken(token)
}

export { COOKIE }
