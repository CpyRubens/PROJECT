import * as S from "./style";
import logo from 'assets/imgs/logo.png';
import { ButtonLarge } from "components/ButtonLarge/style";

import { HtmlHTMLAttributes, useState } from "react";

type BoxLoginType = HtmlHTMLAttributes<HTMLDivElement>

export type BoxLoginProps = {
    onSubmitData: (data: { nickname: string, password: string }) => void
    errorMessage: string
} & BoxLoginType
const BoxLogin = ({ onSubmitData, errorMessage }: BoxLoginProps) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = (): void => {
        const data = { nickname, password };
        onSubmitData(data);
    }

    return (
        <S.BoxLogin>
            <S.BoxLoginLogo>
                <S.BoxLoginLogoText>
                    <span>Pizza</span>
                    <span>Fresh</span>
                </S.BoxLoginLogoText>
                <S.BoxLoginLogoImage src={logo} alt="Logo" />
            </S.BoxLoginLogo>
            <S.BoxLoginForm>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={({ target }) => setNickname(target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}

                />
                <ButtonLarge
                    onClick={HandleSubmit}
                    value="Entrar"
                    type="button" />

            </S.BoxLoginForm>
            {Boolean(errorMessage.length) && <S.BoxLoginError>errorMessage</S.BoxLoginError>}
        </S.BoxLogin>
    );
}

export default BoxLogin;