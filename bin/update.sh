#!/usr/bin/env bash

set -e;
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

function update()
{
    current=`pwd`;
    moduleName=$1;

    echo "";
    echo -e "\e[32m------- $1 -------\e[39m";
    echo "";

    if [ ! -d "$1" ]; then
        echo -e "Error: \e[31m'$1' is not a directory!\e[39m";
        exit 1;
    fi

    cd $1;
    shift;

    echo -e "\e[34mnpm - update\e[39m";
    npm update --save;
    echo -e "\e[34m---\e[39m";

    cd "$current";
}

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    current=`pwd`;

    update "types/oxygen-core";
    update "hydrogen-core";
    update "hydrogen-story";
    update "hydrogen-tile";
    update "hydrogen-tile-test";
    update "hydrogen-story-test";
    update "hydrogen-story-editor";
    update "hydrogen-story-editor-test";

    if [ "$1" = "build" ]; then
        build.sh "$2"
    fi
else
    echo "Bad working directory! Run only from Hydrogen root directory!"
fi;