# Deploying STACK on CSC Rahti

The ElectroMAG frontend remains on Vercel. Rahti runs only the STACK API and its private GoMaxima service. GoMaxima uses a small compatibility build so its documented non-root mode works with Rahti's high container user IDs.

## Build the Rahti-compatible GoMaxima image

Import `stack/rahti-build.yaml` through the Rahti web console before importing the application manifest. This creates an internal ImageStream and a BuildConfig. The initial build starts automatically and publishes `goemaxima-rahti:2026042200` inside the `electromag` project.

Wait for **Builds > Builds > goemaxima-rahti-1** to show `Complete` before deploying or updating the Maxima Deployment.

## Deploy through the Rahti web console

1. Open the `electromag` project in the Rahti console.
2. Confirm that the Rahti-compatible GoMaxima build is complete.
3. Select the plus icon in the top navigation and choose **Import YAML**.
4. Paste the complete contents of `stack/rahti.yaml` into the editor.
5. Select **Create**.
6. Open **Workloads > Pods** and wait until both `maxima` and `stack-api` show `Running` and `Ready`.
7. Open **Networking > Routes** and copy the HTTPS location for `stack-api`.

## Deploy with the command line

After logging in with the `oc` command shown by **Copy login command** in Rahti:

```bash
oc project electromag
oc apply -f stack/rahti.yaml
oc rollout status deployment/maxima
oc rollout status deployment/stack-api
oc get route stack-api -o jsonpath='https://{.spec.host}{"\n"}'
```

## Connect Vercel

Add the route URL to the ElectroMAG Vercel project:

```text
VITE_STACK_API_URL=https://the-route-host-from-rahti
```

Apply it to Production and Preview, then redeploy the latest Vercel deployment. Vite reads this variable during the build, so a redeployment is required.

## Verify the backend

The API accepts grading requests only through `POST /grade`. Opening `/grade` directly in a browser does not test it. After Vercel is redeployed, submit a machine-gradable practice answer and confirm that the result displays `STACK assessed`.

For operational checks:

```bash
oc get pods,services,routes
oc logs deployment/maxima --tail=100
oc logs deployment/stack-api --tail=100
```

GoMaxima has no public Route. It is reachable only inside the Rahti project through the `maxima` service.
