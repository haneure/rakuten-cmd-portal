module.exports = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (prop === "__esModule") {
        return true;
      }
      if (prop === "default") {
        return new Proxy(
          {},
          {
            get: (target, prop) => prop,
          }
        );
      }
      return prop;
    },
  }
);
