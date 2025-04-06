# Deployment Guide for CV Creator

This guide explains how to deploy the CV Creator app to Netlify.

## Manual Deployment via Netlify UI

1. **Log in to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Sign in with your account

2. **Create a New Site**
   - Click on "Add new site" > "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your GitHub account and authorize Netlify if needed
   - Find and select the `cv-creator` repository

3. **Configure Deployment Settings**
   - Leave the default settings, or adjust as follows:
     - **Owner**: Your Netlify team
     - **Branch to deploy**: `main`
     - **Base directory**: (leave blank)
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click "Deploy site"

4. **Environment Settings**
   - After initial deployment, go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     - `NETLIFY_NEXT_PLUGIN_SKIP`: `true`

5. **Monitor Deployment**
   - Netlify will automatically build and deploy your site
   - You can monitor the build process in the "Deploys" tab

## Continuous Deployment

Netlify will automatically deploy new versions when you push changes to the main branch of your GitHub repository.

## Custom Domain (Optional)

To set up a custom domain:

1. Go to your site's dashboard
2. Click on "Domain settings"
3. Click on "Add custom domain"
4. Follow the instructions to add and verify your domain

## Troubleshooting

If you encounter issues with the deployment:

1. Check the build logs in the "Deploys" section
2. Ensure your project builds correctly locally with `npm run build`
3. Verify the Netlify configuration in the `netlify.toml` file
4. Make sure the `@netlify/plugin-nextjs` package is installed

For more help, refer to [Netlify's documentation for Next.js](https://docs.netlify.com/integrations/frameworks/next-js/).
