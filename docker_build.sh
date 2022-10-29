docker login -u ligedocker110 -p "$DOCKER_TOKEN"

docker build -t ligedocker110/ppmbackend .

docker push ligedocker110/ppmbackend:latest