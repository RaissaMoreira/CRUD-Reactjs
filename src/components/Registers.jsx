import {
  styled,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState, useEffect } from "react";
import NewModal from "./Modal";
import { makeStyles } from "@mui/styles";
import Header from "./Header";

// styles
const useStyles = makeStyles({
  body:{
    marginTop: '80px'
  },

  tableHead: {
    position: 'sticky',
    top: '0',
    width: '100%',
  }
});

const Registers = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [open, setOpen] = useState(false);

  // open-close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // localStorage
  useEffect(() => {
    const registers = localStorage.getItem("patient")
      ? JSON.parse(localStorage.getItem("patient"))
      : [];

    setData(registers);
  }, [setData]);

  // remove itens
  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);
    setData(newArray);
    localStorage.setItem("patient", JSON.stringify(newArray));
  };

  // styles
  const TableHeadCell = styled(TableCell)`
    color: white;
    font-size: 16px;
    font-weight: 600;
  `;

  return (
    <div className={classes.body}>
      <Header handleOpen={handleOpen} setDataEdit={setDataEdit} />

      <TableContainer
        component={Paper}
        variant="outline"
        sx={{ m: 1.5, width: "auto", p: '10px', height: '660px'}}
      >
        <Table>
          <TableHead
            className={classes.tableHead}
            sx={{ bgcolor: "primary.dark" }}
          >
            <TableRow>
              <TableHeadCell>Nome</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Data de nascimento</TableHeadCell>
              <TableHeadCell>Endereço</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(
              ({ name, email, date, cep, city, number, street }, index) => (
                <TableRow key={index}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>
                    {cep}, {city}, {street}, {number}
                  </TableCell>
                  <TableCell>
                    <ModeEditIcon
                      color="primary"
                      sx={{ mr: 2, cursor: "pointer" }}
                      onClick={() => {
                        setDataEdit({
                          name,
                          date,
                          email,
                          cep,
                          city,
                          number,
                          street,
                          index,
                        }),
                          handleOpen();
                      }}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRemove(email)}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <NewModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
          initialValues={dataEdit}
        />
      )}
    </div>
  );
};

export default Registers;
