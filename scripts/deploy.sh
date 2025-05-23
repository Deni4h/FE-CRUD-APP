#!/bin/bash
set -e

APP_NAME="fe-crud-app"
ROOT_DIR="/home/deni/fe-crud-app"
GREEN_DIR="$ROOT_DIR/green-app"
BLUE_DIR="$ROOT_DIR/blue-app"
CURRENT_LINK="$ROOT_DIR/current"
BUILD_DIR="$ROOT_DIR/dist"

echo "[INFO] Checking active deployment..."
CURRENT_TARGET=$(readlink "$CURRENT_LINK")

if [[ "$CURRENT_TARGET" == "$GREEN_DIR" ]]; then
  TARGET_DIR="$BLUE_DIR"
  NEW_ACTIVE="blue"
else
  TARGET_DIR="$GREEN_DIR"
  NEW_ACTIVE="green"
fi

echo "[INFO] Deploying to $NEW_ACTIVE..."
rm -rf "$TARGET_DIR"/*
cp -r "$BUILD_DIR"/* "$TARGET_DIR"

ln -sfn "$TARGET_DIR" "$CURRENT_LINK"

pm2 delete "$APP_NAME" || true
pm2 serve "$CURRENT_LINK" 5173 --name "$APP_NAME" --spa --watch

echo "[SUCCESS] Deployment complete. Active: $NEW_ACTIVE"
