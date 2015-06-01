v = "0";
var api = require("express")();
var Firebase = require("firebase");
var fb = new Firebase("https://qpqi.firebaseio.com/");
var _i = fb.child("data/img");
api.get("/i/:p", function(req, res) {
    var p = req.params.p;
    var _p = _i.child(p);
    _p.once("value", function(s) {
        var _s = s.val();
        var type = _s.split("base64,")[0].split(";")[0].split("data:")[1];
        var b64 = _s.split("base64,")[1];
        var buff = new Buffer(b64, "base64");
        res.writeHead(200, {
            'Content-type': type
        });
        res.end(buff);
    }, function(e) {
        res.writeHead(500);
        res.end(e);
    });
});
api.get("/i", function(req, res) {
    res.writeHead(500, {
        'Content-type': "text/json"
    });
    res.end(JSON.stringify({
        api: {
            name: "quickImage API v" + v,
            url: "a.qi.qzqp.tk",
            owner: "Quartz Systems",
            reportBugs: "aris@qsysmine.tk"
        },
        message: "Use /i/[image ID] to request an image."
    }));
});
api.get("/", function(req, res) {
    res.writeHead(200, {
        'Content-type': "text/json"
    });
    res.end(JSON.stringify({
        api: {
            name: "quickImage API v" + v,
            url: "a.qi.qzqp.tk",
            owner: "Quartz Systems",
            reportBugs: "aris@qsysmine.tk"
        }
    }));
});
api.listen(process.env.PORT || 3000);