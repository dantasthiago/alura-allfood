import {
	TextField,
	Button,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {
	const [nomePrato, setNomePrato] = useState("");
	const [descricao, setDescricao] = useState("");

	const [tag, setTag] = useState("");
	const [tags, setTags] = useState<ITag[]>([]);

	const [restaurante, setRestaurante] = useState("");
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	const [imagem, setImagem] = useState<File | null>(null);

	useEffect(() => {
		http
			.get<{ tags: ITag[] }>("tags/")
			.then((resposta) => setTags(resposta.data.tags));
		http
			.get<IRestaurante[]>("restaurantes/")
			.then((resposta) => setRestaurantes(resposta.data));
	}, []);

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				flexGrow: 1,
			}}
		>
			<Typography component='h1' variant='h6'>
				Formulário de Pratos
			</Typography>
			<Box component='form' sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
				<TextField
					value={nomePrato}
					onChange={(evento) => setNomePrato(evento.target.value)}
					fullWidth
					label='Nome do Prato'
					variant='standard'
					required
					margin='dense'
				/>
				<TextField
					value={descricao}
					onChange={(evento) => setDescricao(evento.target.value)}
					fullWidth
					label='Descrição do Prato'
					variant='standard'
					required
					margin='dense'
				/>

				<FormControl margin='dense' fullWidth>
					<InputLabel id='select-tag'>Tag</InputLabel>
					<Select
						labelId='select-tag'
						value={tag}
						onChange={(evento) => setTag(evento.target.value)}
					>
						{tags.map((tag) => (
							<MenuItem key={tag.id} value={tag.id}>
								{tag.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl margin='dense' fullWidth>
					<InputLabel id='select-restaurante'>Restaurante</InputLabel>
					<Select
						labelId='select-restaurante'
						value={restaurante}
						onChange={(evento) => setRestaurante(evento.target.value)}
					>
						{restaurantes.map((restaurante) => (
							<MenuItem key={restaurante.id} value={restaurante.id}>
								{restaurante.nome}
							</MenuItem>
						))}
					</Select>
				</FormControl>

					<input type="file" />

				<Button
					sx={{ marginTop: 1 }}
					type='submit'
					fullWidth
					variant='contained'
				>
					Salvar
				</Button>
			</Box>
		</Box>
	);
};

export default FormularioPrato;
