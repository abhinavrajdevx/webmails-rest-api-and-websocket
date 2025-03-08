# Webmails REST API and WebSocket

A lightweight TypeScript library for interacting with webmail services through both REST API and WebSocket connections. This library allows you to efficiently receive and send emails programmatically.

## Features

- ✉️ **Dual Connection Methods**: 
  - WebSocket connection for real-time mail monitoring
  - REST API for retrieving inbox content
- 📨 **Email Sending Functionality**: Simple way to send emails through SMTP
- 🔒 **Secure Connections**: TLS support for secure communication
- 🛠️ **Fully Configurable**: Easy to set up with your mail provider
- 📋 **Type Definitions**: Written in TypeScript for better development experience

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/webmails-rest-api-and-websocket.git

# Navigate to the project directory
cd webmails-rest-api-and-websocket

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Webmail IMAP Configuration
user=your-email@domain.com
password=your-email-password
host=imap.your-provider.com
port=993
tls=true
rejectUnauthorized=false
name=Your Name

# SMTP Configuration
host_SMTP=smtp.your-provider.com
SMTP_PORT=465
```

## Usage

### Basic Usage

```typescript
import { getInbox } from "./utils/scan-mail-box-rest-api";
import { scanmailbox_WS } from "./utils/scan-mail-box-ws";
import { sendmail } from "./utils/sendMail";

// Define mail processing function
const process_mail = (sender: string, timestamp: Date, body: string) => {
  console.log(`New email from ${sender} at ${timestamp}:`);
  console.log(body);
  // Process your email here
};

// Configure your mailbox
const MAIL_BOX_CONFIG = {
  user: "your-email@domain.com",
  password: "your-password",
  host: "imap.your-provider.com",
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false,
  },
};

// Configure SMTP for sending emails
const TRANSPORT_CONFIG = {
  host: "smtp.your-provider.com",
  port: 465,
  secure: true,
  auth: {
    user: "your-email@domain.com",
    pass: "your-password",
  },
};

// Start monitoring emails via WebSocket
scanmailbox_WS(MAIL_BOX_CONFIG, process_mail);

// Get existing emails via REST API
await getInbox(MAIL_BOX_CONFIG);

// Send an email
const mailOptions = {
  from: '"Your Name" <your-email@domain.com>',
  to: "recipient@example.com",
  subject: "Hello from my application",
  text: "This is a test email sent from my webmail automation.",
};

await sendmail(TRANSPORT_CONFIG, mailOptions);
```

### Running the Project

```bash
# Compile and run the project
npm run dev
```

## API Reference

### WebSocket Email Monitoring

```typescript
scanmailbox_WS(mailboxConfig, callbackFunction)
```

- `mailboxConfig`: Configuration object for your mailbox
- `callbackFunction`: Function that processes each incoming email with parameters:
  - `sender`: Email address of the sender
  - `timestamp`: Date object representing when the email was received
  - `body`: Content of the email

### REST API Email Fetching

```typescript
await getInbox(mailboxConfig)
```

- `mailboxConfig`: Configuration object for your mailbox
- Returns all emails in the inbox

### Sending Emails

```typescript
await sendmail(transportConfig, mailOptions)
```

- `transportConfig`: SMTP configuration object
- `mailOptions`: Object containing email details (from, to, subject, text)

## Compatible Email Providers

This library works with most webmail services that support IMAP and SMTP, including:

- Hostinger
- Gmail
- Outlook
- Yahoo Mail
- ProtonMail (with bridge)
- Custom domain email services

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
