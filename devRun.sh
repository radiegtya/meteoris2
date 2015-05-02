#!/bin/bash
#
source ./utilsJson.sh
#

function addOrRemoveMocha {
  parseJSON MOCHA
  if [ ${MOCHA} == "yes" ]; then
    meteor add mike:mocha
    echo "Mocha added"
  else
    meteor remove mike:mocha
    echo "Mocha removed"
  fi

}

function addOrRemoveCucumber {
  parseJSON CUCUMBER
  if [ ${CUCUMBER} == "yes" ]; then
    meteor add xolvio:webdriver
    meteor add xolvio:cucumber
    echo "Cucumber added"
  else
    meteor remove xolvio:webdriver
    meteor remove xolvio:cucumber
    echo "Cucumber removed"
  fi
}

###################   Main Program
#
weCanParseJSON
echo "Instantiating variables from settings.json"
parseJSON DEVELOPMENT_MONGO_SERVER
export MONGO_URL=mongodb://${DEVELOPMENT_MONGO_SERVER}
#
addOrRemoveMocha
addOrRemoveCucumber
#
echo "### Configuration is . . . "
echo "   ~  Connect to  Mongo server : " ${MONGO_URL}
echo "   ~  Velocity "
echo "   ~                     Mocha : " ${MOCHA}
echo "   ~                  Cucumber : " ${CUCUMBER}
echo "### ~   ~   ~   ~   ~   ~   ~   ~   ~   ~    "
#
meteor --settings=settings.json

