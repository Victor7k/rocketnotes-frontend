import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { api } from '../../services/api'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { Note } from '../../components/Note'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

export function Home() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName) {
        if(tagName === "all") {
            return setTagsSelected([]);
        }

        const alreadySelected = tagsSelected.includes(tagName); // Vai verificar se a tagName existe dentro da tagsSelected.
        
        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName); // Vai retornar todas as tags q são diferentes de tagName
            setTagsSelected(filteredTags); // Vai retornar todas as tags, menos as desmarcadas.
        } else {
            setTagsSelected(prevState => [ ...prevState, tagName]); // Vai selecionar várias tags por vez.
        }
    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, search]); // Quando um desses dois for mudado então este useEffect será carregado de novo. 

    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0} // Com o length vai verificar se tem algum elemento no Array. Se for igual a zero significa que não tem nada dentro dele.
                    />
                </li>
                { // Se existe tags então vai fazer o map.
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)} 
                    /* 
                        Passa o valor atual da barra de pesquisa para o estado setSearch 
                            e, por 'search' ser uma das dependências do useEffect, 
                            quando ele muda, automaticamente o conteúdo do useEffect recarrega, 
                            que faz o filtro pelas tags e pelos titulos.
                    */
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)} // Por ser um Componente dentro de uma estrutura de repetição, por padrão, ele precisa de uma Chave.
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }

                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}