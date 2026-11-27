# infra

Local development infrastructure, run with Docker Compose.

## Decisions

| Decision                                                | Status    | Rationale                                                                                                  |
| ------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| MySQL 9.7 LTS (`mysql:9.7`) as the development database | APPROVED  | Current MySQL LTS line; pinned to the minor line instead of the moving `lts` tag so upgrades are explicit. |
| Adminer 6 (`adminer:6`) as the local database UI        | APPROVED  | Single lightweight container, no extra setup. Development only.                                            |
| Ports bound to `127.0.0.1`                              | APPROVED  | Services are not reachable from other machines on the network.                                             |
| Production / VPS deployment                             | UNDECIDED | `compose.yaml` here is for local development only.                                                         |

## Usage

Run from the repository root.

```sh
cp infra/.env.example infra/.env   # then change the passwords
docker compose -f infra/compose.yaml --env-file infra/.env up -d
docker compose -f infra/compose.yaml --env-file infra/.env ps
docker compose -f infra/compose.yaml --env-file infra/.env down
```

- MySQL: `127.0.0.1:3306` (`MYSQL_PORT`), database and user from `infra/.env`.
- Adminer: http://127.0.0.1:8080 (`ADMINER_PORT`). Server `mysql`, then the user and password from `infra/.env`.

Data persists in the `my-road-dev_mysql-data` volume. `down -v` deletes it.
