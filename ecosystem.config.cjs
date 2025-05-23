module.exports = {
  apps: [
    {
      name: "frontend",
      script: "serve -s dist --listen 3100",
      interpreter: "none",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
