# NODE-TESTING

Simple Node.js API to demonstrate the implementation of unit and integration testing.
It just contains some routes related to `/users` which are enough to do the intended 
implementation of the testing strategy.

### Initial config 

```
DB_URI=mongodb://mongo:27017/
DB_NAME=api-testing
SECRET_TOKEN=3{5j*%Y*g7&G@qgr
```

### Run

```
$ docker-compose up -d
```

### Lint

```
$ docker-compose --file docker-compose.ci.yml run --rm api bin/lint
```

### Unit tests

The intention of the unit tests is to test each of the components individually.
If there is another component involved in a specific process, then a double is
set up in order to keep the focus on the component being tested. An in memory
MongoDB instance is used to simulate the interaction with the DB when needed.

```bash
# run all unit test
$ docker-compose -f docker-compose.ci.yml run --rm api bin/unit
# run specific group of tests
$ docker-compose -f docker-compose.ci.yml run --rm api bin/unit path/to/files/ # e.g.: __tests__/unit/models/
# run tests matching a pattern
$ docker-compose -f docker-compose.ci.yml run --rm api bin/unit -g "test-description" # e.g.: "Save"
```

### Integration tests

The intention of the integration tests is to interact with the API to determine
that the flows are working as expected.
The integration of the different components involved is tested during this type
of tests, therefore the API is tested as an entire service, with real http 
requests as it would work in staging or production. 
Also a real Mongo DB instance is used.

```bash
# start mongo
$ docker-compose -f docker-compose.ci.yml up -d mongo
$ docker-compose -f docker-compose.ci.yml up -d api
# run all tests
$ docker-compose -f docker-compose.ci.yml run --rm api bin/integration
# run specific group of tests
$ docker-compose -f docker-compose.ci.yml run --rm api bin/integration path/to/files/ # e.g.: __tests__/integration/general/
# run tests matching a pattern
$ docker-compose -f docker-compose.ci.yml run --rm api bin/integration -g "test-description" # e.g.: "/health"
```
