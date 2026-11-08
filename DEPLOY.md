# Deploying behind Traefik

One domain serves everything: Traefik sends `/api/*` to the Express API and all
other paths to the React app (nginx). MongoDB is only on the internal network.

1. On the server: `git clone` this repo and `cd` into it.
2. `cp .env.example .env` and set `DOMAIN`, `JWT_SECRET`, `MONGO_PASSWORD`.
   Also set `TRAEFIK_NETWORK`, `TRAEFIK_ENTRYPOINT`, `TRAEFIK_HTTP_ENTRYPOINT` and
   `CERT_RESOLVER` to the names used in your Traefik config
   (`docker network ls` and your Traefik static config show them).
3. Point the domain's DNS A record at the server.
4. `docker compose up -d --build`
5. Check: `https://DOMAIN/` and `https://DOMAIN/api/v1/health`.

Update later: `git pull && docker compose up -d --build`.
Logs: `docker compose logs -f api`.
