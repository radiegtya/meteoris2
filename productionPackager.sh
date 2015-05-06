#!/bin/bash
#
#  This script packages a project as a tar.gz file and a ready-to-run apk file.
#
#  If you *can*, you should prefer "mup" instead.
#
#  However, if your public server has unusual characteristics, or if "mup" might
#  alter it inappropriately you might want to adapt this script to your special 
#  needs.
#
#  In the last section the script uses ssh rpc to run three 
#  scripts that you must create yourself or use the published examples.
#
echo "Checking dependencies."
APT_INSTALLS=0;
if [[ "$(dpkg -s openjdk-7-jdk 2> /dev/null  | grep -c 'ok installed')" < "1" ]]; then
  APT_INSTALLS=1;
fi
if [[ "$(dpkg -s lib32z1 2> /dev/null  | grep -c 'ok installed')" < "1" ]]; then
  APT_INSTALLS=1;
fi
if [[ "$(dpkg -s lib32stdc++6 2> /dev/null  | grep -c 'ok installed')" < "1" ]]; then
  APT_INSTALLS=1;
fi
if [[ "$(dpkg -s jq 2> /dev/null  | grep -c 'ok installed')" < "1" ]]; then
  APT_INSTALLS=1;
fi
if [[ "${APT_INSTALLS}" > "0" ]]; then
  if [ "$EUID" -ne 0 ]; then
    echo "There are dependencies to install. Please re-run this script as root"
    exit 1
  fi
  apt-get update;
  apt-get install --yes openjdk-7-jdk
  apt-get install --yes lib32z1 lib32stdc++6
  apt-get install --yes jq
  exit
fi
#
if [ "$EUID" -eq 0 ]; then
  echo "It is better to *NOT* run this script as root"
  exit 1
fi
#
source ./utilsJson.sh
#
echo "Instantiating variables from settings.json"
parseJSON_public APP_VERSION
parseJSON_public APP_ID
parseJSON_public APP_NAME
parseJSON_public USE_MUGEN_GENERATOR
parseJSON_public PRODUCTION_MAIN_SERVER

parseJSON PRODUCTION_MONGO_SERVER
parseJSON ZIPALIGN_PATH
ZIPALIGN_PATH="$(eval echo ${ZIPALIGN_PATH//>})"
parseJSON ALIGNMENT
parseJSON KEYSTORE_PATH
KEYSTORE_PATH="$(eval echo ${KEYSTORE_PATH//>})"
parseJSON KEYSTORE_PWD
parseJSON BUILD_DIRECTORY
BUILD_DIRECTORY="$(eval echo ${BUILD_DIRECTORY//>})"
parseJSON BLOB_MONGO_SERVER
parseJSON DEBUG_MODE

export MONGO_URL=mongodb://${PRODUCTION_MONGO_SERVER}

export PROJ=${PWD##*/}
#
#
export TARGET_SERVER=$(echo ${PRODUCTION_MAIN_SERVER} | awk -F/ '{print $3}')
export TARGET_DIRECTORY=${BUILD_DIRECTORY}/${PROJ}
#
echo "### Configuration for your '"${PROJ}"' project  ... "
echo "   ~                                   Public name : " ${APP_NAME} v${APP_VERSION}
echo "   ~                    Meteor packaging unique ID : " ${APP_ID}
echo "   ~                               Target host is  : " ${TARGET_SERVER}
echo "   ~                           Target web site is  : " ${PRODUCTION_MAIN_SERVER}
echo "   ~                     Mongo main database is at : " ${MONGO_URL}
echo "   ~                     Mongo BLOB database is at : " ${BLOB_MONGO_SERVER}
echo "   ~                APK signing keys are stored at : " ${KEYSTORE_PATH}
echo "   ~     Expose javascript debug symbols to public : " ${DEBUG_MODE}
echo "   ~ Align android bundle to "$ALIGNMENT"-byte boundary using : " ${ZIPALIGN_PATH}
echo "   ~                    Temporary builds directory : " ${TARGET_DIRECTORY}
echo "### ~   ~   ~    "
#
echo "Checking/installing Android capabilities : "
meteor install-sdk android || { echo 'Failed to install Android SDK.' ; exit 1; }
#
echo
echo "Checking key exists in key store :"
export KEY_WORKS=$(keytool -list -v  -storepass ${KEYSTORE_PWD} -keystore ~/.keystore -alias ${APP_NAME} | grep -c "Alias name: ${APP_NAME}")
if [[  "${KEY_WORKS}" != "1"  ]]; then
  echo "Probably you need to run this command : "
  echo
  echo "keytool -genkey -v -keystore ~/.keystore -alias ${APP_NAME} -keyalg RSA -keysize 2048 -validity 10000"
  echo
  exit
else
  echo "✓ Found the key"
fi
#
echo ""
echo "**NOT** Checking/installing iOS capabilities : "
#meteor install-sdk ios
#
#
echo ""
echo ""
echo "Building project : ${APP_NAME} in ${BUILD_DIRECTORY}"
mkdir -p ${TARGET_DIRECTORY}
#
cp settings.json  ./public/
rm -fr ${TARGET_DIRECTORY}
echo "Building WITHOUT public debug symbols for Android version. "
meteor build ${TARGET_DIRECTORY}         --server=${PRODUCTION_MAIN_SERVER}
mv ${TARGET_DIRECTORY}/android/unaligned.apk ${TARGET_DIRECTORY}/android/${APP_NAME}_unaligned.apk
if [[  "${DEBUG_MODE}" -eq "yes"  ]]; then
  echo "Rebuilding WITH public debug symbols for browser version "
  meteor build ${TARGET_DIRECTORY} --debug --server=${PRODUCTION_MAIN_SERVER}
fi
rm -f ./public/settings.json
#
pushd ${TARGET_DIRECTORY} > /dev/null
pushd ./android > /dev/null
echo "Sign the unaligned APK"
MYVARIABLE="$(jarsigner -storepass ${KEYSTORE_PWD} -tsa http://timestamp.digicert.com -digestalg SHA1 ${APP_NAME}_unaligned.apk ${APP_NAME})"
if [[ "$?" > "0" ]]; then
  echo "----------"
  echo ${MYVARIABLE}
  echo "----------"
  exit
fi
#
echo "Align to byte boundaries and verify."
${ZIPALIGN_PATH}/zipalign -f    ${ALIGNMENT} ${APP_NAME}_unaligned.apk ${APP_NAME}_aligned.apk
# ${ZIPALIGN_PATH}/zipalign -f -v ${ALIGNMENT} ${APP_NAME}_unaligned.apk ${APP_NAME}_aligned.apk
#
echo
echo "Rename and relocate for easy deployment"
mv ${APP_NAME}_aligned.apk ..
mv unaligned.apk ../${APP_NAME}.apk
popd > /dev/null
#
echo
echo "Uploading ${PROJ}.tar.gz & ${APP_NAME}.apk to . . . "
pwd
scp ${PROJ}.tar.gz ${TARGET_SERVER}:~/incoming
scp ${APP_NAME}.apk ${TARGET_SERVER}:~/incoming
#
popd > /dev/null
#
echo
echo "Reply from ${TARGET_SERVER} :: Installing . . . "
ssh -t ${TARGET_SERVER} "sudo -u meteor /home/meteor/installProj.sh ${PROJ} ${APP_NAME}"
#
echo
echo
echo "Reply from ${TARGET_SERVER} :: Fixing modules . . . "
ssh -t ${TARGET_SERVER} "sudo -u root /home/meteor/fixRunEnv.sh"
#
echo
echo
echo "Reply from ${TARGET_SERVER} :: Restarting . . . "
ssh -t ${TARGET_SERVER} "sudo -u root /home/meteor/restartMeteor.sh"
#
