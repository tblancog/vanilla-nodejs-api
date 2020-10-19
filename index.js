const http = require("http");
const PORT = 3001;
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("./controllers/contactController");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.url === "/api/contacts" && req.method === "GET") {
    getContacts(req, res);
  } else if (
    req.url.match(/\/api\/contacts\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getContactById(req, res, id);
  } else if (req.url === "/api/contacts" && req.method === "POST") {
    createContact(req, res);
  } else if (
    req.url.match(/\/api\/contacts\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateContact(req, res, id);
  } else if (
    req.url.match(/\/api\/contacts\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteContact(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
