export default {
    '/server/': {
      target: 'http://localhost/b2b-back/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
};
