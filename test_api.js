const axios = require("axios");


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzI3NSwiaWF0IjoxNzc3NzAyMzc1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGE4M2Y0ZTAtN2U2ZS00ZjU4LWJkOTItOGZjMWUwNmQ0YTE0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFqX2R3aXZlZGkiLCJzdWIiOiJiM2MxMzNmNS1jMGUwLTQxZjQtODg1NC1lM2M4MjMyZDgyOWUifSwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJyYWpfZHdpdmVkaSIsInJvbGxObyI6InJhMjMxMTAyNjAyMDA1NSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImIzYzEzM2Y1LWMwZTAtNDFmNC04ODU0LWUzYzgyMzJkODI5ZSIsImNsaWVudFNlY3JldCI6ImFRVmZNRGVXeFhEUENueFUifQ.r3ovLMX5v8WOHhcZN0Bn0yjsDWwrYURirtKLSWIsXgg";

axios.get("http://20.207.122.201/evaluation-service/depots", {
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
})
.then(res => {
  console.log("SUCCESS:", res.data);
})
.catch(err => {
  console.log("ERROR:", err.message);
});