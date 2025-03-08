import { getInbox } from "./utils/scan-mail-box-rest-api";
import { scanmailbox_WS } from "./utils/scan-mail-box-ws";
import { config } from "dotenv";
import { sendmail } from "./utils/sendMail";
import { MailOptionsObj, TransportConfigObj } from "./types";

config();

const process_mail = (sender: string, timestamp: Date, body: string) => {
  console.log(sender, timestamp, body);
};

const MAIL_BOX_CONFIG = {
  user: process.env.user as string, // your business emails
  password: process.env.password as string, // webmail password
  host: process.env.host as string, // example : for hostinger : imap.hostinger.com
  port: Number(process.env.port as string), // mostly 993
  tls: Boolean(process.env.tls as string), // mostly true
  tlsOptions: {
    rejectUnauthorized:
      (process.env.rejectUnauthorized as string) == "true" ? true : false, // mostly false
  },
};

const TRANSPORT_CONFIG: TransportConfigObj = {
  host: process.env.host_SMTP as string,
  port: Number(process.env.SMTP_PORT as string),
  secure: true,
  auth: {
    user: process.env.user as string,
    pass: process.env.password as string,
  },
};

const mailOptions: MailOptionsObj = {
  from: `"${process.env.name}" <${process.env.user}>`,
  to: "abhinavrajdevxcontactx@gmail.com",
  subject: "Hello from Webmail Automation",
  text: "This is a test email sent from my webmail automation.",
};

async function main() {
  // Via WebSocket
  scanmailbox_WS(MAIL_BOX_CONFIG, process_mail);

  // Via REST API, Its modtly very delayed
  await getInbox(MAIL_BOX_CONFIG);

  // Send an Email
  await sendmail(TRANSPORT_CONFIG, mailOptions);
}

main();
