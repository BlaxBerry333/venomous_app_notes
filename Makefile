DOCKER_COMPOSE_FILE_PATH_DEV = docker-compose.dev.yml
PROJECT_NAME = venomous_apps_notes
CONTAINER_NAME_NOTE_APP = notes_app
CONTAINER_NAME_NOTE_APP_DB = notes_app_db


.PHONY: setup stop-all clean-all entry


# setup all containers
setup:
	@docker-compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		up -d \


# start all containers
start-all:
	@docker-compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		start \


# stop all containers
stop-all:
	@docker-compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		stop


# stop then remove all containers、volumes、images
clean-all:
	@docker-compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		down -v
	@for service in \
		${CONTAINER_NAME_NOTE_APP} \
		${CONTAINER_NAME_NOTE_APP_DB}; do \
		if docker images -q ${PROJECT_NAME}_$$service; then \
			docker rmi ${PROJECT_NAME}_$$service; \
		fi \
	done


# entry a running specific container
# example: make entry CONTAINER=notes_app_db
entry:
	@docker exec -it ${CONTAINER} bash   
