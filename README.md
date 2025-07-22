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
5. **(Optional) View the HTML report:**
    ```
    npx playwright show-report
    ```
---

## Running Playwright Tests in Docker

**Note:** Because the demo app only listens on localhost inside its container, you must start it separately and the tests will connect to it using `host.docker.internal`.

1. **Start the demo app container:**
   ```
   docker run -p 3100:3100 automaticbytes/demo-app
   ```

2. **Run the Playwright tests in Docker:**
   ```
   docker compose up --build tests
   ```
   In a new console, run this command while the demo app is up and running.

3. **(Optional) View the HTML report:**
    ```
    npx playwright show-report
    ```

---

## Important Note

Before running any Docker commands, ensure that Docker Desktop (or the Docker daemon) is installed and running on your machine.
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- After installation, open Docker Desktop and wait for it to indicate that Docker is running (look for the whale icon in your system tray).