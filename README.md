
Cryptic is a browser-based AES-256 file encryption tool. It allows you to securely encrypt any file directly in your browser and download it with a .cryptic extension. All encryption and decryption happen locally—your files never leave your device.

Features
🔒 AES-256-GCM encryption for strong security

🔑 Password-based key derivation (PBKDF2)

🗂️ Encrypts any file type, outputs as .cryptic

🖥️ 100% client-side: No uploads, no data leaves your browser

🛡️ Authenticated encryption with integrity checks

How It Works
Select a file to encrypt.

Enter a password (used as the encryption key).

Encrypt: Download the encrypted file with a .cryptic extension.

Decrypt: Upload your .cryptic file and enter the password to restore the original.

Usage
Clone or Download this repository.

Open index.html in your browser.

Follow on-screen instructions to encrypt or decrypt files.

File Format
The .cryptic file contains:

16 bytes: Random salt (for key derivation)

12 bytes: Random IV (initialization vector)

Remainder: Encrypted file data (with authentication tag)

Security Notes
Uses Web Crypto API for all cryptographic operations.

Password is never stored or transmitted.

Salt and IV are randomly generated for each encryption.

Minimum recommended password length: 12 characters.

Example
text
1. Select `document.pdf`
2. Enter password: `My$trongP@ssw0rd!`
3. Downloaded file: `document.pdf.cryptic`
To decrypt, select the .cryptic file and re-enter the same password.

Development
All code is in a single index.html file for easy deployment.

No external dependencies required.

License
MIT License

Disclaimer
This tool is for educational and personal use. For highly sensitive data, always audit and review cryptographic implementations, and use strong, unique passwords.

Enjoy secure file encryption with Cryptic!

Let me know if you need a more detailed or customized README!

Cryptic
