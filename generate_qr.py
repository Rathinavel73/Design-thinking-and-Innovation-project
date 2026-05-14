#!/usr/bin/env python3
"""
QR Code Generator for Hostel Feedback Project
Generates a QR code image that links to the index page
"""

import qrcode
import os
from pathlib import Path

def generate_qr_code():
    # URL that the QR code will link to
    url = "http://localhost:8080/index.html"
    
    # Create QR code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    
    # Add data and optimize
    qr.add_data(url)
    qr.make(fit=True)
    
    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Define output path
    output_dir = Path(__file__).parent / "frontend"
    output_path = output_dir / "hostel-feedback-qr.png"
    
    # Create frontend directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Save the image
    img.save(output_path)
    
    print(f"✅ QR Code generated successfully!")
    print(f"📁 Saved to: {output_path}")
    print(f"🔗 URL encoded: {url}")
    print(f"📱 Scan this QR code to open: {url}")
    
    return output_path

if __name__ == "__main__":
    try:
        output_file = generate_qr_code()
        print(f"\n✨ You can now use '{output_file}' in your project!")
    except ImportError:
        print("❌ Error: 'qrcode' module not installed")
        print("📦 Install it with: pip install qrcode[pil]")
    except Exception as e:
        print(f"❌ Error generating QR code: {e}")
