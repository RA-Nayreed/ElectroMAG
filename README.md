# ElectroMAG

ElectroMAG is a rigorous, interactive learning platform for the mathematical foundations and electrostatics content in lectures L0 and L1 of Electromagnetics Engineering.

The learning loop is:

1. Understand the physical meaning.
2. Follow a fully reasoned example.
3. Predict before calculating.
4. Solve independently.
5. Receive mistake-specific feedback.
6. Demonstrate mastery through transfer problems.

## Local development

```bash
npm install
npm run dev
```

## STACK assessment

Quantitative practice uses the standalone STACK API when it is available. The question definitions are intentionally public because this project is a personal self-study tool. If the API cannot be reached, the interface keeps working with its local numerical check.

Start the official STACK API and goemaxima images:

```bash
npm run stack:up
cp .env.example .env.local
npm run dev
```

The production STACK backend runs on CSC Rahti while the frontend remains on Vercel. Follow [the Rahti deployment guide](stack/RAHTI.md), then set `VITE_STACK_API_URL` to the generated Rahti HTTPS Route in the Vercel project settings. The browser sends machine-gradable responses directly to `/grade` and displays a `STACK assessed` marker after a successful response.

## Validation

```bash
npm test
npm run build
```

## Author

RA-Nayreed <RezwanAhmad.Nayreed@student.oulu.fi>
