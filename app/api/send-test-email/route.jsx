import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { host, port, user, password, recipient } = await req.json();

    // Configurar el transporte SMTP
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: port === '465', // true for 465, false for other ports
      auth: {
        user,
        pass: password,
      },
    });

    // Configurar el mensaje
    const info = await transporter.sendMail({
      from: user, // Dirección del remitente
      to: recipient, // Dirección del destinatario
      subject: 'Test Email', // Asunto
      text: 'Este es un correo de prueba.', // Texto plano
    });

    return new Response(JSON.stringify({ message: 'Correo enviado exitosamente', info }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar el correo' }), { status: 500 });
  }
}
