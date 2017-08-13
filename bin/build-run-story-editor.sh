#!/usr/bin/env bash

cd hydrogen-story-editor;
npm run build-dev;
cd ..;
cd hydrogen-story-editor-test;
npm run build-dev;
npm run nitro-win;