#!/bin/bash
echo "********************************************"
echo "Starting replica set initialize"
echo "********************************************"

until mongo --host mongo-rs0-1:27017 --eval "print(\"waited for connection\")"
do
    echo "********************************************"
    echo "Wait for mongo-rs0-1 to become alive"
    echo "********************************************"
    sleep 2
done

echo "********************************************"
echo "Creating replica set"
echo "********************************************"

mongo mongodb://mongo-rs0-1:27017 ./setup/replicaSet.js

echo "********************************************"
echo "Replica set created"
echo "********************************************"