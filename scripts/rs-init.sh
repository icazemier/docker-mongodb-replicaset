#!/bin/sh

mongosh --host mongo1:27017 <<EOF
try {
  rs.status();
  print("Replica set already initialized");
} catch(e) {
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo1:27017", priority: 2 },
      { _id: 1, host: "mongo2:27017", priority: 1 },
      { _id: 2, host: "mongo3:27017", priority: 1 }
    ]
  });
  print("Replica set initialized");
}
EOF
