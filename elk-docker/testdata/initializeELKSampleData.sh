#!/bin/bash
ELK_HOST=$1

for city in bangalore chennai mumbai delhi
do

echo "Creating database for $city"
curl -XPUT "http://$ELK_HOST:9200/$city"

curl -XPUT "http://$ELK_HOST:9200/$city/issue/_mapping" -H 'Content-Type: application/json' -d'
{
  "issue": {
    "properties": {
        "geoLocation": {
          "type": "geo_point"
        },
        "CreationTimeStamp": {
          "type": "date",
          "format": "epoch_millis"
        },
        "CloseTimeStamp": {
          "type": "date",
          "format": "epoch_millis"
      }
    }
  }
}'
done

