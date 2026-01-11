#!/bin/bash
set -e

# Configuration
REMOTE_URL="https://github.com/TalibBaig7/Zerodha-Clone.git"

echo "=============================================="
echo "   Initializing Git and Pushing Fixes"
echo "=============================================="
echo "Remote URL: $REMOTE_URL"
echo ""

# Check if .git exists
if [ -d ".git" ]; then
    echo "✅ .git directory already exists."
else
    echo "⚙️  Initializing new git repository..."
    git init -b main
    echo "✅ Git initialized."
fi

# Add remote if doesn't exist
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already exists."
    # Optionally set url just in case
    git remote set-url origin "$REMOTE_URL"
else
    echo "⚙️  Adding remote 'origin'..."
    git remote add origin "$REMOTE_URL"
fi

echo "⚙️  Adding files..."
git add .

echo "⚙️  Committing changes..."
# Check if there are changes to commit
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "ℹ️  No changes to commit (or fresh repo)."
else
    git commit -m "Fix deployment errors: Hardcoded URLs and ESLint warnings" || echo "ℹ️ Initial commit"
fi

echo "=============================================="
echo "⚠️  WARNING: We are about to FORCE PUSH to main."
echo "This will overwrite the code on GitHub with the code in this folder."
echo "This is necessary because this folder lost its git history."
echo "=============================================="
read -p "Are you sure you want to continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operation cancelled."
    exit 1
fi

echo "🚀 Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "✅ Success! Code pushed."
echo "Visit your Vercel dashboard to see the new build start."
