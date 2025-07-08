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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

export default function TreasureForm() {
  const [n, setN] = useState(3);
  const [m, setM] = useState(3);
  const [p, setP] = useState(3);
  const [matrix, setMatrix] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      const rows = matrix
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));

      const payload = { n, m, p, matrix: rows };

      const res = await axios.post(
        "https://localhost:5005/api/TreasureMap",
        payload
      );

      setResult(res.data.minimalFuel);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check your input or try again.");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "n", headerName: "Rows (n)", width: 120 },
    { field: "m", headerName: "Cols (m)", width: 120 },
    { field: "p", headerName: "Max Chest # (p)", width: 150 },
    { field: "minimalFuel", headerName: "Minimal Fuel", width: 150 },
  ];

  const rowsData =
    result !== null ? [{ id: 1, n, m, p, minimalFuel: result }] : [];

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Treasure Hunt Solver
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              label="Rows (n)"
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              label="Cols (m)"
              type="number"
              value={m}
              onChange={(e) => setM(Number(e.target.value))}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
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

      {rowsData.length > 0 && (
        <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Previous Solution
          </Typography>
          <DataGrid
            rows={rowsData}
            columns={columns}
            pagination
            paginationModel={{ page: 0, pageSize: 5 }}
            pageSizeOptions={[5, 10]}
            autoHeight
          />
        </Paper>
      )}
    </Box>
  );
}
