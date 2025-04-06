# Netlify Manual Deployment Guide

This guide provides step-by-step instructions for manually deploying the CV Creator app to Netlify using the generated deployment ZIP file.

## Deployment Steps

### 1. Prepare Your Site for Deployment

We have already prepared the deployment package for you in the archive `cv-creator-deploy.zip`. This archive contains all the necessary files to deploy your Next.js application to Netlify.

### 2. Log in to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Sign in with your account or create a new one

### 3. Manual Deployment

#### Option 1: Direct Site Upload

1. On your Netlify dashboard, click **Add new site** > **Deploy manually**
2. Drag and drop the `cv-creator-deploy.zip` file into the designated area
3. Wait for the upload and deployment to complete
4. Your site will be available at a randomly generated Netlify subdomain (e.g., `random-name.netlify.app`)

#### Option 2: GitHub Integration (Recommended for Continuous Deployment)

1. On your Netlify dashboard, click **Add new site** > **Import an existing project**
2. Select **GitHub** as your Git provider
3. Authorize Netlify to access your GitHub repositories if prompted
4. Select the `cv-creator` repository
5. Configure the build settings:
   - **Base directory**: (leave blank)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click **Deploy site**

### 4. Configure Environment Variables

After deployment, configure any necessary environment variables:

1. Go to **Site settings** > **Build & deploy** > **Environment**
2. Add the following environment variables:
   - Key: `NETLIFY_NEXT_PLUGIN_SKIP`
   - Value: `true`
3. Save your changes

### 5. Rebuild the Site

If you added environment variables after the initial deployment:

1. Go to **Deploys**
2. Click **Trigger deploy** > **Deploy site**

### 6. Configure Your Custom Domain (Optional)

1. In your Netlify dashboard, select your site
2. Go to **Domain settings**
3. Click **Add custom domain**
4. Enter your domain name and follow the instructions to set it up

## Troubleshooting

If you encounter issues with the deployment:

- Check that the Netlify build output does not show any errors
- Verify that your `netlify.toml` file is correctly configured
- Ensure the `.next` directory is included in the deployment package
- Check that the required environment variables are set correctly

## Maintenance

To update your site after making changes:

1. Rebuild your Next.js application with `npm run build`
2. Create a new deployment package
3. Deploy manually again, or if using GitHub integration, simply push changes to your repository

## Next Steps

After successful deployment:

1. Test your live site thoroughly
2. Set up a custom domain if desired
3. Configure any additional features like form handling or serverless functions
