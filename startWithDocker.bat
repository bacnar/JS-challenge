docker build -t challange .
docker run --name challange  -p 8080:8080 -d challange
explorer "http://localhost:8080/docs"