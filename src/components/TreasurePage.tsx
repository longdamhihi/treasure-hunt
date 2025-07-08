import React, { useEffect, useState } from "react";
import axios from "axios";
import TreasureForm from "./TreasureForm";
import TreasureHistory from "./TreasureHistory";
import { Box, Container } from "@mui/material";

export interface TreasureMap {
  id: number;
  n: number;
  m: number;
  p: number;
  minimalFuel: number;
  matrixJson: string;
}

const URL = "http://localhost:5005/api/TreasureMap";

const TreasurePage = () => {
  const [history, setHistory] = useState<TreasureMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = () => {
    setLoading(true);
    setError(null);

    axios
      .get<TreasureMap[]>(URL)
      .then((res) => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch treasure history. Check your server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <TreasureForm onSolveComplete={loadHistory} />
        <TreasureHistory rows={history} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default TreasurePage;
