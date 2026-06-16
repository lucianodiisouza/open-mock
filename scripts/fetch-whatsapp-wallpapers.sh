#!/usr/bin/env bash
# Re-download official WhatsApp default chat wallpapers from Meta's CDN.
# Source URLs may change when WhatsApp ships updates — update mappings here if needed.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/wallpapers/whatsapp"

mkdir -p "$OUT"

download() {
  local file="$1"
  local url="$2"
  curl -fsSL "$url" -o "$OUT/$file"
  echo "Downloaded $file"
}

download "doodle-light.png" "https://static.whatsapp.net/rsrc.php/v4/y1/r/a3pd-CgpXeU.png"
download "doodle-dark.webp" "https://static.whatsapp.net/rsrc.php/yp/r/OA5z0a81CZk.webp"

echo "Done. Wallpapers saved to $OUT"
