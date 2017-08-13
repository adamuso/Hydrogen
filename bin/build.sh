#!/usr/bin/env bash

set -e;
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

function build()
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

    if [ "$1" = "dev" ]; then
        echo -e "\e[34mnpm - build-dev\e[39m";
        npm run build-dev;
    else
        echo -e "\e[34mnpm - build\e[39m";
        npm run build;
    fi

    echo -e "\e[34m---\e[39m";

    cd "$current";
}

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    current=`pwd`;

    build "types/oxygen-core" $1;
    build "hydrogen-core" $1;
    build "hydrogen-story" $1;
    build "hydrogen-tile" $1;
    build "hydrogen-tile-test" $1;
    build "hydrogen-story-test" $1;
    build "hydrogen-story-editor" $1;
    build "hydrogen-story-editor-test" $1;
else
    echo "Bad working directory! Run only from Hydrogen root directory!"
fi;