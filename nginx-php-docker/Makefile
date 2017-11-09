
all: Dockerfile
	sudo docker build -t citywatch-imageuploader .

clean:
	sudo docker rmi -f citywatch-imageuploader

run:
	sudo docker run -d -p 80:80 --name imageserver citywatch-imageuploader

logs:
	sudo docker logs -f imageserver