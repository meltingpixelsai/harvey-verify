module.exports = {
  apps: [
    {
      name: "harvey-verify",
      script: "dist/index.js",
      cwd: "/home/deploy/projects/harvey-verify",
      node_args: "--enable-source-maps",
      env: {
        NODE_ENV: "production",
        PORT: 8404,
      },
      max_memory_restart: "256M",
      autorestart: true,
      watch: false,
    },
  ],
};
