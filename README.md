# Nodejs authentication server

### Prerequisites

Project utilizes docker to spin up mongodb server, so please make sure docker is installed. Otherwise make sure mongodb is installed
locally on your machine. Don't forget about yarn or npm :)

### Installing

Install dependencies:

```
yarn install
```

Create docker volume for persistent mongodb data:

```
docker volume create dev-mongo
```

Build and run mongodb docker image:

```
docker build -t dev-mongo .
```

Run authentication server:

```
yarn dev
```

If all went well you should be able to access authentication server by visiting:

```$xslt
http://localhost:3090
```

Mongodb is listening on the port `27017`

## Running the tests

To be implemented

## Contributing

Welcome guys!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/polygrapher/nodejs-auth-server/tags). 

## Authors

* **Stephen Grider** 
* **Serhii Yehorov** 

See also the list of [contributors](https://github.com/polygrapher/nodejs-auth-server/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Stephen Grider
