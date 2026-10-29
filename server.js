
const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");

const routes = {
  "/": "home.html",
  "/home": "home.html",
  "/about": "about.html",
  "/contact": "contact.html"
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/style.css") {
    const cssPath = path.join(publicDir, "style.css");

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Internal Server Error");
      }

      res.writeHead(200, {
        "Content-Type": "text/css; charset=utf-8"
      });
      res.end(data);
    });

    return;
  }

  const filename = routes[pathname];

  if (!filename) {
    return fs.readFile(
      path.join(publicDir, "404.html"),
      (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end("404 - Page Not Found");
        }

        res.writeHead(404, {
          "Content-Type": "text/html; charset=utf-8"
        });
        res.end(data);
      }
    );
  }

  fs.readFile(path.join(publicDir, filename), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Internal Server Error");
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
