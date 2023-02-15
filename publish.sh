#!/usr/bin/env bash

npm run clean

npm run build

cp README.md ./dist
cp package.json ./dist

cd dist
npm publish
cd ../
