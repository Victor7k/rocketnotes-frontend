import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    
    display: grid;
    grid-template-rows: 105px auto; /* Uma linha será pro Cabeçalho enquanto a outra será pro Conteúdo */
    grid-template-areas: /* Vai nomear as regiões. */
    "header"
    "content";

    > main { // O main será usado para aplicar a região do grid nele.
        grid-area: content;
        overflow-y: scroll; // Quando o conteúdo não caber mais na vertical vai aparecer uma barra para scrollar
        padding: 64px 0;
    }
`;

export const Links = styled.ul`
    list-style: none;

    > li {
        margin-top: 12px;

        a {
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`;

export const Content = styled.div`
    max-width: 550px;
    margin: 0 auto; // Vai levar todo o conteúdo pro centro da tela.

    display: flex;
    flex-direction: column;

    > button:first-child {
        align-self: end;
    }

    > h1 {
        font-size: 36px;
        font-weight: 500;
        padding-top: 64px;
    }

    > p {
        font-size: 16px;
        margin-top: 16px;
        text-align: justify; // Vai alinhar os dois lados do texto.
    }
`;