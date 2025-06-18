
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactDetails } from '@/data/portfolioData';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields: name, email, and message are required.' }, { status: 400 });
    }

    // DEVELOPMENT: Using jsonTransport to log email to console instead of sending.
    // This is useful for development and avoids needing SMTP credentials.
    // The email content will be output to your server's console.
    const transporter = nodemailer.createTransport({
        jsonTransport: true
    });

    // PRODUCTION: Configure your actual email transport options here.
    // -------------
    // Example using Gmail (requires an app password if 2FA is enabled for the Gmail account):
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'YOUR_GMAIL_ADDRESS@gmail.com', // Your Gmail address
    //     pass: 'YOUR_GMAIL_APP_PASSWORD',    // Your Gmail app password
    //   },
    // });
    //
    // Example using a generic SMTP provider:
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.example.com', // Your SMTP server hostname
    //   port: 587, // Common port for SMTP (TLS), 465 for SSL
    //   secure: false, // true for port 465, false for other ports (like 587 with STARTTLS)
    //   auth: {
    //     user: 'YOUR_SMTP_USERNAME', // Your SMTP username
    //     pass: 'YOUR_SMTP_PASSWORD', // Your SMTP password
    //   },
    // });
    // -------------
    // IMPORTANT: Ensure your 'from' address is one that your SMTP service is authorized to send for.
    // Using the sender's email directly in 'from' can lead to spam filtering or rejection.
    // A common practice is to use a no-reply address from your domain and set 'replyTo' to the user's email.
    // For example: from: `"Portfolio Contact Form" <noreply@yourdomain.com>`

    const mailOptions = {
      from: `"${name}" <${email}>`, // For jsonTransport, this is fine. For real transport, see comment above.
      to: contactDetails.email,       // Your email address from portfolioData
      replyTo: email,                  // Set reply-to to the sender's email
      subject: `New Contact Form Message from ${name} via Portfolio`,
      text: `You have received a new message from your portfolio contact form.\n\n
             Name: ${name}\n
             Email: ${email}\n
             Message:\n${message}`,
      html: `<p>You have received a new message from your portfolio contact form.</p>
             <h3>Details:</h3>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
             </ul>
             <h3>Message:</h3>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      // When using jsonTransport, info.message contains the full email content.
      // For a real transport, info.messageId indicates success.
      console.log('Email processed by nodemailer (jsonTransport will log, real transport will send):', JSON.parse(info.message as string));
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (sendError) {
      console.error('Nodemailer failed to send email:', sendError);
      const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown sending error';
      return NextResponse.json({ error: `Failed to send message: ${errorMessage}` }, { status: 500 });
    }

  } catch (parseError) {
    console.error('Error parsing request or other server error:', parseError);
    // It's good to distinguish parsing errors from sending errors
    const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown server error';
     if (parseError instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid request format. Expected JSON.' }, { status: 400 });
    }
    return NextResponse.json({ error: `Server error: ${errorMessage}` }, { status: 500 });
  }
}
