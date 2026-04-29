import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, "data", "users.json");

function ensureDataFile() {
  if (!existsSync(dirname(dataFile))) {
    mkdirSync(dirname(dataFile), { recursive: true });
  }

  if (!existsSync(dataFile)) {
    writeFileSync(dataFile, JSON.stringify({ sellers: [] }, null, 2));
  }
}

function readUsers() {
  ensureDataFile();
  return JSON.parse(readFileSync(dataFile, "utf-8"));
}

function writeUsers(data) {
  writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });

  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/api/auth/seller/signup") {
    try {
      const body = await parseBody(request);

      if (!body.name || !body.email || !body.password) {
        sendJson(response, 400, { message: "Name, email, and password are required." });
        return;
      }

      const data = readUsers();
      const alreadyExists = data.sellers.some((seller) => seller.email === body.email);

      if (alreadyExists) {
        sendJson(response, 409, { message: "Seller already exists with this email." });
        return;
      }

      const seller = {
        id: Date.now(),
        name: body.name,
        email: body.email,
        password: body.password,
      };

      data.sellers.push(seller);
      writeUsers(data);

      sendJson(response, 201, {
        message: "Signup completed successfully.",
        seller: { id: seller.id, name: seller.name, email: seller.email },
      });
    } catch {
      sendJson(response, 500, { message: "Server error while creating seller." });
    }

    return;
  }

  if (request.method === "POST" && request.url === "/api/auth/seller/login") {
    try {
      const body = await parseBody(request);
      const data = readUsers();

      const seller = data.sellers.find(
        (item) => item.email === body.email && item.password === body.password
      );

      if (!seller) {
        sendJson(response, 401, { message: "Invalid email or password." });
        return;
      }

      sendJson(response, 200, {
        message: "Login completed successfully.",
        seller: { id: seller.id, name: seller.name, email: seller.email },
        token: `seller-token-${seller.id}`,
      });
    } catch {
      sendJson(response, 500, { message: "Server error while logging in." });
    }

    return;
  }

  sendJson(response, 404, { message: "Route not found." });
});

server.listen(4000, () => {
  console.log("Seller auth server is running on http://localhost:4000");
});
