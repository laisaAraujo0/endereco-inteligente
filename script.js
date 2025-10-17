document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enderecoForm');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const numeroInput = document.getElementById('numero');
    const ufInput = document.getElementById('uf');
    
    // --- Funções de Validação ---

    /**
     * Valida o CEP.
     * Requisitos: Obrigatório, formato 00000-000, usa regex com grupos de captura.
     * @param {string} cep O valor do campo CEP.
     * @returns {string|null} Mensagem de erro ou null se válido.
     */
    function validarCEP(cep) {
        if (!cep) {
            return "O campo CEP é obrigatório.";
        }
        // Regex para 00000-000. Captura os dois grupos de dígitos.
        const cepRegex = /^(\d{5})-(\d{3})$/;
        if (!cepRegex.test(cep)) {
            return "O CEP deve estar no formato 00000-000.";
        }
        return null;
    }

    /**
     * Valida o Logradouro.
     * Requisitos: Obrigatório, mínimo de 5 caracteres.
     * @param {string} logradouro O valor do campo Logradouro.
     * @returns {string|null} Mensagem de erro ou null se válido.
     */
    function validarLogradouro(logradouro) {
        if (!logradouro) {
            return "O campo Logradouro é obrigatório.";
        }
        if (logradouro.length < 5) {
            return "O Logradouro deve conter no mínimo 5 caracteres.";
        }
        return null;
    }

    /**
     * Valida o Número.
     * Requisitos: Obrigatório, apenas dígitos numéricos.
     * @param {string} numero O valor do campo Número.
     * @returns {string|null} Mensagem de erro ou null se válido.
     */
    function validarNumero(numero) {
        if (!numero) {
            return "O campo Número é obrigatório.";
        }
        // Regex para garantir que contém apenas dígitos.
        const numeroRegex = /^\d+$/;
        if (!numeroRegex.test(numero)) {
            return "O campo Número deve conter apenas dígitos numéricos.";
        }
        return null;
    }

    /**
     * Valida a UF.
     * Requisitos: Obrigatório, exatamente 2 letras maiúsculas.
     * @param {string} uf O valor do campo UF.
     * @returns {string|null} Mensagem de erro ou null se válido.
     */
    function validarUF(uf) {
        if (!uf) {
            return "O campo UF é obrigatório.";
        }
        // Regex para exatamente 2 letras maiúsculas.
        const ufRegex = /^[A-Z]{2}$/;
        if (!ufRegex.test(uf)) {
            return "A UF deve conter exatamente 2 letras maiúsculas (ex: SP, RJ).";
        }
        return null;
    }

    // --- Funções de Comportamento e Formatação ---

    /**
     * Aplica a máscara de CEP (00000-000) enquanto o usuário digita.
     */
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        
        if (value.length > 5) {
            // Aplica a máscara: 5 dígitos e um hífen
            e.target.value = value.substring(0, 5) + '-' + value.substring(5, 8);
        } else {
            e.target.value = value;
        }
    });

    /**
     * Converte o texto da UF para maiúsculo automaticamente.
     */
    ufInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });


    // --- Controle de Envio do Formulário ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;
        let errorMessage = "";

        // 1. Validação do CEP
        const cepError = validarCEP(cepInput.value);
        if (cepError) {
            errorMessage += "CEP: " + cepError + "\n";
            isValid = false;
        }

        // 2. Validação do Logradouro
        const logradouroError = validarLogradouro(logradouroInput.value.trim());
        if (logradouroError) {
            errorMessage += "Logradouro: " + logradouroError + "\n";
            isValid = false;
        }

        // 3. Validação do Número
        const numeroError = validarNumero(numeroInput.value.trim());
        if (numeroError) {
            errorMessage += "Número: " + numeroError + "\n";
            isValid = false;
        }

        // 4. Validação da UF
        const ufError = validarUF(ufInput.value);
        if (ufError) {
            errorMessage += "UF: " + ufError + "\n";
            isValid = false;
        }

        // Exibir resultados
        if (isValid) {
            alert("Endereço cadastrado com sucesso");
            // Aqui você poderia adicionar a lógica para enviar os dados para um servidor, por exemplo.
            // form.reset(); // Opcional: Limpar o formulário após o sucesso
        } else {
            alert("Erros no formulário:\n" + errorMessage);
        }
    });
});
