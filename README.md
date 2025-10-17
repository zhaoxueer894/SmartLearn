# SmartLearn (Minimal Runnable Framework)

This is the **minimal, incrementally extensible** foundation for SmartLearn:
- **Backend:** Spring Boot (Java 17), REST API
- **Frontend:** React + Vite (JavaScript)
- **Demo endpoints:** `/api/hello`, `/api/users/register`
- **Prepared modules:** AI (question generation / clustering), Word Cloud (collect & aggregate words)

## Run locally

### Backend
```bash
cd backend
mvn spring-boot:run
# exposes http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

Edit `frontend/src/services/api.js` to point `API_BASE` to your backend URL when deploying.

## Endpoints

- `GET /api/hello` — health/connection check.
- `POST /api/users/register` — minimal example payload `{ username, password }` (stored in-memory).
- `POST /api/ai/generateQuestion` — placeholder AI generation.
- `POST /api/ai/clusterAnswers` — placeholder clustering.
- `POST /api/wordcloud/submit` — submit a word.
- `GET /api/wordcloud/data` — get aggregated word counts.

## Deploy (suggested)

- **Backend:** Render (Java Web Service). Ensure `PORT` env is provided. Start command:
  ```bash
  mvn clean package
  java -jar target/smartlearn-platform-0.1.0.jar
  ```
- **Frontend:** Vercel (Vite). Update `API_BASE` to the deployed backend URL.

## Next steps
- Add DB (PostgreSQL/MySQL) + JPA.
- Add auth (Spring Security + JWT); attach token via Axios interceptors.
- Replace AI placeholders with real provider APIs.
- Replace WordCloud in-memory storage with DB/Redis and (optional) WebSocket for live updates.
