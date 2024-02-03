import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Button from "@mui/material/Button";

function ArchivePage({ archive }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = archive.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(archive.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage + 1, totalPages));
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage - 1, 1));
  }

  const randomHeight = () => {
    return Math.floor(Math.random() * 150) + 30;
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  }));


  return (
    <Box sx={{ width: "100vw", minHeight: 393, padding: '10px' }}>
      <Masonry style={{height: "100vh"}} columns={3} spacing={2}>
        {currentItems.map((item, index) => {
          return (
            <Item key={index}>
              <img
                className="archive-tile-img"
                style={{ height: randomHeight() + 100 }}
                src={item.url}
                alt={item.name}
                loading="lazy"
              />
            </Item>
          );
        })}
      </Masonry>
      <Button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</Button>
      <Button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</Button>
    </Box>
  );
}

export default ArchivePage;
