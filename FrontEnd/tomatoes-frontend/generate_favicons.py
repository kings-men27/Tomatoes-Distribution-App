from pathlib import Path
from PIL import Image, ImageDraw

out_dir = Path(__file__).resolve().parent / 'public'
out_dir.mkdir(exist_ok=True)


def build_icon(size: int) -> Image.Image:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Green background
    draw.rectangle((0, 0, size - 1, size - 1), fill=(31, 122, 63, 255))

    # Outer red ring
    draw.ellipse((int(size * 0.08), int(size * 0.08), int(size * 0.92), int(size * 0.92)), fill=(255, 90, 54, 255))

    # Inner gold circle
    draw.ellipse((int(size * 0.24), int(size * 0.24), int(size * 0.76), int(size * 0.76)), fill=(255, 209, 102, 255))

    # Accent leaf
    draw.ellipse((int(size * 0.28), int(size * 0.66), int(size * 0.72), int(size * 0.94)), fill=(244, 241, 222, 255))
    return img


icon512 = build_icon(512)
icon512.save(out_dir / 'favicon.png')

icon180 = build_icon(180)
icon180.save(out_dir / 'apple-touch-icon.png')

# Create a browser-friendly ICO bundle
icon16 = build_icon(16)
icon32 = build_icon(32)
icon48 = build_icon(48)
icon64 = build_icon(64)

icon16.save(out_dir / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
