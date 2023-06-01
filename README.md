# Astro with Git as CMS

Very simple experiment to test a concept:

  - There is a list of items.
  - When the items are modified (add, remove, change), these are submitted to a Vercel serverless function that makes a commit the the Github repository and triggers a redeploy.
  - There is an admin passphrase set as an environment variable for security