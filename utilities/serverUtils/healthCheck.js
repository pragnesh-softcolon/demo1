import database from "../../database/index.js";

function checkDatabaseConnection() {
  return database.readyState === 1;
}

export async function healthCheck() {
  const healthCheckResponse = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
    services: {
      DATABASE: "OK",
    },
  };

  if (!checkDatabaseConnection()) {
    healthCheckResponse.message = "NOT OK";
    healthCheckResponse.services.DATABASE = "NOT OK";
  }

  return healthCheckResponse;
}
