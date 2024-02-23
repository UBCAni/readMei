const express = require('express');

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        await Promise.resolve(
            query("members", request.query)
        ).then((r) => {
            r.length ? response.send(r) : response.status(404).send("No records found")
        })
    } catch {
        response.status(404).send("Bad query forma de members")
    }
});

router.post("/", async (request, response) => {
    try {
        await Promise.resolve(
            write("members", request.query)
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
            update("members", request.query)
        ).then(() => {
            response.send("Entry updated")
        })
    } catch {
        response.status(500).send("Error updating record")
    }
});

module.exports = router;