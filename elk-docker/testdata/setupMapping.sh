#!/bin/bash

for i in {30..0}; do
    if curl http://127.0.0.1:9200; then
	curl -XPUT "http://127.0.0.1:9200/bangalore"
	curl -XPUT "http://127.0.0.1:9200/bangalore/issue/_mapping" -H 'Content-Type: application/json' -d'
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
            break;
    fi
    sleep 2
done
