/**
 * Created by Gurami on 16/04/2016.
 */


function formatTime(time, hours) {
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;

        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return m.lead0(2) + ":" + s.lead0(2);
    }
}

Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};