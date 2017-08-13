#!/usr/bin/env bash

set -e;
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

function link()
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

    rm -r node_modules/@types/* 2> /dev/null;

    if [ "$#" -gt 0 ]; then
        echo -e "\e[34mLinks";
        for module in $@; do
            npm link "$module";
        done;
        echo -e "---\e[39m";
        echo "";
    fi;

    set +e;
    {
        echo -e "npm - install\e[39m";

        if ! npm install; then
            echo -e "\n\e[32m$moduleName\e[39m - \e[31mnpm install error!\e[39m";
            cd "$current";
            exit 2;
        fi
    }
    set -e;

    echo -e "\e[34m---\e[39m";
    echo "";

    set +e;
    {
        echo -e "\e[34mnpm - link\e[39m";

        if ! npm link; then
            echo -e "\n\e[32m$moduleName\e[39m - \e[31mnpm link error!\e[39m";
            cd "$current";
            exit 3;
        fi
    }
    set -e;

    echo -e "\e[34m---\e[39m";

    cd "$current";
}

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    current=`pwd`;

    link "types/oxygen-core";
    link "hydrogen-core" "@types/oxygen-core";
    link "hydrogen-story" "@types/oxygen-core" "hydrogen-core";
    link "hydrogen-tile" "@types/oxygen-core" "hydrogen-core";
    link "hydrogen-tile-test" "hydrogen-core" "hydrogen-tile";
    link "hydrogen-story-test" "hydrogen-core" "hydrogen-story";
    link "hydrogen-story-editor" "@types/oxygen-core" "hydrogen-story";
    link "hydrogen-story-editor-test" "@types/oxygen-core" "hydrogen-story-editor";
else
    echo "Bad working directory! Run only from Hydrogen root directory!"
fi;