import crypto from 'crypto'

const BASE_URL =
  process.env.FLOW_ENV === 'sandbox'
    ? 'https://sandbox.flow.cl/api'
    : 'https://www.flow.cl/api'

function sign(params: Record<string, string>): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => k + params[k])
    .join('')
  return crypto
    .createHmac('sha256', process.env.FLOW_SECRET_KEY!)
    .update(toSign)
    .digest('hex')
}

export interface FlowPagoInput {
  comercioOrder: string
  subject: string
  amount: number
  email: string
  urlReturn: string
  urlConfirmation: string
}

export async function crearPago(input: FlowPagoInput): Promise<{ url: string; token: string }> {
  const params: Record<string, string> = {
    apiKey: process.env.FLOW_API_KEY!,
    commerceOrder: input.comercioOrder,
    subject: input.subject,
    currency: 'CLP',
    amount: String(Math.round(input.amount)),
    email: input.email,
    urlReturn: input.urlReturn,
    urlConfirmation: input.urlConfirmation,
    paymentMethod: '9',
  }
  params.s = sign(params)

  const res = await fetch(`${BASE_URL}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  })

  const data = await res.json()
  if (!data.token) throw new Error(data.message ?? 'Error al crear pago en Flow.cl')

  return { url: `${data.url}?token=${data.token}`, token: data.token }
}

export async function verificarPago(token: string) {
  const params: Record<string, string> = {
    apiKey: process.env.FLOW_API_KEY!,
    token,
  }
  params.s = sign(params)

  const res = await fetch(`${BASE_URL}/payment/getStatus?${new URLSearchParams(params)}`)
  return res.json()
}
