DOCKER_COMPOSE_FILE_PATH_DEV = docker-compose.dev.yml
PROJECT_NAME = venomous_apps_notes_app
IMAGE_NAME_SUFFIX_SSR = ssr


.PHONY: setup build start-all stop-all clean-all entry restart


# setup all containers
setup:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		up -d \


# build images of all containers 
build:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		build \


# start all containers & start client server
start-all:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		start
	@npm run start:dev --force \


# stop all containers
stop-all:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		stop


# stop then remove all containers、volumes、images
clean-all:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		down -v
	@for service in \
		${IMAGE_NAME_SUFFIX_SSR}; do \
		if docker images -q ${PROJECT_NAME}_$$service; then \
			docker rmi ${PROJECT_NAME}_$$service; \
		fi \
	done


# entry a running specific container
# example: make entry CONTAINER=notes_app_db
entry:
	@docker exec -it ${CONTAINER} bash   


# restart a specific container
# example: make restart CONTAINER=admin_server
restart: 
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		restart ${CONTAINER}
