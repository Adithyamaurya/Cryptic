
## 🚀 **Overview**

**Cryptic** is a powerful, browser-based file encryption tool that provides military-grade AES-256-GCM encryption without compromising your privacy. All cryptographic operations happen locally in your browser—your files never leave your device.

<div align="center">
  <table>
    <tr>
      <td align="center">🔒 <strong>Encryption</strong></td>
      <td align="center">🌐 <strong>Platform</strong></td>
      <td align="center">🛡️ <strong>Privacy</strong></td>
      <td align="center">⚡ <strong>Performance</strong></td>
    </tr>
    <tr>
      <td align="center">AES-256-GCM<br>PBKDF2 KDF</td>
      <td align="center">Any Browser<br>No Installation</td>
      <td align="center">100% Client-Side<br>Zero Data Upload</td>
      <td align="center">Instant Processing<br>Offline Ready</td>
    </tr>
  </table>
</div>

---

## ✨ **Key Features**

<div align="center">

| Feature | Description | Benefit |
|---------|-------------|---------|
| 🔐 **AES-256-GCM** | Military-grade encryption standard | Unbreakable security for your files |
| 🔑 **PBKDF2 Key Derivation** | Password-based key generation | Protection against rainbow table attacks |
| 🗂️ **Universal File Support** | Encrypt any file type | Works with documents, images, videos, archives |
| 🖥️ **100% Client-Side** | No server communication | Your data never leaves your device |
| 🛡️ **Authenticated Encryption** | Built-in integrity verification | Detects tampering and ensures authenticity |
| ⚡ **Zero Dependencies** | Single HTML file | No installations, libraries, or frameworks needed |
| 🌐 **Cross-Platform** | Works in any modern browser | Windows, Mac, Linux, mobile devices |
| 🔄 **Reversible Process** | Perfect decryption | Restore files to original state |

</div>

---

## 🚀 **Quick Start Guide**

### **🔒 Encrypting Files**

1. **Open Cryptic** - Launch `index.html` in your browser
2. **Select File** - Choose any file you want to encrypt
3. **Set Password** - Enter a strong password (12+ characters recommended)
4. **Encrypt** - Click encrypt and download your `.cryptic` file
5. **Secure Storage** - Store your encrypted file safely

### **🔓 Decrypting Files**

1. **Upload .cryptic File** - Select your encrypted file
2. **Enter Password** - Use the same password from encryption
3. **Decrypt** - Click decrypt to restore your original file
4. **Download** - Get your original file back

---

## 🛡️ **Security Architecture**

<div align="center">

### **Cryptographic Specifications**

| Component | Specification | Purpose |
|-----------|---------------|---------|
| **Encryption Algorithm** | AES-256-GCM | Symmetric encryption with authentication |
| **Key Derivation** | PBKDF2-SHA256 | Secure password-to-key transformation |
| **Salt Length** | 16 bytes (128 bits) | Prevents rainbow table attacks |
| **IV Length** | 12 bytes (96 bits) | Ensures encryption uniqueness |
| **Iterations** | 100,000+ | Slows down brute force attacks |
| **Authentication** | GCM Built-in | Detects tampering and corruption |

</div>

<details>
<summary>🔍 <strong>Technical Details</strong></summary>

### **Security Measures**

- **Random Salt Generation**: Each encryption uses a cryptographically secure random salt
- **Unique IV per Operation**: Initialization vectors are never reused
- **Password Stretching**: PBKDF2 with high iteration count prevents brute force
- **Authenticated Encryption**: GCM mode provides both confidentiality and authenticity
- **No Key Storage**: Passwords and keys exist only in memory during operation

### **Web Crypto API**

Cryptic leverages the browser's native Web Crypto API, which provides:
- Hardware-accelerated cryptographic operations
- Secure random number generation
- Memory-safe key handling
- Industry-standard algorithm implementations

</details>

---

## 💾 **Installation & Usage**

### **Method 1: Direct Download**
```bash
# Clone the repository
git clone https://github.com/Adithyamaurya/cryptic.git
cd cryptic

# Open in browser
open index.html
```

### **Method 2: GitHub Pages**
Visit the live demo: `https://clinquant-puppy-a3d0fe.netlify.app/`



