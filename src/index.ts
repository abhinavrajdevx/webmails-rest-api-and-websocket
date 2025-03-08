import { getInbox } from "./utils/scan-mail-box-rest-api";
import { scanmailbox_WS } from "./utils/scan-mail-box-ws";
import { config } from "dotenv";

config();

const process_mail = (sender: string, timestamp: Date, body: string) => {
  console.log(sender, timestamp, body);
};

const MAIL_BOX_CONFIG = {
  user: process.env.user as string,
  password: process.env.password as string,
  host: process.env.host as string,
  port: Number(process.env.port as string),
  tls: Boolean(process.env.tls as string),
  tlsOptions: {
    rejectUnauthorized:
      (process.env.rejectUnauthorized as string) == "true" ? true : false,
  },
};

async function main() {
  // Via WebSocket
  scanmailbox_WS(MAIL_BOX_CONFIG, process_mail);

  // Via REST API, Its modtly very delayed
  await getInbox(MAIL_BOX_CONFIG);
}

main();
