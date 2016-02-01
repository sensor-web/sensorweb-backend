# Todo for SensorWeb Portal

## Draft for SensorWeb Portal
![Portal Draft](todo/portal-draft.jpg)

## Tasks
### Restful APIs
* Add a new sensor for a profile.

* Get sensor list by coordinates and `profileId`.
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

* Push specific sensor's data (used by maker's device).

* Get specific sensor's mata data. For MVP, we might not need to implement this.
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

* Get specific sensor's raw data. For MVP, we might not need to implement this.
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

### Data Schema
#### Users
```
{
  "id": "xxxxxx",
  "name": "Evan Xd",
  "email": "evan@tseng.io",
  "accessToken": "xxxxxxxxxxxxxxxx"
}
```

#### Sensors
```
{
  "profileId": "xxxxxx",
  "sensorId": "xxxxxx",
  "userId": "xxxxxx",
  "name": "pm2.5",
  "description": "It is about air quality.",
  "coordinate": "120.982025, 23.973875"
}
```

#### Sensor Data
The table name is `deviceId`.
```
{
  "datetime": "2013-08-25T17:00:00+00:00",
  "value1": 11,
  "value2": false
}
```

#### Profiles
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

### Webpages
1. Landing page (hardcode)
2. Programs page (can add a new program)
3. Programs info page (google login)
4. Setup a sensor page (use restful API 1)
5. Sensor list page (use restful API 2)
6. Profile list page (hardcode)
7. Sensor map page (use restful API 4)
8. Sensor's raw data page (use restful API 5)

### Features
1. L10N
