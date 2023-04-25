export function Logout(){
    async function sairConta(){
        localStorage.removeItem("userId");
        localStorage.removeItem("AuthToken");

        window.location.href = "http://localhost:3006/login";

        alert("Você saiu da conta")
    }

    return (
        <div>
            <button onClick={sairConta}>Sair da Conta</button>
        </div>
    )
}