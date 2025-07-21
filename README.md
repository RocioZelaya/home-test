# Home Test Project

## Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Git**: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Node.js** (v18 or higher) and **npm**: [Install Node.js](https://nodejs.org/)


### Clone the Repository

```
git clone <https://github.com/RocioZelaya/home-test.git>
cd home-test-main
```

## Manual Local Setup


1. **Install dependencies:**
   ```
   npm install
   ```
2. **Install Playwright browsers:**
   ```
   npx playwright install
   ```
3. **Start the demo app:**
   ```
   docker run -p 3100:3100 automaticbytes/demo-app
   ```
4. **Run the tests:**
   ```
   npx playwright test
   ```
   or
   ```
   npx playwright test --ui
   ```

---

## Running Playwright Tests in Docker


1. **Build the Docker image(optional):**
   ```
   docker build -t home-test-playwright .
   ```
2. **Run the tests:**
   ```
   docker compose up --build --abort-on-container-exit
   ```
3. **(Optional) View the HTML report:**
    To view the HTML report, navigate to the localhost directory mentioned in the console once the tests finish running.

---
