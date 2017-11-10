#!/bin/bash

CATEGORY[0]="Pothole"
CATEGORY[1]="StreetLamp"
CATEGORY[2]="WaterSupply"
TITLE="New ISsue found"
INPUT_FILE=$1
ELK_HOST=$2
CITY=$3
while IFS='' read -r line || [[ -n "$line" ]]; do
    echo "Text read from file: $line >>>>>>>>>>>>>>>>>>>> Random number is $RANDOM_NUM"
	RANDOM_INDEX=`expr $RANDOM % 3`
	FINAL_CATEGORY="${CATEGORY[$RANDOM_INDEX]}"
	FINAL_TIMESTAMP=$(( 1510250029026 - $RANDOM * 1000))
curl -XPOST http://$ELK_HOST:9200/$CITY/issue/$FINAL_TIMESTAMP -H 'Content-Type: application/json' -d "{\"title\":\"New Issue found \",\"category\":\"$FINAL_CATEGORY\",\"CreationTimeStamp\": $FINAL_TIMESTAMP,\"geoLocation\":\"$line\",\"imageUrl\":\"no oper\", \"userName\":\"myname\", \"status\":\"reported\"}"
done < $INPUT_FILE
