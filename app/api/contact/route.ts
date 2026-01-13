import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validação básica
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Configuração do Gmail
    const GMAIL_USER = process.env.GMAIL_USER // Seu email Gmail (ex: teampri.business@gmail.com)
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD // Senha de app do Gmail

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      // Fallback: Log dos dados (para desenvolvimento)
      console.log('📧 Novo contato recebido (sem envio de email configurado):')
      console.log('Nome:', name)
      console.log('Email:', email)
      console.log('Telefone:', phone || 'Não informado')
      console.log('Serviço:', service)
      console.log('Mensagem:', message)
      console.log('\n⚠️  Para habilitar o envio de emails, configure as variáveis GMAIL_USER e GMAIL_APP_PASSWORD no arquivo .env.local')
      
      return NextResponse.json(
        { message: 'Mensagem recebida! (Email não configurado - veja os logs do servidor)' },
        { status: 200 }
      )
    }

    // Configurar o transporter do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    })

    // Função para escapar HTML e prevenir XSS
    const escapeHtml = (text: string): string => {
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }
      return text.replace(/[&<>"']/g, (m) => map[m])
    }

    // Mapear serviços para nomes mais amigáveis
    const serviceNames: { [key: string]: string } = {
      'designer': 'Design UI/UX',
      'landing-page': 'Landing Page',
      'website': 'Website Completo',
      'sistema': 'Sistema sob medida',
      'identidade-visual': 'Identidade Visual',
      'outro': 'Outro'
    }
    const serviceLabel = serviceNames[service] || escapeHtml(service)

    // Sanitizar dados
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = phone ? escapeHtml(phone) : ''
    // Para mensagem, preservar quebras de linha mas escapar HTML
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Preparar o email
    const mailOptions = {
      from: `"Team PRI" <${GMAIL_USER}>`,
      to: 'teampri.business@gmail.com',
      replyTo: email,
      subject: `🎨 Novo contato - ${serviceLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header com gradiente -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        ✨ Novo Contato
                      </h1>
                      <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">
                        Team PRI - Formulário do Site
                      </p>
                    </td>
                  </tr>

                  <!-- Badge do serviço -->
                  <tr>
                    <td style="padding: 20px 30px 0 30px; text-align: center;">
                      <span style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${serviceLabel}
                      </span>
                    </td>
                  </tr>

                  <!-- Informações do contato -->
                  <tr>
                    <td style="padding: 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        
                        <!-- Nome -->
                        <tr>
                          <td style="padding: 16px; background-color: #f9fafb; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #4f46e5;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="100" style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                  👤 Nome
                                </td>
                                <td style="color: #111827; font-size: 16px; font-weight: 600;">
                                  ${safeName}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Email -->
                        <tr>
                          <td style="padding-top: 12px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 16px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #7c3aed;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td width="100" style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        📧 Email
                                      </td>
                                      <td>
                                        <a href="mailto:${safeEmail}" style="color: #4f46e5; font-size: 16px; font-weight: 600; text-decoration: none;">
                                          ${safeEmail}
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Telefone -->
                        ${safePhone ? `
                        <tr>
                          <td style="padding-top: 12px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 16px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #ec4899;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td width="100" style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        📱 Telefone
                                      </td>
                                      <td>
                                        <a href="tel:${safePhone.replace(/\s/g, '')}" style="color: #111827; font-size: 16px; font-weight: 600; text-decoration: none;">
                                          ${safePhone}
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        ` : ''}

                      </table>
                    </td>
                  </tr>

                  <!-- Mensagem -->
                  <tr>
                    <td style="padding: 0 30px 30px 30px;">
                      <div style="background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%); border-radius: 12px; padding: 24px; border: 2px solid #e5e7eb;">
                        <h3 style="margin: 0 0 16px 0; color: #4f46e5; font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                          💬 Mensagem
                        </h3>
                        <div style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                          ${safeMessage}
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="margin: 0; color: #6b7280; font-size: 13px;">
                        Este email foi enviado automaticamente pelo formulário de contato do site Team PRI
                      </p>
                      <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
                        Para responder, clique em "Responder" no seu cliente de email
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
Novo contato do site Team PRI

Nome: ${name}
Email: ${email}
Telefone: ${phone || 'Não informado'}
Serviço: ${service}

Mensagem:
${message}
      `,
    }

    // Enviar o email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
