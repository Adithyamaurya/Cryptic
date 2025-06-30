import CryptoJS from 'crypto-js';

interface EncryptedData {
  data: string;
  filename: string;
  originalType: string;
  timestamp: number;
}

export const encryptImage = async (file: File, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        
        // Create metadata
        const metadata: EncryptedData = {
          data: '',
          filename: file.name,
          originalType: file.type,
          timestamp: Date.now()
        };
        
        // Encrypt the image data
        const encrypted = CryptoJS.AES.encrypt(wordArray, password, {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: CryptoJS.lib.WordArray.random(16)
        });
        
        metadata.data = encrypted.toString();
        
        // Encrypt the entire metadata object
        const finalEncrypted = CryptoJS.AES.encrypt(JSON.stringify(metadata), password).toString();
        
        resolve(finalEncrypted);
      } catch (error) {
        reject(new Error('Encryption failed. Please try again.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const decryptImage = async (file: File, password: string): Promise<{ blob: Blob; filename: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const encryptedText = reader.result as string;
        
        // Decrypt the metadata
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, password);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText) {
          throw new Error('Invalid password or corrupted file');
        }
        
        const metadata: EncryptedData = JSON.parse(decryptedText);
        
        // Decrypt the image data
        const imageDecrypted = CryptoJS.AES.decrypt(metadata.data, password);
        const imageWordArray = imageDecrypted;
        
        // Convert back to ArrayBuffer
        const arrayBuffer = wordArrayToArrayBuffer(imageWordArray);
        
        // Create blob with original type
        const blob = new Blob([arrayBuffer], { type: metadata.originalType });
        
        resolve({
          blob,
          filename: metadata.filename
        });
      } catch (error) {
        if (error instanceof Error && error.message.includes('Invalid password')) {
          reject(new Error('Invalid password or corrupted file'));
        } else {
          reject(new Error('Decryption failed. The file may be corrupted or the password is incorrect.'));
        }
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Helper function to convert WordArray to ArrayBuffer
function wordArrayToArrayBuffer(wordArray: CryptoJS.lib.WordArray): ArrayBuffer {
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;
  const u8 = new Uint8Array(sigBytes);
  
  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  
  return u8.buffer;
}