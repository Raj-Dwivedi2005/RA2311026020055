const axios = require("axios");

const Log = async (stack, level, pkg, message) => {
  try {
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTE3MSwiaWF0IjoxNzc3NzAwMjcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODdjMTNkYmYtY2VkMy00NTE0LTk0NDgtNTRlMzFkNTAzYzY4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicmFqX2R3aXZlZGkiLCJzdWIiOiJiM2MxMzNmNS1jMGUwLTQxZjQtODg1NC1lM2M4MjMyZDgyOWUifSwiZW1haWwiOiJyZDU0MzlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJyYWpfZHdpdmVkaSIsInJvbGxObyI6InJhMjMxMTAyNjAyMDA1NSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImIzYzEzM2Y1LWMwZTAtNDFmNC04ODU0LWUzYzgyMzJkODI5ZSIsImNsaWVudFNlY3JldCI6ImFRVmZNRGVXeFhEUENueFUifQ.j6dYhBrMvFnmKmnWElqwTwnltsW867YB9PYs7bf7XVk",
        },
      }
    );

     
  } catch (err) {
    console.log("Logging failed", err.message);
  }
};

module.exports = Log;