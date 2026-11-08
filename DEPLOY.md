# Deploying behind Traefik

One domain serves everything: Traefik sends `/api/*` to the Express API and all
other paths to the React app (nginx). MongoDB is only on the internal network.

1. On the server: `git clone` this repo and `cd` into it.
2. `cp .env.example .env` (the one env file for the whole project, at the repo root)
   and set `DOMAIN`, `JWT_SECRET`, `MONGO_PASSWORD`.
   `TRAEFIK_ENTRYPOINT` and `CERT_RESOLVER` default to `websecure` and `letsencrypt`;
   change them if your Traefik config uses other names. The stack creates its own
   `nirapad-web` network, so there is no Traefik network to configure (this also
   works when Traefik runs in host network mode).
3. Add a DNS A record for `nirapadcourier.sequenceit.software` pointing at the server.
4. `docker compose up -d --build`
5. Check: `https://nirapadcourier.sequenceit.software/` and `https://nirapadcourier.sequenceit.software/api/v1/health`.

Update later: `git pull && docker compose up -d --build`.
Logs: `docker compose logs -f api`.
