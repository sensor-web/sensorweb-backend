# Restful APIs
## Add a new sensor for a program.

## Get sensor list by coordinates and `programId`.
```
[
  {
    "sensorId": "xxxxxx",
    "name": "pm2.5",
    "description": "It is about air quality",
    "address": "台北市信義區信義路五段106號",
    "coordinate": "120.982025, 23.973875",
    "latestUpdate": {
      "datetime": "2013-08-25T17:10:00+00:00",
      "pm25": 11
    }
  },
  {
    "sensorId": "xxxxxx",
    "name": "pm2.5",
    "description": "It is about air quality",
    "address": "台北市信義區信義路五段106號",
    "coordinate": "120.982025, 23.973875",
    "currentState": {
      "pm25": 11
    }
  }
]
```

## Push specific sensor's data
Used by maker's device.

## Get specific sensor's mata data.
For MVP, we might not need to implement this.
```
{
  "name": "pm2.5",
  "description": "It is about air quality",
  "address": "台北市信義區信義路五段106號",
  "coordinate": "120.982025, 23.973875",
  "currentState": {
    "pm25": 11
  }
}
```

## Get specific sensor's raw data.
For MVP, we might not need to implement this.
```
[
  {
    "datetime": "2013-08-25T17:10:00+00:00",
    "pm25": 11
  },
  {
    "datetime": "2013-08-25T17:09:00+00:00",
    "pm25": 13
  },
  {
    "datetime": "2013-08-25T17:08:00+00:00",
    "pm25": 12
  }
]
```

# Data Schema
## Users
```
{
  "id": "xxxxxx",
  "name": "Evan Xd",
  "email": "evan@tseng.io",
  "accessToken": "xxxxxxxxxxxxxxxx"
}
```

## Sensors
```
{
  "programId": "xxxxxx",
  "sensorId": "xxxxxx",
  "userId": "xxxxxx",
  "name": "pm2.5",
  "description": "It is about air quality.",
  "coordinate": "120.982025, 23.973875"
}
```

## Sensor Data
The table name is `sensorId`.
```
{
  "datetime": "2013-08-25T17:00:00+00:00",
  "value1": 11,
  "value2": false
}
```

## Programs
```
{
  "id": "xxxxxx",
  "name": "Air Quality",
  "description": "It is about air quality."
  "dataFormat": {
    "value1": "Number",
    "value2": "Boolean"
  }
}
```
