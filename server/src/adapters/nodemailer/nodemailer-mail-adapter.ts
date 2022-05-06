import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9182de14e8dd42",
    pass: "02aa04ee2b5852"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMain({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
    from: 'Equipe Feedget <leo_ro.drigues@hotmail.com>',
    to: 'Leonardo <leo_ro.drigues@hotmail.com>',
    subject,
    html: body,
  });
  }
}