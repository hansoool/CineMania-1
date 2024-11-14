module.exports = {
  transpileDependencies: true,
  devServer: {
    server: {
      type: 'https',  // Ensure the server uses https
    },
    host: 'localhost',  // Ensure the correct host is used
    port: 8080,  // Ensure the correct port is specified
    hot: true,  // Enable Hot Module Replacement
    client: {
      webSocketURL: {
        protocol: 'ws',  // Ensure WebSocket uses secure protocol
        hostname: 'localhost',  // Localhost for dev environment
        port: 8080,  // Ensure the correct WebSocket port
      },
    },
  },devServer: {
    port: 8080,
    https: false, // Disable HTTPS for testing
    client: {
      webSocketURL: {
        protocol: 'ws', // Use 'ws' for non-secure WebSocket
        hostname: 'localhost',
        port: 8080,
      },
    },
  }
};
