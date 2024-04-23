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

let unidades = [];
app.use(async (req, res, next) => {
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

            unidades.push(itens, total, start);
        }       
        next();
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/unidades", (req, res) => {
    try {
        res.send({ results: unidades, total: unidades.total, start: unidades.start });
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        res.status(500).send("Erro ao obter os dados:" + error);
    }
});

app.get("/atividades", async (req, res) => {
    try {
        const params = {
            FILTER: { "%NAME": req.query.term }
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

app.listen(port, () => {
    console.log('App running')
})