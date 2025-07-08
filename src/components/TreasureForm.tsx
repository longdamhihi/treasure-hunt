import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import axios from "axios";

interface TreasureFormProps {
  onSolveComplete: () => void;
}

const URL = "http://localhost:5005/api/TreasureMap";

export default function TreasureForm({ onSolveComplete }: TreasureFormProps) {
  const [n, setN] = useState(3);
  const [m, setM] = useState(3);
  const [p, setP] = useState(3);
  const [matrix, setMatrix] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);

      if (n < 1 || n > 500) {
        setError("Rows (n) must be between 1 and 500.");
        return;
      }
      if (m < 1 || m > 500) {
        setError("Columns (m) must be between 1 and 500.");
        return;
      }
      if (p < 1 || p > n * m) {
        setError(`Max chest # (p) must be between 1 and ${n * m}.`);
        return;
      }

      const rows = matrix
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));

      if (rows.length !== n) {
        setError(`Matrix must have exactly ${n} rows.`);
        return;
      }

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].length !== m) {
          setError(`Row ${i + 1} must have exactly ${m} numbers.`);
          return;
        }
        for (let j = 0; j < rows[i].length; j++) {
          const val = rows[i][j];
          if (!Number.isInteger(val) || val < 1 || val > p) {
            setError(
              `Invalid value at row ${i + 1}, column ${
                j + 1
              }. Must be an integer between 1 and ${p}.`
            );
            return;
          }
        }
      }

      const payload = { n, m, p, matrix: rows };

      const res = await axios.post(URL, payload);

      setResult(res.data.minimalFuel);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check your input or try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontFamily: "'Pirata One', cursive" }}
        >
          Treasure Hunt Solver
        </Typography>

        <Divider sx={{ my: 2, borderColor: "goldenrod" }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Rows (n)"
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Cols (m)"
              type="number"
              value={m}
              onChange={(e) => setM(Number(e.target.value))}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Max Chest # (p)"
              type="number"
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Matrix (space-separated rows)"
              multiline
              rows={n}
              value={matrix}
              onChange={(e) => setMatrix(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ minWidth: 150 }}
            >
              Solve
            </Button>
          </Grid>

          {error && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {result !== null && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="success" sx={{ mt: 2 }}>
                Minimal Fuel Required: <strong>{result}</strong>
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
