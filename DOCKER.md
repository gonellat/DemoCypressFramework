# 🐳 Dockerized Cypress Test Runner (Fully Baked + Flexible)

This guide shows how to build and run a **fully self-contained Docker image** for your Cypress test framework. It includes:

- ✅ All your tests and configs baked into the image
- ✅ Ability to run any spec using `--spec`
- ✅ Cypress + Node + browsers pre-installed
- ✅ Test results (JSON, HTML, videos, screenshots) saved to your local machine via volumes

---

## ✅ Folder Structure (Expected)

```
DemoCypressFramework/
├── cypress/
│   ├── e2e/
│   ├── reports/
│   ├── screenshots/
│   └── videos/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── cypress.config.js
└── multi-reporter-config.json
```

---

## 🛠️ Step 1: Create Dockerfile

**File: `Dockerfile`**

```Dockerfile
FROM cypress/included:14.5.0

WORKDIR /e2e

COPY . .

RUN npm install --legacy-peer-deps

CMD ["npx", "cypress", "run"]
```

> ✅ Copies everything into the container
> ✅ Installs dependencies
> ✅ Runs all specs by default (but can be overridden)

---

## ⚙️ Step 2: Create `docker-compose.yml`

**File: `docker-compose.yml`**

```yaml
version: '3.9'
services:
  cypress:
    build:
      context: .
    container_name: cypress-runner
    volumes:
      - .:/e2e
      - ./cypress/reports:/e2e/cypress/reports
      - ./cypress/screenshots:/e2e/cypress/screenshots
      - ./cypress/videos:/e2e/cypress/videos
    working_dir: /e2e
    environment:
      - CYPRESS_configEnv=local
```

> ✅ Mounts your project folder so reports and videos are accessible locally

---

## 🧪 Step 3: Build the Image

```bash
docker-compose build
```

> 🛠️ Builds the image named `cypress-runner` using the Dockerfile

---

## 🚀 Step 4: Run Cypress Tests

### ✅ Run all specs:

```bash
docker-compose run cypress
```

### ✅ Run a specific spec:

```bash
docker-compose run cypress --spec cypress/e2e/tests/api/userApiTest.cy.js
```

### ✅ Run with different config/env:

```bash
docker-compose run cypress --env configEnv=stage
```

> 🔁 All options from the Cypress CLI are available here

---

## 📊 Step 5: View Reports

After the test run:

- 📂 Reports are available locally in `cypress/reports/`
- 🧾 Screenshots/videos are in their respective folders

### ✅ To generate and view the HTML report:

```bash
npm run report:full
```

> This merges `mochawesome` JSON and generates `cypress/reports/html/mochawesome.html`

---

## 📦 Optional `package.json` Scripts

```json
"scripts": {
  "docker:build": "docker-compose build",
  "docker:run": "docker-compose run cypress",
  "docker:spec": "docker-compose run cypress --spec",
  "merge:reports": "mochawesome-merge cypress/reports/json/*.json > cypress/reports/html/mochawesome.json",
  "report:open": "marge cypress/reports/html/mochawesome.json --reportDir cypress/reports/html --inline",
  "report:full": "npm run merge:reports && npm run report:open"
}
```

---

## 📁 What Gets Shared In the Image

If you want to give your image to someone else:

### ✅ Export it:

```bash
docker save cypress-runner > cypress-runner.tar
```

They can then:

```bash
docker load < cypress-runner.tar
```

Run tests:

```bash
docker run -v %cd%:/e2e cypress-runner --spec cypress/e2e/tests/api/userApiTest.cy.js
```

✅ Results will be saved in their local folder

---

## 🧠 Summary

| Task                   | Command                                                |
| ---------------------- | ------------------------------------------------------ |
| Build Docker image     | `docker-compose build`                                 |
| Run all tests          | `docker-compose run cypress`                           |
| Run specific test      | `docker-compose run cypress --spec path/to/test.cy.js` |
| Generate + view report | `npm run report:full`                                  |
| Share image            | `docker save` / `docker load`                          |

---

Let me know if you want to add a CI version of this or push it to Docker Hub! 🐳✅
