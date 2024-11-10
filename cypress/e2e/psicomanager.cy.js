import { faker } from '@faker-js/faker';

describe('Cenários de teste 1', () => {
    it('Login na Plataforma', () => {
        //Dado que estou na página de login da Psicomanager
        cy.visit("https://app2.psicomanager.com/login");

        //Quando eu insiro as credenciais de usuário
        cy.get('.sc-5237f2b7-3').type('anneauto16@outlook.com');

        //E insiro as credenciais de senha
        cy.get('.sc-6a5428aa-1').type('Abcd123%');

        //Quando clico no botão "Entrar"
        cy.get('.sc-d3ebd470-0').click();

        //Então sou direcionado para a página inicial do sistema
        cy.url().should('include', 'https://app2.psicomanager.com/home');

    });

    it('Validação de campo obrigatório Senha no login', () => {
        //Dado que estou na página de login da Psicomanager
        cy.visit("https://app2.psicomanager.com/login");

        //Quando eu insiro as credenciais de usuário
        cy.get('.sc-5237f2b7-3').type('anneauto16@outlook.com');

        //E clico no botão "Entrar"
        cy.get('.sc-d3ebd470-0').click();

        //Então devo visualizar uma mensagem de preencha credenciais
        cy.contains('Preencha suas credenciais').should('be.visible');

    });
});


describe('Cenário de teste 2', () => {

    beforeEach(() => {

        //Dado que estou na página de login da Psicomanager
        cy.visit("https://app2.psicomanager.com/login");

        //Quando eu insiro as credenciais de usuário
        cy.get('.sc-5237f2b7-3').type('anneauto16@outlook.com');

        //E insiro as credenciais de senha
        cy.get('.sc-6a5428aa-1').type('Abcd123%');

        //Quando clico no botão "Entrar"
        cy.get('.sc-d3ebd470-0').click();
    });

    it('Cadastro de um Novo Paciente ', () => {

        //Então sou direcionado para a página inicial do sistema
        cy.url().should('include', 'https://app2.psicomanager.com/home');

        //Então clico em "Perguntar depois" no botão de opinião
        cy.get('body').then($body => {
            //Verifica se o pop-up existe no corpo da página
            if ($body.find('.sc-61e54088-3 > .sc-d8591b2-0').length > 0) {
                //Contêiner do pop-up está presente, tenta encontrar o botão
                cy.get('.sc-61e54088-3 > .sc-d8591b2-0')
                    .find('[style="display: flex; gap: 4px; align-items: center; justify-content: center;"] > .sc-b618bda5-7')
                    .should('be.visible')
                    .click()
                    .then(() => cy.log('Botão clicado com sucesso.'));
            } else {
                // Se o pop-up não está presente, segue para a próxima etapa
                cy.log('Pop-up não encontrado, seguindo para a próxima etapa.');
            }
        });

        //Quando navego até a seção "Clientes"
        cy.get('.wizard2 > [href="/clientes/listar"] > .sc-6f83b21a-3')
            .should('be.visible')
            .realHover('mouse')
            .then(() => {
                //E clico em "Cadastrar Clientes"
                cy.xpath("//body/ul//a[@href='/clientes/gerenciar/cadastro']/div[.='Cadastrar Cliente']").click();
            });

        //E faço um hover no logo psicomanager para liberar o hover da seção "Clientes"
        cy.get('.sc-aaa56dc2-4').realHover('mouse');

        //Crio a constante random name para inserir no cadastro
        const nomeAleatorio = faker.person.fullName();

        //Quando insiro o nome do cadastro
        cy.get(':nth-child(1) > .sc-151d9304-2 > .UkGvF > :nth-child(1) > [style="display: flex; width: 100%; flex-direction: row;"] > .sc-5237f2b7-3').type(nomeAleatorio);

        //E clico na aba profissional
        cy.get('.UkGvF > .sc-4be00257-0 > .sc-4be00257-2 > .sc-4be00257-3').click();

        //E seleciono o profissional
        cy.get('.sc-4be00257-5 > li').click();

        //E clico no menu dropdown grupo
        cy.get('[color="#3D3D3D"][aria-expanded="false"] > #containerDrop > .sc-76b8eb45-1').click();

        //Seleciono todos os elementos filhos dentro do container de opções (usando > * para pegar todos os elementos)
        cy.get('[color="#3D3D3D"][aria-expanded="false"] > #containerDrop > .sc-76b8eb45-1 > .sc-d862b171-0 > *')
            .then(($opcoes) => {
                //Converto as opções em um array usando lodash (._. + metodo)
                const opcoesArray = Cypress._.toArray($opcoes);

                //Gero um índice aleatório
                const indiceAleatorio = Cypress._.random(0, opcoesArray.length - 1);

                //Envolvo e clico em uma opção aleatória
                cy.wrap(opcoesArray[indiceAleatorio]).click();
            });


        //Quando no botão salvar
        cy.get('.sc-d3ebd470-0').click();

        //Entao deve ser possivel visualizar uma mensagem de sucesso
        cy.contains('Sucesso!Dados cadastrados!').should('be.visible');


    });


    it('Validação de campo obrigatório Nome no cadastro', () => {

        //Então sou direcionado para a página inicial do sistema
        cy.url().should('include', 'https://app2.psicomanager.com/home');

        //Então clico em "Perguntar depois" no botão de opinião
        cy.get('body').then($body => {
            //Verifico se o pop-up existe no corpo da página
            if ($body.find('.sc-61e54088-3 > .sc-d8591b2-0').length > 0) {
                //Contêiner do pop-up está presente, tenta encontrar o botão
                cy.get('.sc-61e54088-3 > .sc-d8591b2-0')
                    .find('[style="display: flex; gap: 4px; align-items: center; justify-content: center;"] > .sc-b618bda5-7')
                    .should('be.visible')
                    .click()
                    .then(() => cy.log('Botão clicado com sucesso.'));
            } else {
                //Se o pop-up não está presente, segue para a próxima etapa
                cy.log('Pop-up não encontrado, seguindo para a próxima etapa.');
            }
        });

        //Quando navego até a seção "Clientes"
        cy.get('.wizard2 > [href="/clientes/listar"] > .sc-6f83b21a-3')
            .should('be.visible')
            .realHover('mouse')
            .then(() => {
                //E clico em "Cadastrar Clientes"
                cy.xpath("//body/ul//a[@href='/clientes/gerenciar/cadastro']/div[.='Cadastrar Cliente']").click();
            });

        //E faço um hover no logo psicomanager para liberar o hover da seção "Clientes"
        cy.get('.sc-aaa56dc2-4').realHover('mouse');

        //E clico na aba profissional
        cy.get('.UkGvF > .sc-4be00257-0 > .sc-4be00257-2 > .sc-4be00257-3').click();

        //Quando seleciono o profissional
        cy.get('.sc-4be00257-5 > li').click();


        //E seleciono o grupo
        cy.get('[color="#3D3D3D"][aria-expanded="false"] > #containerDrop > .sc-76b8eb45-1').click();

        //Seleciono todos os elementos filhos dentro do container de opções (usando > * para pegar todos os elementos)
        cy.get('[color="#3D3D3D"][aria-expanded="false"] > #containerDrop > .sc-76b8eb45-1 > .sc-d862b171-0 > *')
            .then(($opcoes) => {
                //Converto as opções em um array usando lodash (._. + metodo)
                const opcoesArray = Cypress._.toArray($opcoes);

                //Gero um índice aleatório
                const indiceAleatorio = Cypress._.random(0, opcoesArray.length - 1);

                //Envolvo e clico na opção aleatória
                cy.wrap(opcoesArray[indiceAleatorio]).click();
            });

        //E clico em Salvar
        cy.get('.sc-d3ebd470-0').click();

        //Então deve ser visível um pop-up informando que campos obrigatórios não foram preenchidos
        cy.contains('Atenção!Os campos obrigatórios não foram preenchidos.').should('be.visible');

        //Então valido que o campo nome mudou de cinza para vermelho
        cy.get(':nth-child(1) > .sc-151d9304-2 > .UkGvF > :nth-child(1) > [style="display: flex; width: 100%; flex-direction: row;"] > .sc-5237f2b7-3')
            .should('have.css', 'border-color', 'rgb(244, 67, 54)');
    })
});


describe('Cenário de teste 3', () => {

    beforeEach(() => {

        //Dado que estou na página de login da Psicomanager
        cy.visit("https://app2.psicomanager.com/login");

        //Quando eu insiro as credenciais de usuário
        cy.get('.sc-5237f2b7-3').type('anneauto16@outlook.com');

        //E insiro as credenciais de senha
        cy.get('.sc-6a5428aa-1').type('Abcd123%');

        //Quando clico no botão "Entrar"
        cy.get('.sc-d3ebd470-0').click();
    });

    it('Agendamento de Nova Sessão', () => {

        //Então sou direcionado para a página inicial do sistema
        cy.url().should('include', 'https://app2.psicomanager.com/home');

        //Então clico em "Perguntar depois" no botão de opinião
        cy.get('body').then($body => {
            // Verifica se o pop-up existe no corpo da página
            if ($body.find('.sc-61e54088-3 > .sc-d8591b2-0').length > 0) {
                //Contêiner do pop-up está presente, tenta encontrar o botão
                cy.get('.sc-61e54088-3 > .sc-d8591b2-0')
                    .find('[style="display: flex; gap: 4px; align-items: center; justify-content: center;"] > .sc-b618bda5-7')
                    .should('be.visible')
                    .click()
                    .then(() => cy.log('Botão clicado com sucesso.'));
            } else {
                //Se o pop-up não está presente, segue para a próxima etapa
                cy.log('Pop-up não encontrado, seguindo para a próxima etapa.');
            }
        });

        //Quando navego até a seção "Clientes"
        cy.get('.wizard2 > [href="/clientes/listar"] > .sc-6f83b21a-3')
            .should('be.visible')
            .realHover('mouse')
            .then(() => {
                // E clico em "Listar Clientes"
                cy.xpath("//body/ul//a[@href='/clientes/listar']/div[.='Listar Clientes']").click();
            });

        //E faço um hover no logo psicomanager para liberar o hover da seção "Clientes"
        cy.get('.sc-aaa56dc2-4').realHover('mouse');

        //E clico nos filtros
        cy.get('.sc-42f3ec39-0 > .sc-7d5542db-0').click();

        //E clico nas colunas
        cy.get('[style="width: max-content;"] > .sc-e7f22fbf-1').click();

        //E clico na opção de mostrar id
        cy.get('.sc-e7f22fbf-2 > :nth-child(1)').click();

        //Então seleciono um id
        cy.get('[id]')
            .filter('[id^="2"]') //Se ids começam sempre com 2, range alto de validação para selecionar
            .then($clientes => {
                //Extraio os ids como números e coloco eles em um array
                const ids = $clientes
                    .toArray()
                    .map(cliente => parseInt(cliente.id))
                    .filter(id => !isNaN(id)); //garanto que os números são válidos

                //Então encontro o maior id    
                const idMaior = Math.max(...ids);
                cy.log('Maior ID encontrado: ' + idMaior);

                //E clico no cliente com o maior id
                cy.get(`#${idMaior} > :nth-child(3) > .sc-57b3cf66-6 > .krgWXP > [color="#3D3D3D"] > .sc-754a28a2-7 > a > .sc-754a28a2-10 > .sc-b618bda5-9`)
                    .click();
            });

        //Quando navego para sessões
        cy.get('.wizardHorarioDirecionamento1 > .sc-61651096-2').click();

        //E clico em agendar horário
        cy.get('.sc-d3ebd470-0 > .sc-b618bda5-7').click();

        
        //Obtenho a data atual no formato desejado
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0'); // Dia com 2 dígitos
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês com 2 dígitos (Janeiro é 0)
        const ano = hoje.getFullYear();

        //Formato a data como "DD/MM/AAAA"
        const dataAtual = `${dia}/${mes}/${ano}`;

        //Preencho o campo data com a data atual
        cy.get('.react-datepicker__input-container > input').type(dataAtual);

        //Gero uma hora aleatória entre 6 e 22
        const horaAleatoria = Math.floor(Math.random() * (22 - 6 + 1)) + 6;

        //Gero minutos aleatórios (0, 15, 30, ou 45) para um intervalo de 15 minutos
        let minutosAleatorios = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

        //Ajusto os minutos para garantir que o horário não ultrapasse 22:00
        if (horaAleatoria === 22) {
            minutosAleatorios = 0; // Se for 22h, define os minutos como 00
        }

        //Formato o horário como "HH:MM"
        const horarioAleatorio = `${String(horaAleatoria).padStart(2, '0')}:${String(minutosAleatorios).padStart(2, '0')}`;

        //Insero o horário
        cy.get(':nth-child(1) > div > .sc-a106be7d-0').type(horarioAleatorio);

        //Então clico no tipo de agendamento
        cy.get(':nth-child(5) > #containerDrop > .sc-76b8eb45-1').click();

        //E clico em agendamento semanal
        cy.get(':nth-child(5) > #containerDrop > .sc-76b8eb45-1 > .sc-d862b171-0 > :nth-child(2) > .sc-b618bda5-7').click();

        //Quando clico em salvar
        cy.get('#p > .sc-d3ebd470-0').click();

        //Então visualizo uma mensagem de sucesso
        cy.contains('Sucesso!').should('be.visible');

    });


    it('Validação de preenchimento do campo obrigatório horário', () => {

        //Então sou direcionado para a página inicial do sistema
        cy.url().should('include', 'https://app2.psicomanager.com/home')

        //Então clico em "Perguntar depois" no botão de opinião
        cy.get('body').then($body => {
            // Verifica se o pop-up existe no corpo da página
            if ($body.find('.sc-61e54088-3 > .sc-d8591b2-0').length > 0) {
                //Contêiner do pop-up está presente, tento encontrar o botão
                cy.get('.sc-61e54088-3 > .sc-d8591b2-0')
                    .find('[style="display: flex; gap: 4px; align-items: center; justify-content: center;"] > .sc-b618bda5-7')
                    .should('be.visible')
                    .click()
                    .then(() => cy.log('Botão clicado com sucesso.'));
            } else {
                //Se o pop-up não está presente, segue para a próxima etapa
                cy.log('Pop-up não encontrado, seguindo para a próxima etapa.');
            }
        });

        //Quando navego até a seção "Clientes"
        cy.get('.wizard2 > [href="/clientes/listar"] > .sc-6f83b21a-3')
            .should('be.visible')
            .realHover('mouse')
            .then(() => {
                //E clico em "Listar Clientes"
                cy.xpath("//body/ul//a[@href='/clientes/listar']/div[.='Listar Clientes']").click();
            });

        //E faço um hover no logo psicomanager para liberar o hover da seção "Clientes"
        cy.get('.sc-aaa56dc2-4').realHover('mouse');

        //E clico nos filtros
        cy.get('.sc-42f3ec39-0 > .sc-7d5542db-0').click();

        //E clico nas colunas
        cy.get('[style="width: max-content;"] > .sc-e7f22fbf-1').click();

        //E clico na opção de mostrar id
        cy.get('.sc-e7f22fbf-2 > :nth-child(1)').click();

        //Então seleciono um id
        cy.get('[id]')
            .filter('[id^="2"]') //Se ids começam sempre com 2, range alto de validação para selecionar
            .then($clientes => {
                //Extraio os ids como números e coloco eles em um array
                const ids = $clientes
                    .toArray()
                    .map(cliente => parseInt(cliente.id))
                    .filter(id => !isNaN(id)); //garanto que os números são válidos

                //Então encontro o maior id    
                const idMaior = Math.max(...ids);
                cy.log('Maior ID encontrado: ' + idMaior);

                //E clico no cliente com o maior id
                cy.get(`#${idMaior} > :nth-child(3) > .sc-57b3cf66-6 > .krgWXP > [color="#3D3D3D"] > .sc-754a28a2-7 > a > .sc-754a28a2-10 > .sc-b618bda5-9`)
                    .click();
            });

        //Quando navego para sessões
        cy.get('.wizardHorarioDirecionamento1 > .sc-61651096-2').click();

        //E clico em agendar horário
        cy.get('.sc-d3ebd470-0 > .sc-b618bda5-7').click();

        //Obtenho a data atual no formato desejado
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0'); // Dia com 2 dígitos
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês com 2 dígitos (Janeiro é 0)
        const ano = hoje.getFullYear();

        //Formato a data como "DD/MM/AAAA"
        const dataAtual = `${dia}/${mes}/${ano}`;

        //Insero a data do dia
        cy.get('.react-datepicker__input-container > input').type(dataAtual);

        //Clico no tipo de agendamento
        cy.get(':nth-child(5) > #containerDrop > .sc-76b8eb45-1').click();

        //Clico no agendamento semanal
        cy.get(':nth-child(5) > #containerDrop > .sc-76b8eb45-1 > .sc-d862b171-0 > :nth-child(2) > .sc-b618bda5-7').click();

        //Clico em salvar
        cy.get('#p > .sc-d3ebd470-0').click();

        //Então deve ser possivel ver a mensagem de erro alertando preenchimento do campo obrigatório horário
        cy.contains('Atenção!Os campos obrigatórios não foram preenchidos').should('be.visible');

        //confirmo a borda vermelha alertando obrigatoriedade de preenchimento do horario inicial
        cy.get(':nth-child(1) > div > .sc-a106be7d-0').should('have.css', 'border-color', 'rgb(244, 67, 54)');

        //confirmo a borda vermelha alertando obrigatoriedade de preenchimento do horario final
        cy.get(':nth-child(3) > div > .sc-a106be7d-0').should('have.css', 'border-color', 'rgb(244, 67, 54)');

    });
});
