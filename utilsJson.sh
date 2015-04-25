#!/bin/bash
#
###################  JSON extraction Functions  ##########################
function weCanParseJSON { 
  jq --version >/dev/null 2>&1
  if [[ 0 -ne $? ]]; then
    echo ""
    echo "You need the JSON parser 'jq' if you want to be able to set meteor command line parameters from your settings.json file."
    echo "Please execute the following command : "
    echo
    echo "sudo apt-get -y install jq"
    echo
    exit
  fi
  if [ ! -f "settings.json" ]; then
    echo "Please copy 'example.settings.json' to 'settings.json' and make any necessary corrections. "
    echo
    echo "cp example.settings.json settings.json "
    echo
    exit
  fi
}

echo "Setting up JSON parsing functions"
function parseJSON {
  local __PARM=$1
  local TMP=$(cat settings.json | jq .$1 | sed "s/\"//g")
  eval $__PARM="'${TMP}'"
}

function parseJSON_public {
  local __PARM=$1
  local TMP=$(cat settings.json | jq .public.$1 | sed "s/\"//g")
  eval $__PARM="'${TMP}'"
}


