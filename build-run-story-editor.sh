#!/usr/bin/env bash

cd hydrogen-story-editor;
npm run build;
cd ..;
cd hydrogen-story-editor-test;
npm run build;
npm run nitro-win;