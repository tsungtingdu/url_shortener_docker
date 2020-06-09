const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    info: {
      title: `TD's URL Shortener API Doc`
    },
    host: process.env.HOST || 'localhost:3000',
    explorer: true,
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    }
  },
  apis: ['./swagger/doc/*.js']
}

const swaggerSpec = swaggerJsDoc(options)

const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => true
        }
      }
    }
  }
}

const DisableAuthorizePlugin = function () {
  return {
    wrapComponents: {
      // authorizeBtn: () => () => false
    }
  }
}

const DisableTopbarPlugin = function () {
  return {
    wrapComponents: {
      Topbar: () => () => false
    }
  }
}

const swaggerOptions = {
  swaggerOptions: {
    plugins: [
      DisableTryItOutPlugin,
      DisableAuthorizePlugin,
      DisableTopbarPlugin
    ]
  }
}

module.exports = app => {
  app.use('/apiDoc', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions))
}