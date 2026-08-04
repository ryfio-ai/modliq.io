import os
from PIL import Image, ImageDraw, ImageFont

# Ensure target dir exists
os.makedirs("frontend/public/og", exist_ok=True)

# Dimensions
width, height = 1200, 630
img = Image.new("RGB", (width, height), color="#F0F6FA")
draw = ImageDraw.Draw(img)

# Border & Card background
draw.rectangle([20, 20, width - 20, height - 20], fill="#FFFFFF", outline="#D0E2F0", width=4)

# Top badge background
draw.rounded_rectangle([60, 60, 620, 105], radius=20, fill="#E6F0F8", outline="#2B70AB", width=2)
# Badge text
try:
    font_badge = ImageFont.truetype("arial.ttf", 20)
    font_title = ImageFont.truetype("arialbd.ttf", 68)
    font_sub = ImageFont.truetype("arialbd.ttf", 36)
    font_attr = ImageFont.truetype("arial.ttf", 24)
    font_chip = ImageFont.truetype("arialbd.ttf", 20)
except Exception:
    font_badge = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_attr = ImageFont.load_default()
    font_chip = ImageFont.load_default()

draw.text((80, 72), "MADE IN TAMIL NADU, INDIA · QELTRAVA AI", fill="#2B70AB", font=font_badge)

# Main Title
draw.text((60, 145), "Modliq", fill="#1B2A4A", font=font_title)

# Subtitle
draw.text((60, 240), "Manufacturing Intelligence Platform", fill="#2B70AB", font=font_sub)

# Attribution line
draw.text((60, 305), "A product by Qeltrava AI · Built in Tamil Nadu, India", fill="#4A5568", font=font_attr)

# Description text paragraph
desc_text = "Connects data ingestion, health scoring, process optimization, Quality Studio,\noperations, supplier risk, and buyer-ready Quality Passports."
draw.text((60, 360), desc_text, fill="#64748B", font=font_attr)

# Feature Chips
chips = ["Data Ingestion", "Health Scoring", "Process Optimization", "Quality Passport"]
chip_x = 60
chip_y = 490

for chip in chips:
    # Measure text
    bbox = font_chip.getbbox(chip) if hasattr(font_chip, 'getbbox') else (0, 0, len(chip)*12, 24)
    chip_w = (bbox[2] - bbox[0]) + 36
    chip_h = 48
    draw.rounded_rectangle([chip_x, chip_y, chip_x + chip_w, chip_y + chip_h], radius=14, fill="#1B2A4A")
    draw.text((chip_x + 18, chip_y + 12), chip, fill="#FFFFFF", font=font_chip)
    chip_x += chip_w + 20

# Save image
img.save("frontend/public/og/modliq-og.png")
print("Saved frontend/public/og/modliq-og.png successfully")
