#!/usr/bin/env bash

function link()
{
    current=`pwd`;

    echo "";
    echo -e "\e[32m------- $1 -------\e[39m";
    echo "";

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

    echo -e "\e[34mnpm - install\e[39m";
    npm install
    echo -e "\e[34m---\e[39m";
    echo "";
    echo -e "\e[34mnpm - link\e[39m";
    npm link
    echo -e "\e[34m---\e[39m";

    cd "$current";
}

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    current=`pwd`;

    link "types/oxygen-core";
    link "types/hydrogen-core";
    link "types/hydrogen-tile" "@types/hydrogen-core";
    link "types/hydrogen-story" "@types/hydrogen-core";
    link "hydrogen-core" "@types/oxygen-core";
    link "hydrogen-story" "@types/oxygen-core" "@types/hydrogen-core" "hydrogen-core";
    link "hydrogen-tile" "@types/oxygen-core" "@types/hydrogen-core" "hydrogen-core";
    link "hydrogen-tile-test" "@types/oxygen-core" "@types/hydrogen-core" "@types/hydrogen-tile" "hydrogen-core" "hydrogen-tile";
    link "hydrogen-story-test" "@types/oxygen-core" "@types/hydrogen-core" "@types/hydrogen-story" "hydrogen-core" "hydrogen-story";
    link "hydrogen-story-editor" "@types/oxygen-core" "@types/hydrogen-story" "hydrogen-story";
    link "hydrogen-story-editor-test" "hydrogen-story-editor";
else
    echo "Bad working directory!"
fi;