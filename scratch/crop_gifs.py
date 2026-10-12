from PIL import Image
import numpy as np
import os

SRC = r"C:\Users\LENOVO\Downloads"
files = {
    "kenali": "GIF 1 Kenali.gif",
    "kreasi": "GIF 2 Kreasi.gif",
    "implikasi": "GIF 3 Implikasi.gif",
}
box = (580, 40, 1340, 800)  # 760x760, covers the full animation extents

for name, fn in files.items():
    im = Image.open(os.path.join(SRC, fn))
    frames, durations = [], []
    for i in range(im.n_frames):
        im.seek(i)
        arr = np.asarray(im.convert("RGB").crop(box)).astype(np.float32)
        # Levels: background 251 -> 255 (pure white), keeps shading/shadows intact
        arr = np.clip(arr * (255.0 / 251.0), 0, 255).astype(np.uint8)
        # Snap near-white pixels fully to white to avoid faint boxes after quantization
        near = (arr >= 252).all(axis=2)
        arr[near] = 255
        q = Image.fromarray(arr).quantize(colors=255, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        frames.append(q)
        durations.append(im.info.get("duration", 40))
    out = f"public/assets/approach-{name}.gif"
    frames[0].save(out, save_all=True, append_images=frames[1:], duration=durations,
                   loop=0, optimize=False, disposal=1)
    chk = Image.open(out).convert("RGB")
    print(name, os.path.getsize(out), "corners:", chk.getpixel((2, 2)), chk.getpixel((757, 757)))
