import { useState, useEffect } from "react"
import { Container, Links, Content } from "./styles"
import { useParams, useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState(null); // o useState para criar um estado para armazenar as informações da nota.

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1); // Vai fazer com que volte no histórico de navegação, voltando a página.
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  // O useEffect será utilizado para buscar pelos parâmetros e notas quando a interface for carregada.
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  return (
    <Container>
      <Header />

      { // Vai exibir o main se de fato existir conteúdo.
        data &&
        <main>
          <Content>
            <ButtonText 
              title="Excluir nota"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>
            
            <p>
              {data.description}
            </p>

            { // Só vai exibir caso tenha links pra renderizar.
              data.links &&
              <Section title="Links úteis">
                <Links>
                  { // Se existir links então vai percorrer cada um deles.
                    data.links.map(link => (
                      <li key={link.id}>
                        <a href={String(link.url)} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)}
                      title={tag.name} 
                    />
                  ))
                }
              </Section>
            }

            <Button 
              title="Voltar" 
              onClick={handleBack} 
            />
          </Content>
        </main>
      }
    </Container>
  )
}