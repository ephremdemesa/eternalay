import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, company, service, budget, message } = await req.json();

    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from: 'EternalAY Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry: ${service} — ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 24px; }
              .card { background: #ffffff; border-radius: 12px; max-width: 560px; margin: 0 auto; overflow: hidden; }
              .header { background: #0a0e1a; padding: 28px 32px; }
              .logo { color: #00ff88; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
              .body { padding: 32px; }
              .label { font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
              .value { font-size: 15px; color: #18181b; margin: 0 0 20px 0; font-weight: 500; }
              .message-box { background: #f4f4f5; border-radius: 8px; padding: 16px; font-size: 14px; color: #3f3f46; line-height: 1.6; margin-top: 4px; margin-bottom: 20px; white-space: pre-wrap; }
              .divider { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
              .footer { font-size: 12px; color: #a1a1aa; text-align: center; padding: 20px 32px; border-top: 1px solid #e4e4e7; }
              .badge { display: inline-block; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; border-radius: 99px; font-size: 12px; font-weight: 600; padding: 3px 10px; margin-bottom: 24px; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <p class="logo">Eternal<span style="color:#00d4ff">AY</span></p>
              </div>
              <div class="body">
                <div class="badge">New Contact Form Submission</div>

                <p class="label">Name</p>
                <p class="value">${firstName} ${lastName}</p>

                <p class="label">Email</p>
                <p class="value"><a href="mailto:${email}" style="color:#00a37a;text-decoration:none">${email}</a></p>

                ${phone ? `<p class="label">Phone</p><p class="value">${phone}</p>` : ''}

                ${company ? `<p class="label">Company</p><p class="value">${company}</p>` : ''}

                <p class="label">Service Needed</p>
                <p class="value">${service}</p>

                ${budget ? `<p class="label">Budget Range</p><p class="value">${budget}</p>` : ''}

                <hr class="divider" />

                <p class="label">Project Details</p>
                <div class="message-box">${message}</div>
              </div>
              <div class="footer">
                EternalAY &mdash; Texas, USA &nbsp;&bull;&nbsp; info@eternalay.com<br/>
                This email was sent via the contact form on eternalay.com
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
