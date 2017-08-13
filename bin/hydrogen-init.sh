#!/usr/bin/env bash

function _UseGetOpt-2 ()
{
    local cur

    COMPREPLY=()   # Array variable storing the possible completions.
    first=${COMP_WORDS[1]};
    second=${COMP_WORDS[2]};

    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=($(compgen -W "global build build-dev" -- "$first"));
    elif [ "$COMP_CWORD" -eq 2 ]; then
        if [ "$first" == "global" ]; then
            COMPREPLY=($(compgen -W "stop log build build-dev update link clear" -- "$second"));
        fi;
    fi

  return 0
}

complete -F _UseGetOpt-2 hydrogen

if [ -d "types" ] && [ -f "LICENSE" ] && [ -f ".gitignore" ]; then
    DIR=$(pwd);
else
    echo -e "\e[31mThis script must be run from hydrogen main directory\e[39m";
    exit 1;
fi

GLOBAL_ACTION_TOKEN="$DIR/.hydrogenglobalaction";
GLOBAL_ACTION_LOG="$DIR/.hydrogenglobalactionlog";
GLOBAL_ACTION_TYPE="$DIR/.hydrogenglobalactiontype";
GLOBAL_ACTION_INFO="$DIR/.hydrogenglobalactioninfo";

function __hydrogenPS1()
{
    if [ -f "$GLOBAL_ACTION_TYPE" ]; then
        hydrogenGlobalActionType=" g:\e[33m$(cat "$GLOBAL_ACTION_TYPE")\e[39m";
    fi

    if [ -f "$GLOBAL_ACTION_INFO" ]; then
        hydrogenGlobalActionInfo=" $(cat "$GLOBAL_ACTION_INFO")\e[39m";
        rm "$GLOBAL_ACTION_INFO";
    fi


    echo -e "$hydrogenGlobalActionType$hydrogenGlobalActionInfo";
}

PS1="\n[Hydrogen\`__hydrogenPS1\`] $PS1";

function hydrogen()
{
    if [[ ! "$(pwd)" == "$DIR"* ]]; then
        echo -e "\e[31mYou are outside hydrogen main directory!\e[39m";
        return 1;
    fi

    if [ "$1" = "build" ]; then
        if [ -f "package.json" ]; then
            npm run build
        fi
    elif [ "$1" = "build-dev" ]; then
        if [ -f "package.json" ]; then
            npm run build-dev
        fi
    elif [ "$1" = "global" ]; then
        if [ "$2" = "stop" ]; then
            __hydrogenGlobalActionStop
        elif [ "$2" = "log" ]; then
            tail -f -n $3 "$GLOBAL_ACTION_LOG";
        elif [ "$2" = "build" ]; then
            __hydrogenGlobalAction build
        elif [ "$2" = "build-dev" ]; then
            __hydrogenGlobalAction build-dev
        elif [ "$2" = "update" ]; then
            __hydrogenGlobalAction update
        elif [ "$2" = "link" ]; then
            __hydrogenGlobalAction link
        elif [ "$2" = "clear" ]; then
            __hydrogenGlobalActionStop > /dev/null;
            rm "$GLOBAL_ACTION_LOG";
        fi
    else
        __hydrogenStatus
    fi
}

function __hydrogenStatus()
{
    echo Hello!;
}

function __hydrogenCleanGlobalAction()
{
    rm "$GLOBAL_ACTION_TOKEN";
    rm "$GLOBAL_ACTION_TYPE";
}

function __hydrogenGlobalActionStop()
{
    if [ -f "$GLOBAL_ACTION_TOKEN" ]; then
        pid=$(cat "$GLOBAL_ACTION_TOKEN");
        kill "$pid";
        __hydrogenCleanGlobalAction
        echo -e "\e[34mGlobal action succesfully terminated\e[39m";
    else
        echo -e "\e[31mNo global action is running at the moment\e[39m";
    fi
}

function __hydrogenGlobalAction()
{
    if [ -f "$GLOBAL_ACTION_TOKEN" ]; then
        echo -e "\e[31mGlobal action is already running\e[39m";
        return 1;
    fi

    current=$(pwd);
    cd "$DIR";

    touch "$GLOBAL_ACTION_TOKEN";
    (
        __hydrogenGlobalActionAsync $@ > "$GLOBAL_ACTION_LOG" 2>&1 &
        pid=$!;
        echo "$pid" > "$GLOBAL_ACTION_TOKEN";
    )

    cd "$current";
}

function __hydrogenGlobalActionAsync()
{
    if [ "$1" = "build" ]; then
        echo "build" > "$GLOBAL_ACTION_TYPE";
        bin/build.sh;
        result="$?";
    elif [ "$1" = "build-dev" ]; then
        echo "build-dev" > "$GLOBAL_ACTION_TYPE";
        bin/build.sh dev;
        result="$?";
    elif [ "$1" = "update" ]; then
        echo "update" > "$GLOBAL_ACTION_TYPE";
        bin/update.sh dev;
        result="$?";
    elif [ "$1" = "build-dev" ]; then
        echo "link" > "$GLOBAL_ACTION_TYPE";
        bin/link.sh dev;
        result="$?";
    fi

    if [ "$result" -ne 0 ]; then
        echo -e "\e[31mGlobal action finished with errors!" > "$GLOBAL_ACTION_INFO";
    else
        echo -e "\e[34mFinished!" > "$GLOBAL_ACTION_INFO";
    fi

    __hydrogenCleanGlobalAction
}