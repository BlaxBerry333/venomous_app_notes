# Venomous Apps's Notes App

|                 | Main Skills                                                                                                          |     Topic      |  Port   |
| :-------------: | -------------------------------------------------------------------------------------------------------------------- | :------------: | :-----: |
|  Notes App SSR  | [![My Skills](https://skillicons.dev/icons?i=docker,nuxt,vue,vuetify&perline=4&theme=light)](https://skillicons.dev) | SSR + REST API | `3600`  |
|  Notes App DB   | [![My Skills](https://skillicons.dev/icons?i=docker,mongodb&perline=4)](https://skillicons.dev)                      |       DB       | `27017` |
| MongoDB Express | [![My Skills](https://skillicons.dev/icons?i=docker,mongodb&perline=4)](https://skillicons.dev)                      |       DB       | `3680`  |

## 🚀 Local Setup

```shell
% cd venomous_app_notes

# setup all containers
% make setup

# start all containers & start client server
% make start-all
```

## 🛠 Commands

```shell
# Containers
% make setup                        # setup all containers
% make build                        # build images of all containers
% make start-all                    # start all containers & start client server
% make stop-all                     # stop all containers
% make clean-all                    # stop then remove all containers、volumes、images
% make entry [CONTAINER_NAME]       # entry a specify container
% make restart [CONTAINER_NAME] # restart a specific container

# Server
% npm run start:[mode] [--force]
% npm run build:[mode]

# Test & Lint
% npm run check-all
% npm run check-eslint
% npm run check-prettier
% npm run check-packages
% npm run format-all
% npm run eslint
% npm run prettier
```

## 📂 Project Structure

```shell
venomous_app_notes/
├── .nuxt/
│
├── public/
│
├── assets/
│   ├── images/
│   └── ...
│
├── components/
│   ├── common/
│   ├── custom/
│   └── ...
│
├── layouts/
│
├── pages/
│   ├── [route_name]/
│   │   ├── [sub_route_name].vue
│   │   └── index.vue
│   ├── index.vue
│   └── ...
│
├── server
│   ├── api/
│   ├── middleware/
│   ├── models/
│   ├── plugins/
│   │
│   ├── tsconfig.json
│   └── ...
│
├── plugins/
│   ├── vuetify.ts
│   └── ...
│
├── locals/
│   ├── [i18n_lang_code].json
│   └── ...
│
├── utils/
│   └── ...
│
├── Dockerfile.dev
│
├── .env.[env_name]
├── .depcheckrc
├── .prettierrc
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── nuxt.config.ts
│
└── ...
```

## 🤔 Questions

> `command not found: docker-compose`

```diff
- % docker-compose --version
+ % docker compose version
Docker Compose version v2.31.0-desktop.2
```
