const express = require('express');

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        await Promise.resolve(
            query("events", request.query)
        ).then((r) => {
            r.length ? response.send(r) : response.status(404).send("No records found")
        })
    } catch {
        response.status(404).send("Bad query")
    }
});

router.post("/", async (request, response) => {
    try {
        await Promise.resolve(
            write("events", request.query)
        ).then(() => {
            response.send("Entry added")
        })
    } catch {
        response.status(500).send("Error writing record")
    }
});

router.patch("/", async (request, response) => {
    try {
        await Promise.resolve(
            update("events", request.query)
        ).then(() => {
            response.send("Entry updated")
        })
    } catch {
        response.status(500).send("Error updating record")
    }
});

module.exports = router;