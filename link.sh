#!/usr/bin/env bash

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    current=`pwd`;
    for dir in types/*/; do
        if [ -d "$dir" ]; then
            echo "$dir";
            cd "$dir";
            npm link;
            cd "$current";
        fi;
    done;

    echo "";
    echo "------- hydrogen-core -------";
    echo "";
    cd "hydrogen-core";
    rm node_modules/@types/*;
    npm link @types/oxygen-core;
    npm install;
    npm link;
    cd "$current";

    echo "";
    echo "------- hydrogen-tile -------";
    echo "";

    cd "hydrogen-tile";
    rm node_modules/@types/*;
    npm link @types/oxygen-core;
    npm link @types/hydrogen-core;
    npm link hydrogen-core;
    npm install;
    npm link;
    cd "$current";

    echo "";
    echo "------- hydrogen-tile-test -------";
    echo "";

    cd "hydrogen-tile-test";
    rm node_modules/@types/*;
    npm link @types/oxygen-core;
    npm link @types/hydrogen-core;
    npm link @types/hydrogen-tile;
    npm link hydrogen-core;
    npm link hydrogen-tile;
    npm install;
    cd "$current";
else
    echo "Bad working directory!"
fi;