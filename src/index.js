const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;


app.get("/unidades", async (req, res) => {
    try {
        let unidades = [];
        let start = 0;
        let total = 50;

        while (total > start) {
            const params = {
                SELECT: ["NAME"],
                ORDER: { "NAME": "ASC" },
                FILTER: { "%NAME": req.query.term },
                start: start
            };

            const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=109", { params });
            const data = response.data;

            total = data.total;
            start = data.next ? data.next : total;

            const itens = data.result.map(obj => ({
                id: obj.ID,
                text: obj.NAME
            }));

            unidades = unidades.concat(itens);
        }

        res.send({ results: unidades, total: total });
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitindo todas as origens
    res.setHeader("Access-Control-Allow-Methods", "*"); // Permitindo todos os métodos HTTP
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

/*
let unidades = [];
app.get("/unidades", async (req, res) => {
    try {
        let start = 0;
        let total = 50;
        while (total > start) {
            const params = {
                SELECT: ["NAME"],
                ORDER: { "NAME": "ASC" },
                FILTER: { "%NAME": req.query.term },
                start: start
            };
    
            const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=109", { params });
            const data = response.data;
            total = response.data.total;
            start = (response.data.next ? response.data.next : total);

            const items = data.result.map(obj => ({
                id: obj.ID,
                text: obj.NAME
            }));

            unidades.push(...items);
        }       
        res.send({ results: unidades, total: total });
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});
*/

app.get("/atividades_coletivas", async (req, res) => {
    try {
        const params = {
            FILTER: { "%NAME": req.query.term, "%PROPERTY_927": 523 }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=59", { params });
        const data = response.data;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME
        }));
        res.send({ results: itens});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/atividades_individuais", async (req, res) => {
    try {
        const params = {
            FILTER: { "%NAME": req.query.term, "%PROPERTY_927": 525 }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=59", { params });
        const data = response.data;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME
        }));
        res.send({ results: itens});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/contatos", async (req, res) => {
    try {
        let params = {
            FILTER: {
                'FULL_NAME': req.query.term
            },
            start: 0,
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list", { params });
        const data = response.data;
        const total = data.total;
        const next = data.next;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: `${obj.NAME.trim()} ${obj.SECOND_NAME ? obj.SECOND_NAME.trim() + ' ' : ''}${obj.LAST_NAME ? obj.LAST_NAME.trim() : ''}`.trim()
        }));

        res.send({ results: itens, total, next });
        
    } catch (error) {
        console.error("Erro ao fazer requisição:", error.message || error);
        res.status(500).send("Erro ao obter os dados: " + (error.message || error));
    }
});


app.get("/pregador-responsavel", async (req, res) => {
    try {
        let start = 0;
        const params = {
            FILTER: { "%FULL_NAME": req.query.term }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/user.get?start=" + start, { params });
        const data = response.data;
        const total = response.data.total;
        const next = response.data.next;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME + ' ' +  obj.LAST_NAME //Se precisar colocar SECOND_NAME
        }));
        res.send({ results: itens, total, next});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/realizador", async (req, res) => {
    try {
        let start = 0;
        const params = {
            SELECT: [
                "NAME", "LAST_NAME"
            ],
            FILTER: { "%FULL_NAME": req.query.term }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list?start=" + start, { params });
        const data = response.data;
        const total = response.data.total;
        const next = response.data.next;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME + ' ' +  obj.LAST_NAME
        }));
        res.send({ results: itens, total, next});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/participantes", async (req, res) => {
    try {
        let start = 0;
        const params = {
            SELECT: [
                "NAME", "LAST_NAME"
            ],
            FILTER: { "%FULL_NAME": req.query.term }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list?start=" + start, { params });
        const data = response.data;
        const total = response.data.total;
        const next = response.data.next;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME + ' ' +  obj.LAST_NAME
        }));
        res.send({ results: itens, total, next});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/motivacao", async (req, res) => {
    try {
        const params = {
            FILTER: { "%NAME": req.query.term }
        };

        const response = await axios.get("https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=33", { params });
        const data = response.data;

        const itens = data.result.map(obj => ({
            id: obj.ID,
            text: obj.NAME
        }));
        res.send({ results: itens});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.post('/envia-atividade', async (req, res) => {
    const {
        contato, atividade, pregador, selectedIdRadio, observacao,
        realizador, motivacao, participantesTotais, participantesIniciantes,
        codParticipantesModificados, dataFormatada
    } = req.body;

    try {
        const response = await axios.post('https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.item.add', {
            entityTypeId: 165,
            fields: {
                title: "Atividade e Participação para",
                ufCrm37_1680781222: dataFormatada,
                ufCrm37_1680781696: pregador,
                contactId: contato,
                ufCrm37_1680785492: observacao,
                ufCrm37_1681127182: atividade,
                ufCrm37_1680784996: selectedIdRadio,
                ufCrm37_1680781778: realizador,
                ufCrm37_1680782329: motivacao,
                ufCrm37_1680785178: participantesTotais,
                ufCrm37_1680785259: participantesIniciantes,
                ufCrm37_1680785090: codParticipantesModificados
            }
        });

        res.status(200).json({ message: 'Enviado com sucesso!', data: response.data });
    } catch (error) {
        console.error('Erro ao enviar:', error);
        res.status(500).json({ error: 'Erro ao enviar para o Bitrix.' });
    }
});


app.post('/envia-solicitacao', async (req, res) => {
    const { pregador, observacao } = req.body;

    try {
        const response = await axios.post('https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/tasks.task.add', {
            fields: {
                TITLE: `Solicitação de ${pregador} pelo app`,
                DESCRIPTION: observacao,
                RESPONSIBLE_ID: pregador,
                GROUP_ID: 118
            }
        });

        return res.status(200).json({ message: 'Enviado com sucesso!', data: response.data });
    } catch (error) {
        console.error('Erro ao enviar:', error);
        return res.status(500).json({ error: 'Erro ao enviar para o Bitrix.' });
    }
});

const querystring = require('querystring');

app.get('/auth/microsoft', (req, res) => {
    const params = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: 'https://api-lbv.vercel.app/auth/microsoft/callback',
        response_mode: 'query',
        scope: 'user.read',
        state: 'some_random_state',
    });

    const tenantId = process.env.TENANT_ID;
    res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`);
});

app.get('/auth/microsoft/callback', async (req, res) => {
    const code = req.query.code;
    console.log('Authorization code:', code);
    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
            querystring.stringify({
                client_id: process.env.CLIENT_ID,
                scope: 'user.read',
                code: code,
                redirect_uri: 'https://api-lbv.vercel.app/auth/microsoft/callback',
                grant_type: 'authorization_code',
                client_secret: process.env.CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log('Token response:', response.data);
        const { access_token } = response.data;
        res.json({ access_token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to obtain access token' });
    }
});


app.listen(port, () => {
    console.log('App running')
})