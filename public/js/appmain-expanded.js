/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
function hex_sha1(e) {
    return binb2hex(core_sha1(str2binb(e), e.length * chrsz))
}

function b64_sha1(e) {
    return binb2b64(core_sha1(str2binb(e), e.length * chrsz))
}

function str_sha1(e) {
    return binb2str(core_sha1(str2binb(e), e.length * chrsz))
}

function hex_hmac_sha1(e, t) {
    return binb2hex(core_hmac_sha1(e, t))
}

function b64_hmac_sha1(e, t) {
    return binb2b64(core_hmac_sha1(e, t))
}

function str_hmac_sha1(e, t) {
    return binb2str(core_hmac_sha1(e, t))
}

function sha1_vm_test() {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d"
}

function core_sha1(e, t) {
    e[t >> 5] |= 128 << 24 - t % 32, e[(t + 64 >> 9 << 4) + 15] = t;
    var n = Array(80),
        r = 1732584193,
        i = -271733879,
        s = -1732584194,
        o = 271733878,
        u = -1009589776;
    for (var a = 0; a < e.length; a += 16) {
        var f = r,
            l = i,
            c = s,
            h = o,
            p = u;
        for (var d = 0; d < 80; d++) {
            d < 16 ? n[d] = e[a + d] : n[d] = rol(n[d - 3] ^ n[d - 8] ^ n[d - 14] ^ n[d - 16], 1);
            var v = safe_add(safe_add(rol(r, 5), sha1_ft(d, i, s, o)), safe_add(safe_add(u, n[d]), sha1_kt(d)));
            u = o, o = s, s = rol(i, 30), i = r, r = v
        }
        r = safe_add(r, f), i = safe_add(i, l), s = safe_add(s, c), o = safe_add(o, h), u = safe_add(u, p)
    }
    return Array(r, i, s, o, u)
}

function sha1_ft(e, t, n, r) {
    return e < 20 ? t & n | ~t & r : e < 40 ? t ^ n ^ r : e < 60 ? t & n | t & r | n & r : t ^ n ^ r
}

function sha1_kt(e) {
    return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
}

function core_hmac_sha1(e, t) {
    var n = str2binb(e);
    n.length > 16 && (n = core_sha1(n, e.length * chrsz));
    var r = Array(16),
        i = Array(16);
    for (var s = 0; s < 16; s++) r[s] = n[s] ^ 909522486, i[s] = n[s] ^ 1549556828;
    var o = core_sha1(r.concat(str2binb(t)), 512 + t.length * chrsz);
    return core_sha1(i.concat(o), 672)
}

function safe_add(e, t) {
    var n = (e & 65535) + (t & 65535),
        r = (e >> 16) + (t >> 16) + (n >> 16);
    return r << 16 | n & 65535
}

function rol(e, t) {
    return e << t | e >>> 32 - t
}

function str2binb(e) {
    var t = Array(),
        n = (1 << chrsz) - 1;
    for (var r = 0; r < e.length * chrsz; r += chrsz) t[r >> 5] |= (e.charCodeAt(r / chrsz) & n) << 32 - chrsz - r % 32;
    return t
}

function binb2str(e) {
    var t = "",
        n = (1 << chrsz) - 1;
    for (var r = 0; r < e.length * 32; r += chrsz) t += String.fromCharCode(e[r >> 5] >>> 32 - chrsz - r % 32 & n);
    return t
}

function binb2hex(e) {
    var t = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
        n = "";
    for (var r = 0; r < e.length * 4; r++) n += t.charAt(e[r >> 2] >> (3 - r % 4) * 8 + 4 & 15) + t.charAt(e[r >> 2] >> (3 - r % 4) * 8 & 15);
    return n
}

function binb2b64(e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = "";
    for (var r = 0; r < e.length * 4; r += 3) {
        var i = (e[r >> 2] >> 8 * (3 - r % 4) & 255) << 16 | (e[r + 1 >> 2] >> 8 * (3 - (r + 1) % 4) & 255) << 8 | e[r + 2 >> 2] >> 8 * (3 - (r + 2) % 4) & 255;
        for (var s = 0; s < 4; s++) r * 8 + s * 6 > e.length * 32 ? n += b64pad : n += t.charAt(i >> 6 * (3 - s) & 63)
    }
    return n
}

function capitalize(e) {
    return (e + "").replace(/^([a-z])|\s+([a-z])|,+([a-z])/g, function(e) {
        return e.toUpperCase()
    })
}

function csvPreprocess(e) {
    return (e + "").replace(/^([a-z])|\s+([a-z])|,+([a-z])/g, function(e) {
        return e.toUpperCase()
    }).replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+,/g, ",").replace(/,\s+/g, ",")
}

function deleteTag(e) {
    return items[e] != undefined && delete items[e], $("#" + e).length > 0 && ($("#" + e).addClass("deleted"), $("#" + e).parent().hide().addClass("deleted"), $("a[href=#" + e + "]").remove(), $("#resourceCount").html($("#multiItemSelector input[type=checkbox]:checked").not(".deleted").length + " of " + $("#multiItemSelector input[type=checkbox]").not(".deleted").length + " resources")), $("#deleteModal").modal("hide"), updateTextArea(), !1
}

function objectToHash(e) {
    var t = "";
    for (j in e) typeof e[j] == "string" && (t += e[j]);
    return hex_sha1(t)
}

function wrapIfNeeded(e) {
    return /"/.test(e) || /,/.test(e) ? '"' + e.replace(/"/g, '""') + '"' : e
}

function processDataForAlignmentArray(e) {
    var t = e.split(/\n|\r/);
    for (var n = 1; n < t.length - 1; n++) {
        var r = t[n].split(",");
        alignmentArray.push({
            title: r[2],
            url: r[3],
            description: r[0],
            guid: r[4]
        }), dotNotationDisplayArray.push(r[2])
    }
}

function redrawResourcesBasedOnItems() {
    $("#multiItemSelector").empty(), $("#multiItemSelector input[type=checkbox]").each(function(e, t) {
        t.checked = !1
    }), updateInputFields();
    for (itemCounter in items) {
        $("#multiItemSelector span.notYet").hide();
        var e = items[itemCounter].title.length > 25 ? items[itemCounter].title.substr(0, 25) + "&hellip;" : items[itemCounter].title;
        $("#multiItemSelector").append($("<a href='#" + itemCounter + "' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#" + itemCounter + "' id='" + itemCounter + "URL' " + (items[itemCounter].url ? "" : "style='display:none;'") + " class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='" + itemCounter + "Label' class='checkbox'><input id='" + itemCounter + "' type='checkbox' name='tagItem'/><span>" + e + "</span></label>"));
        for (objHash in items[itemCounter].educationalAlignments) {
            var t = {
                educationalAlignment: items[itemCounter].educationalAlignments[objHash].educationalAlignment,
                alignmentType: items[itemCounter].educationalAlignments[objHash].alignmentType,
                dotNotation: items[itemCounter].educationalAlignments[objHash].dotNotation,
                description: items[itemCounter].educationalAlignments[objHash].description,
                itemURL: items[itemCounter].educationalAlignments[objHash].itemURL
            };
            alignments[objHash] == undefined && ($(".noAlignmentsYet").hide(), alignments[objHash] = t, $("#currentAlignmentTable > tbody:last").append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="' + objHash + '" />' + t.dotNotation + "</label></td><td>" + capitalize(t.alignmentType) + "</td></tr>"))
        }
    }
    updateTextArea(), updateResourceCount()
}

function redrawHistoryBasedOn(e) {
    $("#history").empty();
    for (i in e) {
        var t = e[i].title.length > 25 ? e[i].title.substr(0, 25) + "&hellip;" : e[i].title;
        $("#history").append($("<label><a href='#" + e[i].uuid + "'><i class='icon-repeat'></i> " + t + "</a></label>"))
    }
}

function setupDisplayFieldsEducationTab(e, t) {
    if (e[t] != undefined && e[t] != "" && $("select#" + t)[0] != undefined) {
        var n = e[t].split(",");
        $("select#" + t + " option").each(function() {
            $.inArray($(this).val(), n) !== -1 && $(this).attr("selected", !0)
        });
        var r = $("select#" + t + " option").map(function() {
                return this.value
            }),
            s = [];
        for (i in n) $.inArray(n[i], r) === -1 && s.push(n[i]);
        s.length > 0 && $("#" + t + "Other").attr("value", s.join(","))
    }
}

function toggleForm() {
    $("#multiItemSelector input[type=checkbox]:checked").length > 0 ? ($("#LRMIData input,#LRMIData select,#LRMIData textarea").removeAttr("disabled"), $("#educationTab,#alignmentTab").removeClass("disabled"), $("#educationTab a,#alignmentTab a").attr("data-toggle", "tab")) : ($("#generalTab a").click(), $("#LRMIData input,#LRMIData select,#LRMIData textarea").attr("disabled", "disabled"), $("#educationTab,#alignmentTab").addClass("disabled"), $("#educationTab a,#alignmentTab a").removeAttr("data-toggle"))
}

function updateInputFields() {
    updateResourceCount(), $("#addThumbnailButton").addClass("disabled"), $("#thumbnail").attr("value", ""), $("#thumbnailImage").attr("src", ""), $("#removeThumbnailButton").hide(), $("#thumbnailImage").hide(), $("#publishButton").addClass("disabled"), $("form[name=LRMIData]").find("input[type=text], textarea, select").val(""), $("#currentAlignmentTable input[type=checkbox]").attr("checked", !1), clearTimeRequired(), updateMainContentBottom(), toggleForm();
    if ($("#multiItemSelector input[type=checkbox]:checked").length == 1) {
        $("#addThumbnailButton").removeClass("disabled"), $("#publishButton").removeClass("disabled");
        var e = items[$("#multiItemSelector input[type=checkbox]:checked").first().attr("id")];
        e.title != "" && $("#title").val(e.title), e.url != "" && $("#url").val(e.url), e.tagDescription != "" && $("#tagDescription").val(e.tagDescription), e.language != "" && $("#language").val(e.language), e.topic != "" && $("#topic").val(e.topic), e.createdBy != "" && $("#createdBy").val(e.createdBy), e.usageRightsURL != "" && $("#usageRightsURL").val(e.usageRightsURL), e.publisher != "" && $("#publisher").val(e.publisher), e.isBasedOnURL != "" && $("#isBasedOnURL").val(e.isBasedOnURL), e.thumbnail != "" && ($("#thumbnail").val(e.thumbnail), $("#thumbnailImage").attr("src", "http://media.inbloom.org.s3.amazonaws.com/tagger/images/browser_thumb_" + e.thumbnail), $("#removeThumbnailButton").show(), $("#thumbnailImage").show()), d = new Date;
        var t = ("0" + d.getDate()).slice(-2),
            n = d.getMonth() + 1,
            r = d.getFullYear();
        ds = r + "-" + n + "-" + t, e.createdOn != "" && $("#createdOn").val(e.createdOn);
        if (e.timeRequired != "P0Y0M0W0DT0H0M0S" && e.timeRequired != "") {
            var i = e.timeRequired.match(/(\d+)/g);
            updateSlider(event, null, $("#slideryears"), "Year", i[0]), updateSlider(event, null, $("#slidermonths"), "Month", i[1]), updateSlider(event, null, $("#sliderweeks"), "Week", i[2]), updateSlider(event, null, $("#sliderdays"), "Day", i[3]), updateSlider(event, null, $("#sliderhours"), "Hour", i[4]), updateSlider(event, null, $("#sliderminutes"), "Minute", i[5]), updateSlider(event, null, $("#sliderseconds"), "Second", i[6])
        }
        e.url != "" && updateMainContentBottom(e.url), setupDisplayFieldsEducationTab(e, "endUser"), setupDisplayFieldsEducationTab(e, "ageRange"), setupDisplayFieldsEducationTab(e, "educationalUse"), setupDisplayFieldsEducationTab(e, "interactivityType"), setupDisplayFieldsEducationTab(e, "learningResourceType"), setupDisplayFieldsEducationTab(e, "mediaType"), setupDisplayFieldsEducationTab(e, "groupType");
        for (j in e.educationalAlignments) $("input[type=checkbox][value=" + j + "]").attr("checked", !0)
    } else $("#multiItemSelector input[type=checkbox]:checked").length > 1 && ($("#publishButton").removeClass("disabled"), $("#addThumbnailButton").removeClass("disabled"))
}

function updateItemEducationTab(e, t) {
    $("#multiItemSelector input[type=checkbox]:checked").each(function(n, r) {
        var i = !1,
            s = document.forms.LRMIData,
            o = "",
            u = 0;
        for (u = 0; u < s[e].length; u++) s[e][u].selected && (i ? o = o + "," + s[e][u].value : (o = s[e][u].value, i = !0));
        s[t].value != "" && (o = o + (o == "" ? "" : ",") + s[t].value), items[r.id][e] = o
    }), updateTextArea()
}

function updateMainContentBottom(e) {
    e == "" || e == undefined ? $("#iframe").attr("src", "about:blank") : $("#iframe").attr("src", e)
}

function updateResourceCount() {
    $("#resourceCount").html($("#multiItemSelector input[type=checkbox]:checked").not(".deleted").length + " of " + $("#multiItemSelector input[type=checkbox]").not(".deleted").length + " resources")
}

function updateTextArea() {
    var e = "";
    $("#multiItemSelector input[type=checkbox]:checked").each(function(t, n) {
        items[n.id].title != undefined && items[n.id].title != "" && (e += "Title:\n" + items[n.id].title + "\n"), items[n.id].url != undefined && items[n.id].url != "" && (e += "URL:\n" + items[n.id].url + "\n"), items[n.id].tagDescription != undefined && items[n.id].tagDescription != "" && (e += "Description:\n" + items[n.id].tagDescription + "\n"), items[n.id].language != undefined && items[n.id].language != "" && (e += "Language:\n" + items[n.id].language + "\n"), items[n.id].createdOn != undefined && items[n.id].createdOn != "" && (e += "Created On:\n" + items[n.id].createdOn + "\n"), items[n.id].topic != undefined && items[n.id].topic != "" && (e += "Topic/Subject:\n" + items[n.id].topic + "\n"), items[n.id].createdBy != undefined && items[n.id].createdBy != "" && (e += "Created By:\n" + items[n.id].createdBy + "\n"), items[n.id].usageRightsURL != undefined && items[n.id].usageRightsURL != "" && (e += "Usage Rights URL:\n" + items[n.id].usageRightsURL + "\n"), items[n.id].publisher != undefined && items[n.id].publisher != "" && (e += "Publisher:\n" + items[n.id].publisher + "\n"), items[n.id].isBasedOnURL != undefined && items[n.id].isBasedOnURL != "" && (e += "Is Based On URL:\n" + items[n.id].isBasedOnURL + "\n"), items[n.id].endUser != undefined && items[n.id].endUser != "" && (e += "End User:\n" + items[n.id].endUser + "\n"), items[n.id].ageRange != undefined && items[n.id].ageRange != "" && (e += "Age Range:\n" + items[n.id].ageRange + "\n"), items[n.id].educationalUse != undefined && items[n.id].educationalUse != "" && (e += "Educational Use:\n" + items[n.id].educationalUse + "\n"), items[n.id].interactivityType != undefined && items[n.id].interactivityType != "" && (e += "Interactivity Type:\n" + items[n.id].interactivityType + "\n"), items[n.id].learningResourceType != undefined && items[n.id].learningResourceType != "" && (e += "Learning Res Type:\n" + items[n.id].learningResourceType + "\n"), items[n.id].mediaType != undefined && items[n.id].mediaType != "" && (e += "Media Type:\n" + items[n.id].mediaType + "\n"), items[n.id].groupType != undefined && items[n.id].groupType != "" && (e += "Group Type:\n" + items[n.id].groupType + "\n"), items[n.id].timeRequired != "P0Y0M0W0DT0H0M0S" && (e += "Time Required:\n" + items[n.id].timeRequired + "\n\n");
        if (items[n.id].educationalAlignments != undefined)
            for (j in items[n.id].educationalAlignments) items[n.id].educationalAlignments[j].educationalAlignment != undefined && items[n.id].educationalAlignments[j].educationalAlignment != "" && (e += "Educational Alignment:\n" + items[n.id].educationalAlignments[j].educationalAlignment + "\n"), items[n.id].educationalAlignments[j].alignmentType != undefined && items[n.id].educationalAlignments[j].alignmentType != "" && (e += "Alignment Type:\n" + items[n.id].educationalAlignments[j].alignmentType + "\n"), items[n.id].educationalAlignments[j].dotNotation != undefined && items[n.id].educationalAlignments[j].dotNotation != "" && (e += "Dot Notation:\n" + items[n.id].educationalAlignments[j].dotNotation + "\n"), items[n.id].educationalAlignments[j].itemURL != undefined && items[n.id].educationalAlignments[j].itemURL != "" && (e += "Item URL:\n" + items[n.id].educationalAlignments[j].itemURL + "\n"), items[n.id].educationalAlignments[j].description != undefined && items[n.id].educationalAlignments[j].description != "" && (e += "Description:\n" + items[n.id].educationalAlignments[j].description + "\n");
        e += "\n-----------------------\n\n"
    }), $("#textarea").val(e)
}

function toCorrectCase(e) {
    var t = "";
    e == "on-line" && (t = "On-Line"), e == "cd-rom" && (t = "CD-ROM"), e == "cd-i" && (t = "CD-I"), e == "pdf" && (t = "PDF"), e == "e-mail" && (t = "E-Mail"), e == "audio cd" && (t = "Audio CD"), e == "dvd/blu-ray" && (t = "DVD/Blu-ray"), e == "mbl (microcomputer based)" && (t = "MBL (Microcomputer Based)"), e == "person-to-person" && (t = "Person-to-Person");
    if (t == "") {
        var n = e.split(/\s/);
        for (i in n) n[i] = n[i].charAt(0).toUpperCase() + n[i].slice(1);
        t = n.join(" ");
        var n = t.split(/\//);
        for (i in n) n[i] = n[i].charAt(0).toUpperCase() + n[i].slice(1);
        t = n.join("/")
    }
    return t
}

function compareValueEquals(e, t, n) {
    if (typeof e == "string") e.toLowerCase() != t.toLowerCase() && (fileHasErrors = !0, fileErrors.push("<strong>Invalid file imported</strong><br /> " + n + ": '" + e + "' is not equals to the correct value of '" + t + "'<br /><br />"));
    else if (typeof e == "object")
        for (i in t)
            if (e[i] == undefined || e[i].toLowerCase() != t[i].toLowerCase()) fileHasErrors = !0, e[i] == undefined ? fileErrors.push("<strong>Invalid file imported</strong><br /> " + n + ": '" + t[i] + "' appears to be missing entirely<br /><br />") : fileErrors.push("<strong>Invalid file imported</strong><br /> " + n + ": '" + e[i] + "' is not equals to the correct value of '" + t[i] + "'<br /><br />")
}

function showFileHasErrorsMessage(e) {
    if (fileHasErrors) {
        var t = "Data could not be imported.  The file you're attempting to import appears to have some errors in rows or columns that Tagger does not understand.  This is usually as a result of data that doesn't conform to requirements for each column of data.<br />Before Tagger can import this file, please correct the following errors.<br /><br />" + fileErrors.join("");
        showMessage(t, "Import Errors! :: " + e)
    }
}

function forcePublish() {
    var e = processJSONOutput(!0);
    saveRemote(e, "LR")
}

function updateSlider(e, t, n, r, i) {
    i == undefined && (i = t.value), $(n).slider({
        value: i
    });
    var s = $(n).prev();
    i == 0 ? s.
        html(r): i == 1 ? s.html(i + " " + r) : s.html(i + " " + r + "s")
}(function(e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function(e, n) {
            t[n] = !0
        }), t
    }

    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) {}
                v.data(e, n, r)
            } else r = t
        }
        return r
    }

    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t])) continue;
            if (t !== "toJSON") return !1
        }
        return !0
    }

    function et() {
        return !1
    }

    function tt() {
        return !0
    }

    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function at(e, t) {
        do e = e[t]; while (e && e.nodeType !== 1);
        return e
    }

    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) return v.grep(e, function(e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType) return v.grep(e, function(e, r) {
            return e === t === n
        });
        if (typeof t == "string") {
            var r = v.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (it.test(t)) return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function(e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }

    function lt(e) {
        var t = ct.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length) n.createElement(t.pop());
        return n
    }

    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e)) return;
        var n, r, i, s = v._data(e),
            o = v._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u)
                for (r = 0, i = u[n].length; r < i; r++) v.event.add(t, n, u[n][r])
        }
        o.data && (o.data = v.extend({}, o.data))
    }

    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1) return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando)
    }

    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }

    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }

    function Qt(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e) return t
        }
        return r
    }

    function Gt(e, t) {
        return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }

    function Yt(e, t) {
        var n, r, i = [],
            s = 0,
            o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none"
        }
        return e
    }

    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            s = 0;
        for (; i < 4; i += 2) n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        return s
    }

    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = !0,
            s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null) r = e.style[t];
            if (Ut.test(r)) return r;
            i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }

    function nn(e) {
        if (Wt[e]) return Wt[e];
        var t = v("<" + e + ">").appendTo(i.body),
            n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();
            t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)
        }
        return Wt[e] = n, n
    }

    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t)) v.each(t, function(t, i) {
            n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && v.type(t) === "object")
            for (i in t) fn(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function Cn(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n))
                for (; u < a; u++) r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
        }
    }

    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u, a = e[s],
            f = 0,
            l = a ? a.length : 0,
            c = e === Sn;
        for (; f < l && (c || !u); f++) u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
        return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
    }

    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && v.extend(!0, e, i)
    }

    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l) s in r && (n[l[s]] = r[s]);
        while (f[0] === "*") f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i)
            for (s in a)
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
        if (f[0] in r) o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o) return o !== f[0] && f.unshift(o), r[o]
    }

    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
            u = o[0],
            a = {},
            f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1])
            for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];)
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n)
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                                    break
                                }
                            }
                        }
                    if (n !== !0)
                        if (n && e["throws"]) t = n(t);
                        else try {
                            t = n(t)
                        } catch (l) {
                            return {
                                state: "parsererror",
                                error: n ? l : "No conversion from " + u + " to " + i
                            }
                        }
                }
                u = i
            }
        return {
            state: "success",
            data: t
        }
    }

    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function $n() {
        return setTimeout(function() {
            qn = t
        }, 0), qn = v.now()
    }

    function Jn(e, t) {
        v.each(t, function(t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n)) return
        })
    }

    function Kn(e, t, n) {
        var r, i = 0,
            s = 0,
            o = Xn.length,
            u = v.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                var t = qn || $n(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    i = 1 - r,
                    s = 0,
                    o = f.tweens.length;
                for (; s < o; s++) f.tweens[s].run(i);
                return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) return r
        }
        return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
            p = e.style,
            d = {},
            m = [],
            g = e.nodeType && Gt(e);
        n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
            l.unqueued || c()
        }), l.unqueued++, h.always(function() {
            h.always(function() {
                l.unqueued--, v.queue(e, "fx").length || l.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r], a = a || s === "toggle";
                if (s === (g ? "hide" : "show")) continue;
                m.push(r)
            }
        }
        o = m.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function() {
                v(e).hide()
            }), h.done(function() {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in d) v.style(e, t, d[t])
            });
            for (r = 0; r < o; r++) i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }

    function Zn(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = $t[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function(e, t) {
            return new v.fn.init(e, t, n)
        },
        m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function(e, t) {
            return (t + "").toUpperCase()
        },
        A = function() {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
        },
        O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function(e, n, r) {
            var s, o, u, a;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2]) return r.find(e);
                        this.length = 1, this[0] = o
                    }
                    return this.context = i, this.selector = e, this
                }
                return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return l.call(this)
        },
        get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
        },
        each: function(e, t) {
            return v.each(this, e, t)
        },
        ready: function(e) {
            return v.ready.promise().done(e), this
        },
        eq: function(e) {
            return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(v.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function() {
        var e, n, r, i, s, o, u = arguments[0] || {},
            a = 1,
            f = arguments.length,
            l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++)
            if ((e = arguments[a]) != null)
                for (n in e) {
                    r = u[n], i = e[n];
                    if (u === i) continue;
                    l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
                }
        return u
    }, v.extend({
        noConflict: function(t) {
            return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? v.readyWait++ : v.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --v.readyWait : v.isReady) return;
            if (!i.body) return setTimeout(v.ready, 1);
            v.isReady = !0;
            if (e !== !0 && --v.readyWait > 0) return;
            r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready")
        },
        isFunction: function(e) {
            return v.type(e) === "function"
        },
        isArray: Array.isArray || function(e) {
            return v.type(e) === "array"
        },
        isWindow: function(e) {
            return e != null && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return e == null ? String(e) : O[h.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            var r;
            for (r in e);
            return r === t || p.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var r;
            return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
        },
        parseJSON: function(t) {
            if (!t || typeof t != "string") return null;
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return (new Function("return " + t))();
            v.error("Invalid JSON: " + t)
        },
        parseXML: function(n) {
            var r, i;
            if (!n || typeof n != "string") return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch (s) {
                r = t
            }
            return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
        },
        noop: function() {},
        globalEval: function(t) {
            t && g.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(C, "ms-").replace(k, L)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, r) {
            var i, s = 0,
                o = e.length,
                u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e)
                        if (n.apply(e[i], r) === !1) break
                } else
                    for (; s < o;)
                        if (n.apply(e[s++], r) === !1) break
            } else if (u) {
                for (i in e)
                    if (n.call(e[i], i, e[i]) === !1) break
            } else
                for (; s < o;)
                    if (n.call(e[s], s, e[s++]) === !1) break; return e
        },
        trim: d && !d.call("﻿ ") ? function(e) {
            return e == null ? "" : d.call(e)
        } : function(e) {
            return e == null ? "" : (e + "").replace(b, "")
        },
        makeArray: function(e, t) {
            var n, r = t || [];
            return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (c) return c.call(t, e, n);
                r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                for (; n < r; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r == "number")
                for (; s < r; s++) e[i++] = n[s];
            else
                while (n[s] !== t) e[i++] = n[s++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !!n;
            for (; s < o; s++) r = !!t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function(e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f)
                for (; u < a; u++) i = n(e[u], u, r), i != null && (o[o.length] = i);
            else
                for (s in e) i = n(e[s], s, r), i != null && (o[o.length] = i);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, s;
            return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function() {
                return e.apply(n, i.concat(l.call(arguments)))
            }, s.guid = e.guid = e.guid || v.guid++, s) : t
        },
        access: function(e, n, r, i, s, o, u) {
            var a, f = r == null,
                l = 0,
                c = e.length;
            if (r && typeof r == "object") {
                for (l in r) v.access(e, n, l, r[l], 1, o, i);
                s = 1
            } else if (i !== t) {
                a = u === t && v.isFunction(i), f && (a ? (a = n, n = function(e, t, n) {
                    return a.call(v(e), n)
                }) : (n.call(e, i), n = null));
                if (n)
                    for (; l < c; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                s = 1
            }
            return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }), v.ready.promise = function(t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") setTimeout(v.ready, 1);
            else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);
            else {
                i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
                var n = !1;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch (s) {}
                n && n.doScroll && function o() {
                    if (!v.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(o, 50)
                        }
                        v.ready()
                    }
                }()
            }
        }
        return r.promise(t)
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    }), n = v(i);
    var M = {};
    v.Callbacks = function(e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [],
            f = !e.once && [],
            l = function(t) {
                n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
                for (; a && u < o; u++)
                    if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
            },
            c = {
                add: function() {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function(t, n) {
                                var i = v.type(n);
                                i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
                            })
                        })(arguments), i ? o = a.length : n && (s = t, l(n))
                    }
                    return this
                },
                remove: function() {
                    return a && v.each(arguments, function(e, t) {
                        var n;
                        while ((n = v.inArray(t, a, n)) > -1) a.splice(n, 1), i && (n <= o && o--, n <= u && u--)
                    }), this
                },
                has: function(e) {
                    return v.inArray(e, a) > -1
                },
                empty: function() {
                    return a = [], this
                },
                disable: function() {
                    return a = f = n = t, this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return f = t, n || c.disable(), this
                },
                locked: function() {
                    return !f
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return c
    }, v.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", v.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return v.Deferred(function(n) {
                            v.each(t, function(t, r) {
                                var s = r[0],
                                    o = e[t];
                                i[r[1]](v.isFunction(o) ? function() {
                                    var e = o.apply(this, arguments);
                                    e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
                                } : n[s])
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? v.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, v.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = l.call(arguments),
                r = n.length,
                i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : v.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    }), v.support = function() {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];
        if (!n || !r || !n.length) return {};
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = !1
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function() {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
        if (p.attachEvent)
            for (l in {
                submit: !0,
                change: !0,
                focusin: !0
            }) f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
        return v(function() {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                a = i.getElementsByTagName("body")[0];
            if (!a) return;
            n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null
        }), a.removeChild(p), n = r = s = o = u = a = p = null, t
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e)
        },
        data: function(e, n, r, i) {
            if (!v.acceptData(e)) return;
            var s, o, u = v.expando,
                a = typeof n == "string",
                f = e.nodeType,
                l = f ? v.cache : e,
                c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o
        },
        removeData: function(e, t, n) {
            if (!v.acceptData(e)) return;
            var r, i, s, o = e.nodeType,
                u = o ? v.cache : e,
                a = o ? e[v.expando] : v.expando;
            if (!u[a]) return;
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, s = t.length; i < s; i++) delete r[t[i]];
                    if (!(n ? B : v.isEmptyObject)(r)) return
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) return
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
        },
        _data: function(e, t, n) {
            return v.data(e, t, n, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), v.fn.extend({
        data: function(e, n) {
            var r, i, s, o, u, a = this[0],
                f = 0,
                l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                        v._data(a, "parsedAttrs", !0)
                    }
                }
                return l
            }
            return typeof e == "object" ? this.each(function() {
                v.data(this, e)
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function(n) {
                if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
                r[1] = n, this.each(function() {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                v.removeData(this, e)
            })
        }
    }), v.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = v._queueHooks(e, t),
                o = function() {
                    v.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                    empty: v.Callbacks("once memory").add(function() {
                        v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
                    })
                })
        }
    }), v.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                v.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
                s = v.Deferred(),
                o = this,
                u = this.length,
                a = function() {
                    --i || s.resolveWith(o, [o])
                };
            typeof e != "string" && (n = e, e = t), e = e || "fx";
            while (u--) r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
            return a(), s.promise(n)
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function(e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                v.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = v.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1) i.className = e;
                        else {
                            s = " " + i.className + " ";
                            for (o = 0, u = t.length; o < u; o++) s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                            i.className = v.trim(s)
                        }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++)
                            while (r.indexOf(" " + n[s] + " ") >= 0) r = r.replace(" " + n[s] + " ", " ");
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function(n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, s = 0,
                        o = v(this),
                        u = t,
                        a = e.split(y);
                    while (i = a[s++]) u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
                return
            }
            return i = v.isFunction(e), this.each(function(r) {
                var s, o = v(this);
                if (this.nodeType !== 1) return;
                i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function(e) {
                    return e == null ? "" : e + ""
                })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s
            })
        }
    }), v.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                            t = v(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n = v.makeArray(t);
                    return v(e).find("option").each(function() {
                        this.selected = v.inArray(v(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) return;
            if (i && v.isFunction(v.fn[n])) return v(e)[n](r);
            if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);
            u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return
                }
                return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r)
            }
            return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s)
        },
        removeAttr: function(e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");
                    else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (j && v.nodeName(e, "button")) return j.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) return;
            return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), F = {
        get: function(e, n) {
            var r, i = v.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, V || (I = {
        name: !0,
        id: !0,
        coords: !0
    }, j = v.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
        },
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
        }
    }, v.each(["width", "height"], function(e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {
            set: function(e, n) {
                if (n === "") return e.setAttribute(t, "auto"), n
            }
        })
    }), v.attrHooks.contenteditable = {
        get: j.get,
        set: function(e, t, n) {
            t === "" && (t = "false"), j.set(e, t, n)
        }
    }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function(e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }), v.support.style || (v.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e,
                      t) {
            return e.style.cssText = t + ""
        }
    }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function() {
        v.valHooks[this] = {
            get: function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }), v.each(["radio", "checkbox"], function() {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function(e, t) {
                if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function(e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
        };
    v.event = {
        add: function(e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;
            r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function(e) {
                return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
            }, u.elem = e), n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
                    type: c,
                    origType: l[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && v.expr.match.needsContext.test(s),
                    namespace: h.join(".")
                }, d), m = a[c];
                if (!m) {
                    m = a[c] = [], m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === !1) e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                }
                g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0
            }
            e = null
        },
        global: {},
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events)) return;
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
                if (!u) {
                    for (u in h) v.event.remove(e, u + t[s], n, r, !0);
                    continue
                }
                p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++) m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
                d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
            }
            v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, r, s, o) {
            if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                    b = [];
                if (Y.test(y + v.event.triggered)) return;
                y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
                if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;
                n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
                if (!s) {
                    u = v.cache;
                    for (f in u) u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                    return
                }
                n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
                if (p.trigger && p.trigger.apply(s, r) === !1) return;
                m = [
                    [s, p.bindType || y]
                ];
                if (!o && !p.noBubble && !v.isWindow(s)) {
                    g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
                    for (c = s; l; l = l.parentNode) m.push([l, g]), c = l;
                    c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
                }
                for (f = 0; f < m.length && !n.isPropagationStopped(); f++) l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
            }
            return
        },
        dispatch: function(n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
                m = d.delegateCount,
                g = l.call(arguments),
                y = !n.exclusive && !n.namespace,
                b = v.event.special[n.type] || {},
                w = [];
            g[0] = n, n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;
            if (m && (!n.button || n.type !== "click"))
                for (s = n.target; s != this; s = s.parentNode || this)
                    if (s.disabled !== !0 || n.type !== "click") {
                        u = {}, f = [];
                        for (r = 0; r < m; r++) c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
                        f.length && w.push({
                            elem: s,
                            matches: f
                        })
                    }
            d.length > m && w.push({
                elem: this,
                matches: d.slice(m)
            });
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r], n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
                }
            }
            return b.postDispatch && b.postDispatch.call(this, n), n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, s, o, u = n.button,
                    a = n.fromElement;
                return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[v.expando]) return e;
            var t, n, r = e,
                s = v.event.fixHooks[e.type] || {},
                o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;) n = o[--t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    v.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
    }, v.Event = function(e, t) {
        if (!(this instanceof v.Event)) return new v.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0
    }, v.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        stopPropagation: function() {
            this.isPropagationStopped = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = tt, this.stopPropagation()
        },
        isDefaultPrevented: et,
        isPropagationStopped: et,
        isImmediatePropagationStopped: et
    }, v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj,
                    o = s.selector;
                if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), v.support.submitBubbles || (v.event.special.submit = {
        setup: function() {
            if (v.nodeName(this, "form")) return !1;
            v.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target,
                    r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), v._data(r, "_submit_attached", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            if (v.nodeName(this, "form")) return !1;
            v.event.remove(this, "._submit")
        }
    }), v.support.changeBubbles || (v.event.special.change = {
        setup: function() {
            if ($.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function(e) {
                    e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), v.event.add(this, "click._change", function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
                });
                return !1
            }
            v.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function(e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
                }), v._data(t, "_change_attached", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return v.event.remove(this, "._change"), !$.test(this.nodeName)
        }
    }), v.support.focusinBubbles || v.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                v.event.simulate(t, e.target, v.event.fix(e), !0)
            };
        v.event.special[t] = {
            setup: function() {
                n++ === 0 && i.addEventListener(e, r, !0)
            },
            teardown: function() {
                --n === 0 && i.removeEventListener(e, r, !0)
            }
        }
    }), v.fn.extend({
        on: function(e, n, r, i, s) {
            var o, u;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (u in e) this.on(u, n, r, e[u], s);
                return this
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1) i = et;
            else if (!i) return this;
            return s === 1 && (o = i, i = function(e) {
                return v().off(e), o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function() {
                v.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if (typeof e == "object") {
                for (s in e) this.off(s, n, e[s]);
                return this
            }
            if (n === !1 || typeof n == "function") r = n, n = t;
            return r === !1 && (r = et), this.each(function() {
                v.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            return v(this.context).on(e, this.selector, t, n), this
        },
        die: function(e, t) {
            return v(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                v.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0]) return v.event.trigger(e, t, this[0], !0)
        },
        toggle: function(e) {
            var t = arguments,
                n = e.guid || v.guid++,
                r = 0,
                i = function(n) {
                    var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                    return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
                };
            i.guid = n;
            while (r < t.length) t[r++].guid = n;
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        v.fn[t] = function(e, n) {
            return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
    }),
        function(e, t) {
            function nt(e, t, n, r) {
                n = n || [], t = t || g;
                var i, s, a, f, l = t.nodeType;
                if (!e || typeof e != "string") return n;
                if (l !== 1 && l !== 9) return [];
                a = o(t);
                if (!a && !r)
                    if (i = R.exec(e))
                        if (f = i[1]) {
                            if (l === 9) {
                                s = t.getElementById(f);
                                if (!s || !s.parentNode) return n;
                                if (s.id === f) return n.push(s), n
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n
                        } else {
                            if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
                            if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
                        }
                return vt(e.replace(j, "$1"), t, n, r, a)
            }

            function rt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }

            function it(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }

            function st(e) {
                return N(function(t) {
                    return t = +t, N(function(n, r) {
                        var i, s = e([], n.length, t),
                            o = s.length;
                        while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function ot(e, t, n) {
                if (e === t) return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t) return -1;
                    r = r.nextSibling
                }
                return 1
            }

            function ut(e, t) {
                var n, r, s, o, u, a, f, l = L[d][e + " "];
                if (l) return t ? 0 : l.slice(0);
                u = e, a = [], f = i.preFilter;
                while (u) {
                    if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);
                    n = !1;
                    if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                    for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                    if (!n) break
                }
                return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
            }

            function at(e, t, r) {
                var i = t.dir,
                    s = r && t.dir === "parentNode",
                    o = w++;
                return t.first ? function(t, n, r) {
                    while (t = t[i])
                        if (s || t.nodeType === 1) return e(t, n, r)
                } : function(t, r, u) {
                    if (!u) {
                        var a, f = b + " " + o + " ",
                            l = f + n;
                        while (t = t[i])
                            if (s || t.nodeType === 1) {
                                if ((a = t[d]) === l) return t.sizset;
                                if (typeof a == "string" && a.indexOf(f) === 0) {
                                    if (t.sizset) return t
                                } else {
                                    t[d] = l;
                                    if (e(t, r, u)) return t.sizset = !0, t;
                                    t.sizset = !1
                                }
                            }
                    } else
                        while (t = t[i])
                            if (s || t.nodeType === 1)
                                if (e(t, r, u)) return t
                }
            }

            function ft(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function lt(e, t, n, r, i) {
                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                return o
            }

            function ct(e, t, n, r, i, s) {
                return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function(s, o, u, a) {
                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || dt(t || "*", u.nodeType ? [u] : u, []),
                        m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                    n && n(m, g, u, a);
                    if (r) {
                        f = lt(g, p), r(f, [], u, a), l = f.length;
                        while (l--)
                            if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                    }
                    if (s) {
                        if (i || e) {
                            if (i) {
                                f = [], l = g.length;
                                while (l--)(c = g[l]) && f.push(m[l] = c);
                                i(null, g = [], f, a)
                            }
                            l = g.length;
                            while (l--)(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                        }
                    } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
                })
            }

            function ht(e) {
                var t, n, r, s = e.length,
                    o = i.relative[e[0].type],
                    u = o || i.relative[" "],
                    a = o ? 1 : 0,
                    f = at(function(e) {
                        return e === t
                    }, u, !0),
                    l = at(function(e) {
                        return T.call(t, e) > -1
                    }, u, !0),
                    h = [function(e, n, r) {
                        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
                    }];
                for (; a < s; a++)
                    if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
                    else {
                        n = i.filter[e[a].type].apply(null, e[a].matches);
                        if (n[d]) {
                            r = ++a;
                            for (; r < s; r++)
                                if (i.relative[e[r].type]) break;
                            return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                        }
                        h.push(n)
                    }
                return ft(h)
            }

            function pt(e, t) {
                var r = t.length > 0,
                    s = e.length > 0,
                    o = function(u, a, f, l, h) {
                        var p, d, v, m = [],
                            y = 0,
                            w = "0",
                            x = u && [],
                            T = h != null,
                            N = c,
                            C = u || s && i.find.TAG("*", h && a.parentNode || a),
                            k = b += N == null ? 1 : Math.E;
                        T && (c = a !== g && a, n = o.el);
                        for (;
                            (p = C[w]) != null; w++) {
                            if (s && p) {
                                for (d = 0; v = e[d]; d++)
                                    if (v(p, a, f)) {
                                        l.push(p);
                                        break
                                    }
                                T && (b = k, n = ++o.el)
                            }
                            r && ((p = !v && p) && y--, u && x.push(p))
                        }
                        y += w;
                        if (r && w !== y) {
                            for (d = 0; v = t[d]; d++) v(x, m, a, f);
                            if (u) {
                                if (y > 0)
                                    while (w--) !x[w] && !m[w] && (m[w] = E.call(l));
                                m = lt(m)
                            }
                            S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                        }
                        return T && (b = k, c = N), x
                    };
                return o.el = 0, r ? N(o) : o
            }

            function dt(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; r < i; r++) nt(e, t[r], n);
                return n
            }

            function vt(e, t, n, r, s) {
                var o, u, f, l, c, h = ut(e),
                    p = h.length;
                if (!r && h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                        t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                        if (!t) return n;
                        e = e.slice(u.shift().length)
                    }
                    for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                        f = u[o];
                        if (i.relative[l = f.type]) break;
                        if (c = i.find[l])
                            if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                                u.splice(o, 1), e = r.length && u.join("");
                                if (!e) return S.apply(n, x.call(r, 0)), n;
                                break
                            }
                    }
                }
                return a(e, h)(r, t, s, n, z.test(e)), n
            }

            function mt() {}
            var n, r, i, s, o, u, a, f, l, c, h = !0,
                p = "undefined",
                d = ("sizcache" + Math.random()).replace(".", ""),
                m = String,
                g = e.document,
                y = g.documentElement,
                b = 0,
                w = 0,
                E = [].pop,
                S = [].push,
                x = [].slice,
                T = [].indexOf || function(e) {
                        var t = 0,
                            n = this.length;
                        for (; t < n; t++)
                            if (this[t] === e) return t;
                        return -1
                    },
                N = function(e, t) {
                    return e[d] = t == null || t, e
                },
                C = function() {
                    var e = {},
                        t = [];
                    return N(function(n, r) {
                        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }, e)
                },
                k = C(),
                L = C(),
                A = C(),
                O = "[\\x20\\t\\r\\n\\f]",
                M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                _ = M.replace("w", "w#"),
                D = "([*^$|!~]?=)",
                P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
                H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
                B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
                j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                F = new RegExp("^" + O + "*," + O + "*"),
                I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
                q = new RegExp(H),
                R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                U = /^:not/,
                z = /[\x20\t\r\n\f]*[+~]/,
                W = /:not\($/,
                X = /h\d/i,
                V = /input|select|textarea|button/i,
                $ = /\\(?!\\)/g,
                J = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + P),
                    PSEUDO: new RegExp("^" + H),
                    POS: new RegExp(B, "i"),
                    CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
                },
                K = function(e) {
                    var t = g.createElement("div");
                    try {
                        return e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t = null
                    }
                },
                Q = K(function(e) {
                    return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
                }),
                G = K(function(e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
                }),
                Y = K(function(e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return t !== "boolean" && t !== "string"
                }),
                Z = K(function(e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
                }),
                et = K(function(e) {
                    e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
                    var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
                    return r = !g.getElementById(d), y.removeChild(e), t
                });
            try {
                x.call(y.childNodes, 0)[0].nodeType
            } catch (tt) {
                x = function(e) {
                    var t, n = [];
                    for (; t = this[e]; e++) n.push(t);
                    return n
                }
            }
            nt.matches = function(e, t) {
                return nt(e, null, null, t)
            }, nt.matchesSelector = function(e, t) {
                return nt(t, null, null, [e]).length > 0
            }, s = nt.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (i === 1 || i === 9 || i === 11) {
                        if (typeof e.textContent == "string") return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
                    } else if (i === 3 || i === 4) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += s(t);
                return n
            }, o = nt.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }, u = nt.contains = y.contains ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
            } : y.compareDocumentPosition ? function(e, t) {
                return t && !!(e.compareDocumentPosition(t) & 16)
            } : function(e, t) {
                while (t = t.parentNode)
                    if (t === e) return !0;
                return !1
            }, nt.attr = function(e, t) {
                var n, r = o(e);
                return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
            }, i = nt.selectors = {
                cacheLength: 50,
                createPseudo: N,
                match: J,
                attrHandle: G ? {} : {
                    href: function(e) {
                        return e.getAttribute("href", 2)
                    },
                    type: function(e) {
                        return e.getAttribute("type")
                    }
                },
                find: {
                    ID: r ? function(e, t, n) {
                        if (typeof t.getElementById !== p && !n) {
                            var r = t.getElementById(e);
                            return r && r.parentNode ? [r] : []
                        }
                    } : function(e, n, r) {
                        if (typeof n.getElementById !== p && !r) {
                            var i = n.getElementById(e);
                            return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
                        }
                    },
                    TAG: Q ? function(e, t) {
                        if (typeof t.getElementsByTagName !== p) return t.getElementsByTagName(e)
                    } : function(e, t) {
                        var n = t.getElementsByTagName(e);
                        if (e === "*") {
                            var r, i = [],
                                s = 0;
                            for (; r = n[s]; s++) r.nodeType === 1 && i.push(r);
                            return i
                        }
                        return n
                    },
                    NAME: et && function(e, t) {
                        if (typeof t.getElementsByName !== p) return t.getElementsByName(name)
                    },
                    CLASS: Z && function(e, t, n) {
                        if (typeof t.getElementsByClassName !== p && !n) return t.getElementsByClassName(e)
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n;
                        if (J.CHILD.test(e[0])) return null;
                        if (e[3]) e[2] = e[3];
                        else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;
                        return e.slice(0, 3)
                    }
                },
                filter: {
                    ID: r ? function(e) {
                        return e = e.replace($, ""),
                            function(t) {
                                return t.getAttribute("id") === e
                            }
                    } : function(e) {
                        return e = e.replace($, ""),
                            function(t) {
                                var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                                return n && n.value === e
                            }
                    },
                    TAG: function(e) {
                        return e === "*" ? function() {
                            return !0
                        } : (e = e.replace($, "").toLowerCase(), function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        })
                    },
                    CLASS: function(e) {
                        var t = k[d][e + " "];
                        return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function(e) {
                                return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                            })
                    },
                    ATTR: function(e, t, n) {
                        return function(r, i) {
                            var s = nt.attr(r, e);
                            return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r) {
                        return e === "nth" ? function(e) {
                            var t, i, s = e.parentNode;
                            if (n === 1 && r === 0) return !0;
                            if (s) {
                                i = 0;
                                for (t = s.firstChild; t; t = t.nextSibling)
                                    if (t.nodeType === 1) {
                                        i++;
                                        if (e === t) break
                                    }
                            }
                            return i -= r, i === n || i % n === 0 && i / n >= 0
                        } : function(t) {
                            var n = t;
                            switch (e) {
                                case "only":
                                case "first":
                                    while (n = n.previousSibling)
                                        if (n.nodeType === 1) return !1;
                                    if (e === "first") return !0;
                                    n = t;
                                case "last":
                                    while (n = n.nextSibling)
                                        if (n.nodeType === 1) return !1;
                                    return !0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                        return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
                            var i, s = r(e, t),
                                o = s.length;
                            while (o--) i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
                        }) : function(e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: N(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(j, "$1"));
                        return r[d] ? N(function(e, t, n, i) {
                            var s, o = r(e, null, i, []),
                                u = e.length;
                            while (u--)
                                if (s = o[u]) e[u] = !(t[u] = s)
                        }) : function(e, i, s) {
                            return t[0] = e, r(t, null, s, n), !n.pop()
                        }
                    }),
                    has: N(function(e) {
                        return function(t) {
                            return nt(e, t).length > 0
                        }
                    }),
                    contains: N(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                        }
                    }),
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && !!e.checked || t === "option" && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    empty: function(e) {
                        var t;
                        e = e.firstChild;
                        while (e) {
                            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;
                            e = e.nextSibling
                        }
                        return !0
                    },
                    header: function(e) {
                        return X.test(e.nodeName)
                    },
                    text: function(e) {
                        var t, n;
                        return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                    },
                    radio: rt("radio"),
                    checkbox: rt("checkbox"),
                    file: rt("file"),
                    password: rt("password"),
                    image: rt("image"),
                    submit: it("submit"),
                    reset: it("reset"),
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && e.type === "button" || t === "button"
                    },
                    input: function(e) {
                        return V.test(e.nodeName)
                    },
                    focus: function(e) {
                        var t = e.ownerDocument;
                        return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    active: function(e) {
                        return e === e.ownerDocument.activeElement
                    },
                    first: st(function() {
                        return [0]
                    }),
                    last: st(function(e, t) {
                        return [t - 1]
                    }),
                    eq: st(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: st(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: st(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: st(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: st(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, f = y.compareDocumentPosition ? function(e, t) {
                return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
            } : function(e, t) {
                if (e === t) return l = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    u = t.parentNode,
                    a = o;
                if (o === u) return ot(e, t);
                if (!o) return -1;
                if (!u) return 1;
                while (a) i.unshift(a), a = a.parentNode;
                a = u;
                while (a) s.unshift(a), a = a.parentNode;
                n = i.length, r = s.length;
                for (var f = 0; f < n && f < r; f++)
                    if (i[f] !== s[f]) return ot(i[f], s[f]);
                return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
            }, [0, 0].sort(f), h = !l, nt.uniqueSort = function(e) {
                var t, n = [],
                    r = 1,
                    i = 0;
                l = h, e.sort(f);
                if (l) {
                    for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                    while (i--) e.splice(n[i], 1)
                }
                return e
            }, nt.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, a = nt.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    s = A[d][e + " "];
                if (!s) {
                    t || (t = ut(e)), n = t.length;
                    while (n--) s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                    s = A(e, pt(i, r))
                }
                return s
            }, g.querySelectorAll && function() {
                var e, t = vt,
                    n = /'|\\/g,
                    r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    i = [":focus"],
                    s = [":active"],
                    u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                K(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
                }), K(function(e) {
                    e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
                }), i = new RegExp(i.join("|")), vt = function(e, r, s, o, u) {
                    if (!o && !u && !i.test(e)) {
                        var a, f, l = !0,
                            c = d,
                            h = r,
                            p = r.nodeType === 9 && e;
                        if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
                            while (f--) a[f] = c + a[f].join("");
                            h = z.test(e) && r.parentNode || r, p = a.join(",")
                        }
                        if (p) try {
                            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
                        } catch (v) {} finally {
                            l || r.removeAttribute("id")
                        }
                    }
                    return t(e, r, s, o, u)
                }, u && (K(function(t) {
                    e = u.call(t, "div");
                    try {
                        u.call(t, "[test!='']:sizzle"), s.push("!=", H)
                    } catch (n) {}
                }), s = new RegExp(s.join("|")), nt.matchesSelector = function(t, n) {
                    n = n.replace(r, "='$1']");
                    if (!o(t) && !s.test(n) && !i.test(n)) try {
                        var a = u.call(t, n);
                        if (a || e || t.document && t.document.nodeType !== 11) return a
                    } catch (f) {}
                    return nt(n, null, null, [t]).length > 0
                })
            }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
        }(e);
    var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    v.fn.extend({
        find: function(e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string") return v(e).filter(function() {
                for (t = 0, n = u.length; t < n; t++)
                    if (v.contains(u[t], this)) return !0
            });
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length, v.find(e, this[t], o);
                if (t > 0)
                    for (i = r; i < o.length; i++)
                        for (s = 0; s < r; s++)
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break
                            }
            }
            return o
        },
        has: function(e) {
            var t, n = v(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; t < r; t++)
                    if (v.contains(this, n[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(ft(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(ft(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
        },
        index: function(e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
                r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), v.fn.andSelf = v.fn.addBack, v.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return v.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return v.dir(e, "parentNode", n)
        },
        next: function(e) {
            return at(e, "nextSibling")
        },
        prev: function(e) {
            return at(e, "previousSibling")
        },
        nextAll: function(e) {
            return v.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return v.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return v.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return v.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return v.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return v.sibling(e.firstChild)
        },
        contents: function(e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
        }
    }, function(e, t) {
        v.fn[e] = function(n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
        }
    }), v.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [],
                s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) s.nodeType === 1 && i.push(s), s = s[n];
            return i
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
        text: function(
            e) {
            return v.access(this, function(e) {
                return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return v.isFunction(e) ? this.each(function(t) {
                v(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = v(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = v.isFunction(e);
            return this.each(function(n) {
                v(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            var n, r = 0;
            for (;
                (n = this[r]) != null; r++)
                if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
            return this
        },
        empty: function() {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) {
                e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                while (e.firstChild) e.removeChild(e.firstChild)
            }
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                return v.clone(this, e, t)
            })
        },
        html: function(e) {
            return v.access(this, function(e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(dt, "<$1></$2>");
                    try {
                        for (; r < i; r++) n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        n = 0
                    } catch (s) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function(e) {
            return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function(t) {
                var n = v(this),
                    r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = v(e).detach()), this.each(function() {
                var t = this.nextSibling,
                    n = this.parentNode;
                v(this).remove(), t ? v(t).before(e) : v(n).append(e)
            }))
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, r) {
            e = [].concat.apply([], e);
            var i, s, o, u, a = 0,
                f = e[0],
                l = [],
                c = this.length;
            if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function() {
                v(this).domManip(e, n, r)
            });
            if (v.isFunction(f)) return this.each(function(i) {
                var s = v(this);
                e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
            });
            if (this[0]) {
                i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
                if (s) {
                    n = n && v.nodeName(s, "tr");
                    for (u = i.cacheable || c - 1; a < c; a++) r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
                }
                o = s = null, l.length && v.each(l, function(e, t) {
                    t.src ? v.ajax ? v.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), v.buildFragment = function(e, n, r) {
        var s, o, u, a = e[0];
        return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
            fragment: s,
            cacheable: o
        }
    }, v.fragments = {}, v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        v.fn[e] = function(n) {
            var r, i = 0,
                s = [],
                o = v(n),
                u = o.length,
                a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;
            for (; i < u; i++) r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
            return this.pushStack(s, e, o.selector)
        }
    }), v.extend({
        clone: function(e, t, n) {
            var r, i, s, o;
            v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
            if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                Ot(e, o), r = Mt(e), i = Mt(o);
                for (s = 0; r[s]; ++s) i[s] && Ot(r[s], i[s])
            }
            if (t) {
                At(e, o);
                if (n) {
                    r = Mt(e), i = Mt(o);
                    for (s = 0; r[s]; ++s) At(r[s], i[s])
                }
            }
            return r = i = null, o
        },
        clean: function(e, t, n, r) {
            var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
                b = [];
            if (!t || typeof t.createDocumentFragment == "undefined") t = i;
            for (s = 0;
                 (u = e[s]) != null; s++) {
                typeof u == "number" && (u += "");
                if (!u) continue;
                if (typeof u == "string")
                    if (!gt.test(u)) u = t.createTextNode(u);
                    else {
                        y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
                        while (l--) c = c.lastChild;
                        if (!v.support.tbody) {
                            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                            for (o = p.length - 1; o >= 0; --o) v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                        }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
                    }
                u.nodeType ? b.push(u) : v.merge(b, u)
            }
            c && (u = c = y = null);
            if (!v.support.appendChecked)
                for (s = 0;
                     (u = b[s]) != null; s++) v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
            if (n) {
                m = function(e) {
                    if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                };
                for (s = 0;
                     (u = b[s]) != null; s++)
                    if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
            }
            return b
        },
        cleanData: function(e, t) {
            var n, r, i, s, o = 0,
                u = v.expando,
                a = v.cache,
                f = v.support.deleteExpando,
                l = v.event.special;
            for (;
                (i = e[o]) != null; o++)
                if (t || v.acceptData(i)) {
                    r = i[u], n = r && a[r];
                    if (n) {
                        if (n.events)
                            for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                        a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
                    }
                }
        }
    }),
        function() {
            var e, t;
            v.uaMatch = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function() {
                function e(t, n) {
                    return new e.fn.init(t, n)
                }
                v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(r, i) {
                    return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
                }, e.fn.init.prototype = e.fn;
                var t = e(i);
                return e
            }
        }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = {
            BODY: "block"
        },
        Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Vt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;
    v.fn.extend({
        css: function(e, n) {
            return v.access(this, function(e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return Yt(this, !0)
        },
        hide: function() {
            return Yt(this)
        },
        toggle: function(e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function() {
                (n ? e : Gt(this)) ? v(this).show(): v(this).hide()
            })
        }
    }), v.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var s, o, u, a = v.camelCase(n),
                f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
            if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
            o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
            if (r == null || o === "number" && isNaN(r)) return;
            o === "number" && !v.cssNumber[a] && (r += "px");
            if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
                f[n] = r
            } catch (l) {}
        },
        css: function(e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
        },
        swap: function(e, t, n) {
            var r, i, s = {};
            for (i in t) s[i] = e.style[i], e.style[i] = t[i];
            r = n.call(e);
            for (i in t) e.style[i] = s[i];
            return r
        }
    }), e.getComputedStyle ? Dt = function(t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null),
            a = t.style;
        return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
    } : i.documentElement.currentStyle && (Dt = function(e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t],
            s = e.style;
        return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i
    }), v.each(["height", "width"], function(e, t) {
        v.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function() {
                    return tn(e, t, r)
                }) : tn(e, t, r)
            },
            set: function(e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
            }
        }
    }), v.support.opacity || (v.cssHooks.opacity = {
        get: function(e, t) {
            return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                n.removeAttribute("filter");
                if (r && !r.filter) return
            }
            n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
        }
    }), v(function() {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {
            get: function(e, t) {
                return v.swap(e, {
                    display: "inline-block"
                }, function() {
                    if (t) return Dt(e, "marginRight")
                })
            }
        }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function(e, t) {
            v.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        var r = Dt(e, t);
                        return Ut.test(r) ? v(e).position()[t] + "px" : r
                    }
                }
            }
        })
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function(e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
    }, v.expr.filters.visible = function(e) {
        return !v.expr.filters.hidden(e)
    }), v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        v.cssHooks[e + t] = {
            expand: function(n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                return s
            }
        }, qt.test(e) || (v.cssHooks[e + t].set = Zt)
    });
    var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
            }).map(function(e, t) {
                var n = v(this).val();
                return n == null ? null : v.isArray(n) ? v.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(on, "\r\n")
                }
            }).get()
        }
    }), v.param = function(e, n) {
        var r, i = [],
            s = function(e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function() {
            s(this.name, this.value)
        });
        else
            for (r in e) fn(r, e[r], n, s);
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {},
        xn = {},
        Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a"), cn.href = "", cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function(e, n, r) {
        if (typeof e != "string" && En) return En.apply(this, arguments);
        if (!this.length) return this;
        var i, s, o, u = this,
            a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                r && u.each(r, o || [e.responseText, t, e])
            }
        }).done(function(e) {
            o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
        }), this
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        v.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), v.each(["get", "post"], function(e, n) {
        v[n] = function(e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            })
        }
    }), v.extend({
        getScript: function(e, n) {
            return v.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return v.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function(e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) return;
                E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
                if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);
                else {
                    b = T;
                    if (!T || e) T = "error", e < 0 && (e = 0)
                }
                x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e, e = t), n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
                h = c.context || c,
                p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
                d = v.Deferred(),
                m = v.Callbacks("once memory"),
                g = c.statusCode || {},
                b = {},
                w = {},
                E = 0,
                S = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e, b[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return E === 2 ? i : null
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i)) s[n[1].toLowerCase()] = n[2]
                            }
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function(e) {
                        return E || (c.mimeType = e), this
                    },
                    abort: function(e) {
                        return e = e || S, o && o.abort(e), T(0, e), this
                    }
                };
            d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function(e) {
                if (e) {
                    var t;
                    if (E < 2)
                        for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status], x.always(t)
                }
                return this
            }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
            if (E === 2) return x;
            f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
            if (!c.hasContent) {
                c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
                if (c.cache === !1) {
                    var N = v.now(),
                        C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
                }
            }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) x.setRequestHeader(l, c.headers[l]);
            if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                S = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[l](c[l]);
                o = kn(xn, c, n, x);
                if (!o) T(-1, "No Transport");
                else {
                    x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function() {
                        x.abort("timeout")
                    }, c.timeout));
                    try {
                        E = 1, o.send(b, T)
                    } catch (k) {
                        if (!(E < 2)) throw k;
                        T(-1, k)
                    }
                }
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0, e
        }
    }), v.ajaxPrefilter("json jsonp", function(n, r, i) {
        var s, o, u, a = n.data,
            f = n.url,
            l = n.jsonp !== !1,
            c = l && Dn.test(f),
            h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function() {
            return u || v.error(s + " was not called"), u[0]
        }, n.dataTypes[0] = "json", e[s] = function() {
            u = arguments
        }, i.always(function() {
            e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
        }), "script"
    }), v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return v.globalEval(e), e
            }
        }
    }), v.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), v.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function(s, o) {
                    n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success")
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Hn, Bn = e.ActiveXObject ? function() {
            for (var e in Hn) Hn[e](0, 1)
        } : !1,
        jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && Fn() || In()
    } : Fn,
        function(e) {
            v.extend(v.support, {
                ajax: !!e,
                cors: !!e && "withCredentials" in e
            })
        }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function(n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return {
                send: function(i, s) {
                    var o, u, a = n.xhr();
                    n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                    if (n.xhrFields)
                        for (u in n.xhrFields) a[u] = n.xhrFields[u];
                    n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (u in i) a.setRequestHeader(u, i[u])
                    } catch (f) {}
                    a.send(n.hasContent && n.data || null), r = function(e, i) {
                        var u, f, l, c, h;
                        try {
                            if (r && (i || a.readyState === 4)) {
                                r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                                if (i) a.readyState !== 4 && a.abort();
                                else {
                                    u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
                                    try {
                                        c.text = a.responseText
                                    } catch (p) {}
                                    try {
                                        f = a.statusText
                                    } catch (p) {
                                        f = ""
                                    }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                }
                            }
                        } catch (d) {
                            i || s(-1, d)
                        }
                        c && s(u, f, c, l)
                    }, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
                },
                abort: function() {
                    r && r(0, 1)
                }
            }
        }
    });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = {
            "*": [function(e, t) {
                var n, r, i = this.createTween(e, t),
                    s = zn.exec(t),
                    o = i.cur(),
                    u = +o || 0,
                    a = 1,
                    f = 20;
                if (s) {
                    n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
                    if (r !== "px" && u) {
                        u = v.css(i.elem, e, !0) || n || 1;
                        do a = a || ".5", u /= a, v.style(i.elem, e, u + r); while (a !== (a = i.cur() / o) && a !== 1 && --f)
                    }
                    i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
                }
                return i
            }]
        };
    v.Animation = v.extend(Kn, {
        tweener: function(e, t) {
            v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? Xn.unshift(e) : Xn.push(e)
        }
    }), v.Tween = Yn, Yn.prototype = {
        constructor: Yn,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Yn.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
        }
    }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, v.each(["toggle", "show", "hide"], function(e, t) {
        var n = v.fn[t];
        v.fn[t] = function(r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
        }
    }), v.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = v.isEmptyObject(e),
                s = v.speed(t, n, r),
                o = function() {
                    var t = Kn(this, v.extend({}, e), s);
                    i && t.stop(!0)
                };
            return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = e != null && e + "queueHooks",
                    s = v.timers,
                    o = v._data(this);
                if (n) o[n] && o[n].stop && i(o[n]);
                else
                    for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                for (n = s.length; n--;) s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
                (t || !r) && v.dequeue(this, e)
            })
        }
    }), v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        v.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), v.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? v.extend({}, e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete, r.complete = function() {
            v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
        }, r
    }, v.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function() {
        var e, n = v.timers,
            r = 0;
        qn = v.now();
        for (; r < n.length; r++) e = n[r], !e() && n[r] === e && n.splice(r--, 1);
        n.length || v.fx.stop(), qn = t
    }, v.fx.timer = function(e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
    }, v.fx.interval = 13, v.fx.stop = function() {
        clearInterval(Rn), Rn = null
    }, v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function(e) {
        return v.grep(v.timers, function(t) {
            return e === t.elem
        }).length
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            v.offset.setOffset(this, e, t)
        });
        var n, r, i, s, o, u, a, f = {
                top: 0,
                left: 0
            },
            l = this[0],
            c = l && l.ownerDocument;
        if (!c) return;
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
            top: f.top + u - s,
            left: f.left + a - o
        }) : f)
    }, v.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = v.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = v(e),
                s = i.offset(),
                o = v.css(e, "top"),
                u = v.css(e, "left"),
                a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
                f = {},
                l = {},
                c, h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
        }
    }, v.fn.extend({
        position: function() {
            if (!this[0]) return;
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = er.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") e = e.offsetParent;
                return e || i.body
            })
        }
    }), v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function(i) {
            return v.access(this, function(e, i, s) {
                var o = tr(e);
                if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
            }, e, i, arguments.length, null)
        }
    }), v.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            v.fn[i] = function(i, s) {
                var o = arguments.length && (r || typeof i != "boolean"),
                    u = r || (i === !0 || s === !0 ? "margin" : "border");
                return v.access(this, function(n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return v
    })
})(window),
    function(e, t) {
        var n = function() {
            var t = e._data(document, "events");
            return t && t.click && e.grep(t.click, function(e) {
                    return e.namespace === "rails"
                }).length
        };
        n() && e.error("jquery-ujs has already been loaded!");
        var r;
        e.rails = r = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input:file",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function(t) {
                var n = e('meta[name="csrf-token"]').attr("content");
                n && t.setRequestHeader("X-CSRF-Token", n)
            },
            fire: function(t, n, r) {
                var i = e.Event(n);
                return t.trigger(i, r), i.result !== !1
            },
            confirm: function(e) {
                return confirm(e)
            },
            ajax: function(t) {
                return e.ajax(t)
            },
            href: function(e) {
                return e.attr("href")
            },
            handleRemote: function(n) {
                var i, s, o, u, a, f, l, c;
                if (r.fire(n, "ajax:before")) {
                    u = n.data("cross-domain"), a = u === t ? null : u, f = n.data("with-credentials") || null, l = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType;
                    if (n.is("form")) {
                        i = n.attr("method"), s = n.attr("action"), o = n.serializeArray();
                        var h = n.data("ujs:submit-button");
                        h && (o.push(h), n.data("ujs:submit-button", null))
                    } else n.is(r.inputChangeSelector) ? (i = n.data("method"), s = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : (i = n.data("method"), s = r.href(n), o = n.data("params") || null);
                    c = {
                        type: i || "GET",
                        data: o,
                        dataType: l,
                        beforeSend: function(e, i) {
                            return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), r.fire(n, "ajax:beforeSend", [e, i])
                        },
                        success: function(e, t, r) {
                            n.trigger("ajax:success", [e, t, r])
                        },
                        complete: function(e, t) {
                            n.trigger("ajax:complete", [e, t])
                        },
                        error: function(e, t, r) {
                            n.trigger("ajax:error", [e, t, r])
                        },
                        xhrFields: {
                            withCredentials: f
                        },
                        crossDomain: a
                    }, s && (c.url = s);
                    var p = r.ajax(c);
                    return n.trigger("ajax:send", p), p
                }
                return !1
            },
            handleMethod: function(n) {
                var i = r.href(n),
                    s = n.data("method"),
                    o = n.attr("target"),
                    u = e("meta[name=csrf-token]").attr("content"),
                    a = e("meta[name=csrf-param]").attr("content"),
                    f = e('<form method="post" action="' + i + '"></form>'),
                    l = '<input name="_method" value="' + s + '" type="hidden" />';
                a !== t && u !== t && (l += '<input name="' + a + '" value="' + u + '" type="hidden" />'), o && f.attr("target", o), f.hide().append(l).appendTo("body"), f.submit()
            },
            disableFormElements: function(t) {
                t.find(r.disableSelector).each(function() {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
                })
            },
            enableFormElements: function(t) {
                t.find(r.enableSelector).each(function() {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
                })
            },
            allowAction: function(e) {
                var t = e.data("confirm"),
                    n = !1,
                    i;
                return t ? (r.fire(e, "confirm") && (n = r.confirm(t), i = r.fire(e, "confirm:complete", [n])), n && i) : !0
            },
            blankInputs: function(t, n, r) {
                var i = e(),
                    s, o, u = n || "input,textarea",
                    a = t.find(u);
                return a.each(function() {
                    s = e(this), o = s.is(":checkbox,:radio") ? s.is(":checked") : s.val();
                    if (!o == !r) {
                        if (s.is(":radio") && a.filter('input:radio:checked[name="' + s.attr("name") + '"]').length) return !0;
                        i = i.add(s)
                    }
                }), i.length ? i : !1
            },
            nonBlankInputs: function(e, t) {
                return r.blankInputs(e, t, !0)
            },
            stopEverything: function(t) {
                return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
            },
            callFormSubmitBindings: function(n, r) {
                var i = n.data("events"),
                    s = !0;
                return i !== t && i.submit !== t && e.each(i.submit, function(e, t) {
                    if (typeof t.handler == "function") return s = t.handler(r)
                }), s
            },
            disableElement: function(e) {
                e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
                    return r.stopEverything(e)
                })
            },
            enableElement: function(e) {
                e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)), e.unbind("click.railsDisable")
            }
        }, r.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, n) {
            e.crossDomain || r.CSRFProtection(n)
        }), e(document).delegate(r.linkDisableSelector, "ajax:complete", function() {
            r.enableElement(e(this))
        }), e(document).delegate(r.linkClickSelector, "click.rails", function(n) {
            var i = e(this),
                s = i.data("method"),
                o = i.data("params");
            if (!r.allowAction(i)) return r.stopEverything(n);
            i.is(r.linkDisableSelector) && r.disableElement(i);
            if (i.data("remote") !== t) {
                if ((n.metaKey || n.ctrlKey) &&
                    (!s || s === "GET") && !o) return !0;
                var u = r.handleRemote(i);
                return u === !1 ? r.enableElement(i) : u.error(function() {
                    r.enableElement(i)
                }), !1
            }
            if (i.data("method")) return r.handleMethod(i), !1
        }), e(document).delegate(r.inputChangeSelector, "change.rails", function(t) {
            var n = e(this);
            return r.allowAction(n) ? (r.handleRemote(n), !1) : r.stopEverything(t)
        }), e(document).delegate(r.formSubmitSelector, "submit.rails", function(n) {
            var i = e(this),
                s = i.data("remote") !== t,
                o = r.blankInputs(i, r.requiredInputSelector),
                u = r.nonBlankInputs(i, r.fileInputSelector);
            if (!r.allowAction(i)) return r.stopEverything(n);
            if (o && i.attr("novalidate") == t && r.fire(i, "ajax:aborted:required", [o])) return r.stopEverything(n);
            if (s) {
                if (u) {
                    setTimeout(function() {
                        r.disableFormElements(i)
                    }, 13);
                    var a = r.fire(i, "ajax:aborted:file", [u]);
                    return a || setTimeout(function() {
                        r.enableFormElements(i)
                    }, 13), a
                }
                return !e.support.submitBubbles && e().jquery < "1.7" && r.callFormSubmitBindings(i, n) === !1 ? r.stopEverything(n) : (r.handleRemote(i), !1)
            }
            setTimeout(function() {
                r.disableFormElements(i)
            }, 13)
        }), e(document).delegate(r.formInputClickSelector, "click.rails", function(t) {
            var n = e(this);
            if (!r.allowAction(n)) return r.stopEverything(t);
            var i = n.attr("name"),
                s = i ? {
                    name: i,
                    value: n.val()
                } : null;
            n.closest("form").data("ujs:submit-button", s)
        }), e(document).delegate(r.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
            this == t.target && r.disableFormElements(e(this))
        }), e(document).delegate(r.formSubmitSelector, "ajax:complete.rails", function(t) {
            this == t.target && r.enableFormElements(e(this))
        }), e(function() {
            csrf_token = e("meta[name=csrf-token]").attr("content"), csrf_param = e("meta[name=csrf-param]").attr("content"), e('form input[name="' + csrf_param + '"]').val(csrf_token)
        }))
    }(jQuery), ! function(e) {
    "use strict";
    e(function() {
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    n;
                for (n in t)
                    if (e.style[n] !== undefined) return t[n]
            }();
            return e && {
                    end: e
                }
        }()
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function(n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function(t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this),
            r = n.attr("data-target"),
            i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented()) return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this),
                i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented()) return;
            this.isShown = !0, this.escape(), this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            })
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this,
                n = setTimeout(function() {
                    t.$element.off(e.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function(e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this,
                r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this),
            r = n.attr("href"),
            i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = i.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function() {
            n.focus()
        })
    })
}(window.jQuery), ! function(e) {
    "use strict";

    function r() {
        e(t).each(function() {
            i(e(this)).removeClass("open")
        })
    }

    function i(t) {
        var n = t.attr("data-target"),
            r;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }
    var t = "[data-toggle=dropdown]",
        n = function(t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function() {
                n.parent().removeClass("open")
            })
        };
    n.prototype = {
        constructor: n,
        toggle: function(t) {
            var n = e(this),
                s, o;
            if (n.is(".disabled, :disabled")) return;
            return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
        },
        keydown: function(t) {
            var n, r, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode)) return;
            n = e(this), t.preventDefault(), t.stopPropagation();
            if (n.is(".disabled, :disabled")) return;
            o = i(n), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27) return n.click();
            r = e("[role=menu] li:not(.divider) a", o);
            if (!r.length) return;
            a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
        }
    }, e.fn.dropdown = function(t) {
        return this.each(function() {
            var r = e(this),
                i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(document).on("click.dropdown.data-api touchstart.dropdown.data-api", r).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery), ! function(e) {
    "use strict";

    function t(t, n) {
        var r = e.proxy(this.process, this),
            i = e(t).is("body") ? e(window) : e(t),
            s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function() {
            var t = this,
                n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function() {
                var t = e(this),
                    n = t.data("target") || t.attr("href"),
                    r = /^#\w/.test(n) && e(n);
                return r && r.length && [
                        [r.position().top, n]
                    ] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function() {
            var e = this.$scrollElement.scrollTop() + this.options.offset,
                t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = t - this.$scrollElement.height(),
                r = this.offsets,
                i = this.targets,
                s = this.activeTarget,
                o;
            if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function(t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("scrollspy"),
                s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.attr("data-target"),
                i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active")) return;
            i = n.find(".active:last a")[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented()) return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function(t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"),
                s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show) return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function() {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide) return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function() {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function() {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case "bottom":
                        o = {
                            top: n.top + n.height,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "top":
                        o = {
                            top: n.top - i,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "left":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left - r
                        };
                        break;
                    case "right":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left + n.width
                        }
                }
                e.offset(o).addClass(s).addClass("in")
            }
        },
        setContent: function() {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function r() {
                var t = setTimeout(function() {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function() {
                    clearTimeout(t), n.detach()
                })
            }
            var t = this,
                n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.detach(), this
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(t) {
            return e.extend({}, t ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            n[n.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("tooltip"),
                s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function() {
            var e = this.tip(),
                t = this.getTitle(),
                n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        },
        tip: function() {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("popover"),
                s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("button"),
                s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function() {
            var t, n, r, i;
            if (this.transitioning) return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning) return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        },
        hide: function() {
            var t;
            if (this.transitioning) return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        },
        reset: function(e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function(t, n, r) {
            var i = this,
                s = function() {
                    n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
                };
            this.$element.trigger(n);
            if (n.isDefaultPrevented()) return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("collapse"),
                s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n = e(this),
            r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
            s = e(i).data("collapse") ? "toggle" : n.data();
        n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function(t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        to: function(t) {
            var n = this.$element.find(".item.active"),
                r = n.parent().children(),
                i = r.index(n),
                s = this;
            if (t > r.length - 1 || t < 0) return;
            return this.sliding ? this.$element.one("slid", function() {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        },
        pause: function(t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            if (this.sliding) return;
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding) return;
            return this.slide("prev")
        },
        slide: function(t, n) {
            var r = this.$element.find(".item.active"),
                i = n || r[t](),
                s = this.interval,
                o = t == "next" ? "left" : "right",
                u = t == "next" ? "first" : "last",
                a = this,
                f;
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {
                relatedTarget: i[0]
            });
            if (i.hasClass("active")) return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function() {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function() {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("carousel"),
                s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
                o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e(document).on("click.carousel.data-api", "[data-slide]", function(t) {
        var n = e(this),
            r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = e.extend({}, i.data(), n.data());
        i.carousel(s), t.preventDefault()
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: t.top + t.height,
                left: t.left
            }), this.$menu.show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            var t = [],
                n = [],
                r = [],
                i;
            while (i = e.shift()) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active"),
                r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        eventSupported: function(e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
        },
        move: function(e) {
            if (!this.shown) return;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat) return;
            this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        blur: function(e) {
            var t = this;
            setTimeout(function() {
                t.hide()
            }, 150)
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function(t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("typeahead"),
                s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
        var n = e(this);
        if (n.data("typeahead")) return;
        t.preventDefault(), n.typeahead(n.data())
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function() {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible")) return;
        var t = e(document).height(),
            n = this.$window.scrollTop(),
            r = this.$element.offset(),
            i = this.options.offset,
            s = i.bottom,
            o = i.top,
            u = "affix affix-top affix-bottom",
            a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a) return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }, e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("affix"),
                s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
        offset: 0
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery),
    function(e, t) {
        function i(t, n) {
            var r, i, o, u = t.nodeName.toLowerCase();
            return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
        }

        function s(t) {
            return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
                    return e.css(this, "visibility") === "hidden"
                }).length
        }
        var n = 0,
            r = /^ui-id-\d+$/;
        e.ui = e.ui || {};
        if (e.ui.version) return;
        e.extend(e.ui, {
            version: "1.9.2",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            _focus: e.fn.focus,
            focus: function(t, n) {
                return typeof t == "number" ? this.each(function() {
                    var r = this;
                    setTimeout(function() {
                        e(r).focus(), n && n.call(r)
                    }, t)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var t;
                return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : t = this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function(n) {
                if (n !== t) return this.css("zIndex", n);
                if (this.length) {
                    var r = e(this[0]),
                        i, s;
                    while (r.length && r[0] !== document) {
                        i = r.css("position");
                        if (i === "absolute" || i === "relative" || i === "fixed") {
                            s = parseInt(r.css("zIndex"), 10);
                            if (!isNaN(s) && s !== 0) return s
                        }
                        r = r.parent()
                    }
                }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++n)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    r.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(n) {
                    return !!e.data(n, t)
                }
            }) : function(t, n, r) {
                return !!e.data(t, r[3])
            },
            focusable: function(t) {
                return i(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var n = e.attr(t, "tabindex"),
                    r = isNaN(n);
                return (r || n >= 0) && i(t, !r)
            }
        }), e(function() {
            var t = document.body,
                n = t.appendChild(n = document.createElement("div"));
            n.offsetHeight, e.extend(n.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
            function u(t, n, r, s) {
                return e.each(i, function() {
                    n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), n
            }
            var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                s = r.toLowerCase(),
                o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + r] = function(n) {
                return n === t ? o["inner" + r].call(this) : this.each(function() {
                    e(this).css(s, u(this, n) + "px")
                })
            }, e.fn["outer" + r] = function(t, n) {
                return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
                    e(this).css(s, u(this, t, !0, n) + "px")
                })
            }
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(n) {
                return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
            }
        }(e.fn.removeData)),
            function() {
                var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
                e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
            }(), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), e.extend(e.ui, {
            plugin: {
                add: function(t, n, r) {
                    var i, s = e.ui[t].prototype;
                    for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
                },
                call: function(e, t, n) {
                    var r, i = e.plugins[t];
                    if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
                    for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
                }
            },
            contains: e.contains,
            hasScroll: function(t, n) {
                if (e(t).css("overflow") === "hidden") return !1;
                var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                    i = !1;
                return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
            },
            isOverAxis: function(e, t, n) {
                return e > t && e < t + n
            },
            isOver: function(t, n, r, i, s, o) {
                return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
            }
        })
    }(jQuery),
    function(e, t) {
        var n = 0,
            r = Array.prototype.slice,
            i = e.cleanData;
        e.cleanData = function(t) {
            for (var n = 0, r;
                 (r = t[n]) != null; n++) try {
                e(r).triggerHandler("remove")
            } catch (s) {}
            i(t)
        }, e.widget = function(t, n, r) {
            var i, s, o, u, a = t.split(".")[0];
            t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
                return !!e.data(t, i)
            }, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function(e, t) {
                if (!this._createWidget) return new o(e, t);
                arguments.length && this._createWidget(e, t)
            }, e.extend(o, s, {
                version: r.version,
                _proto: e.extend({}, r),
                _childConstructors: []
            }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, i) {
                e.isFunction(i) && (r[t] = function() {
                    var e = function() {
                            return n.prototype[t].apply(this, arguments)
                        },
                        r = function(e) {
                            return n.prototype[t].apply(this, e)
                        };
                    return function() {
                        var t = this._super,
                            n = this._superApply,
                            s;
                        return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
                    }
                }())
            }),
                o.prototype = e.widget.extend(u, {
                    widgetEventPrefix: s ? u.widgetEventPrefix : t
                }, r, {
                    constructor: o,
                    namespace: a,
                    widgetName: t,
                    widgetBaseClass: i,
                    widgetFullName: i
                }), s ? (e.each(s._childConstructors, function(t, n) {
                var r = n.prototype;
                e.widget(r.namespace + "." + r.widgetName, o, n._proto)
            }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
        }, e.widget.extend = function(n) {
            var i = r.call(arguments, 1),
                s = 0,
                o = i.length,
                u, a;
            for (; s < o; s++)
                for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
            return n
        }, e.widget.bridge = function(n, i) {
            var s = i.prototype.widgetFullName || n;
            e.fn[n] = function(o) {
                var u = typeof o == "string",
                    a = r.call(arguments, 1),
                    f = this;
                return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
                    var r, i = e.data(this, s);
                    if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                    if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
                    r = i[o].apply(i, a);
                    if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
                }) : this.each(function() {
                    var t = e.data(this, s);
                    t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
                }), f
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, r) {
                r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === r && this.destroy()
                    }
                }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(n, r) {
                var i = n,
                    s, o, u;
                if (arguments.length === 0) return e.widget.extend({}, this.options);
                if (typeof n == "string") {
                    i = {}, s = n.split("."), n = s.shift();
                    if (s.length) {
                        o = i[n] = e.widget.extend({}, this.options[n]);
                        for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                        n = s.pop();
                        if (r === t) return o[n] === t ? null : o[n];
                        o[n] = r
                    } else {
                        if (r === t) return this.options[n] === t ? null : this.options[n];
                        i[n] = r
                    }
                }
                return this._setOptions(i), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(t, n, r) {
                var i, s = this;
                typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
                    function u() {
                        if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                        return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                    }
                    typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                    var a = r.match(/^(\w+)\s*(.*)$/),
                        f = a[1] + s.eventNamespace,
                        l = a[2];
                    l ? i.delegate(l, f, u) : n.bind(f, u)
                })
            },
            _off: function(e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function(e, t) {
                function n() {
                    return (typeof e == "string" ? r[e] : e).apply(r, arguments)
                }
                var r = this;
                return setTimeout(n, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, n, r) {
                var i, s, o = this.options[t];
                r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
                if (s)
                    for (i in s) i in n || (n[i] = s[i]);
                return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, n) {
            e.Widget.prototype["_" + t] = function(r, i, s) {
                typeof i == "string" && (i = {
                    effect: i
                });
                var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
                i = i || {}, typeof i == "number" && (i = {
                    duration: i
                }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                    e(this)[t](), s && s.call(r[0]), n()
                })
            }
        }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
            return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
        })
    }(jQuery),
    function(e, t) {
        var n = !1;
        e(document).mouseup(function(e) {
            n = !1
        }), e.widget("ui.mouse", {
            version: "1.9.2",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function(e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function(n) {
                    if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(t) {
                if (n) return;
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var r = this,
                    i = t.which === 1,
                    s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                if (!i || s || !this._mouseCapture(t)) return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    r.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                    this._mouseStarted = this._mouseStart(t) !== !1;
                    if (!this._mouseStarted) return t.preventDefault(), !0
                }
                return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return r._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return r._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
            },
            _mouseMove: function(t) {
                return !e.ui.ie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
            },
            _mouseUp: function(t) {
                return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function(e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function(e) {
                return this.mouseDelayMet
            },
            _mouseStart: function(e) {},
            _mouseDrag: function(e) {},
            _mouseStop: function(e) {},
            _mouseCapture: function(e) {
                return !0
            }
        })
    }(jQuery),
    function(e, t) {
        e.widget("ui.resizable", e.ui.mouse, {
            version: "1.9.2",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 1e3
            },
            _create: function() {
                var t = this,
                    n = this.options;
                this.element.addClass("ui-resizable"), e.extend(this, {
                    _aspectRatio: !!n.aspectRatio,
                    aspectRatio: n.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: n.helper || n.ghost || n.animate ? n.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = n.handles || (e(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se");
                if (this.handles.constructor == String) {
                    this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                    var r = this.handles.split(",");
                    this.handles = {};
                    for (var i = 0; i < r.length; i++) {
                        var s = e.trim(r[i]),
                            o = "ui-resizable-" + s,
                            u = e('<div class="ui-resizable-handle ' + o + '"></div>');
                        u.css({
                            zIndex: n.zIndex
                        }), "se" == s && u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(u)
                    }
                }
                this._renderAxis = function(t) {
                    t = t || this.element;
                    for (var n in this.handles) {
                        this.handles[n].constructor == String && (this.handles[n] = e(this.handles[n], this.element).show());
                        if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                            var r = e(this.handles[n], this.element),
                                i = 0;
                            i = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth();
                            var s = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                            t.css(s, i), this._proportionallyResize()
                        }
                        if (!e(this.handles[n]).length) continue
                    }
                }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                    if (!t.resizing) {
                        if (this.className) var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                        t.axis = e && e[1] ? e[1] : "se"
                    }
                }), n.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (n.disabled) return;
                    e(this).removeClass("ui-resizable-autohide"), t._handles.show()
                }).mouseleave(function() {
                    if (n.disabled) return;
                    t.resizing || (e(this).addClass("ui-resizable-autohide"), t._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var t = function(t) {
                    e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                if (this.elementIsWrapper) {
                    t(this.element);
                    var n = this.element;
                    this.originalElement.css({
                        position: n.css("position"),
                        width: n.outerWidth(),
                        height: n.outerHeight(),
                        top: n.css("top"),
                        left: n.css("left")
                    }).insertAfter(n), n.remove()
                }
                return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
            },
            _mouseCapture: function(t) {
                var n = !1;
                for (var r in this.handles) e(this.handles[r])[0] == t.target && (n = !0);
                return !this.options.disabled && n
            },
            _mouseStart: function(t) {
                var r = this.options,
                    i = this.element.position(),
                    s = this.element;
                this.resizing = !0, this.documentScroll = {
                    top: e(document).scrollTop(),
                    left: e(document).scrollLeft()
                }, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({
                    position: "absolute",
                    top: i.top,
                    left: i.left
                }), this._renderProxy();
                var o = n(this.helper.css("left")),
                    u = n(this.helper.css("top"));
                r.containment && (o += e(r.containment).scrollLeft() || 0, u += e(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: o,
                    top: u
                }, this.size = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalSize = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalPosition = {
                    left: o,
                    top: u
                }, this.sizeDiff = {
                    width: s.outerWidth() - s.width(),
                    height: s.outerHeight() - s.height()
                }, this.originalMousePosition = {
                    left: t.pageX,
                    top: t.pageY
                }, this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
                var a = e(".ui-resizable-" + this.axis).css("cursor");
                return e("body").css("cursor", a == "auto" ? this.axis + "-resize" : a), s.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
            },
            _mouseDrag: function(e) {
                var t = this.helper,
                    n = this.options,
                    r = {},
                    i = this,
                    s = this.originalMousePosition,
                    o = this.axis,
                    u = e.pageX - s.left || 0,
                    a = e.pageY - s.top || 0,
                    f = this._change[o];
                if (!f) return !1;
                var l = f.apply(this, [e, u, a]);
                this._updateVirtualBoundaries(e.shiftKey);
                if (this._aspectRatio || e.shiftKey) l = this._updateRatio(l, e);
                return l = this._respectSize(l, e), this._propagate("resize", e), t.css({
                    top: this.position.top + "px",
                    left: this.position.left + "px",
                    width: this.size.width + "px",
                    height: this.size.height + "px"
                }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", e, this.ui()), !1
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var n = this.options,
                    r = this;
                if (this._helper) {
                    var i = this._proportionallyResizeElements,
                        s = i.length && /textarea/i.test(i[0].nodeName),
                        o = s && e.ui.hasScroll(i[0], "left") ? 0 : r.sizeDiff.height,
                        u = s ? 0 : r.sizeDiff.width,
                        a = {
                            width: r.helper.width() - u,
                            height: r.helper.height() - o
                        },
                        f = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null,
                        l = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                    n.animate || this.element.css(e.extend(a, {
                        top: l,
                        left: f
                    })), r.helper.height(r.size.height), r.helper.width(r.size.width), this._helper && !n.animate && this._proportionallyResize()
                }
                return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(e) {
                var t = this.options,
                    n, i, s, o, u;
                u = {
                    minWidth: r(t.minWidth) ? t.minWidth : 0,
                    maxWidth: r(t.maxWidth) ? t.maxWidth : Infinity,
                    minHeight: r(t.minHeight) ? t.minHeight : 0,
                    maxHeight: r(t.maxHeight) ? t.maxHeight : Infinity
                };
                if (this._aspectRatio || e) n = u.minHeight * this.aspectRatio, s = u.minWidth / this.aspectRatio, i = u.maxHeight * this.aspectRatio, o = u.maxWidth / this.aspectRatio, n > u.minWidth && (u.minWidth = n), s > u.minHeight && (u.minHeight = s), i < u.maxWidth && (u.maxWidth = i), o < u.maxHeight && (u.maxHeight = o);
                this._vBoundaries = u
            },
            _updateCache: function(e) {
                var t = this.options;
                this.offset = this.helper.offset(), r(e.left) && (this.position.left = e.left), r(e.top) && (this.position.top = e.top), r(e.height) && (this.size.height = e.height), r(e.width) && (this.size.width = e.width)
            },
            _updateRatio: function(e, t) {
                var n = this.options,
                    i = this.position,
                    s = this.size,
                    o = this.axis;
                return r(e.height) ? e.width = e.height * this.aspectRatio : r(e.width) && (e.height = e.width / this.aspectRatio), o == "sw" && (e.left = i.left + (s.width - e.width), e.top = null), o == "nw" && (e.top = i.top + (s.height - e.height), e.left = i.left + (s.width - e.width)), e
            },
            _respectSize: function(e, t) {
                var n = this.helper,
                    i = this._vBoundaries,
                    s = this._aspectRatio || t.shiftKey,
                    o = this.axis,
                    u = r(e.width) && i.maxWidth && i.maxWidth < e.width,
                    a = r(e.height) && i.maxHeight && i.maxHeight < e.height,
                    f = r(e.width) && i.minWidth && i.minWidth > e.width,
                    l = r(e.height) && i.minHeight && i.minHeight > e.height;
                f && (e.width = i.minWidth), l && (e.height = i.minHeight), u && (e.width = i.maxWidth), a && (e.height = i.maxHeight);
                var c = this.originalPosition.left + this.originalSize.width,
                    h = this.position.top + this.size.height,
                    p = /sw|nw|w/.test(o),
                    d = /nw|ne|n/.test(o);
                f && p && (e.left = c - i.minWidth), u && p && (e.left = c - i.maxWidth), l && d && (e.top = h - i.minHeight), a && d && (e.top = h - i.maxHeight);
                var v = !e.width && !e.height;
                return v && !e.left && e.top ? e.top = null : v && !e.top && e.left && (e.left = null), e
            },
            _proportionallyResize: function() {
                var t = this.options;
                if (!this._proportionallyResizeElements.length) return;
                var n = this.helper || this.element;
                for (var r = 0; r < this._proportionallyResizeElements.length; r++) {
                    var i = this._proportionallyResizeElements[r];
                    if (!this.borderDif) {
                        var s = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")],
                            o = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")];
                        this.borderDif = e.map(s, function(e, t) {
                            var n = parseInt(e, 10) || 0,
                                r = parseInt(o[t], 10) || 0;
                            return n + r
                        })
                    }
                    i.css({
                        height: n.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: n.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            },
            _renderProxy: function() {
                var t = this.element,
                    n = this.options;
                this.elementOffset = t.offset();
                if (this._helper) {
                    this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                    var r = e.ui.ie6 ? 1 : 0,
                        i = e.ui.ie6 ? 2 : -1;
                    this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() + i,
                        height: this.element.outerHeight() + i,
                        position: "absolute",
                        left: this.elementOffset.left - r + "px",
                        top: this.elementOffset.top - r + "px",
                        zIndex: ++n.zIndex
                    }), this.helper.appendTo("body").disableSelection()
                } else this.helper = this.element
            },
            _change: {
                e: function(e, t, n) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function(e, t, n) {
                    var r = this.options,
                        i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        left: s.left + t,
                        width: i.width - t
                    }
                },
                n: function(e, t, n) {
                    var r = this.options,
                        i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        top: s.top + n,
                        height: i.height - n
                    }
                },
                s: function(e, t, n) {
                    return {
                        height: this.originalSize.height + n
                    }
                },
                se: function(t, n, r) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
                },
                sw: function(t, n, r) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
                },
                ne: function(t, n, r) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
                },
                nw: function(t, n, r) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
                }
            },
            _propagate: function(t, n) {
                e.ui.plugin.call(this, t, [n, this.ui()]), t != "resize" && this._trigger(t, n, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), e.ui.plugin.add("resizable", "alsoResize", {
            start: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = function(t) {
                        e(t).each(function() {
                            var t = e(this);
                            t.data("resizable-alsoresize", {
                                width: parseInt(t.width(), 10),
                                height: parseInt(t.height(), 10),
                                left: parseInt(t.css("left"), 10),
                                top: parseInt(t.css("top"), 10)
                            })
                        })
                    };
                typeof i.alsoResize == "object" && !i.alsoResize.parentNode ? i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function(e) {
                    s(e)
                }) : s(i.alsoResize)
            },
            resize: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.originalSize,
                    o = r.originalPosition,
                    u = {
                        height: r.size.height - s.height || 0,
                        width: r.size.width - s.width || 0,
                        top: r.position.top - o.top || 0,
                        left: r.position.left - o.left || 0
                    },
                    a = function(t, r) {
                        e(t).each(function() {
                            var t = e(this),
                                i = e(this).data("resizable-alsoresize"),
                                s = {},
                                o = r && r.length ? r : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            e.each(o, function(e, t) {
                                var n = (i[t] || 0) + (u[t] || 0);
                                n && n >= 0 && (s[t] = n || null)
                            }), t.css(s)
                        })
                    };
                typeof i.alsoResize == "object" && !i.alsoResize.nodeType ? e.each(i.alsoResize, function(e, t) {
                    a(e, t)
                }) : a(i.alsoResize)
            },
            stop: function(t, n) {
                e(this).removeData("resizable-alsoresize")
            }
        }), e.ui.plugin.add("resizable", "animate", {
            stop: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r._proportionallyResizeElements,
                    o = s.length && /textarea/i.test(s[0].nodeName),
                    u = o && e.ui.hasScroll(s[0], "left") ? 0 : r.sizeDiff.height,
                    a = o ? 0 : r.sizeDiff.width,
                    f = {
                        width: r.size.width - a,
                        height: r.size.height - u
                    },
                    l = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null,
                    c = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                r.element.animate(e.extend(f, c && l ? {
                    top: c,
                    left: l
                } : {}), {
                    duration: i.animateDuration,
                    easing: i.animateEasing,
                    step: function() {
                        var n = {
                            width: parseInt(r.element.css("width"), 10),
                            height: parseInt(r.element.css("height"), 10),
                            top: parseInt(r.element.css("top"), 10),
                            left: parseInt(r.element.css("left"), 10)
                        };
                        s && s.length && e(s[0]).css({
                            width: n.width,
                            height: n.height
                        }), r._updateCache(n), r._propagate("resize", t)
                    }
                })
            }
        }), e.ui.plugin.add("resizable", "containment", {
            start: function(t, r) {
                var i = e(this).data("resizable"),
                    s = i.options,
                    o = i.element,
                    u = s.containment,
                    a = u instanceof e ? u.get(0) : /parent/.test(u) ? o.parent().get(0) : u;
                if (!a) return;
                i.containerElement = e(a);
                if (/document/.test(u) || u == document) i.containerOffset = {
                    left: 0,
                    top: 0
                }, i.containerPosition = {
                    left: 0,
                    top: 0
                }, i.parentData = {
                    element: e(document),
                    left: 0,
                    top: 0,
                    width: e(document).width(),
                    height: e(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var f = e(a),
                        l = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function(e, t) {
                        l[e] = n(f.css("padding" + t))
                    }), i.containerOffset = f.offset(), i.containerPosition = f.position(), i.containerSize = {
                        height: f.innerHeight() - l[3],
                        width: f.innerWidth() - l[1]
                    };
                    var c = i.containerOffset,
                        h = i.containerSize.height,
                        p = i.containerSize.width,
                        d = e.ui.hasScroll(a, "left") ? a.scrollWidth : p,
                        v = e.ui.hasScroll(a) ? a.scrollHeight : h;
                    i.parentData = {
                        element: a,
                        left: c.left,
                        top: c.top,
                        width: d,
                        height: v
                    }
                }
            },
            resize: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.containerSize,
                    o = r.containerOffset,
                    u = r.size,
                    a = r.position,
                    f = r._aspectRatio || t.shiftKey,
                    l = {
                        top: 0,
                        left: 0
                    },
                    c = r.containerElement;
                c[0] != document && /static/.test(c.css("position")) && (l = o), a.left < (r._helper ? o.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - o.left : r.position.left - l.left), f && (r.size.height = r.size.width / r.aspectRatio), r.position.left = i.helper ? o.left : 0), a.top < (r._helper ? o.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - o.top : r.position.top), f && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? o.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top;
                var h = Math.abs((r._helper ? r.offset.left - l.left : r.offset.left - l.left) + r.sizeDiff.width),
                    p = Math.abs((r._helper ? r.offset.top - l.top : r.offset.top - o.top) + r.sizeDiff.height),
                    d = r.containerElement.get(0) == r.element.parent().get(0),
                    v = /relative|absolute/.test(r.containerElement.css("position"));
                d && v && (h -= r.parentData.left), h + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - h, f && (r.size.height = r.size.width / r.aspectRatio)), p + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - p, f && (r.size.width = r.size.height * r.aspectRatio))
            },
            stop: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.position,
                    o = r.containerOffset,
                    u = r.containerPosition,
                    a = r.containerElement,
                    f = e(r.helper),
                    l = f.offset(),
                    c = f.outerWidth() - r.sizeDiff.width,
                    h = f.outerHeight() - r.sizeDiff.height;
                r._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({
                    left: l.left - u.left - o.left,
                    width: c,
                    height: h
                }), r._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({
                    left: l.left - u.left - o.left,
                    width: c,
                    height: h
                })
            }
        }), e.ui.plugin.add("resizable", "ghost", {
            start: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.size;
                r.ghost = r.originalElement.clone(), r.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: s.height,
                    width: s.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : ""), r.ghost.appendTo(r.helper)
            },
            resize: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options;
                r.ghost && r.ghost.css({
                    position: "relative",
                    height: r.size.height,
                    width: r.size.width
                })
            },
            stop: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options;
                r.ghost && r.helper && r.helper.get(0).removeChild(r.ghost.get(0))
            }
        }), e.ui.plugin.add("resizable", "grid", {
            resize: function(t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.size,
                    o = r.originalSize,
                    u = r.originalPosition,
                    a = r.axis,
                    f = i._aspectRatio || t.shiftKey;
                i.grid = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid;
                var l = Math.round((s.width - o.width) / (i.grid[0] || 1)) * (i.grid[0] || 1),
                    c = Math.round((s.height - o.height) / (i.grid[1] || 1)) * (i.grid[1] || 1);
                /^(se|s|e)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c) : /^(ne)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c) : /^(sw)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.left = u.left - l) : (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c, r.position.left = u.left - l)
            }
        });
        var n = function(e) {
                return parseInt(e, 10) || 0
            },
            r = function(e) {
                return !isNaN(parseInt(e, 10))
            }
    }(jQuery),
    function(e, t) {
        var n = 5;
        e.widget("ui.slider", e.ui.mouse, {
            version: "1.9.2",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null
            },
            _create: function() {
                var t, r, i = this.options,
                    s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    u = [];
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), i.range && (i.range === !0 && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && i.values.length !== 2 && (i.values = [i.values[0], i.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (i.range === "min" || i.range === "max" ? " ui-slider-range-" + i.range : ""))), r = i.values && i.values.length || 1;
                for (t = s.length; t < r; t++) u.push(o);
                this.handles = s.add(e(u.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(e) {
                    e.preventDefault()
                }).mouseenter(function() {
                    i.disabled || e(this).addClass("ui-state-hover")
                }).mouseleave(function() {
                    e(this).removeClass("ui-state-hover")
                }).focus(function() {
                    i.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
                }).blur(function() {
                    e(this).removeClass("ui-state-focus")
                }), this.handles.each(function(t) {
                    e(this).data("ui-slider-handle-index", t)
                }), this._on(this.handles, {
                    keydown: function(t) {
                        var r, i, s, o, u = e(t.target).data("ui-slider-handle-index");
                        switch (t.keyCode) {
                            case e.ui.keyCode.HOME:
                            case e.ui.keyCode.END:
                            case e.ui.keyCode.PAGE_UP:
                            case e.ui.keyCode.PAGE_DOWN:
                            case e.ui.keyCode.UP:
                            case e.ui.keyCode.RIGHT:
                            case e.ui.keyCode.DOWN:
                            case e.ui.keyCode.LEFT:
                                t.preventDefault();
                                if (!this._keySliding) {
                                    this._keySliding = !0, e(t.target).addClass("ui-state-active"), r = this._start(t, u);
                                    if (r === !1) return
                                }
                        }
                        o = this.options.step, this.options.values && this.options.values.length ? i = s = this.values(u) : i = s = this.value();
                        switch (t.keyCode) {
                            case e.ui.keyCode.HOME:
                                s = this._valueMin();
                                break;
                            case e.ui.keyCode.END:
                                s = this._valueMax();
                                break;
                            case e.ui.keyCode.PAGE_UP:
                                s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / n);
                                break;
                            case e.ui.keyCode.PAGE_DOWN:
                                s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / n);
                                break;
                            case e.ui.keyCode.UP:
                            case e.ui.keyCode.RIGHT:
                                if (i === this._valueMax()) return;
                                s = this._trimAlignValue(i + o);
                                break;
                            case e.ui.keyCode.DOWN:
                            case e.ui.keyCode.LEFT:
                                if (i === this._valueMin()) return;
                                s = this._trimAlignValue(i - o)
                        }
                        this._slide(t, u, s)
                    },
                    keyup: function(t) {
                        var n = e(t.target).data("ui-slider-handle-index");
                        this._keySliding && (this._keySliding = !1, this._stop(t, n), this._change(t, n), e(t.target).removeClass("ui-state-active"))
                    }
                }), this._refreshValue(), this._animateOff = !1
            },
            _destroy: function() {
                this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var n, r, i, s, o, u, a, f, l = this,
                    c = this.options;
                return c.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), n = {
                    x: t.pageX,
                    y: t.pageY
                }, r = this._normValueFromMouse(n), i = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                    var n = Math.abs(r - l.values(t));
                    i > n && (i = n, s = e(this), o = t)
                }), c.range === !0 && this.values(1) === c.min && (o += 1, s = e(this.handles[o])), u = this._start(t, o), u === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, s.addClass("ui-state-active").focus(), a = s.offset(), f = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = f ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - a.left - s.width() / 2,
                    top: t.pageY - a.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, r), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(e) {
                var t = {
                        x: e.pageX,
                        y: e.pageY
                    },
                    n = this._normValueFromMouse(t);
                return this._slide(e, this._handleIndex, n), !1
            },
            _mouseStop: function(e) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(e) {
                var t, n, r, i, s;
                return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
            },
            _start: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
            },
            _slide: function(e, t, n) {
                var r, i, s;
                this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n,
                    values: i
                }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n
                }), s !== !1 && this.value(n))
            },
            _stop: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
            },
            _change: function(e, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var n = {
                        handle: this.handles[t],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
                }
            },
            value: function(e) {
                if (arguments.length) {
                    this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
                    return
                }
                return this._value()
            },
            values: function(t, n) {
                var r, i, s;
                if (arguments.length > 1) {
                    this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
                    return
                }
                if (!arguments.length) return this._values();
                if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                r = this.options.values, i = arguments[0];
                for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
                this._refreshValue()
            },
            _setOption: function(t, n) {
                var r, i = 0;
                e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
                switch (t) {
                    case "disabled":
                        n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this
                            ._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        this._animateOff = !0, this._refreshValue();
                        for (r = 0; r < i; r += 1) this._change(null, r);
                        this._animateOff = !1;
                        break;
                    case "min":
                    case "max":
                        this._animateOff = !0, this._refreshValue(), this._animateOff = !1
                }
            },
            _value: function() {
                var e = this.options.value;
                return e = this._trimAlignValue(e), e
            },
            _values: function(e) {
                var t, n, r;
                if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t), t;
                n = this.options.values.slice();
                for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
                return n
            },
            _trimAlignValue: function(e) {
                if (e <= this._valueMin()) return this._valueMin();
                if (e >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    n = (e - this._valueMin()) % t,
                    r = e - n;
                return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var t, n, r, i, s, o = this.options.range,
                    u = this.options,
                    a = this,
                    f = this._animateOff ? !1 : u.animate,
                    l = {};
                this.options.values && this.options.values.length ? this.handles.each(function(r) {
                    n = (a.values(r) - a._valueMin()) / (a._valueMax() - a._valueMin()) * 100, l[a.orientation === "horizontal" ? "left" : "bottom"] = n + "%", e(this).stop(1, 1)[f ? "animate" : "css"](l, u.animate), a.options.range === !0 && (a.orientation === "horizontal" ? (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({
                        left: n + "%"
                    }, u.animate), r === 1 && a.range[f ? "animate" : "css"]({
                        width: n - t + "%"
                    }, {
                        queue: !1,
                        duration: u.animate
                    })) : (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({
                        bottom: n + "%"
                    }, u.animate), r === 1 && a.range[f ? "animate" : "css"]({
                        height: n - t + "%"
                    }, {
                        queue: !1,
                        duration: u.animate
                    }))), t = n
                }) : (r = this.value(), i = this._valueMin(), s = this._valueMax(), n = s !== i ? (r - i) / (s - i) * 100 : 0, l[this.orientation === "horizontal" ? "left" : "bottom"] = n + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](l, u.animate), o === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[f ? "animate" : "css"]({
                    width: n + "%"
                }, u.animate), o === "max" && this.orientation === "horizontal" && this.range[f ? "animate" : "css"]({
                    width: 100 - n + "%"
                }, {
                    queue: !1,
                    duration: u.animate
                }), o === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[f ? "animate" : "css"]({
                    height: n + "%"
                }, u.animate), o === "max" && this.orientation === "vertical" && this.range[f ? "animate" : "css"]({
                    height: 100 - n + "%"
                }, {
                    queue: !1,
                    duration: u.animate
                }))
            }
        })
    }(jQuery), ! function(e) {
    function t() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function n() {
        var e = new Date;
        return t(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
    }
    var r = function(t, n) {
        var r = this;
        this.element = e(t), this.language = n.language || this.element.data("date-language") || "en", this.language = this.language in i ? this.language : this.language.split("-")[0], this.language = this.language in i ? this.language : "en", this.isRTL = i[this.language].rtl || !1, this.format = s.parseFormat(n.format || this.element.data("date-format") || i[this.language].format || "mm/dd/yyyy"), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && this.component.length === 0 && (this.component = !1), this._attachEvents(), this.forceParse = !0, "forceParse" in n ? this.forceParse = n.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = e(s.template).appendTo(this.isInline ? this.element : "body").on({
            click: e.proxy(this.click, this),
            mousedown: e.proxy(this.mousedown, this)
        }), this.isInline ? this.picker.addClass("datepicker-inline") : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.isRTL && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), e(document).on("mousedown", function(t) {
            e(t.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length === 0 && r.hide()
        }), this.autoclose = !1, "autoclose" in n ? this.autoclose = n.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation" in n ? this.keyboardNavigation = n.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.viewMode = this.startViewMode = 0;
        switch (n.startView || this.element.data("date-start-view")) {
            case 2:
            case "decade":
                this.viewMode = this.startViewMode = 2;
                break;
            case 1:
            case "year":
                this.viewMode = this.startViewMode = 1
        }
        this.minViewMode = n.minViewMode || this.element.data("date-min-view-mode") || 0;
        if (typeof this.minViewMode == "string") switch (this.minViewMode) {
            case "months":
                this.minViewMode = 1;
                break;
            case "years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
        }
        this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode), this.todayBtn = n.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = n.todayHighlight || this.element.data("date-today-highlight") || !1, this.calendarWeeks = !1, "calendarWeeks" in n ? this.calendarWeeks = n.calendarWeeks : "dateCalendarWeeks" in this.element.data() && (this.calendarWeeks = this.element.data("date-calendar-weeks")), this.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(e, t) {
            return parseInt(t) + 1
        }), this.weekStart = (n.weekStart || this.element.data("date-weekstart") || i[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -Infinity, this.endDate = Infinity, this.daysOfWeekDisabled = [], this.setStartDate(n.startDate || this.element.data("date-startdate")), this.setEndDate(n.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(n.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
    };
    r.prototype = {
        constructor: r,
        _events: [],
        _attachEvents: function() {
            this._detachEvents(), this.isInput ? this._events = [
                [this.element, {
                    focus: e.proxy(this.show, this),
                    keyup: e.proxy(this.update, this),
                    keydown: e.proxy(this.keydown, this)
                }]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), {
                    focus: e.proxy(this.show, this),
                    keyup: e.proxy(this.update, this),
                    keydown: e.proxy(this.keydown, this)
                }],
                [this.component, {
                    click: e.proxy(this.show, this)
                }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, {
                    click: e.proxy(this.show, this)
                }]
            ];
            for (var t = 0, n, r; t < this._events.length; t++) n = this._events[t][0], r = this._events[t][1], n.on(r)
        },
        _detachEvents: function() {
            for (var e = 0, t, n; e < this._events.length; e++) t = this._events[e][0], n = this._events[e][1], t.off(n);
            this._events = []
        },
        show: function(t) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.update(), this.place(), e(window).on("resize", e.proxy(this.place, this)), t && (t.stopPropagation(), t.preventDefault()), this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(t) {
            if (this.isInline) return;
            if (!this.picker.is(":visible")) return;
            this.picker.hide(), e(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || e(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.element.trigger({
                type: "hide",
                date: this.date
            })
        },
        remove: function() {
            this._detachEvents(), this.picker.remove(), delete this.element.data().datepicker
        },
        getDate: function() {
            var e = this.getUTCDate();
            return new Date(e.getTime() + e.getTimezoneOffset() * 6e4)
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(e) {
            this.setUTCDate(new Date(e.getTime() - e.getTimezoneOffset() * 6e4))
        },
        setUTCDate: function(e) {
            this.date = e, this.setValue()
        },
        setValue: function() {
            var e = this.getFormattedDate();
            this.isInput ? this.element.val(e) : (this.component && this.element.find("input").val(e), this.element.data("date", e))
        },
        getFormattedDate: function(e) {
            return e === undefined && (e = this.format), s.formatDate(this.date, e, this.language)
        },
        setStartDate: function(e) {
            this.startDate = e || -Infinity, this.startDate !== -Infinity && (this.startDate = s.parseDate(this.startDate, this.format, this.language)), this.update(), this.updateNavArrows()
        },
        setEndDate: function(e) {
            this.endDate = e || Infinity, this.endDate !== Infinity && (this.endDate = s.parseDate(this.endDate, this.format, this.language)), this.update(), this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(t) {
            this.daysOfWeekDisabled = t || [], e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function(e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        },
        place: function() {
            if (this.isInline) return;
            var t = parseInt(this.element.parents().filter(function() {
                        return e(this).css("z-index") != "auto"
                    }).first().css("z-index")) + 10,
                n = this.component ? this.component.offset() : this.element.offset(),
                r = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!0);
            this.picker.css({
                top: n.top + r,
                left: n.left,
                zIndex: t
            })
        },
        update: function() {
            var e, t = !1;
            arguments && arguments.length && (typeof arguments[0] == "string" || arguments[0] instanceof Date) ? (e = arguments[0], t = !0) : e = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), this.date = s.parseDate(e, this.format, this.language), t && this.setValue(), this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date), this.fill()
        },
        fillDow: function() {
            var e = this.weekStart,
                t = "<tr>";
            if (this.calendarWeeks) {
                var n = '<th class="cw">&nbsp;</th>';
                t += n, this.picker.find(".datepicker-days thead tr:first-child").prepend(n)
            }
            while (e < this.weekStart + 7) t += '<th class="dow">' + i[this.language].daysMin[e++ % 7] + "</th>";
            t += "</tr>", this.picker.find(".datepicker-days thead").append(t)
        },
        fillMonths: function() {
            var e = "",
                t = 0;
            while (t < 12) e += '<span class="month">' + i[this.language].monthsShort[t++] + "</span>";
            this.picker.find(".datepicker-months td").html(e)
        },
        fill: function() {
            var n = new Date(this.viewDate),
                r = n.getUTCFullYear(),
                o = n.getUTCMonth(),
                u = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                a = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                f = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                l = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                c = this.date && this.date.valueOf(),
                h = new Date;
            this.picker.find(".datepicker-days thead th.switch").text(i[this.language].months[o] + " " + r), this.picker.find("tfoot th.today").text(i[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
            var p = t(r, o - 1, 28, 0, 0, 0, 0),
                d = s.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
            p.setUTCDate(d), p.setUTCDate(d - (p.getUTCDay() - this.weekStart + 7) % 7);
            var v = new Date(p);
            v.setUTCDate(v.getUTCDate() + 42), v = v.valueOf();
            var m = [],
                g;
            while (p.valueOf() < v) {
                if (p.getUTCDay() == this.weekStart) {
                    m.push("<tr>");
                    if (this.calendarWeeks) {
                        var y = new Date(+p + (this.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                            b = new Date(+y + (11 - y.getUTCDay()) % 7 * 864e5),
                            w = new Date(+(w = t(b.getUTCFullYear(), 0, 1)) + (11 - w.getUTCDay()) % 7 * 864e5),
                            E = (b - w) / 864e5 / 7 + 1;
                        m.push('<td class="cw">' + E + "</td>")
                    }
                }
                g = "";
                if (p.getUTCFullYear() < r || p.getUTCFullYear() == r && p.getUTCMonth() < o) g += " old";
                else if (p.getUTCFullYear() > r || p.getUTCFullYear() == r && p.getUTCMonth() > o) g += " new";
                this.todayHighlight && p.getUTCFullYear() == h.getFullYear() && p.getUTCMonth() == h.getMonth() && p.getUTCDate() == h.getDate() && (g += " today"), c && p.valueOf() == c && (g += " active");
                if (p.valueOf() < this.startDate || p.valueOf() > this.endDate || e.inArray(p.getUTCDay(), this.daysOfWeekDisabled) !== -1) g += " disabled";
                m.push('<td class="day' + g + '">' + p.getUTCDate() + "</td>"), p.getUTCDay() == this.weekEnd && m.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(m.join(""));
            var S = this.date && this.date.getUTCFullYear(),
                x = this.picker.find(".datepicker-months").find("th:eq(1)").text(r).end().find("span").removeClass("active");
            S && S == r && x.eq(this.date.getUTCMonth()).addClass("active"), (r < u || r > f) && x.addClass("disabled"), r == u && x.slice(0, a).addClass("disabled"), r == f && x.slice(l + 1).addClass("disabled"), m = "", r = parseInt(r / 10, 10) * 10;
            var T = this.picker.find(".datepicker-years").find("th:eq(1)").text(r + "-" + (r + 9)).end().find("td");
            r -= 1;
            for (var N = -1; N < 11; N++) m += '<span class="year' + (N == -1 || N == 10 ? " old" : "") + (S == r ? " active" : "") + (r < u || r > f ? " disabled" : "") + '">' + r + "</span>", r += 1;
            T.html(m)
        },
        updateNavArrows: function() {
            var e = new Date(this.viewDate),
                t = e.getUTCFullYear(),
                n = e.getUTCMonth();
            switch (this.viewMode) {
                case 0:
                    this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() && n <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }), this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() && n >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    });
                    break;
                case 1:
                case 2:
                    this.startDate !== -Infinity && t <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }), this.endDate !== Infinity && t >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    })
            }
        },
        click: function(n) {
            n.stopPropagation(), n.preventDefault();
            var r = e(n.target).closest("span, td, th");
            if (r.length == 1) switch (r[0].nodeName.toLowerCase()) {
                case "th":
                    switch (r[0].className) {
                        case "switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            var i = s.modes[this.viewMode].navStep * (r[0].className == "prev" ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, i);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, i)
                            }
                            this.fill();
                            break;
                        case "today":
                            var o = new Date;
                            o = t(o.getFullYear(), o.getMonth(), o.getDate(), 0, 0, 0), this.showMode(-2);
                            var u = this.todayBtn == "linked" ? null : "view";
                            this._setDate(o, u)
                    }
                    break;
                case "span":
                    if (!r.is(".disabled")) {
                        this.viewDate.setUTCDate(1);
                        if (r.is(".month")) {
                            var a = 1,
                                f = r.parent().find("span").index(r),
                                l = this.viewDate.getUTCFullYear();
                            this.viewDate.setUTCMonth(f), this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            }), this.minViewMode == 1 && this._setDate(t(l, f, a, 0, 0, 0, 0))
                        } else {
                            var l = parseInt(r.text(), 10) || 0,
                                a = 1,
                                f = 0;
                            this.viewDate.setUTCFullYear(l), this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            }), this.minViewMode == 2 && this._setDate(t(l, f, a, 0, 0, 0, 0))
                        }
                        this.showMode(-1), this.fill()
                    }
                    break;
                case "td":
                    if (r.is(".day") && !r.is(".disabled")) {
                        var a = parseInt(r.text(), 10) || 1,
                            l = this.viewDate.getUTCFullYear(),
                            f = this.viewDate.getUTCMonth();
                        r.is(".old") ? f === 0 ? (f = 11, l -= 1) : f -= 1 : r.is(".new") && (f == 11 ? (f = 0, l += 1) : f += 1), this._setDate(t(l, f, a, 0, 0, 0, 0))
                    }
            }
        },
        _setDate: function(e, t) {
            if (!t || t == "date") this.date = e;
            if (!t || t == "view") this.viewDate = e;
            this.fill(), this.setValue(), this.element.trigger({
                type: "changeDate",
                date: this.date
            });
            var n;
            this.isInput ? n = this.element : this.component && (n = this.element.find("input")), n && (n.change(), this.autoclose && (!t || t == "date") && this.hide())
        },
        moveMonth: function(e, t) {
            if (!t) return e;
            var n = new Date(e.valueOf()),
                r = n.getUTCDate(),
                i = n.getUTCMonth(),
                s = Math.abs(t),
                o, u;
            t = t > 0 ? 1 : -1;
            if (s == 1) {
                u = t == -1 ? function() {
                    return n.getUTCMonth() == i
                } : function() {
                    return n.getUTCMonth() != o
                }, o = i + t, n.setUTCMonth(o);
                if (o < 0 || o > 11) o = (o + 12) % 12
            } else {
                for (var a = 0; a < s; a++) n = this.moveMonth(n, t);
                o = n.getUTCMonth(), n.setUTCDate(r), u = function() {
                    return o != n.getUTCMonth()
                }
            }
            while (u()) n.setUTCDate(--r), n.setUTCMonth(o);
            return n
        },
        moveYear: function(e, t) {
            return this.moveMonth(e, t * 12)
        },
        dateWithinRange: function(e) {
            return e >= this.startDate && e <= this.endDate
        },
        keydown: function(e) {
            if (this.picker.is(":not(:visible)")) {
                e.keyCode == 27 && this.show();
                return
            }
            var t = !1,
                n, r, i, s, o;
            switch (e.keyCode) {
                case 27:
                    this.hide(), e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation) break;
                    n = e.keyCode == 37 ? -1 : 1, e.ctrlKey ? (s = this.moveYear(this.date, n), o = this.moveYear(this.viewDate, n)) : e.shiftKey ? (s = this.moveMonth(this.date, n), o = this.moveMonth(this.viewDate, n)) : (s = new Date(this.date), s.setUTCDate(this.date.getUTCDate() + n), o = new Date(this.viewDate), o.setUTCDate(this.viewDate.getUTCDate() + n)), this.dateWithinRange(s) && (this.date = s, this.viewDate = o, this.setValue(), this.update(), e.preventDefault(), t = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation) break;
                    n = e.keyCode == 38 ? -1 : 1, e.ctrlKey ? (s = this.moveYear(this.date, n), o = this.moveYear(this.viewDate, n)) : e.shiftKey ? (s = this.moveMonth(this.date, n), o = this.moveMonth(this.viewDate, n)) : (s = new Date(this.date), s.setUTCDate(this.date.getUTCDate() + n * 7), o = new Date(this.viewDate), o.setUTCDate(this.viewDate.getUTCDate() + n * 7)), this.dateWithinRange(s) && (this.date = s, this.viewDate = o, this.setValue(), this.update(), e.preventDefault(), t = !0);
                    break;
                case 13:
                    this.hide(), e.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (t) {
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                });
                var u;
                this.isInput ? u = this.element : this.component && (u = this.element.find("input")), u && u.change()
            }
        },
        showMode: function(e) {
            e && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + e))), this.picker.find(">div").hide().filter(".datepicker-" + s.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    }, e.fn.datepicker = function(t) {
        var n = Array.apply(null, arguments);
        return n.shift(), this.each(function() {
            var i = e(this),
                s = i.data("datepicker"),
                o = typeof t == "object" && t;
            s || i.data("datepicker", s = new r(this, e.extend({}, e.fn.datepicker.defaults, o))), typeof t == "string" && typeof s[t] == "function" && s[t].apply(s, n)
        })
    }, e.fn.datepicker.defaults = {}, e.fn.datepicker.Constructor = r;
    var i = e.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today"
            }
        },
        s = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function(e) {
                return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
            },
            getDaysInMonth: function(e, t) {
                return [31, s.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(e) {
                var t = e.replace(this.validParts, "\0").split("\0"),
                    n = e.match(this.validParts);
                if (!t || !t.length || !n || n.length === 0) throw new Error("Invalid date format.");
                return {
                    separators: t,
                    parts: n
                }
            },
            parseDate: function(n, s, o) {
                if (n instanceof Date) return n;
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(n)) {
                    var u = /([\-+]\d+)([dmwy])/,
                        a = n.match(/([\-+]\d+)([dmwy])/g),
                        f, l;
                    n = new Date;
                    for (var c = 0; c < a.length; c++) {
                        f = u.exec(a[c]), l = parseInt(f[1]);
                        switch (f[2]) {
                            case "d":
                                n.setUTCDate(n.getUTCDate() + l);
                                break;
                            case "m":
                                n = r.prototype.moveMonth.call(r.prototype, n, l);
                                break;
                            case "w":
                                n.setUTCDate(n.getUTCDate() + l * 7);
                                break;
                            case "y":
                                n = r.prototype.moveYear.call(r.prototype, n, l)
                        }
                    }
                    return t(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0)
                }
                var a = n && n.match(this.nonpunctuation) || [],
                    n = new Date,
                    h = {},
                    p = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    d = {
                        yyyy: function(e, t) {
                            return e.setUTCFullYear(t)
                        },
                        yy: function(e, t) {
                            return e.setUTCFullYear(2e3 + t)
                        },
                        m: function(e, t) {
                            t -= 1;
                            while (t < 0) t += 12;
                            t %= 12, e.setUTCMonth(t);
                            while (e.getUTCMonth() != t) e.setUTCDate(e.getUTCDate() - 1);
                            return e
                        },
                        d: function(e, t) {
                            return e.setUTCDate(t)
                        }
                    },
                    v, m, f;
                d.M = d.MM = d.mm = d.m, d.dd = d.d, n = t(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
                var g = s.parts.slice();
                a.length != g.length && (g = e(g).filter(function(t, n) {
                    return e.inArray(n, p) !== -1
                }).toArray());
                if (a.length == g.length) {
                    for (var c = 0, y = g.length; c < y; c++) {
                        v = parseInt(a[c], 10), f = g[c];
                        if (isNaN(v)) switch (f) {
                            case "MM":
                                m = e(i[o].months).filter(function() {
                                    var e = this.slice(0, a[c].length),
                                        t = a[c].slice(0, e.length);
                                    return e == t
                                }), v = e.inArray(m[0], i[o].months) + 1;
                                break;
                            case "M":
                                m = e(i[o].monthsShort).filter(function() {
                                    var e = this.slice(0, a[c].length),
                                        t = a[c].slice(0, e.length);
                                    return e == t
                                }), v = e.inArray(m[0], i[o].monthsShort) + 1
                        }
                        h[f] = v
                    }
                    for (var c = 0, b; c < p.length; c++) b = p[c], b in h && !isNaN(h[b]) && d[b](n, h[b])
                }
                return n
            },
            formatDate: function(t, n, r) {
                var s = {
                    d: t.getUTCDate(),
                    D: i[r].daysShort[t.getUTCDay()],
                    DD: i[r].days[t.getUTCDay()],
                    m: t.getUTCMonth() + 1,
                    M: i[r].monthsShort[t.getUTCMonth()],
                    MM: i[r].months[t.getUTCMonth()],
                    yy: t.getUTCFullYear().toString().substring(2),
                    yyyy: t.getUTCFullYear()
                };
                s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m;
                var t = [],
                    o = e.extend([], n.separators);
                for (var u = 0, a = n.parts.length; u < a; u++) o.length && t.push(o.shift()), t.push(s[n.parts[u]]);
                return t.join("")
            },
            headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
        };
    s.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + s.headTemplate + "<tbody></tbody>" + s.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table>" + "</div>" + "</div>", e.fn.datepicker.DPGlobal = s
}(window.jQuery),
    function(e) {
        e.fn.datepicker.dates.bg = {
            days: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
            daysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"],
            daysMin: ["Н", "П", "В", "С", "Ч", "П", "С", "Н"],
            months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
            monthsShort: ["Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
            today: "днес"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.br = {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.ca = {
            days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"],
            daysShort: ["Diu", "Dil", "Dmt", "Dmc", "Dij", "Div", "Dis", "Diu"],
            daysMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds", "dg"],
            months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
            monthsShort: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
            today: "Avui"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.cs = {
            days: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
            daysShort: ["Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob", "Ned"],
            daysMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
            months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
            monthsShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čnc", "Srp", "Zář", "Říj", "Lis", "Pro"],
            today: "Dnes"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.da = {
            days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],
            daysShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
            daysMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
            months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            today: "I Dag"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.de = {
            days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
            daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
            daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
            months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            today: "Heute",
            weekStart: 1,
            format: "dd.mm.yyyy"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.el = {
            days: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"],
            daysShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"],
            daysMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"],
            months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            monthsShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
            today: "Σήμερα"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.es = {
            days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
            daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            today: "Hoy"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.fi = {
            days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai", "sunnuntai"],
            daysShort: ["sun", "maa", "tii", "kes", "tor", "per", "lau", "sun"],
            daysMin: ["su", "ma", "ti", "ke", "to", "pe", "la", "su"],
            months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
            monthsShort: ["tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou"],
            today: "tänään"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.fr = {
            days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
            daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
            daysMin: ["D", "L", "Ma", "Me", "J", "V", "S", "D"],
            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
            today: "Aujourd'hui",
            weekStart: 1,
            format: "dd/mm/yyyy"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.he = {
            days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"],
            daysShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
            daysMin: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
            months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
            monthsShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
            today: "היום",
            rtl: !0
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.hr = {
            days: ["Nedjelja", "Ponedjelja", "Utorak", "Srijeda", "Četrtak", "Petak", "Subota", "Nedjelja"],
            daysShort: ["Ned", "Pon", "Uto", "Srr", "Čet", "Pet", "Sub", "Ned"],
            daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne"],
            months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
            monthsShort: ["Sije", "Velj", "Ožu", "Tra", "Svi", "Lip", "Jul", "Kol", "Ruj", "Lis", "Stu", "Pro"],
            today: "Danas"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.id = {
            days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
            daysShort: ["Mgu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Mgu"],
            daysMin: ["Mg", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa", "Mg"],
            months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"]
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.is = {
            days: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur"],
            daysShort: ["Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau", "Sun"],
            daysMin: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La", "Su"],
            months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des"],
            today: "Í Dag"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.it = {
            days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
            daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
            daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
            months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
            today: "Oggi",
            weekStart: 1,
            format: "dd/mm/yyyy"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.ja = {
            days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜", "日曜"],
            daysShort: ["日", "月", "火", "水", "木", "金", "土", "日"],
            daysMin: ["日", "月", "火", "水", "木", "金", "土", "日"],
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.kr = {
            days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
            daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
            daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
            months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.lt = {
            days: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"],
            daysShort: ["S", "Pr", "A", "T", "K", "Pn", "Š", "S"],
            daysMin: ["Sk", "Pr", "An", "Tr", "Ke", "Pn", "Št", "Sk"],
            months: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
            monthsShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
            today: "Šiandien",
            weekStart: 1
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.lv = {
            days: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"],
            daysShort: ["Sv", "P", "O", "T", "C", "Pk", "S", "Sv"],
            daysMin: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "St", "Sv"],
            months: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec."],
            today: "Šodien",
            weekStart: 1
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.ms = {
            days: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"],
            daysShort: ["Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Aha"],
            daysMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa", "Ah"],
            months: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
            today: "Hari Ini"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.nb = {
            days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],
            daysShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
            daysMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
            months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
            today: "I Dag"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.nl = {
            days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
            daysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
            daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
            months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            today: "Vandaag"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.pl = {
            days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
            daysShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So", "Nie"],
            daysMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So", "N"],
            months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
            monthsShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
            today: "Dzisiaj",
            weekStart: 1
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates["pt-BR"] = {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            today: "Hoje"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.pt = {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.ro = {
            days: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
            daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"],
            daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"],
            months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
            monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Astăzi",
            weekStart: 1
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.rs = {
            days: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"],
            daysShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"],
            daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su", "N"],
            months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
            today: "Danas"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.rs = {
            days: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота", "Недеља"],
            daysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб", "Нед"],
            daysMin: ["Н", "По", "У", "Ср", "Ч", "Пе", "Су", "Н"],
            months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
            monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
            today: "Данас"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.ru = {
            days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
            daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            today: "Сегодня"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.sk = {
            days: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"],
            daysShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob", "Ned"],
            daysMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So", "Ne"],
            months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
            today: "Dnes"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.sl = {
            days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota", "Nedelja"],
            daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
            daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So", "Ne"],
            months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
            today: "Danes"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.sv = {
            days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"],
            daysShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"],
            daysMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö", "Sö"],
            months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            today: "I Dag"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.sw = {
            days: ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi", "Jumapili"],
            daysShort: ["J2", "J3", "J4", "J5", "Alh", "Ij", "J1", "J2"],
            daysMin: ["2", "3", "4", "5", "A", "I", "1", "2"],
            months: ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"],
            monthsShort: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des"],
            today: "Leo"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.th = {
            days: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
            daysShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
            daysMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
            months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
            monthsShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
            today: "วันนี้"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.tr = {
            days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
            daysShort: ["Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts", "Pz"],
            daysMin: ["Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct", "Pz"],
            months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
            today: "Bugün"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates.uk = {
            days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
            daysShort: ["Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Нед"],
            daysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
            months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
            monthsShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
            today: "Сьогодні"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今日"
        }
    }(jQuery),
    function(e) {
        e.fn.datepicker.dates["zh-TW"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        }
    }(jQuery),
    function() {
        jQuery(function() {
            return $("a[rel=popover]").popover(), $(".tooltip").tooltip(), $("a[rel=tooltip]").tooltip()
        })
    }.call(this), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: t.top + t.height,
                left: t.left
            }), this.$menu.show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            var t = [],
                n = [],
                r = [],
                i;
            while (i = e.shift()) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active"),
                r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), (e.browser.chrome || e.browser.webkit || e.browser.msie) && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        move: function(e) {
            if (!this.shown) return;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat) return;
            this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        blur: function(e) {
            var t = this;
            setTimeout(function() {
                t.hide()
            }, 150)
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function(t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("typeahead"),
                s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(function() {
        e("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
            var n = e(this);
            if (n.data("typeahead")) return;
            t.preventDefault(), n.typeahead(n.data())
        })
    })
}(window.jQuery),
    function(e, t) {
        function n(e) {
            var t = [2, 3, 4, 5, 7, 8, 9],
                n = [0, 0, 0, 0, 0, 0, 0],
                r;
            e = e.toUpperCase();
            if (!e) return n;
            if (typeof e != "string") throw new Error("Invalid iso8601 period string '" + e + "'");
            if (r = /^P((\d+Y)?(\d+M)?(\d+W)?(\d+D)?)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.exec(e)) {
                for (var i = 0; i < t.length; i++) {
                    var s = t[i];
                    n[i] = r[s] ? +r[s].replace(/[A-Za-z]+/g, "") : 0
                }
                return n
            }
            throw new Error("String '" + e + "' is not a valid ISO8601 period.")
        }
        e.iso8601 || (e.iso8601 = {}), e.iso8601.Period || (e.iso8601.Period = {}), e.iso8601.version = "0.1", e.iso8601.Period.parse = function(e) {
            return n(e)
        }, e.iso8601.Period.parseToTotalSeconds = function(e) {
            var t = [31104e3, 2592e3, 604800, 86400, 3600, 60, 1],
                r = n(e),
                i = 0;
            for (var s = 0; s < r.length; s++) i += r[s] * t[s];
            return i
        }, e.iso8601.Period.isValid = function(e) {
            try {
                return n(e), !0
            } catch (t) {
                return !1
            }
        }, e.iso8601.Period.parseToString = function(e, t, r) {
            var i = ["", "", "", "", "", "", ""],
                s = n(e);
            t || (t = ["year", "month", "week", "day", "hour", "minute", "second"]), r || (r = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]);
            for (var o = 0; o < s.length; o++) s[o] > 0 && (s[o] == 1 ? i[o] = s[o] + " " + t[o] : i[o] = s[o] + " " + r[o]);
            return i.join(" ").trim().replace(/[ ]{2,}/g, " ")
        }
    }(window.nezasa = window.nezasa || {}), RegExp.escape = function(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
},
    function(e) {
        "use strict";
        e.csv = {
            defaults: {
                separator: ",",
                delimiter: '"',
                headers: !0
            },
            hooks: {
                castToScalar: function(e, t) {
                    var n = /\./;
                    if (isNaN(e)) return e;
                    if (n.test(e)) return parseFloat(e);
                    var r = parseInt(e);
                    return isNaN(r) ? null : r
                }
            },
            parsers: {
                parse: function(e, t) {
                    function f() {
                        o = 0, u = "";
                        if (t.start && t.state.rowNum < t.start) {
                            s = [], t.state.rowNum++, t.state.colNum = 1;
                            return
                        }
                        if (t.onParseEntry === undefined) i.push(s);
                        else {
                            var e = t.onParseEntry(s, t.state);
                            e !== !1 && i.push(e)
                        }
                        s = [], t.end && t.state.rowNum >= t.end && (a = !0), t.state.rowNum++, t.state.colNum = 1
                    }

                    function l() {
                        if (t.onParseValue === undefined) s.push(u);
                        else {
                            var e = t.onParseValue(u, t.state);
                            e !== !1 && s.push(e)
                        }
                        u = "", o = 0, t.state.colNum++
                    }
                    var n = t.separator,
                        r = t.delimiter;
                    t.state.rowNum || (t.state.rowNum = 1), t.state.colNum || (t.state.colNum = 1);
                    var i = [],
                        s = [],
                        o = 0,
                        u = "",
                        a = !1,
                        c = RegExp.escape(n),
                        h = RegExp.escape(r),
                        p = /(D|S|\n|\r|[^DS\r\n]+)/,
                        d = p.source;
                    return d = d.replace(/S/g, c), d = d.replace(/D/g, h), p = RegExp(d, "gm"), e.replace(p, function(e) {
                        if (a) return;
                        switch (o) {
                            case 0:
                                if (e === n) {
                                    u += "", l();
                                    break
                                }
                                if (e === r) {
                                    o = 1;
                                    break
                                }
                                if (e === "\n") {
                                    l(), f();
                                    break
                                }
                                if (/^\r$/.test(e)) break;
                                u += e, o = 3;
                                break;
                            case 1:
                                if (e === r) {
                                    o = 2;
                                    break
                                }
                                u += e, o = 1;
                                break;
                            case 2:
                                if (e === r) {
                                    u += e, o = 1;
                                    break
                                }
                                if (e === n) {
                                    l();
                                    break
                                }
                                if (e === "\n") {
                                    l(), f();
                                    break
                                }
                                if (/^\r$/.test(e)) break;
                                throw new Error("CSVDataError: Illegal State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                            case 3:
                                if (e === n) {
                                    l();
                                    break
                                }
                                if (e === "\n") {
                                    l(), f();
                                    break
                                }
                                if (/^\r$/.test(e)) break;
                                if (e === r) throw new Error("CSVDataError: Illegal Quote [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                throw new Error("CSVDataError: Illegal Data [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                            default:
                                throw new Error("CSVDataError: Unknown State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]")
                        }
                    }), s.length !== 0 && (l(), f()), i
                },
                splitLines: function(e, t) {
                    function a() {
                        s = 0;
                        if (t.start && t.state.rowNum < t.start) {
                            o = "", t.state.rowNum++;
                            return
                        }
                        if (t.onParseEntry === undefined) i.push(o);
                        else {
                            var e = t.onParseEntry(o, t.state);
                            e !== !1 && i.push(e)
                        }
                        o = "", t.end && t.state.rowNum >= t.end && (u = !0), t.state.rowNum++
                    }
                    var n = t.separator,
                        r = t.delimiter;
                    t.state.rowNum || (t.state.rowNum = 1);
                    var i = [],
                        s = 0,
                        o = "",
                        u = !1,
                        f = RegExp.escape(n),
                        l = RegExp.escape(r),
                        c = /(D|S|\n|\r|[^DS\r\n]+)/,
                        h = c.source;
                    return h = h.replace(/S/g, f), h = h.replace(/D/g, l), c = RegExp(h, "gm"), e.replace(c, function(e) {
                        if (u) return;
                        switch (s) {
                            case 0:
                                if (e === n) {
                                    o += e, s = 0;
                                    break
                                }
                                if (e === r) {
                                    o += e, s = 1;
                                    break
                                }
                                if (e === "\n") {
                                    a();
                                    break
                                }
                                if (/^\r$/.test(e)) break;
                                o += e, s = 3;
                                break;
                            case 1:
                                if (e === r) {
                                    o += e, s = 2;
                                    break
                                }
                                o += e, s = 1;
                                break;
                            case 2:
                                var i = o.substr(o.length - 1);
                                if (e === r && i === r) {
                                    o += e, s = 1;
                                    break
                                }
                                if (e === n) {
                                    o += e, s = 0;
                                    break
                                }
                                if (e === "\n") {
                                    a();
                                    break
                                }
                                if (e === "\r") break;
                                throw new Error("CSVDataError: Illegal state [Row:" + t.state.rowNum + "]");
                            case 3:
                                if (e === n) {
                                    o += e, s = 0;
                                    break
                                }
                                if (e === "\n") {
                                    a();
                                    break
                                }
                                if (e === "\r") break;
                                if (e === r) throw new Error("CSVDataError: Illegal quote [Row:" + t.state.rowNum + "]");
                                throw new Error("CSVDataError: Illegal state [Row:" + t.state.rowNum + "]");
                            default:
                                throw new Error("CSVDataError: Unknown state [Row:" + t.state.rowNum + "]")
                        }
                    }), o !== "" && a(), i
                },
                parseEntry: function(e, t) {
                    function u() {
                        if (t.onParseValue === undefined) i.push(o);
                        else {
                            var e = t.onParseValue(o, t.state);
                            e !== !1 && i.push(e)
                        }
                        o = "", s = 0, t.state.colNum++
                    }
                    var n = t.separator,
                        r = t.delimiter;
                    t.state.rowNum || (t.state.rowNum = 1), t.state.colNum || (t.state.colNum = 1);
                    var i = [],
                        s = 0,
                        o = "";
                    if (!t.match) {
                        var a = RegExp.escape(n),
                            f = RegExp.escape(r),
                            l = /(D|S|\n|\r|[^DS\r\n]+)/,
                            c = l.source;
                        c = c.replace(/S/g, a), c = c.replace(/D/g, f), t.match = RegExp(c, "gm")
                    }
                    return e.replace(t.match, function(e) {
                        switch (s) {
                            case 0:
                                if (e === n) {
                                    o += "", u();
                                    break
                                }
                                if (e === r) {
                                    s = 1;
                                    break
                                }
                                if (e === "\n" || e === "\r") break;
                                o += e, s = 3;
                                break;
                            case 1:
                                if (e === r) {
                                    s = 2;
                                    break
                                }
                                o += e, s = 1;
                                break;
                            case 2:
                                if (e === r) {
                                    o += e, s = 1;
                                    break
                                }
                                if (e === n) {
                                    u();
                                    break
                                }
                                if (e === "\n" || e === "\r") break;
                                throw new Error("CSVDataError: Illegal State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                            case 3:
                                if (e === n) {
                                    u();
                                    break
                                }
                                if (e === "\n" || e === "\r") break;
                                if (e === r) throw new Error("CSVDataError: Illegal Quote [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                throw new Error("CSVDataError: Illegal Data [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                            default:
                                throw new Error("CSVDataError: Unknown State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]")
                        }
                    }), u(), i
                }
            },
            toArray: function(t, n, r) {
                var n = n !== undefined ? n : {},
                    i = {};
                i.callback = r !== undefined && typeof r == "function" ? r : !1, i.separator = "separator" in n ? n.separator : e.csv.defaults.separator, i.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter;
                var s = n.state !== undefined ? n.state : {},
                    n = {
                        delimiter: i.delimiter,
                        separator: i.separator,
                        onParseEntry: n.onParseEntry,
                        onParseValue: n.onParseValue,
                        state: s
                    },
                    o = e.csv.parsers.parseEntry(t, n);
                if (!i.callback) return o;
                i.callback("", o)
            },
            toArrays: function(t, n, r) {
                var n = n !== undefined ? n : {},
                    i = {};
                i.callback = r !== undefined && typeof r == "function" ? r : !1, i.separator = "separator" in n ? n.separator : e.csv.defaults.separator, i.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter;
                var s = [],
                    n = {
                        delimiter: i.delimiter,
                        separator: i.separator,
                        onParseEntry: n.onParseEntry,
                        onParseValue: n.onParseValue,
                        start: n.start,
                        end: n.end,
                        state: {
                            rowNum: 1,
                            colNum: 1
                        }
                    };
                s = e.csv.parsers.parse(t, n);
                if (!i.callback) return s;
                i.callback("", s)
            },
            toObjects: function(t, n, r) {
                var n = n !== undefined ? n : {},
                    i = {};
                i.callback = r !== undefined && typeof r == "function" ? r : !1, i.separator = "separator" in n ? n.separator : e.csv.defaults.separator, i.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, i.headers = "headers" in n ? n.headers : e.csv.defaults.headers, n.start = "start" in n ? n.start : 1, i.headers && n.start++, n.end && i.headers && n.end++;
                var s = [],
                    o = [],
                    n = {
                        delimiter: i.delimiter,
                        separator: i.separator,
                        onParseEntry: n.onParseEntry,
                        onParseValue: n.onParseValue,
                        start: n.start,
                        end: n.end,
                        state: {
                            rowNum: 1,
                            colNum: 1
                        },
                        match: !1
                    },
                    u = {
                        delimiter: i.delimiter,
                        separator: i.separator,
                        start: 1,
                        end: 1,
                        state: {
                            rowNum: 1,
                            colNum: 1
                        }
                    },
                    a = e.csv.parsers.splitLines(t, u),
                    f = e.csv.toArray(a[0], n),
                    s = e.csv.parsers.splitLines(t, n);
                n.state.colNum = 1, f ? n.state.rowNum = 2 : n.state.rowNum = 1;
                for (var l = 0, c = s.length; l < c; l++) {
                    var h = e.csv.toArray(s[l], n),
                        p = {};
                    for (var d in f) p[f[d]] = h[d];
                    o.push(p), n.state.rowNum++
                }
                if (!i.callback) return o;
                i.callback("", o)
            },
            fromArrays: function(t, n, r) {
                var n = n !== undefined ? n : {},
                    s = {};
                s.callback = r !== undefined && typeof r == "function" ? r : !1, s.separator = "separator" in n ? n.separator : e.csv.defaults.separator, s.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, s.escaper = "escaper" in n ? n.escaper : e.csv.defaults.escaper, s.experimental = "experimental" in n ? n.experimental : !1;
                if (!s.experimental) throw new Error("not implemented");
                var o = [];
                for (i in t) o.push(t[i]);
                if (!s.callback) return o;
                s.callback("", o)
            },
            fromObjects2CSV: function(t, n, r) {
                var n = n !== undefined ? n : {},
                    s = {};
                s.callback = r !== undefined && typeof r == "function" ? r : !1, s.separator = "separator" in n ? n.separator : e.csv.defaults.separator, s.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, s.experimental = "experimental" in n ? n.experimental : !1;
                if (!s.experimental) throw new Error("not implemented");
                var o = [];
                for (i in t) o.push(arrays[i]);
                if (!s.callback) return o;
                s.callback("", o)
            }
        }, e.csvEntry2Array = e.csv.toArray, e.csv2Array = e.csv.toArrays, e.csv2Dictionary = e.csv.toObjects
    }(jQuery),
    function(e, t) {
        e.ajaxPrefilter(function(e, t, n) {
            if (e.iframe) return "iframe"
        }), e.ajaxTransport("iframe", function(t, n, r) {
            function h() {
                e(f).each(function() {
                    this.remove()
                }), e(l).each(function() {
                    this.disabled = !1
                }), i.attr("action", o || "").attr("target", u || "").attr("enctype", a || ""), s.attr("src", "javascript:false;").remove()
            }
            var i = null,
                s = null,
                o = null,
                u = null,
                a = null,
                f = [],
                l = [],
                c = e(t.files).filter(":file:enabled");
            t.dataTypes.shift();
            if (c.length) return c.each(function() {
                i !== null && this.form !== i && jQuery.error("All file fields must belong to the same form"), i = this.form
            }), i = e(i), o = i.attr("action"), u = i.attr("target"), a = i.attr("enctype"), i.find(":input:not(:submit)").each(function() {
                !this.disabled && (this.type != "file" || c.index(this) < 0) && (this.disabled = !0, l.push(this))
            }), typeof t.data == "string" && t.data.length > 0 && jQuery.error("data must not be serialized"), e.each(t.data || {}, function(t, n) {
                e.isPlainObject(n) && (t = n.name, n = n.value), f.push(e("<input type='hidden'>").attr("name", t).attr("value", n).appendTo(i))
            }), f.push(e("<input type='hidden' name='X-Requested-With'>").attr("value", "IFrame").appendTo(i)), accepts = t.dataTypes[0] && t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + (t.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : t.accepts["*"], f.push(e("<input type='hidden' name='X-Http-Accept'>").attr("value", accepts).appendTo(i)), {
                send: function(n, r) {
                    s = e("<iframe src='javascript:false;' name='iframe-" + e.now() + "' style='display:none'></iframe>"), s.bind("load", function() {
                        s.unbind("load").bind("load", function() {
                            var e = this.contentWindow ? this.contentWindow.document : this.contentDocument ? this.contentDocument : this.document,
                                t = e.documentElement ? e.documentElement : e.body,
                                n = t.getElementsByTagName("textarea")[0],
                                i = n ? n.getAttribute("data-type") : null,
                                s = n ? parseInt(n.getAttribute("response-code")) : 200,
                                o = "OK",
                                u = {
                                    text: i ? n.value : t ? t.innerHTML : null
                                },
                                a = "Content-Type: " + (i || "text/html");
                            r(s, o, u, a), setTimeout(h, 50)
                        }), i.attr("action", t.url).attr("target", s.attr("name")).attr("enctype", "multipart/form-data").get(0).submit()
                    }), s.insertAfter(i)
                },
                abort: function() {
                    s !== null && (s.unbind("load").attr("src", "javascript:false;"), h())
                }
            }
        })
    }(jQuery),
    function($) {
        var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
            meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
        $.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify : function(e) {
            if (e === null) return "null";
            var t = typeof e;
            if (t === "undefined") return undefined;
            if (t === "number" || t === "boolean") return "" + e;
            if (t === "string") return $.quoteString(e);
            if (t === "object") {
                if (typeof e.toJSON == "function") return $.toJSON(e.toJSON());
                if (e.constructor === Date) {
                    var n = e.getUTCMonth() + 1,
                        r = e.getUTCDate(),
                        i = e.getUTCFullYear(),
                        s = e.getUTCHours(),
                        o = e.getUTCMinutes(),
                        u = e.getUTCSeconds(),
                        a = e.getUTCMilliseconds();
                    return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), s < 10 && (s = "0" + s), o < 10 && (o = "0" + o), u < 10 && (u = "0" + u), a < 100 && (a = "0" + a), a < 10 && (a = "0" + a), '"' + i + "-" + n + "-" + r + "T" + s + ":" + o + ":" + u + "." + a + 'Z"'
                }
                if (e.constructor === Array) {
                    var f = [];
                    for (var l = 0; l < e.length; l++) f.push($.toJSON(e[l]) || "null");
                    return "[" + f.join(",") + "]"
                }
                var c, h, p = [];
                for (var d in e) {
                    t = typeof d;
                    if (t === "number") c = '"' + d + '"';
                    else {
                        if (t !== "string") continue;
                        c = $.quoteString(d)
                    }
                    t = typeof e[d];
                    if (t === "function" || t === "undefined") continue;
                    h = $.toJSON(e[d]), p.push(c + ":" + h)
                }
                return "{" + p.join(",") + "}"
            }
        }, $.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function(src) {
            return eval("(" + src + ")")
        }, $.secureEvalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse : function(src) {
            var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
            if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
            throw new SyntaxError("Error parsing JSON, source is not valid.")
        }, $.quoteString = function(e) {
            return e.match(escapeable) ? '"' + e.replace(escapeable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
            }) + '"' : '"' + e + '"'
        }
    }(jQuery),
    function(e, t) {
        e.ajaxPrefilter(function(e, t, n) {
            if (e.iframe) return "iframe"
        }), e.ajaxTransport("iframe", function(t, n, r) {
            function h() {
                e(f).each(function() {
                    this.remove()
                }), e(l).each(function() {
                    this.disabled = !1
                }), i.attr("action", o || "").attr("target", u || "").attr("enctype", a || ""), s.attr("src", "javascript:false;").remove()
            }
            var i = null,
                s = null,
                o = null,
                u = null,
                a = null,
                f = [],
                l = [],
                c = e(t.files).filter(":file:enabled");
            t.dataTypes.shift();
            if (c.length) return c.each(function() {
                i !== null && this.form !== i && jQuery.error("All file fields must belong to the same form"), i = this.form
            }), i = e(i), o = i.attr("action"), u = i.attr("target"), a = i.attr("enctype"), i.find(":input:not(:submit)").each(function() {
                !this.disabled && (this.type != "file" || c.index(this) < 0) && (this.disabled = !0, l.push(this))
            }), typeof t.data == "string" && t.data.length > 0 && jQuery.error("data must not be serialized"), e.each(t.data || {}, function(t, n) {
                e.isPlainObject(n) && (t = n.name, n = n.value), f.push(e("<input type='hidden'>").attr("name", t).attr("value", n).appendTo(i))
            }), f.push(e("<input type='hidden' name='X-Requested-With'>").attr("value", "IFrame").appendTo(i)), accepts = t.dataTypes[0] && t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + (t.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : t.accepts["*"], f.push(e("<input type='hidden' name='X-Http-Accept'>").attr("value", accepts).appendTo(i)), {
                send: function(n, r) {
                    s = e("<iframe src='javascript:false;' name='iframe-" + e.now() + "' style='display:none'></iframe>"), s.bind("load", function() {
                        s.unbind("load").bind("load", function() {
                            var e = this.contentWindow ? this.contentWindow.document : this.contentDocument ? this.contentDocument : this.document,
                                t = e.documentElement ? e.documentElement : e.body,
                                n = t.getElementsByTagName("textarea")[0],
                                i = n ? n.getAttribute("data-type") : null,
                                s = n ? parseInt(n.getAttribute("response-code")) : 200,
                                o = "OK",
                                u = {
                                    text: i ? n.value : t ? t.innerHTML : null
                                },
                                a = "Content-Type: " + (i || "text/html");
                            r(s, o, u, a), setTimeout(h, 50)
                        }), i.attr("action", t.url).attr("target", s.attr("name")).attr("enctype", "multipart/form-data").get(0).submit()
                    }), s.insertAfter(i)
                },
                abort: function() {
                    s !== null && (s.unbind("load").attr("src", "javascript:false;"), h())
                }
            }
        })
    }(jQuery),
    function(t) {
        var n;
        t.remotipart = n = {
            setup: function(e) {
                e.one("ajax:beforeSend.remotipart", function(r, i, s) {
                    return delete s.beforeSend, s.iframe = !0, s.files = t(t.rails.fileInputSelector, e), s.data = e.serializeArray(), s.processData = !1, s.dataType === undefined && (s.dataType = "script *"), s.data.push({
                        name: "remotipart_submitted",
                        value: !0
                    }), t.rails.fire(e, "ajax:remotipartSubmit", [i, s]) && t.rails.ajax(s), n.teardown(e), !1
                }).data("remotipartSubmitted", !0)
            },
            teardown: function(e) {
                e.unbind("ajax:beforeSend.remotipart").removeData("remotipartSubmitted")
            }
        }, t("form").live("ajax:aborted:file", function() {
            var r = t(this);
            return n.setup(r), !t.support.submitBubbles && t().jquery < "1.7" && t.rails.callFormSubmitBindings(r) === !1 ? t.rails.stopEverything(e) : (t.rails.handleRemote(r), !1)
        })
    }(jQuery),
    function() {
        var e;
        e = jQuery, e.fn.savefile = function(t) {
            var n, r, i, s;
            return s = e.extend({
                filename: "file",
                extension: "txt"
            }, t), i = function(e, t) {
                var n;
                n = "http://savefile.joshmcarthur.com/" + encodeURIComponent(e);
                if (t) return n += encodeURIComponent(t)
            }, n = "" + s.filename + "." + s.extension, r = function(t) {
                return e("<form></form>", {
                    action: i(n()),
                    method: "POST"
                }).append(e("<input></input>", {
                    type: "hidden",
                    name: "content",
                    value: t
                }))
            }, this.each(function() {
                var e;
                return e = this.val() !== "" ? this.val() : this.text(), s.content != null && (e = s.content), r(e).submit()
            })
        }
    }.call(this),
    function(e, t) {
        var n = 5;
        e.widget("ui.slider", e.ui.mouse, {
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null
            },
            _create: function() {
                var t = this,
                    r = this.options,
                    i = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    s = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    o = r.values && r.values.length || 1,
                    u = [];
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (r.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), r.range && (r.range === !0 && (r.values || (r.values = [this._valueMin(), this._valueMin()]), r.values.length && r.values.length !== 2 && (r.values = [r.values[0], r.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (r.range === "min" || r.range === "max" ? " ui-slider-range-" + r.range : "")));
                for (var a = i.length; a < o; a += 1) u.push(s);
                this.handles = i.add(e(u.join("")).appendTo(t.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(e) {
                    e.preventDefault()
                }).hover(function() {
                    r.disabled || e(this).addClass("ui-state-hover")
                }, function() {
                    e(this).removeClass("ui-state-hover")
                }).focus(function() {
                    r.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
                }).blur(function() {
                    e(this).removeClass("ui-state-focus")
                }), this.handles.each(function(t) {
                    e(this).data("index.ui-slider-handle", t)
                }), this.handles.keydown(function(r) {
                    var i = e(this).data("index.ui-slider-handle"),
                        s, o, u, a;
                    if (t.options.disabled) return;
                    switch (r.keyCode) {
                        case e.ui.keyCode.HOME:
                        case e.ui.keyCode.END:
                        case e.ui.keyCode.PAGE_UP:
                        case e.ui.keyCode.PAGE_DOWN:
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            r.preventDefault();
                            if (!t._keySliding) {
                                t._keySliding = !0, e(this).addClass("ui-state-active"), s = t._start(r, i);
                                if (s === !1) return
                            }
                    }
                    a = t.options.step, t.options.values && t.options.values.length ? o = u = t.values(i) : o = u = t.value();
                    switch (r.keyCode) {
                        case e.ui.keyCode.HOME:
                            u = t._valueMin();
                            break;
                        case e.ui.keyCode.END:
                            u = t._valueMax();
                            break;
                        case e.ui.keyCode.PAGE_UP:
                            u = t._trimAlignValue(o + (t._valueMax() - t._valueMin()) / n);
                            break;
                        case e.ui.keyCode.PAGE_DOWN:
                            u = t._trimAlignValue(o - (t._valueMax() - t._valueMin()) / n);
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                            if (o === t._valueMax()) return;
                            u = t._trimAlignValue(o + a);
                            break;
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (o === t._valueMin()) return;
                            u = t._trimAlignValue(o - a)
                    }
                    t._slide(r, i, u)
                }).keyup(function(n) {
                    var r = e(this).data("index.ui-slider-handle");
                    t._keySliding && (t._keySliding = !1, t._stop(n, r), t._change(n, r), e(this).removeClass("ui-state-active"))
                }), this._refreshValue(), this._animateOff = !1
            },
            destroy: function() {
                return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
            },
            _mouseCapture: function(t) {
                var n = this.options,
                    r, i, s, o, u, a, f, l, c;
                return n.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), r = {
                    x: t.pageX,
                    y: t.pageY
                }, i = this._normValueFromMouse(r), s = this._valueMax() - this._valueMin() + 1, u = this, this.handles.each(function(t) {
                    var n = Math.abs(i - u.values(t));
                    s > n && (s = n, o = e(this), a = t)
                }), n.range === !0 && this.values(1) === n.min && (a += 1, o = e(this.handles[a])), f = this._start(t, a), f === !1 ? !1 : (this._mouseSliding = !0, u._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), c = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = c ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - l.left - o.width() / 2,
                    top: t.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(t, a, i), this._animateOff = !0, !0))
            },
            _mouseStart: function(e) {
                return !0
            },
            _mouseDrag: function(e) {
                var t = {
                        x: e.pageX,
                        y: e.pageY
                    },
                    n = this._normValueFromMouse(t);
                return this._slide(e, this._handleIndex, n), !1
            },
            _mouseStop: function(e) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(e) {
                var t, n, r, i, s;
                return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
            },
            _start: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
            },
            _slide: function(e, t, n) {
                var r, i, s;
                this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n,
                    values: i
                }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n
                }), s !== !1 && this.value(n))
            },
            _stop: function(e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
            },
            _change: function(e, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var n = {
                        handle: this.handles[t],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
                }
            },
            value: function(e) {
                if (arguments.length) {
                    this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
                    return
                }
                return this._value()
            },
            values: function(t, n) {
                var r, i, s;
                if (arguments.length > 1) {
                    this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
                    return
                }
                if (!arguments.length) return this._values();
                if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                r = this.options.values, i = arguments[0];
                for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
                this._refreshValue()
            },
            _setOption: function(t, n) {
                var r, i = 0;
                e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
                switch (t) {
                    case "disabled":
                        n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        this._animateOff = !0, this._refreshValue();
                        for (r = 0; r < i; r += 1) this._change(null, r);
                        this._animateOff = !1
                }
            },
            _value: function() {
                var e = this.options.value;
                return e = this._trimAlignValue(e), e
            },
            _values: function(e) {
                var t, n, r;
                if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t), t;
                n = this.options.values.slice();
                for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
                return n
            },
            _trimAlignValue: function(e) {
                if (e <= this._valueMin()) return this._valueMin();
                if (e >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    n = (e - this._valueMin()) % t,
                    r = e - n;
                return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var t = this.options.range,
                    n = this.options,
                    r = this,
                    i = this._animateOff ? !1 : n.animate,
                    s, o = {},
                    u, a, f, l;
                this.options.values && this.options.values.length ? this.handles.each(function(t, a) {
                    s = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", e(this).stop(1, 1)[i ? "animate" : "css"](o, n.animate), r.options.range === !0 && (r.orientation === "horizontal" ? (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                        left: s + "%"
                    }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                        width: s - u + "%"
                    }, {
                        queue: !1,
                        duration: n.animate
                    })) : (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                        bottom: s + "%"
                    }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                        height: s - u + "%"
                    }, {
                        queue: !1,
                        duration: n.animate
                    }))), u = s
                }) : (a = this.value(), f = this._valueMin(), l = this._valueMax(), s = l !== f ? (a - f) / (l - f) * 100 : 0, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", this.handle.stop(1, 1)[i ? "animate" : "css"](o, n.animate), t === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                    width: s + "%"
                }, n.animate), t === "max" && this.orientation === "horizontal" && this.range[i ? "animate" : "css"]({
                    width: 100 - s + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                }), t === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                    height: s + "%"
                }, n.animate), t === "max" && this.orientation === "vertical" && this.range[i ? "animate" : "css"]({
                    height: 100 - s + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                }))
            }
        }), e.extend(e.ui.slider, {
            version: "1.8.22"
        })
    }(jQuery);
var JSON;
JSON || (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1) indent += " ";
            else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }();
var hexcase = 0,
    b64pad = "",
    chrsz = 8;
(function() {}).call(this), $(function() {
    $(".required").live("change", function() {
        //validateAlignmentForm()
    })
}), $(function() {
    $("#ageRange").change(function() {
        updateItemEducationTab("ageRange", "ageRangeOther")
    })
}), $(function() {
    $("#ageRangeOther").change(function() {
        updateItemEducationTab("ageRange", "ageRangeOther")
    })
}), $(function() {
    $("#alignmentType").change(function(e) {})
}), $(function() {
    var e = "createdBy";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    var e = "tagDescription";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    /*$("#dotNotation").change(function(e) {
        if (e.target.value != previousDotValue) {
            previousDotValue = $("#dotNotation").val(), document.getElementById("description").value = "";
            var t = $.inArray(e.target.value, dotNotationDisplayArray);
            if (t == -1) $("#description").attr("value", "Error: The Dot Notation you entered doesn't appear to be valid.");
            else {
                document.getElementById("description").value = "Loading (please wait)....";
                for (i = 0; i < alignmentArray.length; i++) $("#dotNotation").val() == alignmentArray[i].title && (document.getElementById("itemGUID").value = alignmentArray[i].guid, $.ajax({
                    async: !1,
                    url: "http://anyorigin.com/get?url=" + alignmentArray[i].description + "&callback=?",
                    dataType: "json",
                    success: function(e) {
                        var t = $(e.contents).filter("title").text().replace(" | Achievement Standards Network", "");
                        if (t != "") {
                            var n = t.length;
                            document.getElementById("description").value = t
                        }
                        t == "" && (document.getElementById("description").value = "No Description Available"), validateAlignmentForm()
                    }
                }))
            }
        }
    })*/
}), $(function() {
    $("#educationalUse").change(function() {
        updateItemEducationTab("educationalUse", "educationalUseOther")
    })
}), $(function() {
    $("#educationalAlignment").change(function(e) {})
}), $(function() {
    $("#educationalUseOther").change(function() {
        updateItemEducationTab("educationalUse", "educationalUseOther")
    })
}), $(function() {
    $("#endUser").change(function() {
        updateItemEducationTab("endUser", "endUserOther")
    })
}), $(function() {
    $("#endUserOther").change(function() {
        updateItemEducationTab("endUser", "endUserOther")
    })
}), $(function() {
    $("#groupType").change(function() {
        updateItemEducationTab("groupType", "groupTypeOther")
    })
}), $(function() {
    $("#groupTypeOther").change(function() {
        updateItemEducationTab("groupType", "groupTypeOther")
    })
}), $(function() {
    $("#files").change(function(e) {
        importedFiles = e.target.files;
        for (var t = 0, n; n = importedFiles[t]; t++) reader = new FileReader, reader.onload = function(e) {
            return itemCounter = 0, jQuery("#multiItemSelector input[type=checkbox]").each(function(e, t) {
                t.checked = !1, itemCounter++
            }),
                function(e) {
                    $("#loadModal").modal("hide"), fileHasErrors = !1, fileErrors = [], jQuery("#multiItemSelector input[type=checkbox]").each(function(e, t) {
                        t.checked = !1
                    }), updateInputFields(), itemCounter == 0 && jQuery("#multiItemSelector").empty();
                    var t = e.target.result;
                    if (t[0] == "{") {
                        var n = JSON.parse(t);
                        for (u in n) {
                            if (n[u] == undefined || n[u].length == 0) continue;
                            n[u].id = itemCounter, items["itemTag" + itemCounter] = n[u];
                            var r = n[u].title != "" ? n[u].title.length > 25 ? n[u].title.substr(0, 25) + "&hellip;" : n[u].title : "New Item " + itemCounter,
                                i = n[u].url;
                            for (v in n[u].educationalAlignments) alignments[v] == undefined && ($(".noAlignmentsYet").hide(), alignments[v] = n[u].educationalAlignments[v], $("#currentAlignmentTable > tbody:last").append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="' + v + '" />' + n[u].educationalAlignments[v].dotNotation + "</label></td><td>" + capitalize(n[u].educationalAlignments[v].alignmentType) + "</td></tr>"));
                            $("#multiItemSelector").append($("<a href='#itemTag" + itemCounter + "' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag" + itemCounter + "' id='itemTag" + itemCounter + "URL' " + (i != "" ? "" : "style='display:none;'") + " class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag" + itemCounter + "Label' class='checkbox'><input id='itemTag" + itemCounter + "' type='checkbox' name='tagItem'/><span>" + r + "</span></label>")), itemCounter++
                        }
                    }
                    if (t[0] != "{") {
                        var s = [],
                            o = t.replace(/\r/g, "\r\n").replace(/\n\n/, "\n"),
                            n = $.csv.toArrays(o);
                        validateImportHeaders(n), fileHasErrors || validateImportColumns(n), fileHasErrors && showFileHasErrorsMessage("File Format Error");
                        for (var u = 1; u < n.length; u++) {
                            if (fileHasErrors) continue;
                            if (n[u] == undefined || n[u].length < 25) continue;
                            var r = n[u][1] != "" && n[u][1] != undefined ? n[u][1].length > 25 ? n[u][1].substr(0, 25) + "&hellip;" : n[u][1] : "New Item " + itemCounter,
                                i = n[u][2],
                                a = n[u][17].split(","),
                                f = n[u][18].split(","),
                                l = n[u][19].split(","),
                                c = n[u][21].split(","),
                                h = n[u][20].split(","),
                                p = {};
                            for (ea = 0; ea < a.length; ea++) {
                                if (l[ea] == "") continue;
                                var d = validateImportEducationalAlignment({
                                    educationalAlignment: a[ea],
                                    alignmentType: f[ea],
                                    dotNotation: l[ea],
                                    description: c[ea],
                                    itemURL: h[ea]
                                });
                                if (!fileHasErrors) {
                                    var v = objectToHash(d);
                                    alignments[v] == undefined && ($(".noAlignmentsYet").hide(), alignments[v] = d, $("#currentAlignmentTable > tbody:last").append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="' + v + '" />' + l[ea] + "</label></td><td>" + capitalize(f[ea]) + "</td></tr>")), p[v] = d
                                }
                            }
                            tempItem = {
                                id: itemCounter,
                                title: validateImportField("title", n[u][1]),
                                language: validateImportField("language", n[u][8]),
                                thumbnail: validateImportField("thumbnail", n[u][23]),
                                url: validateImportField("url", i),
                                tagDescription: validateImportField("tagDescription", n[u][24]),
                                createdOn: validateImportField("createdOn", n[u][5]),
                                topic: validateImportField("topic", n[u][4]),
                                createdBy: validateImportField("createdBy", n[u][6]),
                                usageRightsURL: validateImportField("usageRightsURL", n[u][10]),
                                publisher: validateImportField("publisher", n[u][7]),
                                isBasedOnURL: validateImportField("isBasedOnURL", n[u][11]),
                                endUser: validateImportField("endUser", n[u][12]),
                                ageRange: validateImportField("ageRange", n[u][14]),
                                educationalUse: validateImportField("educationalUse", n[u][13]),
                                interactivityType: validateImportField("interactivityType", n[u][15]),
                                learningResourceType: validateImportField("learningResourceType", n[u][16]),
                                mediaType: validateImportField("mediaType", n[u][9]),
                                groupType: validateImportField("groupType", n[u][22]),
                                timeRequired: validateImportField("timeRequired", n[u][3]),
                                educationalAlignments: p
                            }, fileHasErrors ? showFileHasErrorsMessage("Errors found in row #" + u) : (items["itemTag" + itemCounter] = tempItem, $("#multiItemSelector").append($("<a href='#itemTag" + itemCounter + "' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag" + itemCounter + "' id='itemTag" + itemCounter + "URL' " + (i != "" ? "" : "style='display:none;'") + " class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag" + itemCounter + "Label' class='checkbox'><input id='itemTag" + itemCounter + "' type='checkbox' name='tagItem'/><span>" + r + "</span></label>")), itemCounter++)
                        }
                    }
                    updateResourceCount(), $("#pleasewait").hide()
                }
        }(n), /(csv|json)$/.test(n.name.toLowerCase()) ? ($("#pleasewait").show(), reader.readAsText(n), $("#fileForm")[0].reset()) : (alert("Please select a .CSV file"), $("#fileForm")[0].reset())
    })
}), $(function() {
    $("#interactivityType").change(function() {
        updateItemEducationTab("interactivityType", "interactivityTypeOther")
    })
}), $(function() {
    $("#interactivityTypeOther").change(function() {
        updateItemEducationTab("interactivityType", "interactivityTypeOther")
    })
}), $(function() {
    var e = "isBasedOnURL";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    $("#itemURL").change(function(e) {})
}), $(function() {
    var e = "language";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    $("#learningResourceType").change(function() {
        updateItemEducationTab("learningResourceType", "learningResourceTypeOther")
    })
}), $(function() {
    $("#learningResourceTypeOther").change(function() {
        updateItemEducationTab("learningResourceType", "learningResourceTypeOther")
    })
}), $(function() {
    $("#mediaType").change(function() {
        updateItemEducationTab("mediaType", "mediaTypeOther")
    })
}), $(function() {
    $("#mediaTypeOther").change(function() {
        updateItemEducationTab("mediaType", "mediaTypeOther")
    })
}), $(function() {
    $("#multiItemSelector").change(function() {
        updateInputFields(), updateTextArea()
    })
}), $(function() {
    var e = "publisher";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    var e = "title";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n;
            var i = n.length > 25 ? n.substr(0, 25) + "&hellip;" : n;
            $("#" + r.id + "Label span")[0].innerHTML = i
        }), updateTextArea()
    })
}), $(function() {
    var e = "topic";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    var e = "url";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n, n != "" ? $("#" + r.id + "URL").show() : $("#" + r.id + "URL").hide()
        }), updateTextArea(), updateMainContentBottom(n)
    })
}), $(function() {
    var e = "url";
    $("#" + e).blur(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n, n != "" ? $("#" + r.id + "URL").show() : $("#" + r.id + "URL").hide()
        }), updateTextArea(), updateMainContentBottom(n)
    })
}), $(function() {
    var e = "usageRightsURL";
    $("#" + e).change(function(t) {
        var n = $(t.target).val();
        $("#multiItemSelector input[type=checkbox]:checked").each(function(t, r) {
            items[r.id][e] = n
        }), updateTextArea()
    })
}), $(function() {
    $(".add-alignment").click(function(e) {
        return $("#alignmentsModal").modal("show"), !1
    }), document.onkeypress = function(e) {
        if (e.which == 13) return !1
    }
}), $(function() {
 var alignments="";
    $("#addButton").click(function() {
        $("#alignmentsModal").modal("hide"), $(".noAlignmentsYet").hide();
        var e = $("#educationalAlignment").val(),
            t = $("#alignmentType").val(),
            n = $("#dotNotation").val(),
            r = $("#description").val(),
            i = $("#itemURL").val(),
            s = {
                educationalAlignment: e,
                alignmentType: t,
                dotNotation: n,
                description: r,
                itemURL: i
            },
            o = objectToHash(s);
        return alignments[o] == undefined && (alignments[o] = s, n == "" && (n = "N/A"), $("#currentAlignmentTable > tbody:last").append('<tr><td><label>' + n + "</label><input type='hidden' name='standards[]' value='"+n+"|"+t+"'></td><td>" + capitalize(t) + "</td><td><a style='color:red;cursor:pointer;' class='closetdd'>X</a></td></tr>")), updateTextArea(), $("#dotNotation").val(""), $("#description").val(""), $("#itemURL").val(""), $("#itemGUID").val(""), !1
        //return alignments[o] == undefined && (alignments[o] = s, n == "" && (n = "N/A"), $("#currentAlignmentTable > tbody:last").append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="' + o + '" />' + n + "</label></td><td>" + capitalize(t) + "</td></tr>")), updateTextArea(), $("#alignmentType").val(""), $("#dotNotation").val(""), $("#description").val(""), $("#itemURL").val(""), $("#itemGUID").val(""), !1
    })
	
}), $(function() {
    $("#addThumbnailButton").click(function() {
        return $(this).hasClass("disabled") || $("#thumbModal").modal("show"), !1
    })
}), $(function() {
    $(".alignment-checkbox").live("click", function(e) {
        checkbox = e.target, objectHash = $(checkbox).attr("value"), $("#multiItemSelector input[type=checkbox]:checked").each(function(e, t) {
            $(checkbox).is(":checked") ? items[t.id].educationalAlignments[objectHash] = alignments[objectHash] : delete items[t.id].educationalAlignments[objectHash]
        }), updateTextArea()
    })
}), $(function() {
    $("#closeModalButton").click(function() {
        jQuery("#mainContentTopLeft").show(), jQuery("#mainContentTopRight").show(), jQuery("#mainContentBottom").show()
    })
}), $(function() {
    $(".delete-tag").live("click", function(e) {
        var t = $(e.target).parent().attr("href").substr(1);
        return $("#deleteModal .btn-danger").attr("onclick", "deleteTag('" + t + "');").attr("href", "#"), $("#deleteModal").modal("show"), !1
    })
}), $(function() {
    $("#exportCsvButton").click(function() {
        var e = processCSVOutput(!0);
        saveAndExport(e, ".csv")
    })
}), $(function() {
    $("#exportHtmlButton").click(function() {
        var e = processHTMLOutput(!0);
        saveAndExport(e, ".html")
    })
}), $(function() {
    $("#exportJsonButton").click(function() {
        var e = processJSONOutput(!0);
        saveAndExport(e, ".json")
    })
}), $(function() {
    $("#history a").live("click", function(e) {
        var t = $(this).attr("href").substr(1);
        return $("#resetModal .btn-success").attr("onclick", "resetResource('" + t + "');").attr("href", "#"), $("#resetModal").modal("show"), !1
    })
}), $(function() {
    $("#loadButton").click(function() {})
}), $(function() {
    $("#newbutton").click(function() {
        toggleForm()
    })
}), $(function() {
    $("#publishButton").click(function() {
        if (!$(this).hasClass("disabled")) {
            showPleaseWait("Publishing...  (This can take some time depending on the number of resources you have selected..)");
            var e = processJSONOutput();
            saveDraft(e);
            var e = processJSONOutput(!0);
            saveRemote(e, "LR")
        }
    })
}), $(function() {
    $("#removeThumbnailButton").click(function() {
        return $("#thumbnail").attr("value", ""), $("#thumbnailImage").attr("src", ""), $("#removeThumbnailButton").hide(), $("#thumbnailImage").hide(), $("#multiItemSelector input[type=checkbox]:checked").each(function(e, t) {
            items[t.id].thumbnail = ""
        }), !1
    })
}), $(function() {
    $(".render-tag").live("click", function(e) {
        var t = $(e.target).first().parent().attr("href").substr(1);
        return updateMainContentBottom(items[t].url), !1
    })
}), $(function() {
    $("#saveDraftButton").click(function() {
        var e = processJSONOutput();
        saveDraft(e)
    })
}), $(function() {
    $("#saveLoadModalButton").click(function() {
        if (document.getElementById("loadModalTextArea").value != "") {
            itemCounter = 0, jQuery("#multiItemSelector input[type=checkbox]").each(function(e, t) {
                t.checked = !1, itemCounter++
            }), document.getElementById("loadModalTextArea").value = document.getElementById("loadModalTextArea").value.replace(/^\s+|\s+$/g, "");
            var e = document.getElementById("loadModalTextArea").value.split("\n");
            for (var t = 0; t < e.length; t++) {
                var n = e[t].split(",");
                items["itemTag" + itemCounter] = {
                    id: itemCounter,
                    title: n[0],
                    language: "",
                    thumbnail: "",
                    url: n[1],
                    tagDescription: "",
                    createdOn: "",
                    topic: "",
                    createdBy: "",
                    usageRightsURL: "",
                    publisher: "",
                    isBasedOnURL: "",
                    endUser: "",
                    ageRange: "",
                    educationalUse: "",
                    interactivityType: "",
                    learningResourceType: "",
                    mediaType: "",
                    groupType: "",
                    timeRequired: "P0Y0M0W0DT0H0M0S",
                    educationalAlignments: {}
                }, itemCounter++
            }
            document.getElementById("loadModalTextArea").value = ""
        } else document.getElementById("files").value != "";
        redrawResourcesBasedOnItems()
    })
}), $(function() {
    $("#selectDeselectAllResources").click(function() {
        checked = $(this).attr("checked"), $("#multiItemSelector input[type=checkbox]").each(function() {
            checked ? ($(this).attr("checked", !0), $("#publishButton").removeClass("disabled")) : ($(this).removeAttr("checked"), $("#publishButton").addClass("disabled"))
        }), updateResourceCount()
    })
}), $(function() {
    $("#description").keypress(function(e) {})
}), $(function() {
    $("#dotNotation").keypress(function(e) {
        e.keyCode == 13 && $("#dotNotation").blur()
    })
}), $(function() {
    $("#itemURL").keypress(function(e) {})
});