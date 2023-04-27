import styled from 'styled-components';

export const Container = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    height: 56px;
    border: 0;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 10px;
    font-weight: 500;

    // O programa entende quando botamos '&' que está dentro do botão e nesse caso está se referindo quando o botão está desabilitado.  
    &:disabled {
        opacity: 0.5;
    }
`;