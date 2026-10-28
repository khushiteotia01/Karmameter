
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Clearly labelled demo data.
// These are examples, not verified public records.
const records = [
  {
    id: "demo-001",
    title: "Sample Court Judgment",
    type: "Courts",
    description:
      "A demonstration record showing how court documents will appear.",
    sourceName: "Official source not yet added",
    sourceUrl: null,
    status: "Demo record",
  },
  {
    id: "demo-002",
    title: "Sample Government Order",
    type: "Government",
    description:
      "A demonstration record for government orders and notifications.",
    sourceName: "Official source not yet added",
    sourceUrl: null,
    status: "Demo record",
  },
  {
    id: "demo-003",
    title: "Sample Company Filing",
    type: "Companies",
    description:
      "A demonstration record for public corporate filings.",
    sourceName: "Official source not yet added",
    sourceUrl: null,
    status: "Demo record",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Karmameter backend is running!" });
});

app.get("/api/search", (req, res) => {
  const query = String(req.query.q || "").trim().toLowerCase();

  if (!query) {
    return res.json({ query, count: 0, results: [] });
  }

  const results = records.filter((record) =>
    [
      record.title,
      record.type,
      record.description,
    ].some((field) => field.toLowerCase().includes(query))
  );

  res.json({
    query,
    count: results.length,
    results,
  });
});

app.listen(5000, () => {
  console.log("Karmameter backend running on http://localhost:5000");
});
