
all: Dockerfile
	sudo docker build -t citywatchelk .

clean:
	sudo docker rmi -f citywatchelk

run:
	sudo docker run -d -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -p 5601:5601 -p 9200:9200 --name myelk citywatchelk

logs:
	sudo docker logs -f myelk