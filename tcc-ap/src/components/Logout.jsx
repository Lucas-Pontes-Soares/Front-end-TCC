import styles from '../styles/logout.module.css'

export function Logout(){
    async function sairConta(){
        localStorage.removeItem("userId");
        localStorage.removeItem("AuthToken");

        window.location.href = `${process.env.URL-Frontend}/entrar`;

        alert("Você saiu da conta")
    }

    return (
        <div>
            <button className={styles.btn} onClick={sairConta}>
                <img src={require('../image/iconLogout.png')} alt="steam" heigth="20px" width="20px"/>
                Sair da Conta
            </button>
        </div>
    )
}