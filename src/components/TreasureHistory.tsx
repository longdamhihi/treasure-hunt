import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Typography,
  Paper,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

interface TreasureMap {
  id: number;
  n: number;
  m: number;
  p: number;
  minimalFuel: number;
  matrixJson: string;
}

const TreasureHistory = () => {
  const [rows, setRows] = useState<TreasureMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<TreasureMap[]>("http://localhost:5005/api/TreasureMap")
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch treasure history. Check your server.");
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "n", headerName: "Rows (n)", width: 100 },
    { field: "m", headerName: "Cols (m)", width: 100 },
    { field: "p", headerName: "Max Chest # (p)", width: 160 },
    {
      field: "minimalFuel",
      headerName: "Minimal Fuel",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "matrixJson",
      headerName: "Matrix",
      width: 400,
      renderCell: (params) => (
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.8rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontFamily: "'Pirata One', cursive" }}
        >
          Treasure Hunt History
        </Typography>

        <Divider sx={{ my: 2, borderColor: "goldenrod" }} />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .MuiDataGrid-root": {
                backgroundColor: "#1f2d3a",
                borderRadius: 2,
                border: "1px solid goldenrod",
              },
              "& .MuiDataGrid-cell": {
                color: "#fef3c7",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#2a3e52",
                color: "#FFD700",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#2a3e52",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              paginationModel={{ page: 0, pageSize: 5 }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TreasureHistory;
