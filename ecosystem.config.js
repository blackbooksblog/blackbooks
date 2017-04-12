module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "API",
      script    : "server.js",
      interpreter_args : '--harmony',
      env: {
        PORT: 80
      },
      env_production : {
        NODE_ENV: "development"
      }
    }
  ],

  
}
