# 🎓 Sinaptik Mentor Portal: UX Prototype

A **web prototype of the mentor (instructor) portal** for Sinaptik, an online learning platform for data bootcamps. It is designed around **Case Study 3: Fragmented Collaboration**, which is about helping mentors keep track of learners, AI graded work and review requests in one place instead of across many tools.

🔗 **Live prototype:** [Open the prototype](https://sinaptik-prototype.vercel.app)

## 🧩 The Problem

Mentors were juggling learner progress, AI feedback, review requests and chat across disconnected tools. That made it hard to:

* see **which learners need attention right now**
* understand the **context** behind a review request
* give **feedback in context** instead of in separate messages
* keep a clear **ownership trail** when several mentors share a cohort

## 💡 The Solution

A single **mentor command centre** where AI handles first pass grading and mentors focus on the learners who actually need them:

1. **Learner submits** work and receives instant **AI feedback**.
2. The learner either **accepts** the feedback or **requests a mentor review**.
3. The mentor sees escalations on a **triage dashboard** (Stuck / Needs review / On track).
4. The mentor opens the **learner profile**, reviews the activity timeline, and grades with **in context comments and @mentions**.
5. The request is **resolved**, the learner's status updates, and the learner is notified.

## 👩‍🎨 My Role

Team prototype, where I contributed most of the commits. My focus was **UX/UI design, design analysis and frontend prototyping**:

* 🧭 **User flows**: mapped the learner AI grading flow and the mentor resolution flow ([user flow doc](docs/user-flow.md))
* 📋 **Page specification**: defined the purpose, layout and components of all nine pages ([page spec](docs/prototype-pages-spec.md))
* 🎨 **Figma alignment review**: compared Figma mockups against the spec and the build, and logged every gap and decision
* 📊 **Dashboard & KPI design**: defined completion rate, average score, charts and the triage board formulas ([dashboard formulas](docs/dashboard-formulas.md))
* ⚡ **Vibe coded prototype**: built the pages with AI pair programming, then refined the dashboard flow, tasks page, learner profile charts, activity logs, chat box and AI marking panel
* 🌏 **Localisation**: added **Bahasa Indonesia** alongside English
* 📱 **Mobile adaptation**: deployed a mobile friendly web version and wrote a mobile app UI change plan ([mobile UI plan](docs/mobile-ui-changes-vi.md))

## ✨ Key Screens

| Screen | What it does |
| --- | --- |
| **Dashboard** | KPI cards, engagement and score charts, and a Kanban style learner triage board |
| **Tasks** | Calendar plus a grouped work queue of submissions and review requests |
| **Learners** | Searchable roster with module, status, score and drop off risk |
| **Learner Profile** | Enrolment, risk, metrics, learning snapshot and activity timeline |
| **Marking** | Grading with an **AI marking suggestions** panel and in context comments |
| **Requested Review** | Handles learner escalations from AI feedback |
| **Inbox** | Unified notifications, filtered by mentor requests and assignment submissions |
| **Chat** | Mentor to learner messaging, opened from the header |
| **Course Catalog** | Sinaptik programs grouped by field, with the active cohort highlighted |

## 🛠️ Tech Stack

`React 19` `TypeScript` `Vite` `Tailwind CSS` `React Router 7` `Vercel`

Design and analysis: `Figma` `User Flows` `Page Specs` `KPI Definitions` `i18n (EN / ID)`

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Project Structure

```text
docs/                    # Product & technical documentation
public/                  # Static assets (logo, etc.)
src/
  components/
    layout/              # App shell: sidebar, header, back button
    charts/              # Chart components
    ...                  # Shared UI components
  context/               # React context (app state, i18n, sidebar)
  data/                  # Mock data, catalogs, quiz payloads
  i18n/                  # EN / ID translations
  pages/
    mentor/              # All mentor portal pages
  types/                 # TypeScript interfaces
  utils/                 # Helpers (dashboard, navigation, etc.)
```

## 📄 Documentation

| File | Description |
| --- | --- |
| [Page specification](docs/prototype-pages-spec.md) | Page specs, Figma alignment, routes |
| [User flows](docs/user-flow.md) | End to end user flows |
| [Page components](docs/page-components.md) | UI component breakdown per page |
| [Dashboard formulas](docs/dashboard-formulas.md) | KPI and board calculation formulas |
| [Backend and frontend contract](docs/backend-fe-contract.md) | Database schema, API map, mentor workflow |
| [Mobile UI changes](docs/mobile-ui-changes-vi.md) | Mobile app UI change plan (Vietnamese) |

## 🗺️ Routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/tasks` | Tasks (calendar + work queue) |
| `/learners` | Learner roster |
| `/learners/:learnerId` | Learner profile |
| `/notifications` | Inbox |
| `/programs` | Course catalog |
| `/marking/:submissionId` | Grading |
| `/review/:requestId` | Review escalation |
| `/chat`, `/chat/:learnerId` | Chat |

Legacy `/mentor/*` URLs redirect to the routes above.

## 🌏 Languages

English (EN) and Bahasa Indonesia (ID), switchable from the header.

## 👥 Team

Built as a team prototype for Sinaptik's mentor program. Original repository by [cassievg](https://github.com/cassievg/sinaptik_prototype), with contributions from [ElsaNgoc](https://github.com/ElsaNgoc) and teammates.

**Elsa Ngoc Dang**: UX/UI design, design analysis and frontend prototyping · [LinkedIn](https://www.linkedin.com/in/ha-bao-ngoc-dang/)
