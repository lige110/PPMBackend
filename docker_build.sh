./gradlew build

docker build -t ligedocker110/ppmbackend .

docker login -u ligedocker110 -p dckr_pat_m0MjjUp1PjngZZWWdcpjsWYhDQc

docker push ligedocker110/ppmbackend:latest