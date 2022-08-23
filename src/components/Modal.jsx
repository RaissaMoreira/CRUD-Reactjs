import { useState } from "react";
import {
  Modal,
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {validEmail, validString, validName} from '../validation/validate';

// styles
const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    maxWidth: "600px",
    width: "90%",
    padding: "25px",

    '& > p': {
      color: '#009ADF',
      backgroundColor: '#94dbfc',
      padding: '10px',
      fontSize: '20px',
      fontWeight: '500',
      marginBottom: '20px'
    },

    '& input': {
      color: '#666666',
      marginBottom: '5px'
    },
  },

  buttons: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    gap: '20px',
    justifyContent:"center",
  }
});

const NewModal = ({ open, handleClose, data, setData, initialValues }) => {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState(initialValues);

  const [error, setError] = useState({
    name: "",
    email: "",
    date: "",
    city: "",
    cep: "",
    street: "",
    number: "",
  });

  const checkCEP = (e) => {
    const cep = e.target.value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then((data) => {
        setInputFields({ ...inputFields, street: data.logradouro, city: data.localidade})
    });
  }

  const handleSave = (e) => {
    e.preventDefault();

    const isInvalid = Object.values(error).some((item) => Boolean(item));

    if (!isInvalid) {
      if (Object.keys(initialValues).length) {
        data[initialValues.index] = inputFields;
      }

      const newDataArray = !Object.keys(initialValues).length
        ? [...(data ? data : []), inputFields]
        : [...(data ? data : [])];

      localStorage.setItem("patient", JSON.stringify(newDataArray));
      setData(newDataArray);
      handleClose();
    }
  };

  return (
    <Modal open={open}>
      <Paper className={classes.container}>
        <Typography align="center">
          Novo Paciente
        </Typography>
        <form onSubmit={handleSave}>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <TextField
              variant="standard"
                fullWidth
                error={Boolean(error.name)}
                helperText={error.name}
                placeholder="Nome completo"
                type="text"
                required
                value={inputFields.name || ""}
                onChange={(e) => {
                  if (!validName.test(e.target.value)) {
                    setError({ ...error, name: "Nome inváldo" });
                  } else {
                    setError({ ...error, name: "" });
                  }
                  setInputFields({
                    ...inputFields,
                    name: e.target.value
                  });
                }}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                placeholder="E-mail"
                variant="standard"
                fullWidth
                required
                error={Boolean(error.email)}
                helperText={error.email}
                value={inputFields.email || ""}
                onChange={(e) => {
                  if (data.find((item) => item.email === e.target.value)) {
                    setError({ ...error, email: "Email já cadastrado" });
                  } else if (!validEmail.test(e.target.value)) {
                    setError({ ...error, email: "Email inválido" });
                  } else {
                    setError({ ...error, email: "" });
                  }
                  setInputFields({
                    ...inputFields,
                    email: e.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
              fullWidth
              variant="standard"
                placeholder="Data de nascimento"
                required
                type="date"
                value={inputFields.date || ""}
                onChange={(e) =>
                  setInputFields({
                    ...inputFields,
                    date: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              variant="standard"
              type='text'
                placeholder="cidade"
                fullWidth
                required
                error={Boolean(error.city)}
                helperText={error.city}
                value={inputFields.city || ""}
                onChange={(e) => {
                  if (!validString.test(e.target.value)) {
                    setError({ ...error, city: "Cidade inválida" });
                  } else {
                    setError({ ...error, city: "" });
                  }

                  setInputFields({
                    ...inputFields,
                    city: e.target.value
                  })
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={Boolean(error.cep)}
                type="number"
                fullWidth
                variant="standard"
                helperText={error.cep}
                placeholder="cep"
                required
                onBlur={checkCEP}
                value={inputFields.cep || ""}
                onChange={(e) => {
                  if (Number(e.target.value.length) !== 8) {
                    setError({ ...error, cep: "CEP inválido!" });
                  } else {
                    setError({ ...error, cep: "" });
                  }

                  setInputFields({
                    ...inputFields,
                    cep: e.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="rua"
                required
                fullWidth
                variant="standard"
                error={Boolean(error.street)}
                helperText={error.street}
                value={inputFields.street || " "}
                onChange={(e) => {
                  if (!validString.test(e.target.value)) {
                    setError({ ...error, street: "Rua inválida" });
                  } else {
                    setError({ ...error, street: "" });
                  }

                  setInputFields({
                    ...inputFields,
                    street: e.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Nº"
                required
                fullWidth
                type="number"
                variant="standard"
                value={inputFields.number || ""}
                onChange={(e) =>
                  setInputFields({
                    ...inputFields,
                    number: e.target.value
                  })
                }
              />
            </Grid>
            <div className={classes.buttons}>
              <Button variant="outlined" color="error" onClick={handleClose}>cancelar</Button>
              <Button sx={{px: '30px'}} variant="contained" type="submit">Salvar</Button>
            </div>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

NewModal.defaultProps = {
  initialValues: {
    name: "",
    email: "",
    date: "",
    city: "",
    cep: "",
    street: "",
    number: "",
  },
};

export default NewModal;
