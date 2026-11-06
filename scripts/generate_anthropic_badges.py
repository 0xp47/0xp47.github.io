"""
Generate premium, high-resolution hexagonal certification badges for Anthropic Academy credentials.
Uses the exact mathematical vector geometry of the official Anthropic mark.
Outputs 600x600 RGBA PNGs supersampled from 1200x1200 for razor-sharp vector quality.
"""

import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_hexagon_points(cx, cy, radius, rotation_deg=0):
    points = []
    for i in range(6):
        angle = math.radians(60 * i + rotation_deg)
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        points.append((x, y))
    return points

def draw_official_anthropic_logo(draw, cx, cy, scale, color=(255, 255, 255, 255), hole_color=(13, 17, 23, 255)):
    """
    Renders the official Anthropic logo polygon coordinates:
    Right wedge + Left 'A' polygon with inner counter-space.
    """
    def tx(x):
        return cx + (x - 12.0) * scale
    def ty(y):
        return cy + (y - 12.0) * scale

    # 1. Right diagonal wedge
    right_wedge = [
        (tx(17.3041), ty(3.5410)),
        (tx(13.6323), ty(3.5410)),
        (tx(20.3283), ty(20.4590)),
        (tx(24.0000), ty(20.4590))
    ]
    draw.polygon(right_wedge, fill=color)

    # 2. Left 'A' outer silhouette
    left_outer = [
        (tx(6.6959), ty(3.5410)),
        (tx(0.0000), ty(20.4590)),
        (tx(3.7442), ty(20.4590)),
        (tx(5.1135), ty(16.9063)),
        (tx(12.1187), ty(16.9063)),
        (tx(13.4880), ty(20.4590)),
        (tx(17.2322), ty(20.4590)),
        (tx(10.5363), ty(3.5410))
    ]
    draw.polygon(left_outer, fill=color)

    # 3. Inner counter-space (hole in the A)
    left_inner = [
        (tx(6.3247), ty(13.7642)),
        (tx(8.6161), ty(7.8186)),
        (tx(10.9075), ty(13.7642))
    ]
    draw.polygon(left_inner, fill=hole_color)

def draw_badge(badge_type: str, output_path: str):
    S = 1200  # Supersampled canvas size
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = S // 2, S // 2

    # Brand Colors
    TERRACOTTA = (217, 119, 87, 255)       # Anthropic primary #D97757
    TERRACOTTA_LIGHT = (245, 158, 131, 255) # Glow highlight
    TERRACOTTA_DARK = (150, 70, 45, 255)    # Outer shadow
    AMBER = (245, 158, 11, 255)
    OBSIDIAN_BG = (12, 15, 22, 255)
    PLATE_BG = (18, 22, 31, 255)
    EMBLEM_BG = (24, 29, 41, 255)
    WHITE = (255, 255, 255, 255)
    LIGHT_TEXT = (240, 240, 245, 255)
    MUTED_TEXT = (180, 165, 160, 255)

    # Configuration by badge type
    if badge_type == "code":
        ACCENT_PRIMARY = (16, 185, 129, 255)     # Emerald
        ACCENT_SECONDARY = (52, 211, 153, 255)
        BADGE_SUBTITLE = "CLAUDE CODE"
        BADGE_TAG = "DEVELOPER ACCREDITED"
    elif badge_type == "mcp":
        ACCENT_PRIMARY = (14, 165, 233, 255)     # Sky Blue
        ACCENT_SECONDARY = (56, 189, 248, 255)
        BADGE_SUBTITLE = "MODEL CONTEXT PROTOCOL"
        BADGE_TAG = "INTEGRATION ARCHITECT"
    elif badge_type == "cloud":
        ACCENT_PRIMARY = (139, 92, 246, 255)    # Violet
        ACCENT_SECONDARY = (167, 139, 250, 255)
        BADGE_SUBTITLE = "CLOUD & ENTERPRISE"
        BADGE_TAG = "SOLUTIONS ARCHITECT"
    elif badge_type == "fluency":
        ACCENT_PRIMARY = (234, 179, 8, 255)      # Amber/Gold
        ACCENT_SECONDARY = (250, 204, 21, 255)
        BADGE_SUBTITLE = "AI FLUENCY"
        BADGE_TAG = "ENTERPRISE OPERATIONS"
    else:  # claude / core
        ACCENT_PRIMARY = TERRACOTTA
        ACCENT_SECONDARY = TERRACOTTA_LIGHT
        BADGE_SUBTITLE = "CLAUDE SPECIALIST"
        BADGE_TAG = "AGENTIC SYSTEMS"

    # Hexagon coordinates
    outer_pts = create_hexagon_points(cx, cy, 545, rotation_deg=90)
    mid_pts = create_hexagon_points(cx, cy, 510, rotation_deg=90)
    inner_pts = create_hexagon_points(cx, cy, 470, rotation_deg=90)

    # 1. Subtle Outer Drop Shadow
    shadow_img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.polygon(outer_pts, fill=(0, 0, 0, 180))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=32))
    img.paste(shadow_img, (0, 20), shadow_img)

    # 2. Outer Beveled Hexagon Rim (Multi-stepped metallic gradient)
    draw.polygon(outer_pts, fill=OBSIDIAN_BG)
    for i in range(18):
        pts = create_hexagon_points(cx, cy, 545 - i, rotation_deg=90)
        t = i / 18.0
        r = int(TERRACOTTA_LIGHT[0] * (1 - t) + TERRACOTTA_DARK[0] * t)
        g = int(TERRACOTTA_LIGHT[1] * (1 - t) + TERRACOTTA_DARK[1] * t)
        b = int(TERRACOTTA_LIGHT[2] * (1 - t) + TERRACOTTA_DARK[2] * t)
        draw.polygon(pts, outline=(r, g, b, 255))

    # 3. Mid Accent Border
    draw.polygon(mid_pts, fill=OBSIDIAN_BG, outline=ACCENT_PRIMARY)
    for i in range(5):
        pts = create_hexagon_points(cx, cy, 510 - i, rotation_deg=90)
        alpha = max(0, 220 - i * 40)
        draw.polygon(pts, outline=(ACCENT_SECONDARY[0], ACCENT_SECONDARY[1], ACCENT_SECONDARY[2], alpha))

    # 4. Deep Carbon Inner Plate
    draw.polygon(inner_pts, fill=PLATE_BG)

    # Geometric micro-lines on the inner plate
    for ring_r in [400, 320, 240]:
        pts = create_hexagon_points(cx, cy, ring_r, rotation_deg=90)
        draw.polygon(pts, outline=(40, 48, 64, 80))
    for y_line in range(300, 900, 28):
        draw.line([(cx - 380, y_line), (cx + 380, y_line)], fill=(28, 35, 48, 50), width=2)

    # Fonts
    try:
        font_brand = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arialbd.ttf", 34)
        font_tag = ImageFont.truetype("arialbd.ttf", 26)
        font_micro = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font_brand = ImageFont.load_default()
        font_sub = font_brand
        font_tag = font_brand
        font_micro = font_brand

    # 5. Top Brand Header: "ANTHROPIC"
    brand_text = "ANTHROPIC"
    bbox = draw.textbbox((0, 0), brand_text, font=font_brand)
    bw = bbox[2] - bbox[0]
    draw.text((cx - bw // 2, cy - 355), brand_text, font=font_brand, fill=WHITE)

    # Divider line with center jewel
    draw.line([(cx - 85, cy - 295), (cx + 85, cy - 295)], fill=TERRACOTTA, width=4)
    draw.polygon([(cx, cy - 302), (cx + 7, cy - 295), (cx, cy - 288), (cx - 7, cy - 295)], fill=WHITE)

    # Subtitle: "ACADEMY"
    acad_text = "A C A D E M Y"
    bbox = draw.textbbox((0, 0), acad_text, font=font_micro)
    aw = bbox[2] - bbox[0]
    draw.text((cx - aw // 2, cy - 280), acad_text, font=font_micro, fill=MUTED_TEXT)

    # 6. Central Circular Emblem Plate
    emblem_y = cy - 25
    emblem_r = 150

    # Glow background behind emblem
    draw.ellipse([(cx - emblem_r, emblem_y - emblem_r), (cx + emblem_r, emblem_y + emblem_r)], 
                 fill=EMBLEM_BG, outline=ACCENT_PRIMARY, width=6)
    draw.ellipse([(cx - emblem_r + 8, emblem_y - emblem_r + 8), (cx + emblem_r - 8, emblem_y + emblem_r - 8)], 
                 outline=(ACCENT_SECONDARY[0], ACCENT_SECONDARY[1], ACCENT_SECONDARY[2], 140), width=2)

    # 7. Render Authentic Anthropic Logo in Center
    draw_official_anthropic_logo(draw, cx, emblem_y - 10, scale=8.2, color=WHITE, hole_color=EMBLEM_BG)

    # Distinct domain secondary indicator above or below the Anthropic logo:
    if badge_type == "code":
        # Terminal prompt chevrons below logo
        draw.line([(cx - 70, emblem_y + 85), (cx - 45, emblem_y + 105), (cx - 70, emblem_y + 125)], 
                  fill=ACCENT_SECONDARY, width=8)
        draw.line([(cx - 30, emblem_y + 125), (cx + 5, emblem_y + 125)], 
                  fill=WHITE, width=8)
    elif badge_type == "mcp":
        # Protocol nodes connecting to center
        for deg in [30, 150, 210, 330]:
            rad = math.radians(deg)
            nx = cx + (emblem_r - 18) * math.cos(rad)
            ny = emblem_y + (emblem_r - 18) * math.sin(rad)
            draw.line([(cx + 40 * math.cos(rad), emblem_y + 40 * math.sin(rad)), (nx, ny)], 
                      fill=ACCENT_SECONDARY, width=4)
            draw.ellipse([(nx - 10, ny - 10), (nx + 10, ny + 10)], fill=WHITE, outline=ACCENT_PRIMARY, width=3)
    elif badge_type == "cloud":
        # Cloud arc above emblem
        draw.arc([(cx - 70, emblem_y - 120), (cx + 70, emblem_y - 40)], start=200, end=340, fill=ACCENT_SECONDARY, width=6)
    elif badge_type == "fluency":
        # Diamond sparkles around emblem
        for deg in [45, 135, 225, 315]:
            rad = math.radians(deg)
            nx = cx + 115 * math.cos(rad)
            ny = emblem_y + 115 * math.sin(rad)
            draw.polygon([(nx, ny - 10), (nx + 8, ny), (nx, ny + 10), (nx - 8, ny)], fill=ACCENT_SECONDARY)

    # 8. Lower Domain Ribbon ("CLAUDE SPECIALIST" / "CLAUDE CODE" etc.)
    sub_bbox = draw.textbbox((0, 0), BADGE_SUBTITLE, font=font_sub)
    sw = sub_bbox[2] - sub_bbox[0]
    
    ribbon_w = max(sw + 80, 500)
    ribbon_h = 60
    rx1, ry1 = cx - ribbon_w // 2, cy + 175
    rx2, ry2 = cx + ribbon_w // 2, ry1 + ribbon_h
    draw.rounded_rectangle([(rx1, ry1), (rx2, ry2)], radius=14, fill=OBSIDIAN_BG, outline=ACCENT_PRIMARY, width=4)
    draw.text((cx - sw // 2, ry1 + 10), BADGE_SUBTITLE, font=font_sub, fill=WHITE)

    # 9. Bottom Qualification Tag ("AGENTIC SYSTEMS" / "DEVELOPER ACCREDITED" etc.)
    tag_bbox = draw.textbbox((0, 0), BADGE_TAG, font=font_tag)
    tw = tag_bbox[2] - tag_bbox[0]
    draw.text((cx - tw // 2, cy + 265), BADGE_TAG, font=font_tag, fill=ACCENT_SECONDARY)

    # 10. Three Accent Stars at base of shield
    for sx, sy in [(cx - 45, cy + 342), (cx, cy + 334), (cx + 45, cy + 342)]:
        star_r = 11 if sx == cx else 9
        star_pts = []
        for i in range(10):
            r = star_r if i % 2 == 0 else star_r // 2
            a = math.radians(i * 36 - 90)
            star_pts.append((sx + r * math.cos(a), sy + r * math.sin(a)))
        draw.polygon(star_pts, fill=TERRACOTTA)

    # Downsample using high-quality LANCZOS to 600x600
    final_img = img.resize((600, 600), Image.Resampling.LANCZOS)
    final_img.save(output_path, "PNG", optimize=True)
    print(f"Generated {output_path} (600x600)")

if __name__ == "__main__":
    draw_badge("claude", "public/images/badges/anthropic-claude.png")
    draw_badge("code", "public/images/badges/anthropic-code.png")
    draw_badge("mcp", "public/images/badges/anthropic-mcp.png")
    draw_badge("cloud", "public/images/badges/anthropic-cloud.png")
    draw_badge("fluency", "public/images/badges/anthropic-fluency.png")
    draw_badge("claude", "public/images/badges/anthropic-logo.png")
