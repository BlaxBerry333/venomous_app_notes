# Venomous Apps's Notes App

|                 | Main Skills                                                                                                  |     Topic      |  Port  |
| :-------------: | ------------------------------------------------------------------------------------------------------------ | :------------: | :----: |
|  Notes App SSR  | [![My Skills](https://skillicons.dev/icons?i=docker,nuxt,vue&perline=4&theme=light)](https://skillicons.dev) | SSR + REST API | `3600` |
|  Notes App DB   | [![My Skills](https://skillicons.dev/icons?i=docker,mongodb&perline=4&theme=light)](https://skillicons.dev)  |       DB       | `3700` |
| MongoDB Express | [![My Skills](https://skillicons.dev/icons?i=docker,mongodb&perline=4&theme=light)](https://skillicons.dev)  |       DB       | `3780` |
| Notes App Redis | [![My Skills](https://skillicons.dev/icons?i=docker,redis&perline=4&theme=light)](https://skillicons.dev)    |     Redis      | `3800` |

## 📚 Tech Stacks

- [nuxt.js]() v3
- [vue]() v3.5
- [vuetify]() v3
- [pina]() v2
- [mongoose]() v8
- [redis]() v4
- [bcryptjs]() v2
- [jsonwebtoken]() v9
- [jwt-decode]() v4
- [protobuf](https://github.com/BlaxBerry333/venomous_app_protobuf)
- ...

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

## 🔗 API

| Method | URL                | Description            |
| ------ | ------------------ | ---------------------- |
|        | notes              |                        |
| GET    | `/api/note/list`   | get all notes          |
| POST   | `/api/note/create` | create a note          |
| POST   | `/api/note/<id>`   | get a specific note    |
| PUT    | `/api/note/<id>`   | update a specific note |
| DELETE | `/api/note/<id>`   | delete a specific note |

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
│   ├── plugins/
│   ├── models/
│   ├── schemas/
│   ├── utils/
│   ├── ...
│   ├── tsconfig.json
│   └── index.ts
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
