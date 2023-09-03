cp docker-compose.override.yml.prod docker-compose.override.yml
docker-compose up -d --build
docker exec -i nest-mongo npm install
docker exec -i nest-mongo bash -c 'npm run build'
docker exec -i nest-mongo bash -c 'npm run start:prod'
