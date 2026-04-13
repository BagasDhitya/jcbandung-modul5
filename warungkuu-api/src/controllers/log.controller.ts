// controllers/log.controller.ts
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { parseLogLine } from "../utils/logParser";

export const getLogsHtml = (req: Request, res: Response) => {
  const logPath = path.join(__dirname, "../../logs/app.log");

  if (!fs.existsSync(logPath)) {
    return res.send("<h1>No logs found</h1>");
  }

  const file = fs.readFileSync(logPath, "utf-8");
  const lines = file.split("\n").filter(Boolean);

  const logs = lines.map(parseLogLine).filter(Boolean) as any[];

  const rows = logs
    .map(
      (log) => `
      <tr>
        <td>${log.timestamp || "-"}</td>
        <td style="color:${
          log.level === "ERROR"
            ? "red"
            : log.level === "WARN"
              ? "orange"
              : "green"
        }">${log.level}</td>
        <td>${log.message || "-"}</td>
        <td>${log.method || "-"}</td>
        <td>${log.endpoint || "-"}</td>
        <td>${log.status || "-"}</td>
        <td>${log.ip || "-"}</td>
        <td>${log.duration || "-"}</td>
      </tr>
    `,
    )
    .join("");

  const html = `
    <html>
      <head>
        <title>App Logs</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; width: 100%; font-size: 14px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          h1 { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>Application Logs</h1>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Message</th>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Status</th>
              <th>IP</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;

  res.send(html);
};
