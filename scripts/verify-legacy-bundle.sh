#!/usr/bin/env bash
# Verifies that dist/spartacss.css — the legacy default bundle
# (`.` / `./spartacss.css` exports) — has not drifted from the committed
# baseline snapshot. Run `npm run build` first; this script does not build.
#
# If this fails on a change that is an intentional, reviewed update to the
# legacy bundle's contents, regenerate the baseline deliberately:
#   npm run build && cp dist/spartacss.css test/baseline/spartacss.css
# and commit the updated baseline alongside the change that caused it.

set -euo pipefail

DIST_FILE="dist/spartacss.css"
BASELINE_FILE="test/baseline/spartacss.css"

if [ ! -f "$DIST_FILE" ]; then
  echo "error: $DIST_FILE not found. Run 'npm run build' first." >&2
  exit 1
fi

if [ ! -f "$BASELINE_FILE" ]; then
  echo "error: $BASELINE_FILE not found. Nothing to verify against." >&2
  exit 1
fi

if diff -u "$BASELINE_FILE" "$DIST_FILE"; then
  echo "OK: $DIST_FILE matches the committed baseline."
else
  echo >&2
  echo "error: $DIST_FILE has drifted from $BASELINE_FILE (diff above)." >&2
  echo "If this change is intentional, regenerate the baseline and commit it:" >&2
  echo "  npm run build && cp $DIST_FILE $BASELINE_FILE" >&2
  exit 1
fi
