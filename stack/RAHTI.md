# Deploying STACK on CSC Rahti

The ElectroMAG frontend remains on Vercel. Rahti runs only the STACK API and its private GoMaxima service.

## Deploy through the Rahti web console

1. Open the `electromag` project in the Rahti console.
2. Select the plus icon in the top navigation and choose **Import YAML**.
3. Paste the complete contents of `stack/rahti.yaml` into the editor.
4. Select **Create**.
5. Open **Workloads > Pods** and wait until both `maxima` and `stack-api` show `Running` and `Ready`.
6. Open **Networking > Routes** and copy the HTTPS location for `stack-api`.

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

