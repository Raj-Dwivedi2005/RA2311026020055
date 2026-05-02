const axios = require("axios");
const Log = require("../logging_middleware/logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzI3NSwiaWF0IjoxNzc3NzAyMzc1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGE4M2Y0ZTAtN2U2ZS00ZjU4LWJkOTItOGZjMWUwNmQ0YTE0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFqX2R3aXZlZGkiLCJzdWIiOiJiM2MxMzNmNS1jMGUwLTQxZjQtODg1NC1lM2M4MjMyZDgyOWUifSwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJyYWpfZHdpdmVkaSIsInJvbGxObyI6InJhMjMxMTAyNjAyMDA1NSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImIzYzEzM2Y1LWMwZTAtNDFmNC04ODU0LWUzYzgyMzJkODI5ZSIsImNsaWVudFNlY3JldCI6ImFRVmZNRGVXeFhEUENueFUifQ.r3ovLMX5v8WOHhcZN0Bn0yjsDWwrYURirtKLSWIsXgg";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};


// Knapsack function
const knapsack = (vehicles, capacity) => {
  const n = vehicles.length;
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = vehicles[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(
          Impact + dp[i - 1][w - Duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
};

const main = async () => {

  
  await Log("backend", "info", "controller", "Starting scheduler");

  try {

   
    await Log("backend", "info", "controller", "Calling Depots API"); 

    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      { headers }
    );

    
    await Log(
      "backend",
      "debug",
      "controller",
      `Fetched ${depotsRes.data.depots.length} depots`
    );


    
    await Log("backend", "info", "controller", "Calling Vehicles API"); 

    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      { headers }
    );

    await Log(
      "backend",
      "debug",
      "controller",
      `Fetched ${vehiclesRes.data.vehicles.length} vehicles`
    );


    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    for (const depot of depots) {
      const capacity = depot.MechanicHours;

      const maxImpact = knapsack(vehicles, capacity);

      
      await Log(
        "backend",
        "info",
        "service",
        `Depot ${depot.ID} max impact: ${maxImpact}`  
      );
    }

  } catch (err) {

    await Log("backend", "error", "controller", err.message); 
  }
};

main();

