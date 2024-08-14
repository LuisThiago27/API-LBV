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
    res.redirect(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params}`);
});

app.get('/auth/microsoft/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
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

        const { access_token } = response.data;
        res.json({ access_token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to obtain access token' });
    }
});


app.listen(port, () => {
    console.log('App running')
})