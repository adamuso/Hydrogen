#!/usr/bin/env bash

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    DIR=$(pwd);
else
    echo -e "\e[31mERROR: This script must be run from hydrogen main directory\e[39m";
    exit 1;
fi

bash --init-file "bin/hydrogen-init.sh";