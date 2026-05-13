export const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const color =
        res.statusCode >= 500
          ? "\x1b[31m"   // red
          : res.statusCode >= 400
          ? "\x1b[33m"   // yellow
          : res.statusCode >= 300
          ? "\x1b[36m"   // cyan
          : "\x1b[32m";  // green
      console.log(
        `${color}${req.method}\x1b[0m ${req.originalUrl} ${res.statusCode} - ${duration}ms`
      );
    });
  }
  next();
};
