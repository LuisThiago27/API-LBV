const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

/*
let unidades = new Array();
app.get("/unidades", async (req, res) => {
    try {
        let start = 0
        let total = 50
        while(total > start){
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

            const itens = data.result.map(obj => ({
                id: obj.ID,
                text: obj.NAME
            }));

            unidades.push(itens);
        }       
        //const pagination = { more: data.next ? true : false };
        //res.send({ results: unidades, pagination, total, next });
        res.send({ results: unidades, total: total});
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});
*/

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitindo todas as origens
    res.setHeader("Access-Control-Allow-Methods", "*"); // Permitindo todos os métodos HTTP
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

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
        let start = 0;
        const params = {
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
const querystring = require('querystring');

const clientId = '601370ad-5e5c-411d-982f-dbe59b4a7692';
const tenantId = '60f5c5a4-2944-4497-bc5b-6da5d82f7edd';
//const clientSecret = 'SUA_CLIENT_SECRET'; // Substitua pela sua client secret
const redirectUri = 'https://api-lbv.vercel.app/auth/microsoft';

app.get('/auth/microsoft', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send("O código de autenticação é necessário.");
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const data = {
        client_id: clientId,
        scope: 'User.Read',
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    };

    try {
        console.log("Enviando dados para a Microsoft:", data);

        const response = await axios.post(tokenEndpoint, querystring.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("Resposta da Microsoft:", response.data);

        const accessToken = response.data.access_token;
        res.send({ accessToken });
    } catch (error) {
        console.error("Erro ao autenticar na Microsoft Azure:", error.response ? error.response.data : error.message);
        res.status(500).send("Erro ao autenticar: " + (error.response ? error.response.data : error.message));
    }
});


app.listen(port, () => {
    console.log('App running')
})