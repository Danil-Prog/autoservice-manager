#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Docker compose containers name
FRONTEND_SERVICE="frontend_service"
BACKEND_SERVICE="backend_service"
NGINX="reverse_proxy"


function status() {
    docker compose ls
}

function upgradeProject() {
    echo -e "${YELLOW}Run command git pull${NC}"
    git pull
    echo -e "${GREEN}Command 'git pull' successfully${NC}"
}

function backendBuildImage() {
    echo -e "${YELLOW}Run build backend image${NC}"

    OUTPUT=$(gradle -p backend/ jibDockerBuild)

    RESULT=$(echo "${OUTPUT}"| egrep '(BUILD SUCCESSFUL|BUILD FAILED) in')
    TIME=$(echo "${RESULT}" | cut -d ' ' -f4)

    if [[ $RESULT =~ "BUILD SUCCESSFUL" ]]; then
        echo -e "${GREEN}Backend image has been successfully assembled, time ${TIME}${NC}"
    fi
}

function frontendBuildImage() {
    echo -e "${YELLOW}Run build frontend image${NC}"
    docker build -t authoservice-manager/frontend:latest frontend/

}

# При очистке исключаем сервис базы данных
function clean() {
    echo -e "${YELLOW}Run clean docker services${NC}"

    docker stop $FRONTEND_SERVICE $BACKEND_SERVICE $NGINX

    docker compose -f docker-compose.yml -f docker-compose.prod.yml down backend --remove-orphans
    docker compose -f docker-compose.yml -f docker-compose.prod.yml down frontend --remove-orphans
    docker compose -f docker-compose.yml -f docker-compose.prod.yml down nginx --remove-orphans

    docker rmi autoservice-manager/backend
    docker rmi autoservice-manager-frontend
}

function rebuildFrontend() {
    upgradeProject

    # Останавливаем фронт, удаляем образ
    docker stop frontend_service
    docker rm frontend_service
    docker rmi autoservice-manager-frontend

    # Собираем свежий образ фронта
    frontendBuildImage

    # Собираем и запускаем
    docker compose -f docker-compose.yml -f docker-compose.prod.yml build
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

function rebuildBackend() {
  upgradeProject

  docker compose -f docker-compose.yml -f docker-compose.prod.yml down backend --remove-orphans
  docker rmi autoservice-manager/backend

  backendBuildImage

  docker compose -f docker-compose.yml -f docker-compose.prod.yml build backend
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up backend -d
}

# Запускает полный цикл обновления проекта и обновления контейнеров
function build() {
    upgradeProject

    # Запускаем остановку/очистку и удаление контейнеров
    clean

    # Собираем образы backend/frontend
    backendBuildImage
    frontendBuildImage

    # Собираем и запускаем
    docker compose -f docker-compose.yml -f docker-compose.prod.yml build
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

case $1 in
'--rebuild-front' | '-f')
  rebuildFrontend
  ;;
'--rebuild-back' | '-b')
  rebuildBackend
  ;;
'--rebuild-back-front'| '-rbf')
  build
  ;;
  *)
  status
esac