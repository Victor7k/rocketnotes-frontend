import { Container } from "./styles";

// icon: Icon Vai converter a propriedade icon num Componente.
export function Input({ icon: Icon, ...rest }) { // O 'rest' vai servir pra passar todas as propriedades restantes pro input.
    return( // {Icon && <Icon size={20} />} Só vai mostrar o icone caso ele existir.
        <Container>
            {Icon && <Icon size={20} />}
            <input {...rest} />
        </Container>
    )
}