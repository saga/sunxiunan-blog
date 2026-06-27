#!/usr/bin/env bash
#
# Deploy the built site to the remote server.
#
# Usage:
#   ./scripts/deploy.sh              # deploy delta only (rsync incremental)
#   ./scripts/deploy.sh --build      # rebuild first, then deploy
#   ./scripts/deploy.sh --dry-run    # preview what would change, upload nothing
#   ./scripts/deploy.sh --build --dry-run
#
# rsync is incremental by default: it compares file size + mtime and only
# transfers files that changed. --delete removes files on the server that no
# longer exist locally, keeping the remote in sync.
#
# Password is read from .env (password=...).

set -euo pipefail

# ===== Config =====
REMOTE_PATH="/var/www/html"
ENV_FILE="$(cd "$(dirname "$0")/.." && pwd)/.env"

# ===== Read config from .env =====
REMOTE_HOST=""
REMOTE_PORT=""
password=""
if [ -f "$ENV_FILE" ]; then
  REMOTE_HOST=$(grep -E '^REMOTE_HOST=' "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"')
  REMOTE_PORT=$(grep -E '^REMOTE_PORT=' "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"')
  password=$(grep -E '^password=' "$ENV_FILE" | head -1 | cut -d= -f2-)
fi
if [ -z "$REMOTE_HOST" ] || [ -z "$REMOTE_PORT" ] || [ -z "$password" ]; then
  echo "Error: REMOTE_HOST, REMOTE_PORT, or password not found in $ENV_FILE"
  exit 1
fi

# ===== Parse args =====
DO_BUILD=false
DRY_RUN=false
while [ $# -gt 0 ]; do
  case "$1" in
    --build)   DO_BUILD=true ;;
    --dry-run) DRY_RUN=true ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

# ===== Build =====
if [ "$DO_BUILD" = true ] || [ ! -d "dist" ]; then
  echo ">>> Building..."
  npm run build
fi

if [ ! -d "dist" ]; then
  echo "Error: dist/ not found. Run with --build or run 'npm run build' first."
  exit 1
fi

# ===== Deploy via rsync (incremental) =====
RSYNC_OPTS="-avz --delete --stats"
if [ "$DRY_RUN" = true ]; then
  RSYNC_OPTS="$RSYNC_OPTS --dry-run"
  echo ">>> Dry run — no files will be uploaded"
fi

echo ">>> Deploying to ${REMOTE_HOST}:${REMOTE_PATH}/ ..."
expect <<EOF
set timeout 600
spawn rsync ${RSYNC_OPTS} -e "ssh -o StrictHostKeyChecking=no -p ${REMOTE_PORT}" dist/ ${REMOTE_HOST}:${REMOTE_PATH}/
expect {
  "password:" { send "${password}\r"; exp_continue }
  eof
}
EOF

echo ">>> Deploy complete."
